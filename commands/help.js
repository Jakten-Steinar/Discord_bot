module.exports = async function(msg, args){
    let helpWho = msg.author.username;
    if(args.length > 0){
        helpWho = args
    }
    msg.channel.send("☠️ Help is not comming, "+ helpWho +" ☠️")
    msg.delete()
}