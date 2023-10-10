const Discord = require('discord.js')
module.exports = async function(msg, args){
    let helpWho = msg.author.username;
    if(args.length > 0){
        helpWho = args
    }
    let r =Math.random();
    if(r < 0.25) {
        msg.channel.send("☠️ Help is not comming, "+ helpWho +" ☠️ ")
    }else {
        const embedMessage = new Discord.MessageEmbed()
        .setColor('#e534eb')
        .setTitle('👷 Help is here! 👷')
        .setAuthor(msg.author.username + ' is looking for help!', 'https://cdn.discordapp.com/avatars/'+msg.author.id+'/'+ msg.author.avatar)
        .setDescription('• !common {player 1} .. {player 5} - Find all common games\n' + 
                        '• !commonmp {player 1} .. {player 5} - Find all common multiplayer games\n' + 
                        '• !rgame {player 1} - Get a random game suggestion from your library \n' +
                        '• !newgame {player 1} - Get a random game suggestion from your library that you haven\'t played \n' +
                        '• !gamecount {player 1} - See how many games you have in your library \n' +
                        '• !unplayed {player 1} - See many unplayed games you have in your library')
        .setTimestamp()
        .setFooter(msg.content + ' 🤖 Beep boop 🤖')

        msg.channel.send(embedMessage)
    }
    msg.delete()
}