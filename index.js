class Game {

  constructor(maps, scenes, strings, items, state) {
    let readline = require('readline');
    this.chalk = require("chalk");
    this.storage = require('node-persist');
    this.player = {
      gender: 1,
      name: "Daniel",
      race: "Orc"
    };
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.tools = {
      getObjectPronoun() {

      }
    };
    this.maps = maps;
    this.scenes = scenes;
    this.strings = strings;
    this.items = items;
    this.state = Object.assign({location: [0, 0], move: true, map: "default"}, state);
  }

  interpolate(str) {
    return function interpolate(o) {
      return str.replace(/{{([^{}]*)}}/g, function (a, b) {
        let r = o[b];
        let c;
        if (b.match(/:/g)) {
          c = chalk[b.split(":")[0]](b.split(":")[1]);
        }
        else {
          c = typeof r === 'string' || typeof r === 'number' ? r : a
        }
        return c;
      });
    }
  }

  makePrompt(text) {
    return "\n" + (typeof text === "function" ? text() : text) + "\n> ";
  }

  prompt(text) {
    rl.question(this.makePrompt(text), answer => {

    });
  }

  getSceneByCoords(coords) {
    return this.scenes[this.maps[this.state.map][coords[0]][coords[1]]] || "Uh, oh! A bug!";
  }

  start(start) {
    if (start) {

    }
    else {
      let scene = this.getSceneByCoords(this.state.location);
      console.log(scene);
    }
    return "started";
  }
};

if (module) {
  module.exports = Game;
}