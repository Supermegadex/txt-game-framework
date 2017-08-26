const chalk = require("chalk");
const storage = require('node-persist');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let game = {
  player: {
    gender: 1,
    name: "Daniel",
    race: "Orc"
  },
  init(maps, scenes, strings, items, state) {
    this.maps = maps;
    this.scenes = scenes;
    this.strings = strings;
    this.items = items;
    this.state = Object.assign({location: [0, 0], move: true, map: "default"}, state);
    return "success";
  },
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
  },
  makePrompt(text) {
    return "\n" + (typeof text === "function" ? text() : text) + "\n> ";
  },
  tools: {
    getObjectPronoun() {

    }
  },
  prompt(text) {
    rl.question(this.makePrompt(text), answer => {

    });
  },
  getSceneByCoords(coords) {
    return this.scenes[this.maps[this.state.map][coords[0]][coords[1]]] || "Uh, oh! A bug!";
  },
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
  module.exports = game;
}