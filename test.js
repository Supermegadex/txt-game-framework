const game = require("./index");

game.init(
    require("./test/maps"),
    require("./test/scenes"),
    require("./test/strings"),
    require("./test/items"),
    {}
);

game.start();
