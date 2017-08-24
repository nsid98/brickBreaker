export default (game, Phaser) => ({
  create: function () {
    this.game.homeBorder = game.add.sprite(275, 575, 'border')
    this.game.homeBorder.width = 440
    this.game.homeBorder.height = 35
    this.game.homeBorder.inputEnabled = true;
    this.game.homeBorder.alpha = 1

    var nameLabel = game.add.text(game.world.width / 2 -130, 20, 'Instructions',
    {font: '50px Arial', fill: '#ffffff'});

    var startLabel = game.add.text(100, 80, 'Use the A and D or left and right arrow keys to move around',
    {font: '25px Arial', fill: '#ffffff'})

    var startLabel = game.add.text(100, 120, 'Use spacebar to release a sticky ball ',
    {font: '25px Arial', fill: '#ffffff'})

    var startLabel = game.add.text(100, 160, 'Hit P to pause, and R to resume ',
    {font: '25px Arial', fill: '#ffffff'})

    var startLabel = game.add.text(280, game.world.height - 100, 'To go back to Home Screen, click here',
    {font: '25px Arial', fill: '#ffffff'})

    game.input.onDown.add(function() {
      if(game.input.mousePointer.x >= 280 && game.input.mousePointer.x < 710 && game.input.mousePointer.y >= 580 && game.input.mousePointer.y < 603){
        game.state.start('menu')
      }
    })
  },
  update: function(){
    if(this.game.homeBorder.input.pointerOver()){
      this.game.homeBorder.alpha = 2.5

    }
    if(!(this.game.homeBorder.input.pointerOver())){
      this.game.homeBorder.alpha = 1
    }
  }
});
