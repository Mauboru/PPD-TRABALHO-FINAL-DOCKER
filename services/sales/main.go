package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
    "sales/routes"
)

func main() {
    ConnectDB()

    // Criação do roteador Gin
    r := gin.Default()

    // Configuração do middleware CORS (permitindo todas as origens ou com opções específicas)
    r.Use(cors.New(cors.Config{
        AllowOrigins: []string{
            "http://localhost:3000", // URL do seu frontend (ajuste conforme necessário)
            "*",                    // Para permitir todas as origens, se for o caso
        },
        AllowMethods: []string{
            "GET", "POST", "PUT", "DELETE", "OPTIONS", // Permite os métodos que sua API vai aceitar
        },
        AllowHeaders: []string{
            "Content-Type", "Authorization", // Cabeçalhos comuns utilizados no frontend
        },
    }))

    // Inicializando as rotas
    routes.InitializeRoutes(r, GetSalesCollection())

    // Executa o servidor
    r.Run(":5003")
}