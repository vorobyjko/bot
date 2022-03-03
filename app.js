const {Telegraf, Markup, Scenes, session} = require('telegraf');
const {step1} = require('./step1');
const {step2} = require('./step2');
const {step3} = require('./step3');
const {buttons} = require('./buttons');

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

// const bot = new Telegraf(process.env.TOKEN)
//const bot = new Telegraf(process.env.TOKEN)
const bot = new Telegraf(process.env.TOKEN, {
    telegram: { webhookReply: false }
})

bot.action('ok', async (ctx) => {
  // const text = '✅ ВИКОНАНО\n' + ctx.update.callback_query.message.text;
  await ctx.tg.sendMessage("@help_people_admin_done", ctx.update.callback_query.message.text);
  await ctx.tg.sendMessage(ctx.from.id, '✅ Ваша заявка була успішно виконана!');
  return ctx.tg.deleteMessage(ctx.update.callback_query.message.chat.id, ctx.update.callback_query.message.message_id);
})

bot.use(session())
bot.use(stage.middleware())

//bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

module.exports.bot = bot;