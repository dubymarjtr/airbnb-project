// Entry point for the application
import express from "express";
import config from "./config.js";
// TODO: Import the routes

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World");
});

// TODO: Use json middleware (if needed)

// TODO: Mount the routes (maybe 🤔 /api)

app.listen(config.port, () => {
  console.log(`Server 🏃🏾‍♂️ at: http://localhost:${config.port}`);
});
