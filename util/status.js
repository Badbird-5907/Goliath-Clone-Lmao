const cron = require('node-cron');
const mojang = require('mojang');

//Code: o = online | p = problems | d = down
global.mojangApi;
global.sessionServer;
global.isServerOnline;
global.mojangLogin;
global.textures;
global.mojangOverall;


function init(){
    console.log('Pinging mojang status API');
    mojang.status().then(status =>{
        parseMojangStatus(status)
    })
    cron.schedule('* * * * *', () => {
        console.log('Pinging mojang status API');
        mojang.status().then(status =>{
            parseMojangStatus(status);
        })
    });
}
function parseMojangStatus(json){
    if(json[1].color === 'green'){
        sessionServer = 'o';
    }else if(json[1].color === 'yellow'){
        sessionServer = 'p';
    }else{
        sessionServer = 'd';
    }
    if(json[5].color === 'green'){
        mojangApi = 'o';
    }else if(json[5].color === 'yellow'){
        mojangApi = 'p';
    }else{
        mojangApi = 'd';
    }

    if(json[6].color === 'green'){
        textures = 'o';
    }else if(json[6].color === 'yellow'){
        textures = 'p';
    }else{
        textures = 'd';
    }



    if(mojangApi === 'o' && sessionServer === 'o'){
        mojangOverall = 'Operational';
    }else {
        mojangOverall = 'Problems';
    }
    /*
    exports.MojangApi = mojangApi;
    exports.IsServerOnline = isServerOnline;
    exports.SessionServer = sessionServer;
     */
}
/*
exports.MojangApi = mojangApi;
exports.IsServerOnline = isServerOnline;
exports.SessionServer = sessionServer;

 */
module.exports.init = function (){
    init();
}
