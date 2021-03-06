const {Composer} = require("telegraf");
const {subtypeButtons} = require("./buttons");
const {sendPhone} = require("./utils")

const stepSubtype = new Composer();

Object.keys(subtypeButtons).filter(key => key !== 'rest').forEach((key) => {
  stepSubtype.action(key, async (ctx) => {
    await sendPhone(ctx);
    ctx.wizard.state.subtype = key;
    return ctx.wizard.next()
  })
})

stepSubtype.action('rest', async (ctx) => {
  await ctx.reply('Будь ласка, опишіть, що саме Вам потрібно ?')
  ctx.wizard.state.subtype = 'rest';
})

/*stepSubtype.command('start', async (ctx) => {

})*/

stepSubtype.on('message', async (ctx) => {
  console.log(ctx.wizard.state);

  if (ctx.wizard.state.type !== 'info') {
    if (ctx.message.text === '/start') {
      await ctx.scene.leave();
      return await ctx.scene.enter('super-wizard')
    }

    if (!Object.values(subtypeButtons).includes(ctx.message.text)) {
      return await ctx.reply('Виберіть розділ, який вас цікавить або введіть /start')
    }
  } else {
    ctx.wizard.state.text = ctx.message.text;
    await sendPhone(ctx);
    return ctx.wizard.next()
  }
})

/*stepSubtype.action('back', async (ctx) => {
  ctx.wizard.back();
  return ctx.wizard.steps[ctx.wizard.cursor](ctx)
})*/

module.exports.step2 = stepSubtype;