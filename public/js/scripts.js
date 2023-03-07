const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

//* get DOM element
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

//* global socket handler
socket.on('user_connected', (data) => {
    console.log(`user_connected: ${data}`)
});

//* event callback handler
 const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements[0].value;
    if(!inputValue) return
    socket.emit('submit_chat',inputValue);
    // 화면에다 그리기
 }

//* draw functions
const drawHelloStranger = (username) => {
    helloStrangerElement.innerHTML = `Hello, ${username} Stranger!`;
};
const drawNewChat = (message) => {
    const wrapperChatBox = document.createElement('div');
    const chatBox = `
        <div>
            ${message}
        </div>`
    wrapperChatBox.innerHTML = chatBox;
    chattingBoxElement.appendChild(wrapperChatBox);
}

function helloUser() {
//   const username = prompt('What is your name?');
//   socket.emit('new_user', username, (data) => {
//     drawHelloStranger(data);
//     });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();