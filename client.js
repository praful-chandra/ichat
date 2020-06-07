const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }

    //useless
    var win = document.getElementById('msgWindow');
    win.scrollTop = win.scrollHeight;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;

    if (message.trim() === '') {
        alert('No khaali msg please');
    } else {
        append(`You:${message}`, 'right')
        socket.emit('send', message);
        messageInput.value = '';
    }



    //useless
    var win = document.getElementById('msgWindow');
    win.scrollTop = win.scrollHeight;


})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name)

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
})
socket.on('left', name => {
    append(`${name} left the chat`, 'right')
})
