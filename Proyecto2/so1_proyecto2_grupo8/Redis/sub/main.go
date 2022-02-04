package main

import (
	"context"
	"encoding/json"
	"fmt"
	"time"
	"log"

	"github.com/go-redis/redis/v8"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Persona struct {
	Name        string `json:"name"`
	Location    string `json:"location"`
	Age         int    `json:"age"`
	VaccineType string `json:"vaccine_type"`
	NDose       int    `json:"n_dose"`
}

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
}



var ctx = context.Background()

var redisClient = redis.NewClient(&redis.Options{
		Addr:     "bases.covidero.ml:6379",
		Password: "123",
		DB:       0,
	})

func main() {
	subscriber := redisClient.Subscribe(ctx, "update")

	p := Persona{}

	for {
		msg, err := subscriber.ReceiveMessage(ctx)
		if err != nil {
			panic(err)
		}

		if err := json.Unmarshal([]byte(msg.Payload), &p); err != nil {
			panic(err)
		}

		fmt.Println("Received message from " + msg.Channel + " channel.")
		fmt.Printf("%+v\n", p)
		out, err := json.Marshal(p)
    	if err != nil {
        	panic (err)
    	}
		saveUser(string(out))
	}
}
