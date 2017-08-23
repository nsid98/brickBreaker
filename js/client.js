export default (game, Phaser) => {

    window.socket.on('join', function(side) {
    game.state.states['playMultiplayer']._side = side[0]
    game.state.states['playMultiplayer']._roomNumber = side[1]
    game.state.start('playMultiplayer')
  })
}
