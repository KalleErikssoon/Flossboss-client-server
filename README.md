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
**Front-end Development:** JavaScript, React

**Back-end Development:** Node.js, Express, npm, JWT

**Databases:** MongoDB Cloud

**Containerization:** Docker

**Messaging Protocols:** MQTT (HiveMQ Cloud)

**API Development and Testing:** Postman

## Visuals
<img src="https://i.imgur.com/QDTTqkq.png"/>
<img src="https://i.imgur.com/FbzKfM2.png"/>
<img src="https://i.imgur.com/7MHlwDg.png"/>
<img src="https://i.imgur.com/5VaYObZ.png"/>
<img src="https://i.imgur.com/T042Eqq.png"/>
<img src="https://i.imgur.com/y1HmZ0e.png"/>

## Installation guide
### Prerequisites
* Node Package manager [Link to download](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* MongoDB Cloud database [Link to download](https://account.mongodb.com/account/login?signedOut=true)
* HiveMQ Cloud MQTT Broker [Link to download](https://auth.hivemq.cloud/login?state=hKFo2SByblBzUXBWYVZhdkNSYlhPQ3NHUi1BMFNHcFRpVnFZRqFupWxvZ2luo3RpZNkgd0U1VUNSTlZFM1ZFNHZ0SW9jWWhqS2lodHJNSmYta0qjY2lk2SBJYWpvNGUzMmp4d1VzOEFkRnhneFFuMlZQM1l3SVpUSw&client=Iajo4e32jxwUs8AdFxgxQn2VP3YwIZTK&protocol=oauth2&audience=hivemq-cloud-api&redirect_uri=https%3A%2F%2Fconsole.hivemq.cloud&scope=openid%20profile%20email&response_type=code&response_mode=query&nonce=UjJhUnZOUlJnd3RmbjZmNFBGWX5uc2w3bHZERW5tRmVHMHl6MDFjXzVMbQ%3D%3D&code_challenge=cOpID4Iew7D-HcwtkQjs-7GYcfrwzD7JV9QTPQNOJgU&code_challenge_method=S256&auth0Client=eyJuYW1lIjoiYXV0aDAtc3BhLWpzIiwidmVyc2lvbiI6IjEuMjIuNiJ9)
* Docker Desktop [Link to download](https://www.docker.com/products/docker-desktop/)
* Postman [Link to download](https://www.postman.com/downloads/)

#### Step 1: Edit configuration files
> * Open the server folder (we recommend using visual studio code)
> * Add a text file named **".env"**. Add the MONGODB_URI, MQTT URL, MQTT_USER, MQTT_PASSWORD, and SECRET_KEY.
> * Open the client folder (we recommend using visual studio code)
> * Add a text file named **".env"**. Add the REACT_APP_GOOGLE_MAPS_KEY.

#### Step 2:  Run the Services through Docker Desktop




## Authors and Acknowledgments
- Isaac Lindegren Ternbom  
- Joel Celén  
- Karl Eriksson  
- Ahmand Haj Ahmad  
- Malte Bengtsson  
- Rizwan Rafiq

## License
The FlossBoss project is licensed under [MIT](https://git.chalmers.se/courses/dit355/2023/student-teams/dit356-2023-16/flossboss-java-repo/-/blob/main/LICENSE)

