package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// ${{values.firstAppName}} is used to represent ${{values.firstAppName}} profile data
type ${{values.firstAppName}} struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"`
	UserID     string             `bson:"userid"`
	ShowtimeID string             `bson:"showtimeid"`
	Movies     []string           `bson:"movies"`
}
