package main

import (
	"encoding/json"
	"net/http"

	"github.com/99x-product-central-dev/microservices-docker-go-mongodb/bookings/pkg/models"
	"github.com/gorilla/mux"
)

func (app *application) all(w http.ResponseWriter, r *http.Request) {
	// Get all bookings stored
	bookings, err := app.bookings.All()
	if err != nil {
		app.serverError(w, err)
	}

	// Convert ${{values.firstAppName}} list into json encoding
	b, err := json.Marshal(bookings)
	if err != nil {
		app.serverError(w, err)
	}

	app.infoLog.Println("Bookings have been listed")

	// Send response back
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func (app *application) findByID(w http.ResponseWriter, r *http.Request) {
	// Get id from incoming url
	vars := mux.Vars(r)
	id := vars["id"]

	// Find ${{values.firstAppName}} by id
	m, err := app.bookings.FindByID(id)
	if err != nil {
		if err.Error() == "ErrNoDocuments" {
			app.infoLog.Println("${{values.firstAppName}} not found")
			return
		}
		// Any other error will send an internal server error
		app.serverError(w, err)
	}

	// Convert ${{values.firstAppName}} to json encoding
	b, err := json.Marshal(m)
	if err != nil {
		app.serverError(w, err)
	}

	app.infoLog.Println("Have been found a ${{values.firstAppName}}")

	// Send response back
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(b)
}

func (app *application) insert(w http.ResponseWriter, r *http.Request) {
	// Define ${{values.firstAppName}} model
	var m models.${{values.firstAppName}}
	// Get request information
	err := json.NewDecoder(r.Body).Decode(&m)
	if err != nil {
		app.serverError(w, err)
	}

	// Insert new ${{values.firstAppName}}
	insertResult, err := app.bookings.Insert(m)
	if err != nil {
		app.serverError(w, err)
	}

	app.infoLog.Printf("New ${{values.firstAppName}} have been created, id=%s", insertResult.InsertedID)
}

func (app *application) delete(w http.ResponseWriter, r *http.Request) {
	// Get id from incoming url
	vars := mux.Vars(r)
	id := vars["id"]

	// Delete ${{values.firstAppName}} by id
	deleteResult, err := app.bookings.Delete(id)
	if err != nil {
		app.serverError(w, err)
	}

	app.infoLog.Printf("Have been eliminated %d ${{values.firstAppName}}(s)", deleteResult.DeletedCount)
}
