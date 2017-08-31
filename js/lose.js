export default (game, Phaser) => ({
  create: function () {

  this.game.loseBorder = game.add.sprite(75, 600, 'border')
  this.game.loseBorder.width = 460
  this.game.loseBorder.height = 35
  this.game.loseBorder.inputEnabled = true;
  this.game.loseBorder.alpha = 1

    var nameLabel = game.add.text(80, 80, 'GAME OVER', {font: '50px Arial', fill: '#ffffff'});

    var startLabel = game.add.text(80, game.world.height - 80, 'Click here to go back to the home screen',
    {font: '25px Arial', fill: '#ffffff'})

    game.input.onDown.add(function() {

      if(game.input.mousePointer.x >= 80 && game.input.mousePointer.x < 535 && game.input.mousePointer.y >= 605 && game.input.mousePointer.y < 625){
        game.state.start('menu')
        location.reload()
      }
    })
  },
  update: function(){
    if(this.game.loseBorder.input.pointerOver()){
      this.game.loseBorder.alpha = 2.5
    }

    if(!(this.game.loseBorder.input.pointerOver())){
      this.game.loseBorder.alpha = 1
    }
  }
});
