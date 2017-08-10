export default (game, Phaser) => {

    window.socket.on('join', function(side) {
    game.state.states['playMultiplayer']._side = side
    game.state.start('playMultiplayer')
  })
}
