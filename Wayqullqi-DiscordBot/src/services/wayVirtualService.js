const api = require('../utils/api');
const viteLog = require('../utils/logger').createContext('WayVirtualService');

async function getCards(userId){
    viteLog.debug(`getCards(${userId}) method invoked`);
    try{
        const request = await api.get(`/card/all/${userId}`);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, cards: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            return { code: 503, message: 'Service Unavailable', cards: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, cards: null };
    }
}

async function getCardOne(cardId, userId){
    viteLog.debug(`getCardOne(${cardId}, ${userId}) method invoked`);
    try{
        const request = await api.get(`/card/user/${userId}/${cardId}`);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, card: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            return { code: 503, message: 'Service Unavailable', card: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, card: null };
    }
}

module.exports = {
    getCards,
    getCardOne,
};