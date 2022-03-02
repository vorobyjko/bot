const {Composer, Markup} = require("telegraf");
const { subtypeButtons, buttons } = require("./buttons");
const { handleInvalidOption } = require("./utils");

const stepHandler = new Composer();

stepHandler.action('volunteer', async (ctx) => {
  await ctx.reply(
    'Які волонтері потрібні?',
    Markup.inlineKeyboard([
      [Markup.button.callback(`${subtypeButtons['networks']}`, 'networks')],
      [Markup.button.callback(`${subtypeButtons['stuff']}`, 'stuff')],
      /*[Markup.button.callback(`Назад`, 'back')],*/
    ])
  )
  ctx.wizard.state.type = 'volunteer';
  return ctx.wizard.next()
})
stepHandler.action('help', async (ctx) => {
  await ctx.reply(
    'Яка допомога потрібна?',
    Markup.inlineKeyboard([
      [Markup.button.callback(`${subtypeButtons['liki']}`, 'liki')],
      [Markup.button.callback(`${subtypeButtons['food']}`, 'food')],
      [Markup.button.callback(`${subtypeButtons['stuff']}`, 'stuff')],
      [Markup.button.callback(`${subtypeButtons['rest']}`, 'rest')],
      /*[Markup.button.callback(`Назад`, 'back')],*/
    ])
  )

  ctx.wizard.state.type = 'help';
  return ctx.wizard.next()
})

stepHandler.action('info', async (ctx) => {
  await ctx.reply('Про що хочете розповісти? Будь ласка, повідомляйте ліше перевірену информацію.')
  ctx.wizard.state.type = 'info';
  return ctx.wizard.next()
})

stepHandler.command('start', async (ctx) => {
  await ctx.scene.leave();
  return await ctx.scene.enter('super-wizard')
})

stepHandler.on('message', async (ctx) => {
  if (!Object.values(buttons).filter((key) => key === 'info').includes(ctx.message.text)) {
    return await handleInvalidOption(ctx);
  }
})

module.exports.step1 = stepHandler;