// const io = require('socket.io-client');
var socket = io()
// const multiplayer = require('./playMultiplayer.js')
// const game = require('./game.js')
  // console.log("It hit before socket.on in client.ks");
export default (game, Phaser) => {
  // console.log("It before join client.js" + side);

  return socket.on('join', function(side) {
    console.log("It hit after join in client.js" + side);
    // console.log("game.state" + game.state);
    // game.state.states['playMultiplayer']._side = side
    // console.log("it went after game.state.states _side " + side);
    // game.state.start('playMultiplayer')
  })
}
