"use strict";

// Packages imported
require("dotenv").config();
const express = require("express");
const http = require("http");
const todoRoutes = require("./Routes/todoRoutes");

//Getting Port from Environment variables (.env file)
const PORT = parseInt(process.env.PORT, 10);

// function to set up routes to be used
function setupRoutes(app) {
  app.use("/api/v1/todo/", todoRoutes);
}

// Function to create and setup server
const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  setupRoutes(app);

  const server = http.createServer(app);

  server.listen(PORT, () =>
    console.log(`server is listening on port: ${PORT}`)
  );
};

startServer();
