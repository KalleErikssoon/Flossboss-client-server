// Import the mqtt package
const mqtt = require("mqtt");

// Define the MQTTHandler class
class MQTTHandler {
  constructor(host, username, password) {
    this.host = host;
    this.username = username;
    this.password = password;
    this.client = null;
  }

  // Connect to the MQTT broker
  connect() {
    this.client = mqtt.connect(this.host, {
      username: this.username,
      password: this.password,
    });

    // Handle connection
    this.client.on("connect", () => {
      console.log("Connected to MQTT broker");
    });

    // Handle errors
    this.client.on("error", (error) => {
      console.error("Connection error:", error);
    });
  }

  // Subscribe to a topic
  subscribe(topic) {
    this.client.subscribe(topic, (error) => {
      if (error) {
        console.error("Subscription error:", error);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
      }
    });

    // Handle incoming messages
    this.client.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        console.log(
          `Message received on ${receivedTopic}: ${message.toString()}`
        );
      }
    });
  }

  // Publish a message to a topic
  publish(topic, message) {
    this.client.publish(topic, message, (error) => {
      if (error) {
        console.error("Publish error:", error);
      }
    });
  }

  // Disconnect from the MQTT broker
  disconnect() {
    if (this.client) {
      this.client.end(() => {
        console.log("Disconnected from MQTT broker");
      });
    }
  }
}

module.exports = MQTTHandler;
