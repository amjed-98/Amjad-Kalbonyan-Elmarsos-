const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocation } = require('./utils/messages');

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  // emitting message
  socket.on('join', ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit(
      'message',
      generateMessage('Admin', `Welcome ${user.username}`)
    );

    socket.broadcast
      .to(room)
      .emit(
        'message',
        generateMessage('Admin', `${user.username} has joined the room`)
      );

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on('sendMessage', (message, cb) => {
    const { room, username } = getUser(socket.id);

    const filter = new Filter();

    if (filter.isProfane(message)) return cb('profane lang is not allowed');

    io.to(room).emit('message', generateMessage(username, message));

    cb();
  });

  // listening for location
  socket.on('sendLocation', (location, acknowledge) => {
    const { username, room } = getUser(socket.id);

    io.to(room).emit('locMsg', generateLocation(username, location));
    acknowledge();
  });

  // user disconnect
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage('Admin', `${user.username} has left`)
      );

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => console.log(`running on port ${port}`));

// todo implement username colored feature
