const express = require("express");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const mysql = require("mysql2");

const app = express();
app.use(cors());

const API_KEY = "7b518be2c8fe87bcc6582681479ec3dd";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",        
  password: "",        
  database: "weatherdb"
});

db.connect((err) => {
  if (err) console.log("Database Connection Failed");
  else console.log("✅ MySQL Connected");
});

fs.createReadStream("Weather4.csv")
  .pipe(csv())
  .on("data", (row) => {
    const query = `INSERT INTO weather_data (date, temperature, dewpoint, humidity, wind, pressure, clouds, precipitation)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [
      row.date,
      row.temperature,
      row.Dewpoint,
      row.Humidity,
      row.wind,
      row.Pressure,
      row.Clouds,
      row.Precipitation
    ]);
  })
  .on("end", () => {
    console.log("CSV Data Inserted into MySQL Table");
  });

app.get("/local-weather", (req, res) => {
  const { date } = req.query;

  db.query("SELECT * FROM weather_data WHERE date = ?", [date], (err, result) => {
    if (err) return res.status(500).json({ error: "DB Query Failed" });
    if (result.length === 0)
      return res.status(404).json({ error: "No data found for this date" });
    
    res.json(result[0]);
  });
});

app.get("/weather", async (req, res) => {
  const { city } = req.query;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Weather data fetch failed" });
  }
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
