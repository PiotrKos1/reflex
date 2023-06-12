const start = document.querySelector('.start')
const reset = document.querySelector('.reset')
const score = document.querySelector('.score')
const squares = document.querySelectorAll('.square')
const points = document.querySelector('.point')
const chances = document.querySelector('.chance')
const squaresField = document.querySelector('.game-section')
const squaresArr = [...squares]
let colorInterval
let timeInterval
let removeInterval
let square
let point = 0
let chance = 3

const clickEmptySquare = event => {
	if (event.target !== square && event.target !== event.currentTarget) {
		console.log('yeeaa')
		decreaseChance()
		clearTimeout(removeInterval)
		square.classList.remove('active')
	}
}

const handleEmptySquares = () => {
	squaresField.addEventListener('click', clickEmptySquare, { once: true })
}

const handleClickSquare = () => {
	square.addEventListener('click', increasePoint)
}

const removeHandleClickSquare = () => {
	square.removeEventListener('click', increasePoint)
}

const colorSquare = () => {
	handleEmptySquares()
	const squareIndex = Math.floor(Math.random() * squaresArr.length)
	square = squaresArr[squareIndex]
	square.classList.add('active')
	handleClickSquare()

	colorInterval = setTimeout(colorSquare, 3000)
	removeInterval = setTimeout(removeColorSquare, 2000)
}

const removeColorSquare = () => {
	console.log('remove')
	removeHandleClickSquare()
	square.classList.remove('active')
	decreaseChance()
}

const intervalColorSquare = () => {
	startTimer(60)
	colorInterval = setTimeout(colorSquare, 3000)
}

const startTimer = count => {
	if (count >= 0) {
		score.textContent = count
		count--
		timeInterval = setTimeout(() => {
			startTimer(count)
		}, 1000)
	}
}

const resetGame = () => {
	square.classList.remove('active')
	clearTimeout(timeInterval)
	clearTimeout(colorInterval)
	clearTimeout(removeInterval)
	chance = 3
	point = 0
	chances.textContent = ' ' + chance
	points.textContent = ' ' + point
	score.textContent = ' ' + 60
}

const increasePoint = () => {
	console.log('na click')
	clearTimeout(removeInterval)

	if (square.classList.contains('active')) {
		point++
		points.textContent = ' ' + point
		removeHandleClickSquare()
	} else decreaseChance()
	square.classList.remove('active')
}

const decreaseChance = () => {
	if (chance > 1) {
		chance--
		alert('Straciłeś życie')
		chances.textContent = ' ' + chance
	} else {
		resetGame()
		alert('Koniec gry')
	}
}

start.addEventListener('click', intervalColorSquare)
reset.addEventListener('click', resetGame)
