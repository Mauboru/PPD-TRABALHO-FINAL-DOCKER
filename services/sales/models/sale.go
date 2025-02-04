package models

import "time"

type Sale struct {
    ID         string    `json:"id" bson:"_id,omitempty"`
    ProductID  string    `json:"product_id" bson:"product_id"`
    ClientID   string    `json:"client_id" bson:"client_id"`
    Quantity   int       `json:"quantity" bson:"quantity"`
    UnitPrice  float64   `json:"unit_price" bson:"unit_price"`
    Total      float64   `json:"total" bson:"total"`
    Date       time.Time `json:"date" bson:"date"`
}