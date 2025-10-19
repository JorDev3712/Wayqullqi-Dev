const axios = require("axios");

const username = process.env.API_USER;
const password = process.env.API_PASSWORD;

const api = axios.create({
    baseURL: process.env.API_URL,
    method: 'get' | 'post' | 'put' | 'delete',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.API_TOKEN}`
    },
    params: { limit: 10 }, // para query params (ejemplo: ?limit=10)
    timeout: 5000, // ms
    auth: { username, password },
    responseType: 'json',
});

module.exports = api;
