package main

import (
	"context"
	"fmt"
	pb "grpcserver/proto-grpc"
	"log"
	"net"
	"strconv"
	"time"

	redis "github.com/go-redis/redis"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
)

var contador = 0

const (
	port = ":50051"
)

type userAux struct {
	Nombre string `json:"name"`
	Lugar  string `json:"location"`
	Edad   string `json:"age"`
	Vacuna string `json:"vaccine_type"`
	Dosis  string `json:"n_dose"`
}

type server struct {
	pb.UnimplementedGetInfoServer
}

//Funcion que guarda los usuarios en mongo
func saveUser(usuario string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoclient, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://Uso1:123@bases.covidero.ml:27017/so1"))
	if err != nil {
		log.Fatal(err)
	}

	databases, err := mongoclient.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(databases)

	Database := mongoclient.Database("so1")
	Collection := Database.Collection("patients")

	var bdoc interface{}

	errb := bson.UnmarshalExtJSON([]byte(usuario), true, &bdoc)

	fmt.Println(errb)

	insertResult, err := Collection.InsertOne(ctx, bdoc)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(insertResult)
	// creates a client
	client := rClient()
	// check connection status
	err2 := ping(client)

	if err2 != nil {
		fmt.Println("Error", err2)
	}

	set(client, usuario)
	if err != nil {
		fmt.Println(err)
	}

	err = get(client)
	if err != nil {
		fmt.Println(err)
	}
}

// func set(client *redis.Client, data string) error {

// 	aux := strconv.Itoa(contador)
// 	err := client.Set("a"+aux, data, 0).Err()
// 	if err != nil {
// 		return err
// 	}

// 	fmt.Println("a" + aux)
// 	contador++

// 	return nil
// }

//Funcion para retornar información a nuestro cliente
func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestId) (*pb.ReplyInfo, error) {
	saveUser(in.GetId())
	fmt.Printf(">> Recibido data Usuario: %v\n", in.GetId())
	return &pb.ReplyInfo{Info: ">> Cliente, Recibimos nuevo Usuario: " + in.GetId()}, nil
}

//Conexión Redis
func rClient() *redis.Client {
	client := redis.NewClient(&redis.Options{
		Addr:     "bases.covidero.ml:6379",
		Password: "123",
		DB:       0,
	})

	return client
}

func ping(client *redis.Client) error {
	pong, err := client.Ping().Result()
	if err != nil {
		return err
	}
	fmt.Println(pong, err, "Audrie")
	// Output: PONG <nil>

	return nil
}

func get(client *redis.Client) error {
	aux := strconv.Itoa(contador)
	nameVal, err := client.Get("a" + aux).Result()
	if err != nil {
		return (err)
	}
	fmt.Println("name", nameVal)

	return nil
}

func set(client *redis.Client, data string) {

	err := client.Do("LPUSH", "myList", data) // Rpush("myList", []byte(data))

	if err != nil {
		fmt.Println(err)
	}

	contador++

}

func main() {
	escucha, err := net.Listen("tcp", port)
	contador = 0
	if err != nil {
		log.Fatalf("Fallo al levantar Servidor: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})
	if err := s.Serve(escucha); err != nil {
		log.Fatalf("Fallo al levantar Servidor: %v", err)
	} else {
		fmt.Println("Listen on port 50051")
	}

}
