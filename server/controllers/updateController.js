const getMQTTHandler = require("../MQTTHandler");
const express = require("express");
const app = express();

const HOST = process.env.MQTT_URL;
const USERNAME = process.env.MQTT_USER;
const PASSWORD = process.env.MQTT_PASSWORD;

const mqttHandler = getMQTTHandler(HOST, USERNAME, PASSWORD);

class UpdateController {
  constructor() {
    this.clients = []; // Store active SSE connections
    this.mqttTopics = ["topic1", "topic2", "topic3", "topic4"]; // MQTT topics to subscribe to

    // Subscribe to MQTT topics on connection
    mqttHandler.on("connect", () => {
      this.mqttTopics.forEach((topic) => {
        mqttHandler.subscribe(topic, () => {
          console.log(`Subscribed to MQTT topic: ${topic}`);
        });
      });
    });

    // Handle incoming MQTT messages
    mqttHandler.on("message", (topic, message) => {
      if (this.mqttTopics.includes(topic)) {
        const data = message.toString(); // Convert the MQTT message to a string
        this.clients.forEach((client) => client.res.write(`data: ${data}\n\n`)); // Send data to all connected SSE clients
      }
    });

    // SSE endpoint setup
    app.get("/events", (req, res) => this.setupSSE(req, res));
  }

  setupSSE(req, res) {
    // Set headers for SSE
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    // Create a new client object and add it to the clients array
    const client = { id: Date.now(), res };
    this.clients.push(client);

    // Remove the client from the array when the connection is closed
    req.on("close", () => {
      this.clients = this.clients.filter((c) => c.id !== client.id);
    });
  }
}

module.exports = new UpdateController(); // Export an instance of the controller
