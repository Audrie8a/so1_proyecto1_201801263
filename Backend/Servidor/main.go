package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		log.Println(string(p))

		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}
	log.Println("Client Successfully Connected...")
	reader(ws)
}

// App export
type App struct {
	Router *mux.Router
}

func getRam(w http.ResponseWriter, r *http.Request) {
	out, err := ioutil.ReadFile("/proc/memo_201801263")
	if err != nil {
		log.Fatal(err)
	}

	output := string(out[:])
	var response map[string]interface{}
	//json.Unmarshal([]byte(`{"hello": 8}`), &response)
	json.Unmarshal([]byte(output), &response)
	fmt.Print(output)
	respondWithJSON(w, http.StatusOK, response)
	//fmt.Print(output)
	//fmt.Fprintf(w, output)
}

func Inicio(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Bienvenidos!")
	fmt.Println(r)
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(payload)
}

func (app *App) initialiseRoutes() {
	app.Router = mux.NewRouter()
	app.Router.HandleFunc("/ram", getRam).Methods(http.MethodGet)
	app.Router.HandleFunc("/", Inicio)
	app.Router.HandleFunc("/socket", wsEndpoint)
}

func (app *App) run() {
	server := http.Server{Addr: ":8080", Handler: app.Router}
	fmt.Println("Listening on port 8080! ...")
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}

}

func main() {
	app := App{}
	app.initialiseRoutes()
	app.run()

}

//https://tutorialedge.net/golang/go-websocket-tutorial/
//https://www.youtube.com/watch?v=dniVs0xKYKk
