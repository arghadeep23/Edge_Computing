const socket = io();
document.querySelector('#form1').addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    console.log("Form submitted")
    event.preventDefault();
    const data = document.getElementById('message').value;
    const chat1 = document.getElementById("user11");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = "User 1: " + data;
    chat1.appendChild(messageElement);
    const chat2 = document.getElementById("user12");
    const messageElement2 = document.createElement("div");
    messageElement2.classList.add("message");
    chat2.appendChild(messageElement2);
    socket.emit('ctos1', data);
    document.getElementById('message').value = '';
}
document.querySelector('#form2').addEventListener('submit', handleSubmit2);
function handleSubmit2(event) {
    console.log("Form submitted")
    event.preventDefault();
    const data = document.getElementById('message2').value;
    const chat1 = document.getElementById("user22");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = "User 2: " + data;
    chat1.appendChild(messageElement);
    const chat2 = document.getElementById("user21");
    const messageElement2 = document.createElement("div");
    messageElement2.classList.add("message");
    chat2.appendChild(messageElement2);
    socket.emit('ctos2', data);
    document.getElementById('message2').value = '';
}
socket.emit('message', 'Hi');
socket.on('stoc2', (data) => {
    const chat2 = document.getElementById("user22");
    const messageElement2 = document.createElement("div");
    messageElement2.classList.add("message");
    chat2.appendChild(messageElement2);
    const chat1 = document.getElementById("user21");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = "User 1: " + data;
    chat1.appendChild(messageElement);
})
socket.on('stoc1', (data) => {
    const chat2 = document.getElementById("user11");
    const messageElement2 = document.createElement("div");
    messageElement2.classList.add("message");
    chat2.appendChild(messageElement2);
    const chat1 = document.getElementById("user12");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = "User 2: " + data;
    chat1.appendChild(messageElement);
})
