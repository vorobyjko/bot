const {Telegraf, Markup, Scenes, session} = require('telegraf');
const {step1} = require('./step1');
const {step2} = require('./step2');
const {step3} = require('./step3');
const {buttons} = require('./buttons');

const token = "5274584599:AAGiuOIXiVb-e764T09biw03ByqrkXwckeo";

// const token = "5106440159:AAHpYkNKTzf48MXtu3q0Dnw46ts2NHhUJIE"

async function handleInvalidOption(ctx) {
  // await ctx.reply('Оберіть будь-ласка варіант зі спіску')
  // return ctx.wizard.back();
  // return ctx.wizard.back();
  // ctx.wizard.cursor = 2
  // ctx.wizard.back();
  // ctx.wizard.back();
  // console.log(ctx.wizard.steps[ctx.wizard.cursor]);
  // return ctx.wizard.steps[2](ctx);
}

const superWizard = new Scenes.WizardScene(
  'super-wizard',
  async (ctx) => {
    await ctx.reply(
      'МЕНЮ',
      Markup.inlineKeyboard(
        [
          [Markup.button.callback(`${buttons['volunteer']}`, 'volunteer')],
          [Markup.button.callback(`${buttons['help']}`, 'help')],
          [Markup.button.callback(`${buttons['info']}`, 'info')],
        ]
      )
    )
    return ctx.wizard.next()
  },
  step1,
  step2,
  step3,
)

const stage = new Scenes.Stage([superWizard], {
  default: 'super-wizard',
})

const bot = new Telegraf(token)

bot.action('ok', async (ctx) => {
  return await ctx.tg.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id)
})

bot.use(session())
bot.use(stage.middleware())
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports.bot = bot;