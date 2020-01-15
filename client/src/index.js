import Phaser from "phaser";
import {Scene1} from "./Scene1";
import {Scene2} from "./Scene2";

const Config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    parent: "game-container",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0}
        }
    },
    scene: [Scene1, Scene2],
};

export default new Phaser.Game(Config);
