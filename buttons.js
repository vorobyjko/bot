const buttons = {
  volunteer: '🙋 ‍Мені треба волонтери',
  help: '❗️ Мені або близькій людині треба допомога',
  info: '📢 Хочу поділитись важливою інформацією з ВСУ'
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

module.exports = {
  buttons,
  subtypeButtons
}
