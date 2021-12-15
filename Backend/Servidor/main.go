package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os/exec"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := websocket.Upgrade(w, r, nil, 1024, 1024)
	if _, ok := err.(websocket.HandshakeError); ok {
		http.Error(w, "Nota a websocket handshake", 400)
		return
	} else if err != nil {
		log.Println(err)
		return
	}

	out, err := ioutil.ReadFile("/proc/memo_201801263")
	if err != nil {
		log.Fatal(err)
	}

	output := string(out[:])

	mensaje := []byte(output)
	err = conn.WriteMessage(websocket.TextMessage, mensaje)
	if err != nil {
		log.Println("Error al enviar mensaje!")
		log.Println(err)
	}

	defer conn.Close()
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			return
		}
		log.Println(string(msg))
		if err = conn.WriteMessage(websocket.TextMessage, msg); err != nil {
			return
		}
	}
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

func getCPU(w http.ResponseWriter, r *http.Request) {
	//cmd := exec.Command("sudo ps -eo pcpu | sort -k 1 -r | head -50")
	cmd := exec.Command("sh", "-c", "ps -eo pcpu | sort -k 1 -r | head -50")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(err)
	}

	output := string(out[:])
	salida := strings.Split(output, " ")

	var response map[string]interface{}
	total := 0.0
	respuesta := ""
	for i := 1; i < len(salida); i++ {
		entrada := strings.Trim(salida[i], "\n")
		aux, err := strconv.ParseFloat(entrada, 32)
		if err != nil {
			respuesta = "{\"CPU\": \"Error\"}"
		} else {
			total += aux
			respuesta = "{\"CPU\":" + fmt.Sprintf("%f", total) + "}"
		}

	}

	json.Unmarshal([]byte(respuesta), &response)
	respondWithJSON(w, http.StatusOK, response)
}

func getProcesos(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_201801263")
	out, err := cmd.CombinedOutput()
	if err != nil {
		log.Fatal(err)
	}
	ejecucion := 0       //0
	interruptible := 0   //1
	ininterruptible := 0 //2
	zombie := 0          //4
	detenido := 0        //8
	respuesta := "\"procesos\": [\n "
	output := string(out[:])
	salida := strings.Split(output, "~")
	var response map[string]interface{}

	total_procesos := len(salida) - 1

	for i := 0; i < len(salida)-1; i++ {
		respuesta += "{" + salida[i] + ","

		estado := strings.Split(salida[i], ",")
		fmt.Println(string(estado[5][13]))
		//Clasificacion Estados

		if string(estado[5][13]) == "0" {
			ejecucion++
		} else if string(estado[5][13]) == "1" {

			interruptible++
		} else if string(estado[5][13]) == "2" {
			ininterruptible++
		} else if string(estado[5][13]) == "4" {
			zombie++
		} else if string(estado[5][13]) == "8" {
			detenido++
		}

		respuesta += "\n \"hijos\": [ \n "
		//Verificar si tiene hijos
		if (i+1) < len(salida)-1 && salida[i+1][0] == '\t' {
			fmt.Println("Tiene Hijo")

			for j := i + 1; j < len(salida)-1; j++ {

				respuesta += "{" + strings.Split(salida[j], "/t")[0] + "}"
				i++

				if (i+1) < len(salida)-1 && salida[i+1][0] == '\t' {
					respuesta += ",\n"
				} else {

					break
				}

			}

		} else {
			fmt.Println("Es otro proceso")

		}

		respuesta += "]\n}"

		if i+1 < len(salida)-1 {
			respuesta += ",\n"
		}
	}
	respuesta += "]}"
	auxProcesos := respuesta
	respuesta = "{ \"Ejecucion\": \"" + strconv.Itoa(ejecucion) + "\",\n"
	respuesta += "\"Interrumpible\": \"" + strconv.Itoa(interruptible) + "\",\n"
	respuesta += "\"Ininterrumpible\": \"" + strconv.Itoa(ininterruptible) + "\",\n"
	respuesta += "\"Zombie\": \"" + strconv.Itoa(zombie) + "\",\n"
	respuesta += "\"Detenidos\": \"" + strconv.Itoa(detenido) + "\",\n"
	respuesta += "\"Total_Procesos\": \"" + strconv.Itoa(total_procesos) + "\",\n"
	respuesta += auxProcesos
	//respuesta2 := "{\"hello\": 8}"
	// fmt.Println(respuesta)
	// w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	// w.WriteHeader(http.StatusOK)
	// fmt.Fprint(w, respuesta)
	json.Unmarshal([]byte(respuesta), &response)
	respondWithJSON(w, http.StatusOK, response)
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
	app.Router.HandleFunc("/ws", wsHandler)
	app.Router.HandleFunc("/cpu", getCPU).Methods(http.MethodGet)
	app.Router.HandleFunc("/procesos", getProcesos).Methods(http.MethodGet)
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
