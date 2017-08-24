export default (game) => ({
  preload: function() {
    var loadingLabel = game.add.text(80, 150, 'loading...',
    {font: '30px Courier', fill: '#ffffff'})
    game.stage.disableVisibilityChange = true;
    game.load.image('homeScreen', './images/HomeScreen1.png')
    game.load.image('player', './images/65938.png');
    game.load.image('ball', './images/aqua-ball.png');
    game.load.image('brick', './images/2.png')
    game.load.image('powerup', './images/powerup.png')
    game.load.image('instructions', './images/instructions.png')
    game.load.image('border', './images/border1.jpg')
},
  create: function() {
    game.state.start('menu');
  }
})
