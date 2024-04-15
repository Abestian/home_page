// initialization of variables
let dayInfo
let dayTemp
let weatherIcon
let dayLocation
let backgroundImg
let settBtn
let settPnl
let settHead
let settings
let langPol
let langEng
let langDe
let langTitle
let savedTabsBtn
let savedTabsPnl
let savedTabsHead
let chevronBtn
let savedLink
let alignTitle
let alignmentLeft
let alignmentCenter
let alignmentRight

let currentLanguage = 'en'
let currentAlignment = 'center'

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=fa1b99a11c5fb61b27c8788d58aeb523'
const API_UNITS = '&units=metric'

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
	alignCenter()
}

// function that downloads elements from html file and sets them to previously created variables
const prepareDOMElements = () => {
	dayInfo = document.querySelector('.day-info')
	backgroundImg = document.querySelector('.background-picture')
	settBtn = document.querySelector('.settings-button')
	settPnl = document.querySelector('.settings-panel')
	settHead = document.querySelector('.settings-header')
	settings = document.querySelector('.settings')
	langPol = document.querySelector('.lang-polish')
	langEng = document.querySelector('.lang-english')
	langDe = document.querySelector('.lang-deutsch')
	langTitle = document.querySelector('.lang-title')
	savedTabsBtn = document.querySelector('.savedtabs-button')
	savedTabsPnl = document.querySelector('.savedtabs-panel')
	savedTabsHead = document.querySelector('.savedtabs-header')
	chevronBtn = document.querySelector('.fa-chevron-up')
	savedLink = document.querySelectorAll('.saved-link')
	alignTitle = document.querySelector('.link-align')
	alignmentLeft = document.querySelector('.align-left')
	alignmentCenter = document.querySelector('.align-center')
	alignmentRight = document.querySelector('.align-right')
	dayLocation = document.querySelector('.day-location')
	dayTemp = document.querySelector('.day-temperature')
	weatherIcon = document.querySelector('.weather-icon')
}
// function that adds event listeners
const prepareDOMEvents = () => {
	settBtn.addEventListener('click', showSettingsPanel)
	settings.addEventListener('click', checkClickSettings)
	savedTabsBtn.addEventListener('click', showSavedTabsPanel)
}

// function that choses a random background for the home page
const randomBackground = () => {
	const images = [
		"url('images/avenue_1920.jpg')",
		"url('images/currants-7312724_1920.jpg')",
		"url('images/fog-4275560_1920.jpg')",
		"url('images/hills-615429_1920.jpg')",
		"url('images/mountains-6972216_1920.jpg')",
		"url('images/night-3078326_1920.jpg')",
		"url('images/sand-dunes-7709400_1920.jpg')",
		"url('images/thin-2902686_1920.jpg')",
		"url('images/waterfall_1920.jpg')",
	]
	// random element from an array
	const number = Math.floor(Math.random() * images.length)
	backgroundImg.style.backgroundImage = images[number]
}

// function that displays current day based on set language
const showCurrentDay = language => {
	const day = new Date()
	let locale
	let text
	switch (language) {
		case 'en':
			locale = 'en'
			break
		case 'pl':
			locale = 'pl'
			break
		case 'de':
			locale = 'de'
			break
		default:
			locale = 'en'
			break
	}
	const today = day.toLocaleString(locale, { weekday: 'long' })
	dayInfo.textContent = today
}

// function that gets information from weather API and displays it in a daily info panel

const weatherInfo = () => {
	const city = 'Wrocław'
	const URL = API_LINK + city + API_KEY + API_UNITS

	const now = new Date()
	const hours = now.getHours()

	axios.get(URL).then(res => {
		const temp = res.data.main.temp
		const status = Object.assign({}, ...res.data.weather)

		dayLocation.textContent = city
		dayTemp.textContent = Math.floor(temp) + '℃'

		if (status.id >= 200 && status.id < 300) {
			weatherIcon.classList.add('fa-bolt-lightning')
		} else if (status.id >= 300 && status.id < 400) {
			weatherIcon.classList.add('fa-cloud-rain')
		} else if (status.id >= 500 && status.id < 700) {
			weatherIcon.classList.add('fa-cloud-showers-heavy')
		} else if (status.id >= 600 && status.id < 700) {
			weatherIcon.classList.add('fa-snowflake')
		} else if (status.id >= 700 && status.id < 800) {
			weatherIcon.classList.add('fa-tornado')
		} else if (status.id === 800) {
			if (hours < 22 && hours > 5) {
				weatherIcon.classList.add('fa-sun')
			} else {
				weatherIcon.classList.add('fa-moon')
			}
		} else if (status.id > 800 && status.id < 900) {
			weatherIcon.classList.add('fa-cloud')
		} else {
			weatherIcon.classList.add('fa-circle-question')
		}
	})
}

