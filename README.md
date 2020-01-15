# Simple realtime platform game build with Phaser.io
**Simple realtime Pokemon game build with Phaser 3, Colyseus.io & Webpack 4.**

![PokeMMO](https://github.com/aaron5670/PokeMMO-Online-Realtime-Multiplayer-Game/blob/master/docs/images/PokeMMO.gif?raw=true)

### Features & ToDo
- [x] Multiple players can join the game
- [x] Maps are can be created/edited with [Tiled Map Editor](https://www.mapeditor.org/)
- [x] Multiple levels/maps
- [] Pokémons added
- [] Can going inside building (In progress)

### How to install
```
// Clone this repository
$ git clone https://github.com/aaron5670/PokeMMO-Online-Realtime-Multiplayer-Game.git

// Go to the client folder and install all modules
$ cd client && npm install

// Go to the server folder and install all modules
$ cd ../server && npm install

// Start the server
$ node server.js

// Open a new terminal and navigate to the client folder and start the webpack server
$ cd client && npm start
```
After successfully install go to [http://localhost:8080](http://localhost:8080/)

### Known bugs
**Online players won't load in new level (Needs help with this bug..)**\
When a player enters a new level/map the [Phaser Scene](https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html) reloads and a new tilemap will be loaded.
But the current players in that map will not be loaded in that level.

*See GIF example below*
![Know bug example](https://github.com/aaron5670/PokeMMO-Online-Realtime-Multiplayer-Game/blob/master/docs/images/PokeMMO-know-bug.gif?raw=true)
