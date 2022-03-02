'use strict';
const { Telegraf } = require('telegraf')

module.exports.webhook = async (event) => {
    const body = JSON.parse(event.body);

    const bot = new Telegraf("5106440159:AAHpYkNKTzf48MXtu3q0Dnw46ts2NHhUJIE");
    bot.hears('hi', ctx => ctx.reply('Hello from bot'));

    console.log(body);
    console.log('Request: ' + JSON.stringify(body));
    await bot.handleUpdate(body);
    return {statusCode: 200, body: ''};
};