// function that checks what option is clicked in settings panel
const checkClickSettings = e => {
	if (e.target.matches('.lang-polish')) {
		setPolishLanguage()
		showCurrentDay(currentLanguage)
	} else if (e.target.matches('.lang-english')) {
		setEnglishLanguage()
		showCurrentDay(currentLanguage)
	} else if (e.target.matches('.lang-deutsch')) {
		setDeutschLanguage()
		showCurrentDay(currentLanguage)
	} else if (e.target.matches('.align-left')) {
		alignLeft()
	} else if (e.target.matches('.align-center')) {
		alignCenter()
	} else if (e.target.matches('.align-right')) {
		alignRight()
	}
}

// three next functions account for setting texts and panels in a chosen language
const setPolishLanguage = () => {
	currentLanguage = 'pl'
	langPol.classList.add('active-setting')
	langDe.classList.remove('active-setting')
	langEng.classList.remove('active-setting')

	settHead.textContent = 'Ustawienia'
	langTitle.textContent = 'Język:'
	langEng.textContent = 'Angielski'
	langPol.textContent = 'Polski'
	langDe.textContent = 'Niemiecki'

	alignTitle.textContent = 'Wyrównaj zapisane karty do: '
	alignmentLeft.textContent = 'Lewej'
	alignmentCenter.textContent = 'Środka'
	alignmentRight.textContent = 'Prawej'

	savedTabsHead.textContent = 'Zapisane Karty'
}
const setEnglishLanguage = () => {
	currentLanguage = 'en'
	langEng.classList.add('active-setting')
	langDe.classList.remove('active-setting')
	langPol.classList.remove('active-setting')

	settHead.textContent = 'Settings'
	langTitle.textContent = 'Language:'
	langEng.textContent = 'English'
	langPol.textContent = 'Polish'
	langDe.textContent = 'German'

	alignTitle.textContent = 'Align saved tabs: '
	alignmentLeft.textContent = 'Left'
	alignmentCenter.textContent = 'Center'
	alignmentRight.textContent = 'Right'

	savedTabsHead.textContent = 'Saved Tabs'
}

const setDeutschLanguage = () => {
	currentLanguage = 'de'
	langDe.classList.add('active-setting')
	langPol.classList.remove('active-setting')
	langEng.classList.remove('active-setting')

	settHead.textContent = 'Einstellungen'
	langTitle.textContent = 'Sprache:'
	langEng.textContent = 'Englisch'
	langPol.textContent = 'Polnisch'
	langDe.textContent = 'Deutsch'

	alignTitle.textContent = 'Gespeicherte Ausrichtung der Tabs: '
	alignmentLeft.textContent = 'Links'
	alignmentCenter.textContent = 'Zentrum'
	alignmentRight.textContent = 'Rechts'

	savedTabsHead.textContent = 'Gespeicherte Tabs'
}

// function that toggles setting panel
const showSettingsPanel = () => {
	settPnl.classList.toggle('show')
	settBtn.classList.toggle('gear-turn')
}

// function that toggles saved tabs panel
const showSavedTabsPanel = () => {
	savedTabsPnl.classList.toggle('active-savedtabs')
	savedTabsBtn.classList.toggle('active-savedtabsbtn')
	chevronBtn.classList.toggle('chevron-rotate')
}

// three next functions align links in saved tabs to left/center/right
const alignLeft = () => {
	savedLink.forEach(link => {
		link.classList.add('align-left')
		link.classList.remove('align-center')
		link.classList.remove('align-right')
	})
	alignmentLeft.classList.add('active-alignment')
	alignmentCenter.classList.remove('active-alignment')
	alignmentRight.classList.remove('active-alignment')
}
const alignCenter = () => {
	savedLink.forEach(link => {
		link.classList.add('align-center')
		link.classList.remove('align-left')
		link.classList.remove('align-right')
	})
	alignmentCenter.classList.add('active-alignment')
	alignmentLeft.classList.remove('active-alignment')
	alignmentRight.classList.remove('active-alignment')
}
const alignRight = () => {
	savedLink.forEach(link => {
		link.classList.add('align-right')
		link.classList.remove('align-center')
		link.classList.remove('align-left')
	})
	alignmentRight.classList.add('active-alignment')
	alignmentLeft.classList.remove('active-alignment')
	alignmentCenter.classList.remove('active-alignment')
}

// event listeners that run functions as soon as the web page is opened
document.addEventListener('DOMContentLoaded', main)
document.addEventListener('DOMContentLoaded', setEnglishLanguage)
document.addEventListener('DOMContentLoaded', randomBackground)
document.addEventListener('DOMContentLoaded', weatherInfo)
document.addEventListener('DOMContentLoaded', () => {
	showCurrentDay(currentLanguage)
})
