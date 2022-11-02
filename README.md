# Delivery Tracker
An application to track the status and routes of your delivery drivers.

## Description

### Web
Is used by the administrator of the application. They will be able to see the progress of each delivery driver with their route, and all of the undelivered locations.

### Server
Is used as an interface to interact with the Mongo database. Data will be updated in real time through the web/app through WebSockets.

### Mobile
Is used to send GPS data of delivery driver locations, show the driver the next location in their route, and the verification of deliveries by uploading a picture of the delivered contents.

## Progress
- [ ] Web
    - [x] Started the design
    - [x] Setup Google Maps API
    - [ ] Account System
        - [ ] User Authentication
- [ ] Server
    - [ ] Integrate MongoDB
    - [ ] Create an API for user authentication
    - [ ] Implement WebSockets in the server & web client
- [ ] App
    - [ ] Started UI Design
    - [ ] Implement WebSockets
    - [ ] Photo verification of deliveries
    - [ ] Directions integration