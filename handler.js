'use strict';
const {bot} = require('./app');

module.exports.webhook = async (event) => {
    const body = JSON.parse(event.body);
    console.log('Request: ' + JSON.stringify(body));
    await bot.handleUpdate(body);
    return {statusCode: 200, body: ''};
};
