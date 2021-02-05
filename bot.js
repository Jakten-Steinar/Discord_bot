require('dotenv').config();
const commandHandler = require('./commands');
console.log('🤖 Jeg er en robot beep boop 🤖');

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)

client.on('ready', connectedToDiscord);

function connectedToDiscord(){
    console.log('✔️  Connected to Discord');
}

client.on('message', commandHandler);