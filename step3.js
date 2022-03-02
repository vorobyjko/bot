const {Markup, Composer} = require("telegraf");
const {createTemplate} = require("./utils")

const needHelpOptions1 = {
  parse_mode: "HTML", ...Markup.inlineKeyboard([
    [Markup.button.callback(`OK`, 'ok')],
  ])
}

const stepContacts = new Composer();
stepContacts.on('contact', async (ctx) => {
  ctx.wizard.state.phone = ctx.update.message.contact.phone_number;
  ctx.wizard.state.user = `${ctx.update.message.contact.first_name} ${ctx.update.message.contact.last_name}`;

  await ctx.reply('Дякую')

  await ctx.telegram.sendMessage("@help_people_admin", createTemplate(ctx.wizard.state), needHelpOptions1)
  return ctx.scene.leave();
})

module.exports.step3 = stepContacts;