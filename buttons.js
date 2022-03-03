const buttons = {
  volunteer: '🙋 Потрібні волонтери',
  help: '❗️ Мені або близькій людині потрібна допомога',
  info: '📢 Хочу поділитись важливою інформацією з ВСУ'
}

const buttonsNeedHelp = {
  liki: '💊 Лiки',
  stuff: '🧦 Речi',
  food: '🥪 Їжа / Вода',
  rest: '🛒 Інше',
}

const buttonsNeedVolunteer = {
  networks: '🕸 Плетіння сіток',
  stuff: '🧦 Збір речей для військових',
}

const buttonsShareInfo = {

}

const subtypeButtons = {
  ...buttonsNeedVolunteer,
  ...buttonsShareInfo,
  ...buttonsNeedHelp
}

module.exports = {
  buttons,
  subtypeButtons
}
