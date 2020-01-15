# Simple realtime platform game build with Phaser.io
Simple realtime platformer build with Phaser 3, Socket.io, ExpressJS & Webpack 4.

### How to install

1. Git clone this repository
2. Create in the server folder a file called config.js
3. Add the following code to the config.js file:
    ```javascript
    //CLOUD.MONGODB.COM DEVELOPMENT SETTINGS
    // TIP: Create free online MongoDB Cluster at: https://cloud.mongodb.com/
    const USERNAME = "YOUR_MONGODB_USERNAME";
    const PASSWORD = "YOUR_MONGODB_PASSWORD";
    const HOST = "your-host-url.mongodb.net";
    const PORT = "27017";
    const DB = "realtime-pusher-game";
    
    module.exports = {USERNAME, PASSWORD, HOST, PORT, DB};
    ```
4. Run the command ``npm install`` in the client folder.
5. Run the command ``npm install`` in the server folder.
6. Run server.js with ``node server.js`` in the server folder.
7. Run the Webpack server in client folder with the command: ``npm start``.
8. Go to http://localhost:8080/
