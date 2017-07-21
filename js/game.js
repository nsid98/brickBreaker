// window.PIXI = require('phaser/build/custom/pixi');
// window.p2 = require('phaser/build/custom/p2');
// window.Phaser = require('phaser/build/custom/phaser-split');
import Phaser from 'phaser';
import bootState from './boot';
import loadState from './load';
import menuState from './menu';
import playState from './play';
import winState from './win';
import loseState from './lose';



var game = new Phaser.Game(940, 680, Phaser.AUTO, 'gameDiv');

game.state.add('boot', bootState(game, Phaser));
game.state.add('load', loadState(game));
game.state.add('menu', menuState(game, Phaser));
game.state.add('play', playState(game, Phaser));
game.state.add('win', winState(game, Phaser));
game.state.add('lose', loseState(game, Phaser));

game.state.start('boot')
