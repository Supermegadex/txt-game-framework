module.exports = {
  "go": function (words, game) {
    let direction = [0, 0];
    switch (words.other[0]) {
      case 'east':
        direction = [0, 1];
        break;
      case 'west':
        direction = [0, -1];
        break;
      case 'north':
        direction = [-1, 0];
        break;
      case 'south':
        direction = [1, 0];
        break;
      default:
        break;
    }
    let newLocation = game.tools.sumArrayElements(game.state.location, direction);
    let canMovePlayer = game.movePlayer(newLocation);
    if (canMovePlayer) {
      game.state.location = newLocation;
      game.completeAction();
    }
    else {
      game.prompt("You can't move that direction!")
    }
  }
}