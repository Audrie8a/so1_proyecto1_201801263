FROM golang:1.16-alpine

WORKDIR /
COPY . .

RUN go mod download

EXPOSE 50051

CMD ["go", "run", "server.go"]