const api = require('../utils/api');
const viteLog = require('../utils/logger').createContext('AuthService');

async function getUser(id){
    viteLog.debug(`getUser(${id}) method invoked`);
    try{
        const request = await api.get(`/user/${id}`);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, user: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            throw { code: 503, message: 'Service Unavailable', user: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        throw { code: error.status, message: error.request.res.statusMessage, user: null };
    }
}

async function getUserByDiscordId(dcId){
    viteLog.debug(`getUserByDiscordId(${dcId}) method invoked`);
    try{
        const request = await api.get(`/user/discord/${dcId}`);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, user: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            throw { code: 503, message: 'Service Unavailable', user: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        throw { code: error.status, message: error.request.res.statusMessage, user: null };
    }
}

async function createUserByDiscord(dcId, nickname, user){
    viteLog.debug(`createUserByDiscord(${dcId}) method invoked`);
    try{
        const body = {
            discordNick: nickname,
            discordUser: user,
            discordId: id
        };
        const request = await api.post(`/user/discord/create/`, body);
        return { code: request.status, message: request.statusMessage, data: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            throw { code: 503, message: 'Service Unavailable', data: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        throw { code: error.status, message: error.request.res.statusMessage, data: null };
    }
}

async function putDeleteAccount(dto){
    viteLog.debug(`putDeleteAccount(${dto.body.discordId}) method invoked`);
    try{
        const request = await api.put(`/user/discord/delete`, dto.body);
        return { code: request.status, message: request.statusMessage, data: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            throw { code: 503, message: 'Service Unavailable', data: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        throw { code: error.status, message: error.request.res.statusMessage, data: null };
    }
}

module.exports = {
    getUser,
    getUserByDiscordId,
    createUserByDiscord,
    putDeleteAccount
};