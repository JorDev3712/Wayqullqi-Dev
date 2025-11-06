const api = require('../utils/api');
const viteLog = require('../utils/logger').createContext('MoneySpentService');

async function getSpendings(cardId, userId){
    viteLog.debug(`getSpendings(${cardId}, ${userId}) method invoked`);
    try{
        const request = await api.get(`/card/spend/all/${userId}/${cardId}`);
        return { code: request.status, message: request.statusMessage, spends: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            return { code: 503, message: 'Service Unavailable', spends: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, spends: null };
    }
}

async function postCreate(cardId, userId, name, amount){
    viteLog.debug(`postCreate(${cardId}, ${userId}) method invoked`);
    try{
        const body = {
            cardId,
            name,
            amount
        };
        const request = await api.post(`/card/spend/create/${userId}`, body);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, spend: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            return { code: 503, message: 'Service Unavailable', spend: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        return { code: error.status, message: error.request.res.statusMessage, spend: null };
    }
}

module.exports = {
    getSpendings,
    postCreate,
};