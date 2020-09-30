import TilesTown from "./assets/tilesets/tuxmon-sample-32px-extruded.png";
import TownJSON from "./assets/tilemaps/town.json";
import Player from "./Player";
import AtlasPNG from "./assets/atlas/atlas.png";
import AtlasJSON from "./assets/atlas/atlas.json";
import PlayersAtlasPNG from "./assets/images/players/players.png";
import PlayersAtlasJSON from "./assets/atlas/players.json";
import {room} from "./SocketServer";
import Phaser from "phaser";
import {playerAnims} from "./components/playerAnimations";
import Route1JSON from "./assets/tilemaps/route1.json";

let cursors, switchScene, tileset, belowLayer, worldLayer, grassLayer, aboveLayer, spawnPoint, camera, player, socketKey;


export var TownScene = {
    key: "town",

    preload: function(){
        console.log("town preload");
        this.load.image("button", "assets/button.png");
        this.load.image("TilesTown", TilesTown);
        this.load.tilemapTiledJSON("town", TownJSON);

        // Load atlas
        this.load.atlas("currentPlayer", AtlasPNG, AtlasJSON);
        this.load.atlas("players", PlayersAtlasPNG, PlayersAtlasJSON);
        switchScene = false;
    },

    create: function(){
        console.log("town create");

        this.map = this.make.tilemap({key: "town"});
        this.scene.scene.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        tileset = this.map.addTilesetImage("tuxmon-sample-32px-extruded", "TilesTown");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        belowLayer = this.map.createStaticLayer("Below Player", tileset, 0, 0);
        worldLayer = this.map.createStaticLayer("World", tileset, 0, 0);
        grassLayer = this.map.createStaticLayer("Grass", tileset, 0, 0);
        aboveLayer = this.map.createStaticLayer("Above Player", tileset, 0, 0);

        worldLayer.setCollisionByProperty({collides: true});

        // By default, everything gets depth sorted on the screen in the order we created things. Here, we
        // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
        // Higher depths will sit on top of lower depth objects.
        aboveLayer.setDepth(10);

        // Get spawn point from tiled map
        spawnPoint = this.map.findObject("SpawnPoints", obj => obj.name === "Spawn Point");


        console.log(spawnPoint)

        // Set player
        player = new Player({
            scene: this,
            worldLayer: worldLayer,
            key: 'player',
            x: spawnPoint.x,
            y: spawnPoint.y
        });

        camera = this.cameras.main;
        camera.startFollow(player);
        camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        cursors = this.input.keyboard.createCursorKeys();

        // Help text that has a "fixed" position on the screen
        this.add
            .text(16, 16, "Arrow keys to move\nPress \"D\" to show hitboxes", {
                font: "18px monospace",
                fill: "#000000",
                padding: {x: 20, y: 10},
                backgroundColor: "#ffffff"
            })
            .setScrollFactor(0)
            .setDepth(30);

        this.movementTimer;

        playerAnims(this);
    },

    update: function(time, delta){
        // Loop the player update method
        player.update(time, delta);

        if (player.houseInteraction.house) {
            console.log(player.houseInteraction)
        }

        if (player.worldSceneInteraction.endpointScene) {
            console.log(player.worldSceneInteraction)
            player.setY(1216)
            this.scene.switch(player.worldSceneInteraction.scene);
        }

        // Horizontal movement
        if (cursors.left.isDown) {
            if (socketKey) {
                if (this.player.isMoved()) {
                    room.then((room) => room.send({
                        event: "PLAYER_MOVED",
                        position: 'left',
                        x: this.player.x,
                        y: this.player.y
                    }));
                }
                socketKey = false;
            }
        } else if (cursors.right.isDown) {
            if (socketKey) {
                if (this.player.isMoved()) {
                    room.then((room) => room.send({
                        event: "PLAYER_MOVED",
                        position: 'right',
                        x: this.player.x,
                        y: this.player.y
                    }))
                }
                socketKey = false;
            }
        }

        // Vertical movement
        if (cursors.up.isDown) {
            if (socketKey) {
                if (this.player.isMoved()) {
                    room.then((room) => room.send({
                        event: "PLAYER_MOVED",
                        position: 'back',
                        x: this.player.x,
                        y: this.player.y
                    }))
                }
                socketKey = false;
            }
        } else if (cursors.down.isDown) {
            if (socketKey) {
                if (this.player.isMoved()) {
                    room.then((room) => room.send({
                        event: "PLAYER_MOVED",
                        position: 'front',
                        x: this.player.x,
                        y: this.player.y
                    }))
                }
                socketKey = false;
            }
        }

        // Horizontal movement ended
        if (Phaser.Input.Keyboard.JustUp(cursors.left) === true) {
            room.then((room) => room.send({event: "PLAYER_MOVEMENT_ENDED", position: 'left'}))
        } else if (Phaser.Input.Keyboard.JustUp(cursors.right) === true) {
            room.then((room) => room.send({event: "PLAYER_MOVEMENT_ENDED", position: 'right'}))
        }

        // Vertical movement ended
        if (Phaser.Input.Keyboard.JustUp(cursors.up) === true) {
            room.then((room) => room.send({event: "PLAYER_MOVEMENT_ENDED", position: 'back'}))
        } else if (Phaser.Input.Keyboard.JustUp(cursors.down) === true) {
            room.then((room) => room.send({event: "PLAYER_MOVEMENT_ENDED", position: 'front'}))
        }
    },

    movementTimer: () => {
        setInterval(() => {
            socketKey = true;
        }, 50)
    }
};
