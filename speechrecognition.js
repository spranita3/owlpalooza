const dotenv = require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');

recognition.addEventListener('result', (e)=>{
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

p.innerText = text;
texts.appendChild(p);

if(e.results[0].isFinal){
    p = document.createElement('p');
}
});


recognition.addEventListener('end', ()=>{
  recognition.start();
})

recognition.start();


client.messages
  .create({
     body: text,
     from: '+12316802672',
     to: '+16785515888'
   })
  .then(message => console.log(message.sid));