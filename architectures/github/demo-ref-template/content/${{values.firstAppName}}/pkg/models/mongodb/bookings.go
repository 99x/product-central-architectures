package mongodb

import (
	"context"
	"errors"

	"github.com/99x-product-central-dev/microservices-docker-go-mongodb/bookings/pkg/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// BookingModel represent a mgo database session with a ${{values.firstAppName}} data model
type BookingModel struct {
	C *mongo.Collection
}

// All method will be used to get all records from bookings table
func (m *BookingModel) All() ([]models.${{values.firstAppName}}, error) {
	// Define variables
	ctx := context.TODO()
	b := []models.${{values.firstAppName}}{}

	// Find all bookings
	bookingCursor, err := m.C.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	err = bookingCursor.All(ctx, &b)
	if err != nil {
		return nil, err
	}

	return b, err
}

// FindByID will be used to find a ${{values.firstAppName}} registry by id
func (m *BookingModel) FindByID(id string) (*models.${{values.firstAppName}}, error) {
	p, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	// Find ${{values.firstAppName}} by id
	var ${{values.firstAppName}} = models.${{values.firstAppName}}{}
	err = m.C.FindOne(context.TODO(), bson.M{"_id": p}).Decode(&${{values.firstAppName}})
	if err != nil {
		// Checks if the ${{values.firstAppName}} was not found
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("ErrNoDocuments")
		}
		return nil, err
	}

	return &${{values.firstAppName}}, nil
}

// Insert will be used to insert a new ${{values.firstAppName}} registry
func (m *BookingModel) Insert(${{values.firstAppName}} models.${{values.firstAppName}}) (*mongo.InsertOneResult, error) {
	return m.C.InsertOne(context.TODO(), ${{values.firstAppName}})
}

// Delete will be used to delete a ${{values.firstAppName}} registry
func (m *BookingModel) Delete(id string) (*mongo.DeleteResult, error) {
	p, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	return m.C.DeleteOne(context.TODO(), bson.M{"_id": p})
}
