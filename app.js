const { Telegraf,Markup, Scenes ,session , Composer} = require('telegraf');

// const token = "5274584599:AAGiuOIXiVb-e764T09biw03ByqrkXwckeo"
const token = "5106440159:AAHpYkNKTzf48MXtu3q0Dnw46ts2NHhUJIE"

function createTemplate(data) {
  const date = new Date();
  return `
   ДАТА: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
   ТИП: ${data.type} / ${subtypeButtons[data.subtype]}
   USER: ${data.user}
   НОМЕР ТЕЛЕФОНУ: ${data.phone}
   ${data.text ? 'ОПИС:' + data.text : ''}     
  `
}

async function sendPhone(ctx) {
  return ctx.reply('Залиште Ваші контакти', {
    reply_markup: {
      keyboard: [
        [
          {
            text: "📲 Залишити свої контакті",
            request_contact: true,
          },
        ],
      ],
      one_time_keyboard: true,
    },
  })
}


const buttons = {
  volunteer: '🙋 ‍Мені треба волонтери',
  help: '❗️ Мені або близькій людині треба допомога',
  info: '📢 Хочу поділитись важливою інформацією з УВС'
}

const buttonsNeedHelp = {
  liki: '💊 лiки',
  stuff: '🧦 речi',
  food: '🥪 їжа/вода',
  rest: '🛒 iнше',
}

const buttonsNeedVolunteer = {
  networks: '🕸 плетіння сіток',
  stuff: '🧦 збір речей для військових',
}

const buttonsShareInfo = {

}

const subtypeButtons = {
  ...buttonsNeedVolunteer,
  ...buttonsShareInfo,
  ...buttonsNeedHelp
}

const stepHandler = new Composer();
stepHandler.action('volunteer', async (ctx) => {
  await ctx.reply(
    'Які волонтері потрібні?',
    Markup.inlineKeyboard([
      [Markup.button.callback(`${buttonsNeedVolunteer['networks']}`, 'networks')],
      [Markup.button.callback(`${buttonsNeedVolunteer['stuff']}`, 'stuff')],
    ])
  )
  ctx.wizard.state.type = 'ДОПОМОГА';
  return ctx.wizard.next();
})
stepHandler.action('help', async (ctx) => {
  await ctx.reply(
    'Яка допомога потрібна?',
    Markup.inlineKeyboard([
      [Markup.button.callback(`${buttonsNeedHelp['liki']}`, 'liki')],
      [Markup.button.callback(`${buttonsNeedHelp['food']}`, 'food')],
      [Markup.button.callback(`${buttonsNeedHelp['stuff']}`, 'stuff')],
      [Markup.button.callback(`${buttonsNeedHelp['rest']}`, 'rest')],
      [Markup.button.callback(`back`, 'back')],
    ])
  )

  ctx.wizard.state.type = 'ДОПОМОГА';
  return ctx.wizard.next()
})

async function handleInvalidOption(ctx) {
  // await ctx.reply('Оберіть будь-ласка варіант зі спіску')
  // return ctx.wizard.back();
  // console.log(ctx.wizard.steps);
  // console.log(ctx.wizard.cursor);
  // return ctx.wizard.back();
  // ctx.wizard.cursor = 2
  // ctx.wizard.back();
  // ctx.wizard.back();
  // console.log(ctx.wizard.steps[ctx.wizard.cursor]);
  // return ctx.wizard.steps[2](ctx);
}

stepHandler.on('message', async (ctx) => {
  if (!Object.values(buttons).includes(ctx.message.text)) {
    return await handleInvalidOption(ctx);
  }
})

const stepSubtype = new Composer();

Object.keys(subtypeButtons).filter(key => key !== 'rest').forEach((key) => {
  stepSubtype.action(key, async (ctx) => {
    await sendPhone(ctx);
    ctx.wizard.state.subtype = key;
    return ctx.wizard.next()
  })
})

stepSubtype.action('rest', async (ctx) => {
  await ctx.reply('Будь ласка, опишіть, що саме вам потрібно ?')
  ctx.wizard.state.subtype = 'rest';
})

stepSubtype.on('message', async (ctx) => {
  if (!Object.values(subtypeButtons).includes(ctx.message.text)) {
    await ctx.reply('Оберіть будь-ласка варіант зі спіску')
    ctx.wizard.selectStep(1)
    console.log(ctx.wizard.cursor);
    return ctx.wizard.steps[ctx.wizard.cursor](ctx)
    // return ctx.wizard.steps[ctx.wizard.cursor].handler(ctx);

  }

  ctx.wizard.state.text = ctx.message.text;
  await sendPhone(ctx);
  return ctx.wizard.next()
})

stepSubtype.action('back', async (ctx) => {
  ctx.wizard.back();
  return ctx.wizard.steps[ctx.wizard.cursor](ctx)
})


const needHelpOptions1 = Markup.inlineKeyboard([
  [Markup.button.callback(`OK`, 'ok')],
])

const stepContacts = new Composer();
stepContacts.on('contact', async (ctx) => {
  ctx.wizard.state.phone = ctx.message.contact.phone_number;
  ctx.wizard.state.user = `${ctx.message.contact.first_name} ${ctx.update.contact.last_name}`;

  await ctx.reply('Дякую')

  await ctx.telegram.sendMessage("@help_people_admin", createTemplate(ctx.wizard.state), needHelpOptions1)
  return ctx.scene.leave();
})

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
  stepHandler,
  stepSubtype,
  stepContacts,
)

const bot = new Telegraf(token)

const stage = new Scenes.Stage([superWizard], {
  default: 'super-wizard',
})

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