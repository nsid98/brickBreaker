export default (game, Phaser) => ({
  create: function() {
    this.keyboard = game.input.keyboard;
    this.createPlayers()
    if(this.game.state.states['playMultiplayer']._side === "topSide"){
      this.createBricks()
    }
    if(this.game.state.states['playMultiplayer']._side != "topSide"){
      this.bricks1 = game.add.group()
      this.bricks2 = game.add.group()
    }
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
    socket.on('sendLose', ((data) => {
      if(socket.id != data[0].id){
        game.state.start('lose')

      }
    }))
    socket.on('sendBrick', ((data)=> {
      if(this.game.state.states['playMultiplayer']._side != "topSide"){
        let x = data[0].brickx;
        let y = data[0].bricky;
        let powerup = data[0].powerup
        if(data[0].key === "1"){
          this.bricks1.create(x, y, 'brick')
          this.bricks1.children[this.bricks1.children.length -1].scale.setTo(0.04, 0.025)
          if (powerup != null){
            this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup')
            this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
            this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
            this.bricks1.children[this.bricks1.children.length - 1].powerup.type = powerup
        }
      }
        if(data[0].key === "2"){
          this.bricks2.create(x, y, 'brick')
          this.bricks2.children[this.bricks2.children.length -1].scale.setTo(0.04, 0.025)
          if (powerup != null){
            this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup')
            this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
            this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
            this.bricks2.children[this.bricks2.children.length - 1].powerup.type = powerup
          }
        }
      }
    }))

    socket.on('updateBall', ((data) =>{

      if(this.game.state.states['playMultiplayer']._side === "bottomSide" && this.balls.children[data[0].index].position.y <= (game.height / 2)){
          // console.log("This is the ball the top player is updating, ball #", data[0].index);
          let ball = this.balls.children[data[0].index]
          ball.position.x = data[0].x;
          ball.position.y = data[0].y;
          ball.body.velocity.x = data[0].vx;
          ball.body.velocity.y = data[0].vy;
      }
      else if(this.game.state.states['playMultiplayer']._side === "topSide" && this.balls.children[data[0].index].position.y > (game.height / 2)){
        // console.log("This is the ball the bottom player is updating, ball #", data[0].index);
        let ball = this.balls.children[data[0].index]
        ball.position.x = data[0].x;
        ball.position.y = data[0].y;
        ball.body.velocity.x = data[0].vx;
        ball.body.velocity.y = data[0].vy;
      }
    }))

    socket.on('updatePowerups', ((data) =>{
      let powerup = this.bricks1.children[data[0].index].powerup

      if(socket.id != data[0].id){
        powerup.position.x = data[0].brickx
        powerup.position.y = data[0].bricky
        powerup.body.velocity.y =(250 + Math.floor(Math.random() * 100)) * data[0].direction
        powerup.visible = true
      }
    }))

    socket.on('updateBricks', ((data) =>{
       if(this.bricks1.children[data[0].index] != undefined){
         this.bricks1.children[data[0].index].position.x = -40
       }
       if(this.bricks2.children[data[0].index] != undefined){
       this.bricks2.children[data[0].index].position.x = -40
     }
    }))
  },

      createPlayers: function(){
        this.balls = game.add.group()
        this.player = game.add.sprite(470, 590, 'player');
        this.player.invincible = false;
        this.otherPlayer = game.add.sprite(470, -50, 'player');
        this.otherPlayer.invincible = false;
        game.physics.enable(this.otherPlayer, Phaser.Physics.ARCADE);
        game.physics.enable(this.player, Phaser.Physics.ARCADE);

        this.balls.create(470, 400, 'ball');
        this.balls.children[0].scale.setTo(0.07, 0.07);
        this.balls.create(470, 200, 'ball');
        this.balls.children[1].scale.setTo(0.07, 0.07);
        game.physics.enable(this.balls, Phaser.Physics.ARCADE);
      },

      createBricks: function(){
        this.bricks1 = game.add.group()
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
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)

                this.bricks2.create(i * 33 + 40, 250, 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if (p===1){
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"

                this.bricks2.create(i * 33 + 40, 250, 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
              }
              else if (p===2){
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"

                this.bricks2.create(i * 33 + 40, 250, 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
              }
              else if(p ===3){
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"

                this.bricks2.create(i * 33 + 40, 250, 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
              }
              else{
                this.bricks1.create(i * 33 + 40, 250, 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"

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
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"

                this.bricks2.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
              }

              else if (p === 2){
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"

                this.bricks2.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
              }
              else if (p === 3){
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"

                this.bricks2.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
              }
              else {
                this.bricks1.create(i * 33 + 30 - ((28*1)*33), 250 + (15*1), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"

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
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)

                this.bricks2.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"

                this.bricks2.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
              }

              else if (p===2){
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"

                this.bricks2.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
              }
              else if (p === 3){
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"

                this.bricks2.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
              }
              else{
                this.bricks1.create(i * 33 + 2 - ((28*2)*33), 250 + (15*2), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"

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
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)

                this.bricks2.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"

                this.bricks2.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
              }

              else if (p === 2){
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"

                this.bricks2.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
              }
              else if (p === 3){
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"

                this.bricks2.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
              }
              else {
                this.bricks1.create(i * 33 + 2 - ((28*3)*33), 250 + (15*3), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"

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
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)

                this.bricks2.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"

                this.bricks2.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
              }

              else if(p===2){
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"

                this.bricks2.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
              }
              else if (p === 3){
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"

                this.bricks2.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
              }
              else{
                this.bricks1.create(i * 33 + 2 - ((28*4)*33), 250 + (15*4), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"

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
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)

                this.bricks2.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
              }
              else if ( p===1 ){
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"

                this.bricks2.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
              }

              else if(p === 2){
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"

                this.bricks2.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
              }
              else if(p === 3){
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"

                this.bricks2.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
              }
              else{
                this.bricks1.create(i * 33 + 2 - ((28*5)*33), 250 + (15*5), 'brick')
                this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"

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
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)

                  this.bricks2.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                }
                else if ( p===1 ){
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"

                  this.bricks2.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                  this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                }

                else if (p === 2){
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"

                  this.bricks2.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                  this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                }
                else if (p === 3){
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"

                  this.bricks2.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                  this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                }
                else{
                  this.bricks1.create(i * 33 + 30 - ((28*6)*33), 250 + (15*6), 'brick')
                  this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                  this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                  this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"

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
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)

                    this.bricks2.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                  }
                  else if ( p===1 ){
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "sticky"

                    this.bricks2.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "sticky"
                  }

                  else if (p === 2){
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "invincible"

                    this.bricks2.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "invincible"
                  }
                  else if (p ===3){
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "bigPaddle"

                    this.bricks2.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks2.children[this.bricks2.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks2.children[this.bricks2.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.visible = false;
                    this.bricks2.children[this.bricks2.children.length - 1].powerup.type = "bigPaddle"
                  }
                  else{
                    this.bricks1.create(i * 33 + 40 - ((28*7)*33), 250 + (15*7), 'brick')
                    this.bricks1.children[this.bricks1.children.length - 1].scale.setTo(0.04, 0.025)
                    this.bricks1.children[this.bricks1.children.length - 1].powerup = game.add.sprite(0, 0, 'powerup');
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.scale.setTo(0.1, 0.1);
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.visible = false;
                    this.bricks1.children[this.bricks1.children.length - 1].powerup.type = "smallPaddle"

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
            game.physics.enable(this.bricks1, Phaser.Physics.ARCADE);
            for (let i = 0; i < this.bricks1.children.length; i ++){
              console.log("Group 1 sent brick ", i);
              let powerup = null
              if (this.bricks1.children[this.bricks1.children.length - 1].powerup != undefined){
                powerup = this.bricks1.children[this.bricks1.children.length - 1].powerup.type
              }
              socket.emit('sendBrickToServer', [{i: i, brickx: this.bricks1.children[i].position.x, bricky: this.bricks1.children[i].position.y, powerup: powerup, key: "1", roomNumber: this.game.state.states['playMultiplayer']._roomNumber}])
              if (this.bricks1.children[i].powerup !== undefined){
                game.physics.enable(this.bricks1.children[i].powerup, Phaser.Physics.ARCADE);
              }
            }
            game.physics.enable(this.bricks2, Phaser.Physics.ARCADE);
            for (let i = 0; i < this.bricks2.children.length; i ++){
              console.log("Group 2 sent brick ", i);

              let powerup = null
              if (this.bricks2.children[this.bricks2.children.length - 1].powerup != undefined){
                powerup = this.bricks2.children[this.bricks2.children.length - 1].powerup.type
              }
              socket.emit('sendBrickToServer', [{i: i, brickx: this.bricks2.children[i].position.x, bricky: this.bricks2.children[i].position.y, powerup: powerup, key: "2", roomNumber: this.game.state.states['playMultiplayer']._roomNumber}])

              if (this.bricks2.children[i].powerup !== undefined){
                game.physics.enable(this.bricks2.children[i].powerup, Phaser.Physics.ARCADE);
              }
            }

      },

      update: function() {
        if((this.balls.children[0].position.y > 680 || this.balls.children[0].position.y < 0) && (this.balls.children[1].position.y > 680 || this.balls.children[1].position.y < 0)){
          game.state.start('lose')
          socket.emit('lose', [{roomNumber: this.game.state.states['playMultiplayer']._roomNumber, id: socket.id}])
        }
        if(this.player != null && this.otherPlayer != null){
          if(this.game.state.states['playMultiplayer']._side == "topSide"){
            this.movePaddle(this.otherPlayer)
          }
          else{
            this.movePaddle(this.player)
          }
        }
        for(let i = 0; i < 2; i++){
          let ball = this.balls.children[i]
          if(this.game.state.states['playMultiplayer']._side === "bottomSide" && ball.position.y >= (game.height / 2)){
            this.updateBall(ball, this.player, this.bricks1, i)
            this.updateBall(ball, this.player, this.bricks2, i)
          }
          if(this.game.state.states['playMultiplayer']._side === "topSide" && ball.position.y < (game.height / 2)){
            this.updateBall(ball, this.otherPlayer, this.bricks1, i)
            this.updateBall(ball, this.otherPlayer, this.bricks2, i)
          }
        }
      },

      checkIfPowerupHitPlayer(){
      //   for(let i = 0; i < this.bricks.children.length; i++){
      //     if (this.bricks.children[i].powerup !== undefined && this.bricks.children[i].powerup.visible){
      //       if (this.bricks.children[i].powerup.position.y >= 630 && this.bricks.children[i].powerup.position.y < 635 &&
      //         ((this.player.position.x + 15) < this.bricks.children[i].powerup.position.x) &&
      //         ((this.player.position.x + 155) > this.bricks.children[i].powerup.position.x)){
      //           this.handlePowerupHitPlayer(this.player, this.bricks.children[i].powerup)
      //       }
      //       if(this.bricks.children[i].powerup.position.y >= 630 && this.bricks.children[i].powerup.position.y < 635 &&
      //         ((this.otherPlayer.position.x + 15) < this.bricks.children[i].powerup.position.x) &&
      //         ((this.otherPlayer.position.x + 155) > this.bricks.children[i].powerup.position.x)){
      //           this.handlePowerupHitPlayer(this.otherPlayer, this.bricks.children[i].powerup)
      //       }
      //     }
      //   }
      // },
      // handlePowerupHitPlayer(player, powerup){
      },



      handleBallOffWall: function(ball, num){
        ball.body.velocity.x = -1 * ball.body.velocity.x;
        ball.position.x += (ball.body.velocity.x * num / 20)
      },

      handleBallOffPaddle: function(ball, player, i){
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
        socket.emit('updateBallToServer', [{index: i, x: ball.position.x, y: ball.position.y, vx: ball.body.velocity.x, vy: ball.body.velocity.y, id: socket.id, roomNumber: this.game.state.states['playMultiplayer']._roomNumber}])
    },

    handleRemoveBricksFromScreen: function(brick1, brick2){
      brick1.position.x = -40;
      brick2.position.x = -40;
    },

    movePaddle: function(player){
      if(player.bigPaddle){
          if ((this.keyboard.isDown(Phaser.Keyboard.A) || this.keyboard.isDown(Phaser.Keyboard.LEFT)) && player.position.x > -35){
            player.body.velocity.x = -300;
          }
          else if ((this.keyboard.isDown(Phaser.Keyboard.D) || this.keyboard.isDown(Phaser.Keyboard.RIGHT)) && player.position.x < 760) {
            player.body.velocity.x = 300
          }
          else{
            player.body.velocity.x = 0;
          }
        }

        if(player.smallPaddle){
          if ((this.keyboard.isDown(Phaser.Keyboard.A) || this.keyboard.isDown(Phaser.Keyboard.LEFT)) && player.position.x > -8){
            player.body.velocity.x = -300;
          }
          else if ((this.keyboard.isDown(Phaser.Keyboard.D) || this.keyboard.isDown(Phaser.Keyboard.RIGHT)) && this.player.position.x < 870) {
            player.body.velocity.x = 300
          }
          else{
            player.body.velocity.x = 0;
          }
        }

      if((player.bigPaddle === false || player.bigPaddle === undefined) && (player.smallPaddle === false || player.smallPaddle === undefined)){
        if ((this.keyboard.isDown(Phaser.Keyboard.A) || this.keyboard.isDown(Phaser.Keyboard.LEFT)) && player.position.x > -25){
          player.body.velocity.x = -300;
        }
        else if ((this.keyboard.isDown(Phaser.Keyboard.D) || this.keyboard.isDown(Phaser.Keyboard.RIGHT)) && player.position.x < 815) {
          player.body.velocity.x = 300
        }
        else{
          player.body.velocity.x = 0;
        }
      }
      this.updateCurrentPlayer(player)

    },

      updateCurrentPlayer: function(player){
        socket.emit('updatePlayer', [{x: player.position.x, y: player.position.y, vx: player.body.velocity.x, vy: player.body.velocity.y, id: socket.id, roomNumber: this.game.state.states['playMultiplayer']._roomNumber}])
      },

      updateBall: function(ball, player, bricks, i){
        if(this.bricks1.children.length >= 212 && this.bricks2.children.length >=212 && (ball.body.velocity.x == 0 || ball.body.velocity.y == 0)){
          ball.body.velocity.x = 100 + (Math.random() * 100);
          if(player.position.y > 400){
            ball.body.velocity.y = 100;
          }
          else{
            ball.body.velocity.y = -100;
          }
        }

        if (ball.position.x + (ball.body.velocity.x / 20) < -5){
            this.handleBallOffWall(ball, 1)
          }
        if(ball.position.x + (ball.body.velocity.x / 20) > 920){
            this.handleBallOffWall(ball, -1)
        }

        if((!(player.smallPaddle) && !(player.bigPaddle) && ((player.position.y > 400 && (ball.position.y >= 630 && ball.position.y < 635)) ||
            (player.position.y < 60 && (ball.position.y >= 10 && ball.position.y < 15))) &&
            ((player.position.x + 15) < ball.position.x) &&
            ((player.position.x + 145) > ball.position.x)) ||
            (player.bigPaddle && ((ball.position.y >= 630 && ball.position.y < 635) || (ball.position.y >= 10 && ball.position.y < 15) &&
            ((player.position.x + 15) < ball.position.x) &&
            ((player.position.x + 195) > ball.position.x))) ||
            (player.smallPaddle && ((ball.position.y >= 630 && ball.position.y < 635) || (ball.position.y >= 10 && ball.position.y < 20) &&
            ((player.position.x + 10) < ball.position.x) &&
            ((player.position.x + 60) > ball.position.x)))) {
              this.handleBallOffPaddle(ball, player, i)
          }


          for(let j = 0; j < bricks.children.length; j++){
            if ((ball.position.x + 5 > (bricks.children[j].position.x -13)) && (ball.position.x-5 < (bricks.children[j].position.x + 15)) &&
                (ball.position.y + 5 > (bricks.children[j].position.y - 5)) && (ball.position.y-5 < (bricks.children[j].position.y + 5))) {
                if (bricks.children[j].powerup !== undefined){
                  let direction = null;
                  if (ball.body.velocity.y > 0){
                    direction = -1;
                  }
                  else{
                    direction = 1;
                  }
                }
                this.handleRemoveBricksFromScreen(this.bricks1.children[j], this.bricks2.children[j])

                if (!(player.invincible)){
                  ball.body.velocity.y = ball.body.velocity.y * -1
                }
                socket.emit('updateBrickToServer', [{index: j, id: socket.id, roomNumber: this.game.state.states['playMultiplayer']._roomNumber}])
            }
        }
        // console.log("socket sent on updateBallToServer is ", socket.id);
        socket.emit('updateBallToServer', [{index: i, x: ball.position.x, y: ball.position.y, vx: ball.body.velocity.x, vy: ball.body.velocity.y, id: socket.id, roomNumber: this.game.state.states['playMultiplayer']._roomNumber}])

    }
    })
