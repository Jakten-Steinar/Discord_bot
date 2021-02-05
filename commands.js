require('dotenv').config()
const common = require('./commands/common.js')
const commonmp = require('./commands/commonmp.js')
const rgame = require('./commands/randomGame.js')
const help = require('./commands/help.js')

const commands = {common, commonmp, help, rgame}

module.exports = async function(msg){
    if(msg.channel.id == process.env.STEAM_CHANNEL_ID){
        let tokens = msg.content.split(" ")
        let command = tokens.shift();
        if(command.charAt(0) === "!"){
            command = command.substring(1);
            commands[command](msg, tokens);
        }
    }
}