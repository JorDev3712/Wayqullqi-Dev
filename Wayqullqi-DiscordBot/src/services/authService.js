const api = require('../utils/api');

async function getUserByDiscordId(id){
    console.log(`[AuthService] Invoked method getUserByDiscordId(${id})`);
    try{
        const request = await api.get(`/user/discord/${id}`);
        console.log(request.data)
        return { code: request.status, message: request.statusMessage, user: request.data };
    } catch(error){
        console.log(`[AuthService] ${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, user: null };
    }
}

async function createUserByDiscord(id, user){
    console.log(`[AuthService] Invoked method createUserByDiscord(${id})`);
    try{
        const body = {
            email: `${id}@gmail.com`,
            discordUser: user,
            discordId: id
        };
        const request = await api.post(`/user/discord/create/`, body);
        return { code: request.status, message: request.statusMessage, data: request.data };
    } catch(error){
        console.log(`[AuthService] ${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, data: null };
    }
}

module.exports = {
    getUserByDiscordId,
    createUserByDiscord
};