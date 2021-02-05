const steam = require('./../fetchSteam')

module.exports = async function(msg, args){
    if(args.length != 1){
        msg.channel.send("🚫 Can't get random game from more or fewer then one player 🚫")
        msg.delete()
        return
    }

    var game = await steam.fetchRandomGame(args)
    /*
    msg.channel.send('**What about playing this game, ' + msg.author.username+'?**')
    msg.channel.send(game.logoURL)
    msg.channel.send('Game: ' + game.name)
    if(game.playTime == 0){
        msg.channel.send('You have never played this game')
    }else{
    msg.channel.send('You have played this game for ' + (game.playTime/60).toFixed(1) + ' hours')
        if(game.playTime2 == 0){
            msg.channel.send('You have not played this game recently')
        }else{
            msg.channel.send('You have recently played this game for ' + (game.playTime2/60).toFixed(1) + ' hours')
        }
    }
    */
    const embed ={
        'title' : '**What about playing this game, ' + msg.author.username + '?**',
        'description' : game.name,
        //'url' : 'https://discordapp.com',
        'color' : '#e534eb',
        'timestamp' : new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),

        'footer' : {
            'value' : '🤖 Beep boop 🤖'
        },
        'image': {
            'url' : game.logoURL
        },
        
        'author' : {
            'name' : msg.content,
            'icon_url' : 'https://cdn.discordapp.com/avatars/'+msg.author.id+'/'+ msg.author.avatar
        },
        'fields' : [
            {   
                'name' : 'You have played this game for ' + (game.playTime/60).toFixed(1) + ' hours',
                'value' : 'You have recently played this game for ' + (game.playTime2/60).toFixed(1) + ' hours'
            }
        ]
    }
    //msg.delete();
    msg.channel.send({embed})
}
/*
const aembed = {
    "title": "title ~~(did you know you can have markdown here too?)~~",
    "description": "this supports [named links](https://discordapp.com) on top of the previously shown subset of markdown. ```\nyes, even code blocks```",
    "url": "https://discordapp.com",
    "color": 4148416,
    "timestamp": "2021-02-02T23:57:16.167Z",
    "footer": {
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
      "text": "footer text"
    },
    "thumbnail": {
      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "image": {
      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "author": {
      "name": "author name",
      "url": "https://discordapp.com",
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "fields": [
      {
        "name": "🤔",
        "value": "some of these properties have certain limits..."
      },
      {
        "name": "😱",
        "value": "try exceeding some of them!"
      },
      {
        "name": "🙄",
        "value": "an informative error should show up, and this view will remain as-is until all issues are fixed"
      },
      {
        "name": "<:thonkang:219069250692841473>",
        "value": "these last two",
        "inline": true
      },
      {
        "name": "<:thonkang:219069250692841473>",
        "value": "are inline fields",
        "inline": true
      }
    ]
  };
  channel.send("this `supports` __a__ **subset** *of* ~~markdown~~ 😃 ```js\nfunction foo(bar) {\n  console.log(bar);\n}\n\nfoo(1);```", { embed });
  */