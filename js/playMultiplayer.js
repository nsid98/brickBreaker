// MainState.prototype = {
export default (game, Phaser) => ({
  create: function() {
    this.keyboard = game.input.keyboard;
    this.bricks = game.add.group()

    socket.on('updatePlayerToClient', ((data)=>{
      if(socket.id != data[0].id){
        let player = null;
        if(this.game.state.states['playMultiplayer']._side != "topSide"){
          player = this.otherPlayer
        }
        else{
          player = this.player
        }
        player.position.x = data[0].x;
        player.position.y = data[0].y;
        player.body.velocity.x = data[0].vx;
        player.body.velocity.y = data[0].vy;
      }
    }))

    socket.on('updateBall', ((data) =>{
      if(socket.id != data[0].id){
        let ball = null;
        if(this.game.state.states['playMultiplayer']._side != "topSide"){
          ball = this.otherBall
        }
        else{
          ball = this.ball
        }
        ball.position.x = data[0].x;
        ball.position.y = data[0].y;
        ball.body.velocity.x = data[0].vx;
        ball.body.velocity.y = data[0].vy;
    }}))

    socket.on('updateBricks', ((data) =>{
        this.bricks1.children[data[0].index].position.x = -40
        this.bricks2.children[data[0].index].position.x = -40

    }))
    this.createPlayers()
    this.createBricks()
  },

      createPlayers: function(){
        this.player = game.add.sprite(470, 590, 'player');
        this.player.invincible = false;
        this.ball = game.add.sprite(470, 400, 'ball');
        this.ball.scale.setTo(0.07, 0.07);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        game.physics.enable(this.ball, Phaser.Physics.ARCADE);
        this.otherPlayer = game.add.sprite(470, -50, 'player');
        this.otherPlayer.invincible = false;
        this.otherBall = game.add.sprite(470, 200, 'ball');
        this.otherBall.scale.setTo(0.07, 0.07);
        game.physics.enable(this.otherPlayer, Phaser.Physics.ARCADE);
        game.physics.enable(this.otherBall, Phaser.Physics.ARCADE);
      },

      createBricks: function(){
        this.bricks1 = game.add.group()
        for (let i = 0; i <= (28*8); i++){
          if (i < 28){
            if (!(i > 24)){
              let p = 0;
              if(!((Math.floor(Math.random() * 4)) === 1)){
                p = 0
              }
              else{
                p = 1 +(Math.floor(Math.random() * 4));
              }
              if (p === 0){
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if (p===1){
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"
              }
              else if (p===2){
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"
              }
              else if(p ===3){
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"
              }
              else{
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"
              }
            }
          }
          else if(i < (28*2)) {
            if(!(i > (28*2 - 3))){
              let p = 0;
              if(!((Math.floor(Math.random() * 4)) === 1)){
                p = 0
              }
              else{
                p = 1 +(Math.floor(Math.random() * 4));
              }
              if (p === 0){
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"
              }

              else if (p === 2){
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"
              }
              else if (p === 3){
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"
              }
              else {
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"
              }
            }}
            else if(i < (28*3)) {
              let p = 0;
              if(!((Math.floor(Math.random() * 4)) === 1)){
                p = 0
              }
              else{
                p = 1 +(Math.floor(Math.random() * 4));
              }
              if (p === 0){
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)

              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"
              }

              else if (p===2){
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"
              }
              else if (p === 3){
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"
              }
              else{
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"
              }
            }
            else if(i < (28*4)) {
              let p = 0;
              if(!((Math.floor(Math.random() * 4)) === 1)){
                p = 0
              }
              else{
                p = 1 +(Math.floor(Math.random() * 4));
              }
              if (p === 0){
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"
              }

              else if (p === 2){
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"
              }
              else if (p === 3){
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"
              }
              else {
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"
              }

            }
            else if(i < (28*5)) {
              let p = 0;
              if(!((Math.floor(Math.random() * 4)) === 1)){
                p = 0
              }
              else{
                p = 1 +(Math.floor(Math.random()*4));
              }
              if (p === 0){
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"
              }

              else if(p===2){
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"
              }
              else if (p === 3){
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"
              }
              else{
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"
              }


            }
            else if(i < (28*6)) {
              let p = 0;
              if(!((Math.floor(Math.random() * 4)) === 1)){
                p = 0
              }
              else{
                p = 1 +(Math.floor(Math.random() * 4));
              }
              if (p === 0){
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"
              }

              else if(p === 2){
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"
              }
              else if(p === 3){
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"
              }
              else{
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"
              }

            }
            else if(i < (28*7)) {
              if(!(i > (28*7 - 3))){
                let p = 0;
                if(!((Math.floor(Math.random() * 4)) === 1)){
                  p = 0
                }
                else{
                  p = 1 +(Math.floor(Math.random() * 4));
                }
                if (p === 0){
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                }
                else if ( p===1 ){
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"
                }

                else if (p === 2){
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"
                }
                else if (p === 3){
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"
                }
                else{
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"
                }

              }}
              else if(i < (28*8)) {
                if(!(i > (28*8 - 4))){
                  let p = 0;
                  if(!((Math.floor(Math.random() * 4)) === 1)){
                    p = 0
                  }
                  else{
                    p = 1 +(Math.floor(Math.random()*4));
                  }
                  if (p === 0){
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                  }
                  else if ( p===1 ){
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"
                  }

                  else if (p === 2){
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"
                  }
                  else if (p ===3){
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"
                  }
                  else{
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"
                  }
                }
              }
            }
            game.physics.enable(this.bricks1, Phaser.Physics.ARCADE);
            for (let i = 0; i < this.bricks1.children.length; i ++){
              if (this.bricks1.children[i].powerup !== undefined){
                game.physics.enable(this.bricks1.children[i].powerup, Phaser.Physics.ARCADE);
              }
            }


            this.bricks2 = game.add.group()
            for (let i = 0; i <= (28*8); i++){
              if (i < 28){
                if (!(i > 24)){
                  let p = 0;
                  if(!((Math.floor(Math.random() * 4)) === 1)){
                    p = 0
                  }
                  else{
                    p = 1 +(Math.floor(Math.random() * 4));
                  }
                  if (p === 0){
                    this.bricks2.create(i * 33 + 40, 250, 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                  }
                  else if (p===1){
                    this.bricks2.create(i * 33 + 40, 250, 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                  }
                  else if (p===2){
                    this.bricks2.create(i * 33 + 40, 250, 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                  }
                  else if(p ===3){
                    this.bricks2.create(i * 33 + 40, 250, 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                  }
                  else{
                    this.bricks2.create(i * 33 + 40, 250, 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "smallPaddle"
                  }
                }
              }
              else if(i < (28*2)) {
                if(!(i > (28*2 - 3))){
                  let p = 0;
                  if(!((Math.floor(Math.random() * 4)) === 1)){
                    p = 0
                  }
                  else{
                    p = 1 +(Math.floor(Math.random() * 4));
                  }
                  if (p === 0){
                    this.bricks2.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                  }
                  else if ( p===1 ){
                    this.bricks2.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                  }

                  else if (p === 2){
                    this.bricks2.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                  }
                  else if (p === 3){
                    this.bricks2.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                  }
                  else {
                    this.bricks2.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "smallPaddle"
                  }
                }}
                else if(i < (28*3)) {
                  let p = 0;
                  if(!((Math.floor(Math.random() * 4)) === 1)){
                    p = 0
                  }
                  else{
                    p = 1 +(Math.floor(Math.random() * 4));
                  }
                  if (p === 0){
                    this.bricks2.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)

                  }
                  else if ( p===1 ){
                    this.bricks2.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                  }

                  else if (p===2){
                    this.bricks2.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                  }
                  else if (p === 3){
                    this.bricks2.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                  }
                  else{
                    this.bricks2.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "smallPaddle"
                  }
                }
                else if(i < (28*4)) {
                  let p = 0;
                  if(!((Math.floor(Math.random() * 4)) === 1)){
                    p = 0
                  }
                  else{
                    p = 1 +(Math.floor(Math.random() * 4));
                  }
                  if (p === 0){
                    this.bricks2.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                  }
                  else if ( p===1 ){
                    this.bricks2.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                  }

                  else if (p === 2){
                    this.bricks2.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                  }
                  else if (p === 3){
                    this.bricks2.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                  }
                  else {
                    this.bricks2.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "smallPaddle"
                  }

                }
                else if(i < (28*5)) {
                  let p = 0;
                  if(!((Math.floor(Math.random() * 4)) === 1)){
                    p = 0
                  }
                  else{
                    p = 1 +(Math.floor(Math.random()*4));
                  }
                  if (p === 0){
                    this.bricks2.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                  }
                  else if ( p===1 ){
                    this.bricks2.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                  }

                  else if(p===2){
                    this.bricks2.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                  }
                  else if (p === 3){
                    this.bricks2.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                  }
                  else{
                    this.bricks2.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "smallPaddle"
                  }


                }
                else if(i < (28*6)) {
                  let p = 0;
                  if(!((Math.floor(Math.random() * 4)) === 1)){
                    p = 0
                  }
                  else{
                    p = 1 +(Math.floor(Math.random() * 4));
                  }
                  if (p === 0){
                    this.bricks2.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                  }
                  else if ( p===1 ){
                    this.bricks2.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                  }

                  else if(p === 2){
                    this.bricks2.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                  }
                  else if(p === 3){
                    this.bricks2.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                  }
                  else{
                    this.bricks2.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "smallPaddle"
                  }

                }
                else if(i < (28*7)) {
                  if(!(i > (28*7 - 3))){
                    let p = 0;
                    if(!((Math.floor(Math.random() * 4)) === 1)){
                      p = 0
                    }
                    else{
                      p = 1 +(Math.floor(Math.random() * 4));
                    }
                    if (p === 0){
                      this.bricks2.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                      this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    }
                    else if ( p===1 ){
                      this.bricks2.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                      this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                      this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                    }

                    else if (p === 2){
                      this.bricks2.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                      this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                      this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                    }
                    else if (p === 3){
                      this.bricks2.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                      this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                      this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                    }
                    else{
                      this.bricks2.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                      this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                      this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                      this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "smallPaddle"
                    }

                  }}
                  else if(i < (28*8)) {
                    if(!(i > (28*8 - 4))){
                      let p = 0;
                      if(!((Math.floor(Math.random() * 4)) === 1)){
                        p = 0
                      }
                      else{
                        p = 1 +(Math.floor(Math.random()*4));
                      }
                      if (p === 0){
                        this.bricks2.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                        this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                      }
                      else if ( p===1 ){
                        this.bricks2.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                        this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                        this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                      }

                      else if (p === 2){
                        this.bricks2.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                        this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                        this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                      }
                      else if (p ===3){
                        this.bricks2.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                        this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                        this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                      }
                      else{
                        this.bricks2.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                        this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                        this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                        this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "smallPaddle"
                      }
                    }
                  }
                }
                game.physics.enable(this.bricks2, Phaser.Physics.ARCADE);
                for (let i = 0; i < this.bricks2.children.length; i ++){
                  if (this.bricks2.children[i].powerup !== undefined){
                    game.physics.enable(this.bricks2.children[i].powerup, Phaser.Physics.ARCADE);
                  }
                }


      },

      update: function() {
        if(this.player != null && this.otherPlayer != null){
          if(this.game.state.states['playMultiplayer']._side == "topSide"){
            this.movePaddle(this.otherPlayer)
            this.updateBall(this.otherBall, this.otherPlayer, this.bricks2)
          }
          else{
            this.movePaddle(this.player)
            this.updateBall(this.ball, this.player, this.bricks1)
          }
        }
      },

      movePaddle: function(player){
        if(player.bigPaddle){
            if (this.keyboard.isDown(Phaser.Keyboard.A) && player.position.x > -35){
              player.body.velocity.x = -300;
            }
            else if (this.keyboard.isDown(Phaser.Keyboard.D) && player.position.x < 760) {
              player.body.velocity.x = 300
            }
            else{
              player.body.velocity.x = 0;
            }
          }

          if(player.smallPaddle){
            if (this.keyboard.isDown(Phaser.Keyboard.A) && player.position.x > -8){
              player.body.velocity.x = -300;
            }
            else if (this.keyboard.isDown(Phaser.Keyboard.D) && this.player.position.x < 870) {
              player.body.velocity.x = 300
            }
            else{
              player.body.velocity.x = 0;
            }
          }

        if((player.bigPaddle === false || player.bigPaddle === undefined) && (player.smallPaddle === false || player.smallPaddle === undefined)){
          if (this.keyboard.isDown(Phaser.Keyboard.A) && player.position.x > -25){
            player.body.velocity.x = -300;
          }
          else if (this.keyboard.isDown(Phaser.Keyboard.D) && player.position.x < 815) {
            player.body.velocity.x = 300
          }
          else{
            player.body.velocity.x = 0;
          }
        }
        this.updateCurrentPlayer(player)

      },
      updateCurrentPlayer: function(player){
        socket.emit('updatePlayer', [{x: player.position.x, y: player.position.y, vx: player.body.velocity.x, vy: player.body.velocity.y, id: socket.id}])
      },

      updateBall: function(ball, player, bricks){
        if(ball.body.velocity.x == 0 || ball.body.velocity.y == 0){
          ball.body.velocity.x = 100 + (Math.random() * 100);
          if(this.game.state.states['playMultiplayer']._side != "topSide"){
            ball.body.velocity.y = 270;
          }
          else{
            ball.body.velocity.y = -270;
          }
        }

        if (ball.position.x + (ball.body.velocity.x / 20) < -5){
            ball.body.velocity.x = -1 * ball.body.velocity.x;
            ball.position.x += (ball.body.velocity.x / 20)
          }
        if(ball.position.x + (ball.body.velocity.x / 20) > 920){
          ball.body.velocity.x = -1 * ball.body.velocity.x;
          ball.position.x -= (ball.body.velocity.x / 20)
        }
        if((!(player.smallPaddle) && ((ball.position.y >= 630 && ball.position.y < 635) || (ball.position.y >= 10 && ball.position.y < 15) &&
            ((player.position.x + 15) < ball.position.x) &&
            ((player.position.x + 145) > ball.position.x))) ||
            (player.bigPaddle && ((ball.position.y >= 630 && ball.position.y < 635) || (ball.position.y >= 10 && ball.position.y < 15) &&
            ((player.position.x + 15) < ball.position.x) &&
            ((player.position.x + 195) > ball.position.x))) ||
            (player.smallPaddle && ((ball.position.y >= 630 && ball.position.y < 635) || (ball.position.y >= 10 && ball.position.y < 15) &&
            ((player.position.x + 10) < ball.position.x) &&
            ((player.position.x + 60) > ball.position.x)))) {
                ball.body.velocity.y = -1 * ball.body.velocity.y;
                if(player.bigPaddle === false || player.bigPaddle === undefined && (player.smallPaddle === false || player.smallPaddle === undefined)){
                  ball.body.velocity.x = ((ball.position.x - (player.position.x + 70)) * 3)
                }
                else if(player.bigPaddle){
                  ball.body.velocity.x = ((ball.position.x - (player.position.x + 100)) * 3)
                }
                else if(player.smallPaddle){
                  ball.body.velocity.x = ((ball.position.x - (player.position.x + 30)) * 3)
                }
                ball.position.y += ball.body.velocity.y /30;
              if(player.sticky){
                player.stick = true;
                ball.position.oldx = (ball.position.x - (player.position.x))
              }

          }


          for(let i = 0; i < bricks.children.length; i++){
            if ((ball.position.x + 5 > (bricks.children[i].position.x -13)) && (ball.position.x-5 < (bricks.children[i].position.x + 15)) &&
                    (ball.position.y + 5 > (bricks.children[i].position.y - 3)) && (ball.position.y-5 < (bricks.children[i].position.y + 3))) {
                if (bricks.children[i].powerup !== undefined){
                    bricks.children[i].powerup.position.x = bricks.children[i].position.x - 8
                    bricks.children[i].powerup.position.y = bricks.children[i].position.y
                    bricks.children[i].powerup.body.velocity.y = 250 + Math.floor(Math.random() * 100)
                    bricks.children[i].powerup.visible = true
                }
                this.bricks1.children[i].position.x = -40;
                this.bricks2.children[i].position.x = -40;


                if (!(player.invincible)){
                  ball.body.velocity.y = ball.body.velocity.y * -1
                }
                socket.emit('updateBrickToServer', [{index: i, id: socket.id}])

            }
        }
        socket.emit('updateBallToServer', [{x: ball.position.x, y: ball.position.y, vx: ball.body.velocity.x, vy: ball.body.velocity.y, id: socket.id}])

      }
    })

      //   if(this.player.stick){
      //     this.ball.body.velocity.x = 0;
      //     this.ball.body.velocity.y = 0;
      //     this.ball.position.x = this.ball.position.oldx + this.player.position.x
      //     this.ball.position.y = this.player.position.y + 35;
      //   }

      //   if((Date.now() - this.player.timeOf) >= 5000){
      //     if(this.player.invincible){
      //       this.player.invincible = false;
      //     }
      //     if(this.player.stick){
      //       this.player.stick = false;
      //       this.player.sticky = false;
      //       this.ball.position.oldx = undefined;
      //       this.ball.body.velocity.y = this.ball.body.velocity.oldy;
      //       this.ball.body.velocity.x = this.ball.body.velocity.oldx;
      //     }
      //     if(this.player.bigPaddle){
      //       this.player.scale.x = 1
      //       this.player.bigPaddle = false;
      //     }
      //     if(this.player.smallPaddle){
      //       this.player.scale.x = 1;
      //       this.player.smallPaddle = false;
      //     }
      //     this.player.timeOf = undefined;
      //   }
      //
      //   for(let i = 0; i < this.bricks.children.length; i++){
      //     if (this.bricks.children[i].powerup !== undefined && this.bricks.children[i].powerup.visible){
      //       if (this.bricks.children[i].powerup.position.y >= 630 && this.bricks.children[i].powerup.position.y < 635 &&
      //         ((this.player.position.x + 15) < this.bricks.children[i].powerup.position.x) &&
      //         ((this.player.position.x + 155) > this.bricks.children[i].powerup.position.x)){
      //           this.bricks.children[i].powerup.body.velocity.y = 0;
      //           this.bricks.children[i].powerup.position.y = 0;
      //           this.bricks.children[i].powerup.position.x = -40;
      //
      //           if(this.bricks.children[i].powerup.type === "smallPaddle"){
      //             if (this.bricks.children[i].powerup.type === "invincible"){
      //               this.player.invincible = false;
      //             }
      //             if(this.bricks.children[i].powerup.type === "sticky"){
      //               this.player.sticky = false;
      //               this.player.stick = false;
      //             }
      //             if(this.bricks.children[i].powerup.type === "bigPaddle"){
      //               this.player.bigPaddle = false;
      //               this.player.scale.x = 1
      //             }
      //             this.player.smallPaddle = true;
      //             this.player.scale.x = 0.5
      //           }
      //
      //           if(!(this.player.smallPaddle)){
      //             if(this.bricks.children[i].powerup.type === "invincible"){
      //               if(this.player.stick){
      //                 this.player.sticky = false;
      //                 this.player.stick = false;
      //               }
      //               if(this.player.bigPaddle){
      //                 this.player.bigPaddle = false;
      //                 this.player.scale.x = 1;
      //               }
      //               this.player.invincible = true;
      //             }
      //             if(this.bricks.children[i].powerup.type === "sticky"){
      //               if(this.player.invincible){
      //                 this.player.invincible = false
      //               }
      //               if(this.player.bigPaddle){
      //                 this.player.bigPaddle = false
      //                 this.player.scale.x = 1;
      //               }
      //               this.player.sticky = true
      //               this.ball.body.velocity.oldy = this.ball.body.velocity.y;
      //               this.ball.body.velocity.oldx = this.ball.body.velocity.x;
      //             }
      //             if(this.bricks.children[i].powerup.type === "bigPaddle"){
      //               if(this.player.sticky){
      //                 this.player.sticky = false;
      //                 this.player.stick = false;
      //               }
      //               if(this.player.invincible){
      //                 this.player.invincible = false;
      //               }
      //               this.player.bigPaddle = true
      //               this.player.position.x = this.player.position.x - 15
      //               this.player.scale.x = 1.5
      //             }
      //           }
      //           this.player.timeOf = Date.now()
      //         }
      //     }
      //       if ((this.ball.position.x + 5 > (this.bricks.children[i].position.x -13)) && (this.ball.position.x-5 < (this.bricks.children[i].position.x + 15)) &&
      //         (this.ball.position.y + 5 > (this.bricks.children[i].position.y - 3)) && (this.ball.position.y-5 < (this.bricks.children[i].position.y + 3))) {
      //           if (this.bricks.children[i].powerup !== undefined){
      //               this.bricks.children[i].powerup.position.x = this.bricks.children[i].position.x - 8
      //               this.bricks.children[i].powerup.position.y = this.bricks.children[i].position.y
      //               this.bricks.children[i].powerup.body.velocity.y = 250 + Math.floor(Math.random() * 100)
      //               this.bricks.children[i].powerup.visible = true
      //           }
      //           this.bricks.children[i].position.x = -40;
      //           if (!(this.player.invincible)){
      //             this.ball.body.velocity.y = this.ball.body.velocity.y * -1
      //           }
      //       }
      //   }
      //
      //   if(this.ball.position.y > 670){
      //     game.state.start('lose')
      //   }
      //
      //   if (this.ball.position.x + (this.ball.body.velocity.x / 20) < -5){
      //     this.ball.body.velocity.x = -1 * this.ball.body.velocity.x;
      //     this.ball.position.x += (this.ball.body.velocity.x / 20)
      //   }
      //   if(this.ball.position.x + (this.ball.body.velocity.x / 20) > 920){
      //     this.ball.body.velocity.x = -1 * this.ball.body.velocity.x;
      //     this.ball.position.x -= (this.ball.body.velocity.x / 20)
      //   }
      //
      //
      //   if((!(this.player.smallPaddle) && (this.ball.position.y >= 630 && this.ball.position.y < 635 &&
      //     ((this.player.position.x + 15) < this.ball.position.x) &&
      //     ((this.player.position.x + 145) > this.ball.position.x))) ||
      //     (this.player.bigPaddle && (this.ball.position.y >= 630 && this.ball.position.y < 635 &&
      //     ((this.player.position.x + 15) < this.ball.position.x) &&
      //     ((this.player.position.x + 195) > this.ball.position.x))) ||
      //     (this.player.smallPaddle && (this.ball.position.y >= 630 && this.ball.position.y < 635 &&
      //     ((this.player.position.x + 10) < this.ball.position.x) &&
      //     ((this.player.position.x + 60) > this.ball.position.x)))) {
      //         this.ball.body.velocity.y = -1 * this.ball.body.velocity.y;
      //         if(this.player.bigPaddle === false || this.player.bigPaddle === undefined && (this.player.smallPaddle === false || this.player.smallPaddle === undefined)){
      //           this.ball.body.velocity.x = ((this.ball.position.x - (this.player.position.x + 70)) * 3)
      //         }
      //         else if(this.player.bigPaddle){
      //           this.ball.body.velocity.x = ((this.ball.position.x - (this.player.position.x + 100)) * 3)
      //         }
      //         else if(this.player.smallPaddle){
      //           this.ball.body.velocity.x = ((this.ball.position.x - (this.player.position.x + 30)) * 3)
      //         }
      //         this.ball.position.y -= 10;
      //       if(this.player.sticky){
      //         this.player.stick = true;
      //         this.ball.position.oldx = (this.ball.position.x - (this.player.position.x))
      //       }
      //
      //   }
      //   if (this.ball.position.y < 0){
      //     this.ball.body.velocity.y = -1 * this.ball.body.velocity.y;
      //     this.ball.position.y += 10;
      //   }
      //   if(this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.stick){
      //     if(this.player.invincible){
      //       this.player.invincible = false;
      //     }
      //     this.player.stick = false;
      //     this.player.sticky = false;
      //     this.ball.position.oldx = undefined;
      //     this.ball.body.velocity.y = this.ball.body.velocity.oldy;
      //     this.ball.body.velocity.x = this.ball.body.velocity.oldx;
      //   }
      //
      //   let winStateBoolean = true;
      //   for (let a = 0; a < this.bricks.length; a = a + 1){
      //     if(this.bricks.children[a].position.x > 0){
      //       winStateBoolean = false;
      //     }
      //   }
      //   if(winStateBoolean){
      //     game.state.start('win')
      //   }
      //
      //   if(this.player.bigPaddle){
      //     if (this.keyboard.isDown(Phaser.Keyboard.A) && this.player.position.x > -35){
      //       this.player.body.velocity.x = -300;
      //     }
      //     else if (this.keyboard.isDown(Phaser.Keyboard.D) && this.player.position.x < 760) {
      //       this.player.body.velocity.x = 300
      //     }
      //     else{
      //       this.player.body.velocity.x = 0;
      //     }
      //   }
      //
      //   if(this.player.smallPaddle){
      //     if (this.keyboard.isDown(Phaser.Keyboard.A) && this.player.position.x > -8){
      //       this.player.body.velocity.x = -300;
      //     }
      //     else if (this.keyboard.isDown(Phaser.Keyboard.D) && this.player.position.x < 870) {
      //       this.player.body.velocity.x = 300
      //     }
      //     else{
      //       this.player.body.velocity.x = 0;
      //     }
      //   }
      //
      // if((this.player.bigPaddle === false || this.player.bigPaddle === undefined) && (this.player.smallPaddle === false || this.player.smallPaddle === undefined)){
      //   if (this.keyboard.isDown(Phaser.Keyboard.A) && this.player.position.x > -25){
      //     this.player.body.velocity.x = -300;
      //   }
      //   else if (this.keyboard.isDown(Phaser.Keyboard.D) && this.player.position.x < 815) {
      //     this.player.body.velocity.x = 300
      //   }
      //   else{
      //     this.player.body.velocity.x = 0;
      //   }
      // }
      // },

    //   Win: function() {
    //     game.state.start('win');
    //   }
    // })
    // }

// const MainStateInstance = new Mainstate();
