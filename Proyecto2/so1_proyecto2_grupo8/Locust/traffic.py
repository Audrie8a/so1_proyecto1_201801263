import json
from random import randrange
from locust import HttpUser, between, task

class Reader():
    def __init__(self):
        self.pacientes = []
    
    def pickRandom(self):
        length = len(self.pacientes)
        if length > 0:
            rand = randrange(0, length-1) if length > 1 else 0
            return self.pacientes.pop(rand)
        else:
            print("Reader: No se encuentra ningùn valor en el archivo")
            return None
    
    def load(self):
        print("Reader: Iniciando lectura del archivo traffic.json")
        
        try:
            with open("traffic.json", 'r') as datos:
                self.pacientes = json.loads(datos.read())
        except Exception as err:
            print("Reader: Error, no se han cargado los datos")

class MessageTraffic(HttpUser):
    wait_time = between(0.1, 0.9)
    reader = Reader()
    reader.load()

    def on_start(self):
        print("MessageTraffic: Inicio del envio de trafico")

    @task
    def posting(self):
        rand = self.reader.pickRandom()
        if rand is not None:
            res = json.dumps(rand)
            self.client.post("", json=rand)
        else:
            print("MessageTraffic: Envio de trafico finalizado")
            self.stop(True)
