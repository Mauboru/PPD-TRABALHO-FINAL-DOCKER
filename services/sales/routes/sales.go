package routes

import (
    "context"
    "net/http"
    "time"
    "github.com/gin-gonic/gin"
    "go.mongodb.org/mongo-driver/bson"
    "go.mongodb.org/mongo-driver/mongo"
    "sales/models"
)

var salesCollection *mongo.Collection

func InitializeRoutes(router *gin.Engine, collection *mongo.Collection) {
    salesCollection = collection

    router.POST("/sales", CreateSale)
    router.GET("/sales", GetSales)
}

func CreateSale(c *gin.Context) {
    var sale models.Sale
    if err := c.ShouldBindJSON(&sale); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    sale.Total = float64(sale.Quantity) * sale.UnitPrice
    sale.Date = time.Now()

    _, err := salesCollection.InsertOne(context.Background(), sale)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Venda registrada com sucesso"})
}

func GetSales(c *gin.Context) {
    cursor, err := salesCollection.Find(context.Background(), bson.M{})
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    defer cursor.Close(context.Background())

    var sales []models.Sale
    if err = cursor.All(context.Background(), &sales); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, sales)
}