var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var debug = require('debug')('game:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */


var server = http.createServer(app);
var io = require('socket.io').listen(server);
// const socket = io

// const io = require('socket.io').listen(server);
let player1 = "bottomSide"
let player2 = "topSide"
let playerList = []


let counter = 0
let roomNumber = 1
io.on('connection', function (socket) {

  socket.on('MultiplayerStart', function(){
    if(counter == 0){
      socket.emit('CreateBottomPlayer');
      playerList.push(player1)
      socket.emit('join', [playerList[playerList.length - 1], roomNumber])
      socket.join('room' + roomNumber)
      counter ++

    } else if(counter == 1) {
      socket.emit('CreateTopPlayer')
      playerList.push(player2)
      socket.emit('join', [playerList[playerList.length - 1], roomNumber])
      socket.join('room' + roomNumber)
      counter = 0;
      roomNumber ++
    }
  })

  socket.on('updatePlayer', function(data){
    io.to('room' + (data[0].roomNumber).toString()).emit('updatePlayerToClient', data)
    // socket.broadcast.emit('updatePlayerToClient', data)
  })

  socket.on('updateBallToServer', function(data){
    io.to('room' + (data[0].roomNumber).toString()).emit('updateBall', data)
    // socket.broadcast.emit('updateBall', data)
  })

  socket.on('updateBrickToServer', function(data){
    io.to('room' + (data[0].roomNumber).toString()).emit('updateBricks', data)
    // socket.broadcast.emit('updateBricks', data)
  })
  socket.on('updatePowerupActivationToServer', function(data){
    io.to('room' + (data[0].roomNumber).toString()).emit('updatePowerups', data)
    // socket.broadcast.emit('updatePowerups', data)
  })

  socket.on('sendBrickToServer', function(data){
    io.to('room' + (data[0].roomNumber).toString()).emit('sendBrick', data)
    // socket.broadcast.emit('sendBrick', data)
  })

  socket.on('disconnect', function(socket){
    playerList.splice(-1)
  });
})


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
