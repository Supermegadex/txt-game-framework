const Verb = require('./Verb');

const verbs = {
  "go": new Verb("go", "go"),
  "move": new Verb("move", "go"),

}

const modifiersVerbs = {
  "go": [
    "north",
    "south",
    "east",
    "west",
    "left",
    "right"
  ]
}

function process(text, game) {
  const words = text.split(" ");
  const keyWords = {
    verbs: [],
    other: []
  };
  for (let word of words) {
    if (verbs[word]) {
      keyWords.verbs.push(word);
    }
  }
  for (let word of words) {
    for (let verb of keyWords.verbs) {
      if (modifiersVerbs[verb].indexOf(word) !== -1) {
        keyWords.other.push(word);
      }
    }
  }
  verbs[keyWords.verbs[0]].runAction(keyWords, game);
  // let scene = game.getSceneByCoords(game.state.location);
  // game.prompt(scene.text, scene);
}

module.exports = process;
