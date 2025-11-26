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
            throw { code: 503, message: 'Service Unavailable', spends: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        throw { code: error.status, message: error.request.res.statusMessage, spends: null };
    }
}

async function getSpendingByDate(dto){
    viteLog.debug(`getSpendingByDate(${dto.body.cardId}, ${dto.userId}) type:${dto.pathName} method invoked`);
    try{
        const request = await api.post(`/card/spend/${dto.pathName}/${dto.userId}`, dto.body);
        // viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, spends: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            throw { code: 503, message: 'Service Unavailable', spends: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        throw { code: error.status, message: error.request.res.statusMessage, spends: null };
    }
}

async function postCreate(dto){
    viteLog.debug(`postCreate(${dto.body.cardId}, ${dto.userId}) method invoked`);
    try{
        const request = await api.post(`/card/spend/create/fast/${dto.userId}`, dto.body);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, spend: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            throw { code: 503, message: 'Service Unavailable', spend: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        throw { code: error.status, message: error.request.res.statusMessage, spend: null };
    }
}

async function postSpendCreate(dto){
    viteLog.debug(`postSpendCreate(${dto.body.cardId}, ${dto.userId}) method invoked`);
    try{
        const request = await api.post(`/card/spend/create/${dto.userId}`, dto.body);
        viteLog.log('{0}', request.data);
        return { code: request.status, message: request.statusMessage, spend: request.data };
    } catch(error){
        if (error.request.res == undefined){
            viteLog.error(`Service Unavailable { code: 503 }`);
            throw { code: 503, message: 'Service Unavailable', spend: null };
        }
        viteLog.error(`${error.message} { code: ${error.status}, message: ${error.request.res.statusMessage} }`);
        throw { code: error.status, message: error.request.res.statusMessage, spend: null };
    }
}

module.exports = {
    getSpendings,
    getSpendingByDate,
    postCreate,
    postSpendCreate
};