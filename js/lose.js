export default (game, Phaser) => ({
  create: function () {
    var nameLabel = game.add.text(80, 80, 'YOU LOSE',
  {font: '50px Arial', fill: '#ffffff'});

    var startLabel = game.add.text(80, game.world.height - 80, 'press the "W" key to restart',
  {font: '25px Arial', fill: '#ffffff'})
  var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

  wkey.onDown.addOnce(this.restart, this);
},
restart: function() {
  game.state.start('menu');
},
});
