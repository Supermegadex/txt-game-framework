class Game {

  constructor(maps, scenes, strings, items, state) {
    let readline = require('readline');
    this.chalk = require("chalk");
    this.storage = require('node-persist');
    this.process = require('./lib/process');
    this.player = {
      gender: "m",
      name: "Daniel",
      race: "Orc"
    };
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.tools = {
      objPronoun (player, state) {
        switch (player.gender) {
          case "m":
            return "him";
          case "f":
            return "her";
          default:
            return "them";  
        }
      },
      sumArrayElements(){
        var arrays = arguments, results = [],
          count = arrays[0].length, L = arrays.length,
          sum, next = 0, i;
        while (next < count) {
          sum = 0, i = 0;
          while (i < L) {
            sum += Number(arrays[i++][next]);
          }
          results[next++] = sum;
        }
        return results;
      }
    };
    this.maps = maps;
    this.scenes = scenes;
    this.strings = strings;
    this.items = items;
    this.state = Object.assign({location: [0, 0], move: true, map: "default"}, state);
  }

  interpolate(str) {
    return (o, game) => {
      return str.replace(/{{([^{}]*)}}/g, (a, b) => {
        let r = o[b];
        let c;
        if (typeof r == 'function') r = r(game.player, game.state);
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

  callWithData(func) {
    let text = func(this.player, this.state, this.tools, this.interpolate);
    return (typeof text === "function" ? text(Object.assign(this.player, this.tools), this) : text);
  }

  makePrompt(text) {
    return "\n" + (typeof text === "function" ? this.callWithData(text) : text) + "\n> ";
  }

  prompt(text) {
    this.rl.question(this.makePrompt(text), answer => {
      this.process(answer, this);
    });
  }

  getSceneByCoords(coords) {
    return this.scenes[this.maps[this.state.map][coords[0]][coords[1]]] || "Uh, oh! A bug!";
  }

  completeAction() {
    let scene = this.getSceneByCoords(this.state.location);
    this.prompt(scene.text, scene);
  }

  movePlayer(to) {
    let location = this.maps[this.state.map][to[0]][to[1]];
    if (location) {
      if (location.requires) {
        return location.requires(this.player, this.state);
      }
      else {
        return true;
      }
    }
    else {
      return false;
    }
  }

  start(start) {
    if (start) {

    }
    else {
      let scene = this.getSceneByCoords(this.state.location);
      this.prompt(scene.text, scene);
    }
    return "started";
  }
};

if (module) {
  module.exports = Game;
}