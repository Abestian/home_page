// initialization of variables
let dayInfo
let dayText
let backgroundImg
let settBtn
let settPnl
let settHead
let languageSettings
let langPol
let langEng
let langDe
let langTitle

let currentLanguage = 'en'

const main = () => {
	prepareDOMElements()
	prepareDOMEvents()
}

// function that downloads elements from html file and sets them to previously created variables
const prepareDOMElements = () => {
	dayInfo = document.querySelector('.day-info')
	dayText = document.querySelector('.day-text')
	backgroundImg = document.querySelector('.background-picture')
	settBtn = document.querySelector('.settings-button')
	settPnl = document.querySelector('.settings-panel')
	settHead = document.querySelector('.settings-header')
	languageSettings = document.querySelector('.language-settings')
	langPol = document.querySelector('.lang-polish')
	langEng = document.querySelector('.lang-english')
	langDe = document.querySelector('.lang-deutsch')
	langTitle = document.querySelector('.lang-title')
}
// function that adds event listeners
const prepareDOMEvents = () => {
	settBtn.addEventListener('click', showSettingsPanel)
	languageSettings.addEventListener('click', checkClick)
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
			text = 'Today is: '
			break
		case 'pl':
			locale = 'pl'
			text = 'Dziś jest: '
			break
		case 'de':
			locale = 'de'
			text = 'Heute ist: '
			break
		default:
			locale = 'en'
			text = 'Today is: '
			break
	}
	const today = day.toLocaleString(locale, { weekday: 'long' })
	dayText.textContent = text
	dayInfo.textContent = today
}

const checkClick = e => {
	if (e.target.matches('.lang-polish')) {
		setPolishLanguage()
		showCurrentDay(currentLanguage)
	} else if (e.target.matches('.lang-english')) {
		setEnglishLanguage()
		showCurrentDay(currentLanguage)
	} else if (e.target.matches('.lang-deutsch')) {
		setDeutschLanguage()
		showCurrentDay(currentLanguage)
	}
}

// three next functions account for setting texts and panels in a chosen language
const setPolishLanguage = () => {
	currentLanguage = 'pl'
	langPol.classList.add('active-language')
	langDe.classList.remove('active-language')
	langEng.classList.remove('active-language')

	settHead.textContent = 'Ustawienia'
	langTitle.textContent = 'Język:'
	langEng.textContent = 'Angielski'
	langPol.textContent = 'Polski'
	langDe.textContent = 'Niemiecki'
}
const setEnglishLanguage = () => {
	currentLanguage = 'en'
	langEng.classList.add('active-language')
	langDe.classList.remove('active-language')
	langPol.classList.remove('active-language')

	settHead.textContent = 'Settings'
	langTitle.textContent = 'Language:'
	langEng.textContent = 'English'
	langPol.textContent = 'Polish'
	langDe.textContent = 'German'
}

const setDeutschLanguage = () => {
	currentLanguage = 'de'
	langDe.classList.add('active-language')
	langPol.classList.remove('active-language')
	langEng.classList.remove('active-language')

	settHead.textContent = 'Einstellungen'
	langTitle.textContent = 'Sprache:'
	langEng.textContent = 'Englisch'
	langPol.textContent = 'Polnisch'
	langDe.textContent = 'Deutsch'
}

// function that toggles setting panel (also make the gear turn)
const showSettingsPanel = () => {
	settPnl.classList.toggle('show')
	settBtn.classList.toggle('gear-turn')
}

// event listeners that run functions as soon as the web page is opened
document.addEventListener('DOMContentLoaded', main)
document.addEventListener('DOMContentLoaded', setEnglishLanguage)
document.addEventListener('DOMContentLoaded', randomBackground)
document.addEventListener('DOMContentLoaded', () => {
	showCurrentDay(currentLanguage)
})
