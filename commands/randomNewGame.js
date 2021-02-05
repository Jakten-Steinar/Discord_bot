const Discord = require('discord.js')
const steam = require('../fetchSteam')

module.exports = async function(msg, args){
    if(args.length != 1){
        msg.channel.send("🚫 Can't get random game from more or fewer then one player 🚫")
        msg.delete()
        return
    }

    var game = await steam.fetchRandomNewGame(args)
    const embedMessage = new Discord.MessageEmbed()
      .setColor('#e534eb')
      .setTitle(game.name)
      .setURL(game.website)
      .setAuthor('What about playing this game, ' + msg.author.username + '?', 'https://cdn.discordapp.com/avatars/'+msg.author.id+'/'+ msg.author.avatar, game.website)
      .setDescription(game.short_description)
      .addField('You have never played this game', '\u200b')
      .setImage(game.logoURL)
      .setTimestamp()
      .setFooter(msg.content + ' 🤖 Beep boop 🤖')
    msg.channel.send(embedMessage)
}