const express = require("express");
const app = express();
const axios = require("axios");

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve the public folder as static files
app.use(express.static("public"));

// Render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// Handle the /weather route
app.get("/weather", async (req, res) => {
  // Get the city from the query parameters
  const apiKey = "06374548f4cf441f4a0356391de47aea";
  const city = req.query.city;

  //  logic to fetch weather data from the API
  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(api_url);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, please try again";
  }
  // Render the index template with the weather data and error message
  res.render("index", { weather, error });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});