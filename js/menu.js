window.socket = io()
export default (game, Phaser) => ({
  create: function () {
    let homeScreen = game.add.sprite(-50, 100, 'homeScreen');

    this.game.singlePlayerBorder = game.add.sprite(335, 495, 'border')
    this.game.singlePlayerBorder.width = 240
    this.game.singlePlayerBorder.height = 35
    this.game.singlePlayerBorder.inputEnabled = true;
    this.game.singlePlayerBorder.alpha = 1


    this.game.multiplayerBorder = game.add.sprite(295, 545, 'border')
    this.game.multiplayerBorder.width = 335
    this.game.multiplayerBorder.height = 35
    this.game.multiplayerBorder.inputEnabled = true;
    this.game.multiplayerBorder.alpha = 1


    this.game.instructionsBorder = game.add.sprite(265, 595, 'border')
    this.game.instructionsBorder.width = 410
    this.game.instructionsBorder.height = 35
    this.game.instructionsBorder.inputEnabled = true;
    this.game.instructionsBorder.alpha = 1

    var startLabel = game.add.text(340, 500, 'Click here to go solo',
    {font: '25px Arial', fill: '#ffffff'})

    var startLabel = game.add.text(300, 550, 'Click here to play Multiplayer',
    {font: '25px Arial', fill: '#ffffff'})

    var instructionLabel = game.add.text(270, game.world.height - 80, 'Click here to go to instruction screen',
    {font: '25px Arial', fill: '#ffffff'})

    game.input.onDown.add(function() {

      if(game.input.mousePointer.x >= 335 && game.input.mousePointer.x < 575 && game.input.mousePointer.y >= 495 && game.input.mousePointer.y < 520){
      game.state.start('play')
      }
      else if(game.input.mousePointer.x >= 295 && game.input.mousePointer.x < 630 && game.input.mousePointer.y >= 545 && game.input.mousePointer.y < 580){
      socket.emit('MultiplayerStart')
      }
      else if(game.input.mousePointer.x >= 270 && game.input.mousePointer.x < 675 && game.input.mousePointer.y >= 600 && game.input.mousePointer.y < 625){
      game.state.start('instruction')
      }
    })
  },
  update: function(){
    if(this.game.singlePlayerBorder.input.pointerOver()){
      this.game.singlePlayerBorder.alpha = 2.5
    }
    if(!(this.game.singlePlayerBorder.input.pointerOver())){
      this.game.singlePlayerBorder.alpha = 1
    }

    if(this.game.multiplayerBorder.input.pointerOver()){
      this.game.multiplayerBorder.alpha = 2.5
    }
    if(!(this.game.multiplayerBorder.input.pointerOver())){
      this.game.multiplayerBorder.alpha = 1
    }

    if(this.game.instructionsBorder.input.pointerOver()){
      this.game.instructionsBorder.alpha = 2.5
    }
    if(!(this.game.instructionsBorder.input.pointerOver())){
      this.game.instructionsBorder.alpha = 1
    }
  }
});
