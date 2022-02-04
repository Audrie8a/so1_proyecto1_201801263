
# syntax=docker/dockerfile:1

FROM golang:1.17-alpine

WORKDIR /app

COPY go.mod ./
COPY go.sum ./
RUN go mod download

COPY *.go ./
RUN go mod tidy
RUN go build -o ./main

#EXPOSE 5001

CMD [ "./main" ]

# FROM golang:1.17-alpine

# WORKDIR /
# COPY . .

# RUN go mod download
# #EXPOSE 5001
# CMD ["go", "run", "main.go"]
