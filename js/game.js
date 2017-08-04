import Phaser from 'phaser';
import bootState from './boot';
import loadState from './load';
import menuState from './menu';
import playState from './play';
import playMultiplayerState from './playMultiplayer';
import winState from './win';
import loseState from './lose';
import clientState from './client';
import instructionState from './instruction'



var game = new Phaser.Game(940, 680, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState(game, Phaser));
game.state.add('load', loadState(game));
game.state.add('menu', menuState(game, Phaser));
game.state.add('play', playState(game, Phaser));
game.state.add('playMultiplayer', playMultiplayerState(game, Phaser));
game.state.add('win', winState(game, Phaser));
game.state.add('lose', loseState(game, Phaser));
game.state.add('instruction', instructionState(game, Phaser));
game.state.add('client', clientState(game, Phaser));


game.state.start('boot')
