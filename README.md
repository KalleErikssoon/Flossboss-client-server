# FlossBoss Client-Server Repository

## Description
The FlossBoss project is a web-based system for dental appointment management that combines a client/server model with a service-oriented approach to efficiently manage dental appointments. Employing a React-based Patient GUI on the front end and an Express.js server on the back end for user data handling through HTTP REST API. The system leverages MQTT as a communication protocol, where the server, instead of direct database operations for bookings, publishes booking requests and subscribes to booking confirmations, enabling real-time updates via SSE. The Service Layer encapsulates the booking logic, dentist authentication, email notifications, and logging, with services subscribing to and publishing on MQTT topics for a decoupled, event-driven workflow that provides real-time notifications, enhancing user experience and system maintainability.

This repository contains the JavaScript codebase for the client/server aspects of the system. The front end is built using React, creating a dynamic and user-friendly interface for patients, while the back end utilizes Express.js to efficiently handle user data through a RESTful API. By segregating the client/server side from the Java-based services, the project achieves a clear separation of concerns. This approach not only streamlines development but also significantly simplifies the Continuous Integration and Continuous Delivery (CI/CD) processes, ensuring smoother deployments and easier maintenance of the system.
## Table of contents
1. [System Overview](#system-overview)
2. [Technologies and Tools Used](#technologies-and-tools-used-in-this-repository)
3. [Visuals](#visuals)
4. [Installation guide](#installation-guide)
5. [Authors and Acknowledgments](#authors-and-acknowledgments)
6. [License](#license)

## System overview
The repository in focus here encapsulates the client/server side of the system, as depicted on the left side of the development view diagram below. The client side, developed using JavaScript and the React framework, provides an interactive and responsive Patient Interface. This front-end setup is dedicated to offering an intuitive user experience for scheduling and managing appointments. The server side runs on Express.js and handles the Patient API, processing HTTP/REST requests to perform user operations and retrieve clinic and appointment data securely.

Additionally, the server employs MQTT and Server-Sent Events (SSE) to update the web client in real-time, ensuring immediate synchronization of appointment data and notifications for an enhanced user experience.
### Development view
<img src="https://i.imgur.com/RaZndv5.png" />

## Technologies and Tools used in this repository

## Visuals

## Installation guide

## Authors and Acknowledgments
- Isaac Lindegren Ternbom  
- Joel Celén  
- Karl Eriksson  
- Ahmand Haj Ahmad  
- Malte Bengtsson  
- Rizwan Rafiq


## License
The FlossBoss project is licensed under [MIT](https://git.chalmers.se/courses/dit355/2023/student-teams/dit356-2023-16/flossboss-java-repo/-/blob/main/LICENSE)

