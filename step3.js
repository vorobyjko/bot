const {Markup, Composer} = require("telegraf");
const {createTemplate} = require("./utils")

const stepContacts = new Composer();
stepContacts.on('contact', async (ctx) => {
  ctx.wizard.state.phone = ctx.update.message.contact.phone_number;
  ctx.wizard.state.user = `${ctx.update.message.contact.first_name} ${ctx.update.message.contact.last_name}`;

  await ctx.reply("✅ Заявка прийнята!\nНаші модератори обов'язково розглянуть її найближчім часом.\nСЛАВА УКРАЇНІ! 🇺🇦❤️")

  const options = {
    parse_mode: "HTML", ...Markup.inlineKeyboard([
      [Markup.button.callback(`OK`, `ok_${ctx.message.chat.id}`)],
    ])
  }

  console.log(`ok_${ctx.message.chat.id}`)

  await ctx.scene.leave();
  return ctx.telegram.sendMessage("@help_people_admin", createTemplate(ctx.wizard.state), options)
})

module.exports.step3 = stepContacts;