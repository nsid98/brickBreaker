window.socket = io()
export default (game, Phaser) => ({
  create: function () {
    const homeScreen = game.add.sprite(0, 0, 'homeScreen');
    homeScreen.width = game.width
    homeScreen.height = game.height

    var nameLabel = game.add.text(game.world.width / 2 -130, 20, 'Brick Breaker',
  {font: '50px Arial', fill: '#ffffff'});

    var startLabel = game.add.text(80, 80, 'press the "S" key to go solo',
  {font: '25px Arial', fill: '#ffffff'})

  var startLabel = game.add.text(480, 80, 'press the "M" key to play Multiplayer',
  {font: '25px Arial', fill: '#ffffff'})

  var startLabel = game.add.text(230, game.world.height - 80, 'press the "I" key to go to instruction screen',
  {font: '25px Arial', fill: '#ffffff'})



  var skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
  skey.onDown.addOnce(this.singlePlayer, this);


  var mkey = game.input.keyboard.addKey(Phaser.Keyboard.M);
  mkey.onDown.addOnce(this.multiPlayer, this);

  var ikey = game.input.keyboard.addKey(Phaser.Keyboard.I);
  ikey.onDown.addOnce(this.instruction, this);

},
singlePlayer: function() {
  game.state.start('play');
},

multiPlayer: function(){
  socket.emit('MultiplayerStart')
},

instruction: function(){
  game.state.start('instruction')
}

});
