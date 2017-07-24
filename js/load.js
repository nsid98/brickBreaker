export default (game) => ({
  preload: function() {
    var loadingLabel = game.add.text(80, 150, 'loading...',
    {font: '30px Courier', fill: '#ffffff'})
    game.load.image('player', './images/65938.png');
    game.load.image('ball', './images/aqua-ball.png');
    game.load.image('brick', './images/2.png')
    game.load.image('powerup', './images/powerup.png')
},
  create: function() {
    game.state.start('menu');
  }
})
