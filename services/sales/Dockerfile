FROM golang:1.23

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN go build -o sales

EXPOSE 5003

CMD ["./sales"]