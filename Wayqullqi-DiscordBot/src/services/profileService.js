const api = require('../utils/api');

async function getProfileById(){
    const request = await api.get('/authentication/profile/id/');
    return request.data;
}

module.exports = {
    getProfileById
};