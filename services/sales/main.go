package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "sales/routes"
)

func main() {
    ConnectDB()
    r := gin.Default()
    r.Use(cors.New(cors.Config{
        AllowOrigins: []string{
            "http://localhost:3000", 
            "*",                   
        },
        AllowMethods: []string{
            "GET", "POST", "PUT", "DELETE", "OPTIONS",
        },
        AllowHeaders: []string{
            "Content-Type", "Authorization", 
        },
    }))
    routes.InitializeRoutes(r, GetSalesCollection())
    r.Run(":5003")
}