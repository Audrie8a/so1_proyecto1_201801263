# so1_proyecto2_grupo8

## Contenedor Node
docker run -p 3000:3000 --name node_alpine -d node_alpine

## Contenedores gRPC go
### Cliente
docker build -t clientgrpc .
docker run -dit --name clientgrpc -p 8000:8000 clientgrpc

### Servidor
docker build -t servergrpc .
docker run -dit --name servergrpc -p 50051:50051 servergrpc


## Instalación de Helm:
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm

