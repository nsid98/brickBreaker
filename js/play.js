export default (game, Phaser) => ({
create: function() {
  this.keyboard = game.input.keyboard;
  this.bricks = game.add.group()
  for (let i = 0; i <= (28*8); i++){
    if (i < 28){
      if (!(i > 24)){
        this.bricks.create(i * 33 + 40, 40, 'brick')
        this.bricks.children[this.bricks.children.length - 1].scale.setTo(0.04, 0.025)
      }
    }
    else if(i < (28*2)) {
      if(!(i > (28*2 - 3))){
      this.bricks.create(i * 33 + 30 - ((28*1)*33), 40 + (15*1), 'brick')
      this.bricks.children[this.bricks.children.length - 1].scale.setTo(0.04, 0.025)
    }}
    else if(i < (28*3)) {
      this.bricks.create(i * 33 + 2 - ((28*2)*33), 40 + (15*2), 'brick')
      this.bricks.children[this.bricks.children.length - 1].scale.setTo(0.04, 0.025)
    }
    else if(i < (28*4)) {
      this.bricks.create(i * 33 + 2 - ((28*3)*33), 40 + (15*3), 'brick')
      this.bricks.children[this.bricks.children.length - 1].scale.setTo(0.04, 0.025)
    }
    else if(i < (28*5)) {
      this.bricks.create(i * 33 + 2 - ((28*4)*33), 40 + (15*4), 'brick')
      this.bricks.children[this.bricks.children.length - 1].scale.setTo(0.04, 0.025)
    }
    else if(i < (28*6)) {
      this.bricks.create(i * 33 + 2 - ((28*5)*33), 40 + (15*5), 'brick')
      this.bricks.children[this.bricks.children.length - 1].scale.setTo(0.04, 0.025)
    }
    else if(i < (28*7)) {
      if(!(i > (28*7 - 3))){
      this.bricks.create(i * 33 + 30 - ((28*6)*33), 40 + (15*6), 'brick')
      this.bricks.children[this.bricks.children.length - 1].scale.setTo(0.04, 0.025)
    }}
    else if(i < (28*8)) {
      if(!(i > (28*8 - 4))){
      this.bricks.create(i * 33 + 40 - ((28*7)*33), 40 + (15*7), 'brick')
      this.bricks.children[this.bricks.children.length - 1].scale.setTo(0.04, 0.025)
    }}

  }
  this.player = game.add.sprite(470, 590, 'player');
  this.ball = game.add.sprite(470, 400, 'ball');
  this.ball.scale.setTo(0.07, 0.07);
  game.physics.enable(this.ball, Phaser.Physics.ARCADE);
  game.physics.enable(this.bricks, Phaser.Physics.ARCADE);
  game.physics.enable(this.player, Phaser.Physics.ARCADE);
},

update: function() {
  this.ball.body.velocity.x = this.ball.body.velocity.x || 0
  this.ball.body.velocity.y = this.ball.body.velocity.y || 0

  if(this.ball.body.velocity.x == 0 || this.ball.body.velocity.y == 0){
    this.ball.body.velocity.x = 100 + (Math.random() * 100);
    this.ball.body.velocity.y = 270;
  }

  for(let i = 0; i < this.bricks.children.length; i++){
    if ((this.ball.position.x + 5 > (this.bricks.children[i].position.x -13)) && (this.ball.position.x-5 < (this.bricks.children[i].position.x + 15)) &&
      (this.ball.position.y + 5 > (this.bricks.children[i].position.y - 3)) && (this.ball.position.y-5 < (this.bricks.children[i].position.y + 3))) {
        this.bricks.children.splice(i, 1)
        this.ball.body.velocity.y = this.ball.body.velocity.y * -1
      }
  }
  if(this.ball.position.y > 670){
    game.state.start('lose')
  }

  if (this.ball.position.x < -5){
    this.ball.body.velocity.x = -1 * this.ball.body.velocity.x;
    this.ball.position.x += 5
  }
  if(this.ball.position.x > 920){
    this.ball.body.velocity.x = -1 * this.ball.body.velocity.x;
    this.ball.position.x -= 5
  }
  if(this.ball.position.y >= 630 && this.ball.position.y < 635 &&
    ((this.player.position.x + 15) < this.ball.position.x) &&
    ((this.player.position.x + 155) > this.ball.position.x)){
    this.ball.body.velocity.y = -1 * this.ball.body.velocity.y;
    this.ball.body.velocity.x = ((this.ball.position.x - (this.player.position.x + 70)) * 3)
    this.ball.position.y -= 10;
  }
  if (this.ball.position.y < 0){
    this.ball.body.velocity.y = -1 * this.ball.body.velocity.y;
    this.ball.position.y += 10;
  }
  if (this.keyboard.isDown(Phaser.Keyboard.A) && this.player.position.x > -25){
    this.player.body.velocity.x = -255;
  }
  else if (this.keyboard.isDown(Phaser.Keyboard.D) && this.player.position.x < 815) {
    this.player.body.velocity.x = 255
  }
  else{
    this.player.body.velocity.x = 0;
  }
},

Win: function() {
  game.state.start('win');
}
})
