const dayInfo = document.querySelector('.day-info')
const dayText = document.querySelector('.day-text')
const heroImage = document.querySelector('.hero-image')

const day = new Date()
const today = day.toLocaleString('pl', { weekday: 'long' })
dayInfo.textContent = today
const dayInfoPl = params => {}
// Current day info for future language settings
// const today = day.toLocaleString('en', { weekday: 'long' })
// dayInfo.textContent = today
// const today = day.toLocaleString('de', { weekday: 'long' })
// dayInfo.textContent = today

const images = [
	// opening file just from
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

const showRandomImage = () => {
	const number = Math.floor(Math.random() * images.length)
	heroImage.style.backgroundImage = images[number]
}

// showRandomImage()
document.addEventListener('DOMContentLoaded', showRandomImage)
