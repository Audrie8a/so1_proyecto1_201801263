package main

import (
	"context"
	"encoding/json"

	"github.com/go-redis/redis/v8"
	"github.com/gofiber/fiber/v2"
)

//Struct de Persona
type Persona struct {
	Name        string `json:"name"`
	Location    string `json:"location"`
	Age         int    `json:"age"`
	VaccineType string `json:"vaccine_type"`
	NDose       int    `json:"n_dose"`
}

var ctx = context.Background()

var redisClient = redis.NewClient(&redis.Options{
	Addr:     "bases.covidero.ml:6379",
	Password: "123",
	DB:       0,
})

func main() {
	app := fiber.New()

	app.Post("/", func(c *fiber.Ctx) error {
		p := new(Persona)

		if err := c.BodyParser(p); err != nil {
			panic(err)
		}

		payload, err := json.Marshal(p)
		if err != nil {
			panic(err)
		}
		redisClient.LPush(ctx, "myList", payload)

		llave := "llave"

		if p.Age <= 11 {
			llave = "ninos"
		} else if p.Age <= 18 {
			llave = "adolecentes"
		} else if p.Age <= 26 {
			llave = "jovenes"
		} else if p.Age <= 59 {
			llave = "adultos"
		} else {
			llave = "vejez"
		}
		redisClient.Incr(ctx, llave)

		if err := redisClient.Publish(ctx, "update", payload).Err(); err != nil {
			panic(err)
		}
		return c.SendStatus(200)
	})

	app.Listen(":5000")
}
