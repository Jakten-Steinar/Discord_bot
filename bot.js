require('dotenv').config();
const commandHandler = require('./commands');
console.log('🤖 Jeg er en robot beep boop 🤖');

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)

client.on('ready', connectedToDiscord);

function connectedToDiscord(){
    console.log('✔️  Connected to Discord');
    //msg.channel.send('Ready to choo choo 🚂')  <-- Jeg vil sende en melding når boten er på
}
client.on('message', commandHandler);