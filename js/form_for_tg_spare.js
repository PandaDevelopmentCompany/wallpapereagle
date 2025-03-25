const token = '7738919764:AAECEuRqdJXpYrEaFIlbd72-xjhlYR_9Ec4';
const chatId = '746586393';
const URL_API = 'https://api.telegram.org/';

const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', (event) => {
event.preventDefault();
const message = 'Name: ' + sendName.value + '\nPhone number: ' + sendTel.value + '\nApplication comment: ' + messageInput.value + '\nAttach fille: ';
if (message) {
axios.post(`${URL_API}bot${token}/sendMessage`, {
chat_id: chatId,
text: message,
})
.then(response => console.log(response), alert('Your message has been successfully sent!✅ \nWe will definitely contact you! \nThank you!💚'))
.catch(error => console.error(error));
}
});




const messageInput1 = document.getElementById('messageInput1');
const sendButton1 = document.getElementById('sendButton1');

sendButton1.addEventListener('click', (event) => {
event.preventDefault();
const message = 'Name: ' + sendName1.value + '\nPhone number: ' + " " + sendTel1.value + '\nApplication comment: ' + messageInput1.value;
if (message) {
axios.post(`${URL_API}bot${token}/sendMessage`, {
chat_id: chatId,
text: message,
})
.then(response => console.log(response), alert('Your message has been successfully sent!✅ \nWe will definitely contact you! \nThank you!💚'))
.catch(error => console.error(error));
}
});