require('dotenv').config();
const SteamAPI = require('steamapi');
const steam = new SteamAPI(process.env.STEAM_TOKEN);

//Get SteamID64 by username
function getID64(username){
    return steam.resolve('https://steamcommunity.com/'+ username +'/DimGG')
}

//Gets all games in users library from users SteamID64 in JSON
function getGames(userID){
    return steam.getUserOwnedGames(userID)
}

//Gets name on game from appID
function getGameDetails(gameID){
    return steam.getGameDetails(gameID, false);
}


//#################### TRY ####################

const getUserIdTry = async username =>{
    try{
        var id = await getID64(username)
    }catch(error){
        return
    }
    return id;
}

const getGameLibraryTry = async id =>{
    try{
        var gameLibrary = await getGames(id)
    }catch(error){
        return
    }
    return gameLibrary
}

const getGameNameTry = async gameId =>{
    try {var gameName = await getGameDetails(gameId)}
    catch(error){return}
    return gameName.name;
}

const getGameTagsTry = async gameId =>{
    try {var gameTags = await getGameDetails(gameId)}
    catch(error){return}
    return gameTags;
}

//#################### FUNCTIONS ####################
var errorMessage = "";
var error = false;
//Gets profile ID
async function getPlayerId(usernames){
    let tempArray = [];
    for(const username of usernames){
        const id = await getUserIdTry(username)
        if (id == null){
            errorMessage = ("@@@🚫 Player " + username + " doesn't exist. 🚫");
            error = true;
            return
        }
        tempArray.push(id)
    };
    return tempArray
}

//Gets game library from all profiles
async function getGameLibrary(playerIdArray, usernames){
    let tempArray = [];
    for(let i = 0; i < playerIdArray.length; i++){
        let tempGameArray = [];
        let gamelist = await getGameLibraryTry(playerIdArray[i]);
        if(gamelist == null){
            errorMessage = ('@@@🚫 Player ' + usernames[i] + ' has hidden game library 🚫')
            error = true;
            return
        }
        for(const game of gamelist){
            let tempGame ={
                id : game.appID,
                name : game.name
            }
            tempGameArray.push(tempGame)
        }
        tempArray[i] = tempGameArray;
    }
    return tempArray
}
//Checks for common games
async function findCommonGames(gameIDlist, usernames){
    let tempArray = [];
    for(const gameID of gameIDlist[0]){                     //Looper gjennom alle spill til profil 1 for å finne felles
        for(let i = 1; i < usernames.length; i++){          //Looper gjennom alle andre profiler
            let tempHasCommonGame = false;         
            for(const gameIDcheck of gameIDlist[i]){        //Looper gjennom spillene til spiller [i] for å finne felles
                if((gameID.id == gameIDcheck.id) && (i == (usernames.length-1)) ){
                    let tempGame = {
                    id : gameID.id,
                    name : gameID.name,
                    }
                    tempArray.push(tempGame);
                    tempHasCommonGame = true;
                    break;
                }else if(gameID.id == gameIDcheck.id){
                    tempHasCommonGame = true;
                    break
                }
            }
            if(!tempHasCommonGame){
                break
            }
        }  
    }
    //console.log(tempArray)
    return tempArray;
}
//gets game name
async function getGameNames(commonGamesId){
    let tempArray = []
    for(const game of commonGamesId){
        const gameName = await getGameNameTry(game);
        if(gameName != null){
            tempArray.push(gameName);
        }
    }
    return tempArray
}

async function getGameTags(commonGamesId){
    let tempArray = []
    for(const game of commonGamesId){
        const gameTags = await getGameTagsTry(game.id);
        if(gameTags != null){
            tempArray.push(gameTags);
        }
    }
    return tempArray
}

async function getCommonGamesID(usernames){
    let playerIdArray = await getPlayerId(usernames)
    if(playerIdArray == null){console.log('❌ Did not find player'); return errorMessage}
    console.log("✔️  Found all player's id")

    let gameIDlist = await getGameLibrary(playerIdArray, usernames)
    if(gameIDlist == null){console.log('❌ Did not find game library'); return errorMessage}
    console.log("✔️  Found all players games")
    
    let commonGamesId = await findCommonGames(gameIDlist, usernames)
    console.log("✔️  Found all common games id")

    return commonGamesId
}

async function getCommonGamesName(usernames){
    let commonGamesId = await getCommonGamesID(usernames)
    if(error){return errorMessage}
    /*
    let commonGamesName = await getGameNames(commonGamesId)
    console.log("✔️  Found all common games names")
    */
    let commonGamesName = [];
    for(game of commonGamesId){
        //console.log(game.name)
        commonGamesName.push(game.name)
    }
    return commonGamesName
}

async function getCommonMultiplayerGames(usernames){
    let commonGamesId = await getCommonGamesID(usernames)
    if(error){return errorMessage}

    let CommonMultiplayerGames = []
    const targetTag = 1 //1 = Multi-player || 9 = coop
    let CommonGamesDetails = await getGameTags(commonGamesId)
    
    for(const game of CommonGamesDetails){
        for(const tag of game.categories){
            if(tag.id == targetTag){
                CommonMultiplayerGames.push(game.name)
            }
        }
    }
    
    return CommonMultiplayerGames
}

async function getRandomGame(player){
    if(player.length != 1){
        console.log('❌ Too many or too few usernames')
        return ("@@@🚫 Has to be one and only one player 🚫");
    }
    console.log("✔️  Right amount of players")
    let playerId = await getPlayerId(player)
    if(playerId == null){console.log('❌ Did not find player'); return errorMessage}
    console.log("✔️  Found all player's id")

    let gameList = await getGameLibraryTry(playerId);
    let randomGame = gameList[Math.floor(Math.random() * gameList.length)]
    
    return randomGame
    /*
    Game {
        name: 'Shadows 2: Perfidia',
        appID: 606330,
        playTime: 0,
        playTime2: 0,
        logoURL: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/606330/1c83967692435c8b0a22810f684c20243e4df593.jpg',
        iconURL: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/606330/6dee631064d4e5611e10db07deaf64292a38b6d9.jpg' 
    }
    */
}

async function getRandomNewGame(){

}

//############## Test while dev
async function testGameDetail(){
    let rgameDetails = await getGameDetails(1085660);
    console.log(rgameDetails);
}
//testGameDetail();

//testing if the bot works
async function doesItWork(){
    //const inputNames = ['jakten', 'frylama', 'hludde', 'tonjeokland'];
    const inputNames = ['jakten'] 
    const temp = await getRandomGame(inputNames);
    console.log(temp)
    console.log("✔️  Does it work test");

}
//doesItWork();

module.exports = {
    fetchGameName: async function(inputNames){
        error = false; errorMessage = ""
        return getCommonGamesName(inputNames)
    },
    fetchGameId: async function(inputName){
        error = false; errorMessage = ""
        return getCommonGamesID(inputName)
    },
    fetchMultiplayerGame: async function(inputName){
        error = false; errorMessage = ""
        return getCommonMultiplayerGames(inputName);
    },
    fetchRandomGame: async function(inputName){
        error = false; errorMessage = ""
        return getRandomGame(inputName)
    }
}