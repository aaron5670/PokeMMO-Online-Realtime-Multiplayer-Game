export const playerAnims = (scene) => {
    // Create the player's walking animations from the texture currentPlayer. These are stored in the global
    // animation manager so any sprite can access them.
    scene.anims.create({
        key: "misa-left-walk",
        frames: scene.anims.generateFrameNames("currentPlayer", {
            prefix: "misa-left-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: "misa-right-walk",
        frames: scene.anims.generateFrameNames("currentPlayer", {
            prefix: "misa-right-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: "misa-front-walk",
        frames: scene.anims.generateFrameNames("currentPlayer", {
            prefix: "misa-front-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
    });
    scene.anims.create({
        key: "misa-back-walk",
        frames: scene.anims.generateFrameNames("currentPlayer", {
            prefix: "misa-back-walk.",
            start: 0,
            end: 3,
            zeroPad: 3
        }),
        frameRate: 10,
        repeat: -1
    });
}
