export default (game, Phaser) => {

  return window.socket.on('join', function(side) {
    game.state.states['playMultiplayer']._side = side
    game.state.start('playMultiplayer')
  })

  return socket.on('updatePlayer', function(data) {
    console.log(data);
  })

}
