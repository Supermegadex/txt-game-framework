module.exports = class Verb {
  constructor(word, action) {
    this.word = word;
    this.action = action;
    this.actions = require('./actions');
  }

  runAction(words, game) {
    this.actions[this.action](words, game);
  }
}