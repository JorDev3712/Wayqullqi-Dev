const api = require('../utils/api');
const viteLog = require('../utils/logger').createContext('WayVirtualService');

async function getCards(userId){
    viteLog.debug(`Invoked method getCards(${userId})`);
    try{
        const request = await api.get(`/card/all/${userId}`);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, cards: request.data };
    } catch(error){
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, cards: null };
    }
}

async function getCardOne(cardId, userId){
    viteLog.debug(`Invoked method getCardOne(${cardId}, ${userId})`);
    try{
        const request = await api.get(`/card/user/${userId}/${cardId}`);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, card: request.data };
    } catch(error){
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, card: null };
    }
}

module.exports = {
    getCards,
    getCardOne,
};