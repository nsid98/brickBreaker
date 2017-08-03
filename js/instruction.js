export default (game, Phaser) => ({
  create: function () {
    // const instructions = game.add.sprite(0, game.world.height - 400, 'instructions');
    // instructions.width = game.width  / 2
    // instructions.height = game.height / 2
    var nameLabel = game.add.text(game.world.width / 2 -130, 20, 'Instructions',
  {font: '50px Arial', fill: '#ffffff'});

  var startLabel = game.add.text(100, 80, 'Use the A and D or left and right arrow keys to move around',
{font: '25px Arial', fill: '#ffffff'})

var startLabel = game.add.text(100, 120, 'Use spacebar to drop a sticky ball ',
{font: '25px Arial', fill: '#ffffff'})

  var startLabel = game.add.text(280, game.world.height - 100, 'To go back to Home Screen, hit H',
{font: '25px Arial', fill: '#ffffff'})



  var hkey = game.input.keyboard.addKey(Phaser.Keyboard.H);
  hkey.onDown.addOnce(this.homeScreen, this);

},

homeScreen: function(){
  game.state.start('menu')
}

});
