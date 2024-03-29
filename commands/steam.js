const steam = require('./../fetchSteam');

module.exports = async function(msg, command, args){
    let keyword = "";
    switch(command){
        case 'common':
            keyword = 'games';
            break;
        case 'commonid':
            keyword = 'games(ID)';
            break;
        case 'commonmp':
            keyword = 'multi-player games';
            break;
        default:
            return
    }
    function checkForDuplicates(array) {
        return new Set(array).size !== array.length
    }
    if(args.length > 1 && !(checkForDuplicates(args))){
        const emoji = ['👶','🧒','👦','👧','🧑','🧔','👨‍🦰','👩‍🦰','👩‍🦲','👴','👵']
        const names = [];
        for(let i = 0; i < args.length; i++){
            names.push(args[i] + ' ' + emoji[Math.floor(Math.random() * emoji.length)])
        }
        msg.channel.send('Finding common ' + keyword + ' for '+names.join(' '))

        var userGames =  await steam.fetchGameName(args);

        if(userGames.slice(0,3) == '@@@'){
            msg.channel.send(userGames.slice(3,userGames.length))
            msg.delete()
        }else{
            msg.channel.send('🎮 You have '+ userGames.length + ' common ' + keyword + ' 🎮')
            msg.channel.send(userGames.sort());
            msg.channel.send('🤖 Beep boop 🤖')
            msg.delete()
        }
    }else{
        msg.channel.send('🚫 You have to check minimum two individual players 🚫')
        msg.delete()
    }
}