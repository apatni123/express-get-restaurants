const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json()); // Needed for POST and PUT
app.use(express.urlencoded({ extended: true })); // Parses data and adds to req body

// Get all restaurants
app.get("/restaurants", async (req, res) => {
    const restaurants = await Restaurant.findAll({});
    res.json(restaurants);
});

// Get a restaurant by ID
app.get("/restaurants/:id", async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.params.id);
    res.json(restaurant);
});

// Add a new restaurant
app.post("/restaurants", async (req, res) => {
    const newRestaurant = await Restaurant.create(req.body);
    res.send(newRestaurant); 
});

// Delete a restaurant by ID
app.delete("/restaurants/:id", async (req, res) => {
    const restaurantId = req.params.id; // Get the restaurant ID from the URL
    const deletedCount = await Restaurant.destroy({
        where: { id: restaurantId }
    });
    res.send('Deleted');    
});

//Update restaurant by ID
app.put("/restaurants/:id", async (req, res) => {
    const restaurantId = req.params.id; // Get the restaurant ID from the URL
    const updatedData = req.body; // Get the data to update from the request body

    // Update the restaurant and ignore the updated count
    await Restaurant.update(updatedData, {
        where: { id: restaurantId }
    });

    // Simply send a success message
    res.send("Restaurant updated successfully");
});



// Ensure you have a closing bracket for the app
module.exports = app;
