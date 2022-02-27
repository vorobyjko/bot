const Bot = require("node-telegram-bot-api");
const MongoRepository = require("./mongo-repository")

const token = "5274584599:AAGiuOIXiVb-e764T09biw03ByqrkXwckeo"

const bot = new Bot(token, {polling: true});

const mongoClient = new MongoRepository();
mongoClient.insertRequest({'phone': '+380964545174'})

bot.setMyCommands([
  {command: '/start', description: 'начало'},
  {command: '/need_volunteer', description: 'подать запрос'},
  {command: '/need_help', description: 'подать запрос'},
  {command: '/share_info', description: 'подать запрос'},
])

const buttons = {
  volunteer: 'Мені треба волонтери (збір речей для військових, плетіння сіток, тощо)',
  help: 'мені або близькій людині треба допомога (ліки, речі, інше)',
  info: 'хочу поділитись важливою інформацією з УВС'
}

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

// bot.on('callback_query', () => )

bot.on('message', (msg) => {

  if (msg.text.includes(buttons['volunteer'])) {
    bot.sendMessage(msg.chat.id, "Яки саме волоонтери потрибни ?")
  }

  if (msg.text.includes(buttons['info'])) {
    bot.sendMessage("Яка допомога потрибна ?")
  }

  if (msg.text.includes(buttons['help'])) {
    bot.sendMessage("Про що хочете розповисти ?")
  }

})