const dayInfo = document.querySelector('.day-info')
const dayText = document.querySelector('.day-text')

const day = new Date()
const today = day.toLocaleString('pl', { weekday: 'long' })
dayInfo.textContent = today
const dayInfoPl = params => {}
// Current day info for future language settings
// const today = day.toLocaleString('en', { weekday: 'long' })
// dayInfo.textContent = today
// const today = day.toLocaleString('de', { weekday: 'long' })
// dayInfo.textContent = today
