package main

import (
    "context"
    "log"
    "time"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

var salesCollection *mongo.Collection

func ConnectDB() {
    clientOptions := options.Client().ApplyURI("mongodb://sales_db:27017")
    client, err := mongo.NewClient(clientOptions)
    if err != nil {
        log.Fatal(err)
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    err = client.Connect(ctx)
    if err != nil {
        log.Fatal(err)
    }

    salesCollection = client.Database("sales").Collection("sales")
    log.Println("Connected to MongoDB!")
}

func GetSalesCollection() *mongo.Collection {
    return salesCollection
}