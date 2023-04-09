const dom = {
  calendar: document.getElementById('calendar'),
  year: document.getElementById('year'),
}

const monthLenght = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

const year = new Date().getFullYear()
dom.year.innerHTML = year

function isVisokosny(year) {
  if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) {
    return 1
  } else {
    return 0
  }
}

const months = [
  {
    title: 'Ёбаный<br>Новый год',
    name: 'Январь',
    days: 31,
  },
  {
    title: 'Ёбанный<br>холод',
    name: 'Февраль',
    days: 28 + isVisokosny(year),
  },
  {
    title: 'Ёбанный<br>грязь',
    name: 'Март',
    days: 31,
  },
  {
    title: 'Ёбанный<br>шутник',
    name: 'Апрель',
    days: 30,
  },
  {
    title: 'Ёбанный<br>день труда',
    name: 'Май',
    days: 31,
  },
  {
    title: 'Ёбанный<br>школьники',
    name: 'Июнь',
    days: 30,
  },
  {
    title: 'Ёбанный<br>жара',
    name: 'Июль',
    days: 31,
  },
  {
    title: 'Ёбанный<br>отпуск',
    name: 'Август',
    days: 31,
  },
  {
    title: 'Ёбанный<br>3 сентября',
    name: 'Сентябрь',
    days: 30,
  },
  {
    title: 'Ёбанный<br>дождь',
    name: 'Октябрь',
    days: 31,
  },
  {
    title: 'Ёбанный<br>скидки',
    name: 'Ноябрь',
    days: 30,
  },
  {
    title: 'Ёбанный<br>подарки',
    name: 'Декабрь',
    days: 31,
  },
]
function renderCalendar(year) {
  for (let i = 0; i < 12; i++) {
    renderMounth(i, year)
  }
}

function renderMounth(monthIdx, year) {
  const month = months[monthIdx]
  const monthHeadString = buildMounthHead(month.title, month.name)
  const monthWeekDaNamesString = buildWeekDaysNames()
  const monthDates = buildDates(year, monthIdx, month.days)

  const monthBox = document.createElement('div')
  monthBox.className = 'month'
  const monthContentHTML = []
  monthContentHTML.push(monthHeadString)
  monthContentHTML.push(['<div class="month__content">'])
  monthContentHTML.push(monthWeekDaNamesString)
  monthContentHTML.push(monthDates)
  monthContentHTML.push('</div>')

  monthBox.innerHTML = monthContentHTML.join('')
  dom.calendar.appendChild(monthBox)
}

function buildMounthHead(title, monthName) {
  return `
  <div class="month__title">${title}</div><div class="month__name">${monthName}</div>
  `
}

function buildWeekDaysNames() {
  const weekDayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
  const daysNames = []
  for (let i = 0; i < 7; i++) {
    const dayNameTag = `<div class="month__date month__date_weekdays">${weekDayNames[i]}</div>`
    daysNames.push(dayNameTag)
  }
  return daysNames.join('')
}

//день и месяц считается с 0
const holiDays = [
  [1, 1, 2023],
  [2, 1, 2023],
  [3, 1, 2023],
  [6, 0, 2023],
]

function isHolidays(day, month, year, holiDays, cell) {
  let isHolysDay = false

  if (cell % 7 == 0 || (cell + 1) % 7 == 0) {
    return true
  }
  holiDays.forEach((date) => {
    if (date[0] == day && date[1] == month && date[2] == year) {
      isHolysDay = true
    }
  })
  return isHolysDay
}

function buildDates(year, month, daysCount) {
  const date = new Date(year, month, 1)
  const datesHTML = []
  const weekDayStart = date.getDay()
  let i = 1
  let day = 1

  while (day <= daysCount) {
    let dateHTML
    if (i < weekDayStart || (weekDayStart == 0 && i < 7)) {
      dateHTML = buildDate('')
      datesHTML.push(dateHTML)
    } else {
      const isHoly = isHolidays(day, month, year, holiDays, i)
      dateHTML = buildDate(day, isHoly)
      datesHTML.push(dateHTML)
      day++
    }
    i++
  }
  return datesHTML.join('')
}

function buildDate(content, isAccent = false) {
  const cls = isAccent ? 'month__date month__date_accent' : 'month__date'
  return `<div class = "${cls}">${content}</div>`
}

renderCalendar(year)

const openModal = document.querySelector('openModal')
