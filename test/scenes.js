module.exports = {
  "intro": {
    move: true,
    requires: null,
    text: "this is this intro room"
  },
  "room2": {
    text(player, state, tools, interpolate) {
      return interpolate("Hello, {{name}}. {{objPronoun}}.");
    }
  }
};