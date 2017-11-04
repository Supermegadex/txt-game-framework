const Game = require("./index");

let game = new Game(
    require("./test/maps"),
    require("./test/scenes"),
    require("./test/strings"),
    require("./test/items"),
    {}
);

game.start();
