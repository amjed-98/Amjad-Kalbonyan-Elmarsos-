// const { generateLocation } = require('../../src/utils/messages');
const socket = io();

// Elements
const $messageForm = document.getElementById('form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormBtn = $messageForm.querySelector('button');
const $locationBtn = document.getElementById('send-location');

const $sideBar = document.getElementById('sidebar');
const $messages = document.getElementById('messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const autoScroll = () => {
  // New Message element
  const $newMessage = $messages.lastElementChild;

  // Height of the new messages
  const newMessageStyles = getComputedStyle($newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // visible height
  const visibleHeight = $messages.offsetHeight;

  // height of messages container
  const containerHeight = $messages.scrollHeight;

  // how far have I scrolled?
  const scrollOffset = $messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    $messages.scrollTop = $messages.scrollHeight;
  }
};

// listen for message event
socket.on('message', ({ username, text, createdAt }) => {
  if (!text) return;

  const html = Mustache.render(messageTemplate, {
    username,
    message: text,
    createdAt: moment(createdAt).format('h:mm a'),
  });

  // const color = `#${Math.floor(Math.random() * 2 ** 24)
  //   .toString(16)
  //   .padStart(6, '0')}`;

  $messages.insertAdjacentHTML('beforeend', html);
  autoScroll();
});

// listen for location event
socket.on('locMsg', ({ username, url, createdAt }) => {
  const html = Mustache.render(locationTemplate, {
    username,
    url,
    createdAt: moment(createdAt).format('h:mm a'),
  });

  $messages.insertAdjacentHTML('beforeend', html);
  autoScroll();
});

socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });

  $sideBar.innerHTML = html;
});

// form submit
$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  $messageFormBtn.setAttribute('disabled', true);

  const msg = e.target.elements.message.value;

  socket.emit('sendMessage', msg, (error) => {
    $messageFormBtn.removeAttribute('disabled');

    if (!msg) return;

    $messageFormInput.value = '';
    $messageFormInput.focus();

    if (error) return console.log(error);

    console.log(`message delivered`);
  });
});

$locationBtn.addEventListener('click', () => {
  // check if browser supports
  if (!navigator.geolocation)
    return alert('geolocation is not supported by your browser');

  $locationBtn.setAttribute('disabled', true);

  navigator.geolocation.getCurrentPosition((position) => {
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    // emitting location
    socket.emit('sendLocation', location, () => {
      $locationBtn.removeAttribute('disabled');
      console.log('location delivered');
    });
  });
});

// emit join room
socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = '/';
  }
});
