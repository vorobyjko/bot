const Bot = require("node-telegram-bot-api");
const MongoRepository = require("./mongo-repository")

const token = "5274584599:AAGiuOIXiVb-e764T09biw03ByqrkXwckeo"

const bot = new Bot(token, {polling: true});

const mongoClient = new MongoRepository();

bot.setMyCommands([
  {command: '/start', description: 'начало'},
])

const buttons = {
  volunteer: 'Мені треба волонтери (збір речей для військових, плетіння сіток, тощо)',
  help: 'мені або близькій людині треба допомога (ліки, речі, інше)',
  info: 'хочу поділитись важливою інформацією з УВС'
}

const firstKeyboard = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{text: buttons['volunteer'], callback_data: 'need_volunteer'}],
      [{text: buttons['help'], callback_data: 'need_help'}],
      [{text: buttons['info'], callback_data: 'share_info'}],
    ]
  })
}

bot.onText(/\/start/, async (msg) => {
  await bot.sendMessage(msg.chat.id, "Welcome", firstKeyboard);
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
      "keyboard": [
        //[{text: buttons['volunteer'], callback_data: 'need_volunteer'}],
        [{text: buttons['help'], callback_data: 'need_help'}],
        [{text: buttons['info'], callback_data: 'share_info'}],
      ]
    }
  });
});

  const state = {
    step: 0,
    data: null,
  };

  const needVolunteerOptions = {
    "reply_markup": JSON.stringify({
      "keyboard": [
        [{text: 'збір речей для військових', callback_data: 'need_volunteer'}],
        [{text: 'плетіння сіток', callback_data: 'need_help'}],
        [{text: 'iнше', callback_data: 'share_info'}],
        [{text: 'назад', callback_data: 'back'}]
      ]
    })
  }

  const buttonsNeedHelp = {
    liki: 'лiки',
    stuff: 'речi',
    food: 'еда/вода',
    rest: 'iнше',
  }

  const needHelpOptions = {
    "reply_markup": {
      "keyboard": [
        [{text: buttonsNeedHelp['liki'], callback_data: buttonsNeedHelp['liki']}],
        [{text: buttonsNeedHelp['food'], callback_data: 'need_help_food'}],
        [{text: buttonsNeedHelp['stuff'], callback_data: 'need_help_stuff'}],
        [{text: buttonsNeedHelp['rest'], callback_data: 'need_help_other'}],
        [{text: 'назад', callback_data: '/start'}]
      ]
    }
  }

  const needHelpOptions1 = {
    "reply_markup": {
      "inline_keyboard": [
        [{text: 'OK', callback_data: 'OK'}],
      ]
    }
  }

  let id;


  bot.on('callback_query', (msg) => {
    // console.log('onKO', msg);

    bot.deleteMessage(msg.message.chat.id, msg.message.message_id)
    bot.sendMessage("@help_people_admin_done", msg.message.text)
  })

  /*bot.on("callback_query", async (msg) => {
    console.log(msg);

    // bot.sendContact(msg.chat.id)
    // mongoClient.insertRequest({'phone': '+380964545174', name: `${msg.first_name} ${msg.last_name}`, id: msg.id, text: 'Потрибни лики', status: 'open'})
  })*/

  bot.on('message', (msg) => {

    state.step += 1;

    if (msg.text.includes(buttons['volunteer'])) {
      return bot.sendMessage(msg.chat.id, "Що треба робити?", needVolunteerOptions)
    }

    if (msg.text.includes(buttons['help'])) {
      return bot.sendMessage(msg.chat.id,"Яка допомога потрибна ?", needHelpOptions)
    }

    if (msg.text.includes(buttons['info'])) {
      bot.sendMessage(msg.chat.id,"Про що хочете розповисти ?", needHelpOptions)
    }

    // console.log(msg);

    if (msg.text.includes('назад')) {
      return bot.sendMessage(msg.chat.id, '/start', firstKeyboard)
    }
  })

  bot.on('message', (msg) => {

    switch(msg.text) {
      case buttonsNeedHelp['liki']:
        id = msg.chat.id;

        bot.sendMessage(msg.chat.id, 'Введите ФИО:')

        // return bot.sendMessage("@help_people_admin","ТИП: Потрибна допомога - ЛИКИ ⛑\n Що потрибно: ьуыыфыв \nФИО \nМисто \nномер телефону", needHelpOptions1)
    }
  })

  bot.onText('message', (msg) => {
    console.log(msg);
    if (msg.text === 'Введите ФИО:') {
    }
  })

  bot.on('message', (msg) => {
    if (state.step === 1) {
      state.data = msg.text;
    }
  })
});





// mongoClient.insertRequest({'phone': '+380964545174'})

/*
const data = {
  phone: int,
  personal_info: string
  message: string
}*/
