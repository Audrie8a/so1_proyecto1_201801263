package main

import (
	"context"
	"fmt"
	pb "grpcserver/proto-grpc"
	"log"
	"net"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

// type usuario struct {
// 	Nombre string `json:"name"`
// 	Lugar  string `json:"location"`
// 	Edad   string `json:"age"`
// 	Vacuna string `json:"vaccine_type"`
// 	Dosis  string `json:"n_dose"`
// }

type server struct {
	pb.UnimplementedGetInfoServer
}

//Funcion que guarda los usuarios en mongo
func saveUser(usuario string) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	mongoclient, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://Uso1:123@34.132.148.209:27017/so1"))
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
}

//Funcion para retornar información a nuestro cliente
func (s *server) ReturnInfo(ctx context.Context, in *pb.RequestId) (*pb.ReplyInfo, error) {
	saveUser(in.GetId())
	fmt.Printf(">> Recibido data Usuario: %v\n", in.GetId())
	return &pb.ReplyInfo{Info: ">> Cliente, Recibimos nuevo Usuario: " + in.GetId()}, nil
}

func main() {
	escucha, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("Fallo al levantar Servidor: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterGetInfoServer(s, &server{})
	if err := s.Serve(escucha); err != nil {
		log.Fatalf("Fallo al levantar Servidor: %v", err)
	}

}
