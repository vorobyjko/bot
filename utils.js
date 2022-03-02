const {subtypeButtons} = require("./buttons");

const mapButtonsForAdmin = {
  volunteer: '🙋 ПОТРІБНІ ВОЛОНТЕРИ',
  help: '❗️ ПОТРІБНА ДОПОМОГА',
  info: '📢️ ВАЖЛИВА ІНФОРМАЦІЯ ДЛЯ ВСУ'
}

const createTemplate = (data) => {
  const date = new Date();
  return `
<b>ДАТА:</b> ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
<b>ТИП:</b> ${handleType(data.type, data.subtype)}
<b>USER:</b> ${data.user}
<b>НОМЕР ТЕЛЕФОНУ:</b> ${data.phone}
${data.text ? 'ОПИС:' + data.text : ''}     
`.trim()
}

const sendPhone = async (ctx) => {
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

const handleType = (type, subtype) => {
  let res = mapButtonsForAdmin[type];

  if (subtype) {
    res += ' / ' + subtypeButtons[subtype];
  }

  return res;
}

module.exports = {
  createTemplate,
  sendPhone
}