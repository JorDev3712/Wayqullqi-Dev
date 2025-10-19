const api = require('../utils/api');
const viteLog = require('../utils/logger').createContext('AuthService');

async function getUserByDiscordId(id){
    viteLog.debug(`Invoked method getUserByDiscordId(${id})`);
    try{
        const request = await api.get(`/user/discord/${id}`);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, user: request.data };
    } catch(error){
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, user: null };
    }
}

async function createUserByDiscord(id, user){
    viteLog.debug(`Invoked method createUserByDiscord(${id})`);
    try{
        const body = {
            email: `${id}@gmail.com`,
            discordUser: user,
            discordId: id
        };
        const request = await api.post(`/user/discord/create/`, body);
        return { code: request.status, message: request.statusMessage, data: request.data };
    } catch(error){
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, data: null };
    }
}

module.exports = {
    getUserByDiscordId,
    createUserByDiscord
};