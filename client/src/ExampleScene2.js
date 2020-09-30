export var ExampleScene2 = {
    key: "exampleScene2",

    preload: function(){
        console.log("game preload");
    },

    create: function(){
        console.log("game create");
        this.add.text(10, 10, "What a triple-A game this is!");
    },

    update: function(){
        console.log("game update");
    }
};
