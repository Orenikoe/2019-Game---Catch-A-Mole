const tableContainer = document.getElementById('table-container');
const tableMain = document.getElementById('table-main');
const playerScales = document.getElementById('player-scales');
const levelChoice = document.getElementById('level-choice');
const easyBtn = document.getElementById('btn-easy');
const mediumBtn = document.getElementById('btn-medium');
const hardBtn = document.getElementById('btn-hard');
const header = document.getElementById('title');
const mole = document.getElementById('mole');
const success = document.getElementById('success');
const fails = document.getElementById('fails');
const highestScore = document.getElementById('high-score');

let currentLevel = null;
let newRow = null;
let newTd = null;
let currentFail = null;
let currentScore = null;
let scoresList = [];

function createTable(level) {
	currentLevel = level;
	printTable(level);
}

function printTable(levelChoice) {
	let id = 1;
	displayTableDeleteHeader();

	for (let i = 0; i < levelChoice; i++) {
		newRow = document.createElement('tr');
		for (let j = 0; j < levelChoice; j++) {
			newTd = document.createElement('td');
			tableMain.append(newRow);
			newRow.append(newTd);
			newTd.setAttribute('id', id++);
			newTd.style.userSelect = 'none';
			newTd.addEventListener('click', catchingMole);
			if(levelChoice === 10){
				newTd.style.height = '50px';
				newTd.style.width = '50px';
			} else if(levelChoice === 5){
				newTd.style.height = '90px';
				newTd.style.width = '90px';
				
				
			}

		}
	}

	showMole();
	getTheHighestScore();
}

function catchingMole(el) {
	el = event.target.id;

	if (event.target.contains(mole)) {
		currentScore = currentScore + 1;
		changeBackgroundColor();
		document.getElementById('success-tune').play();

		success.innerHTML = currentScore;
	} else {
		currentFail = currentFail + 1;
		fails.innerHTML = currentFail;
		document.getElementById('fail-tune').play();
	}
	gameOver();
	
}

function gameOver() {
	if (currentFail === 3) {
		scoresList.push(+currentScore);
		document.getElementById('game-over').style.display = 'block'
		setTimeout(function(){document.getElementById('game-over').style.display = 'none'}, 2000);
		setTimeout(functionForGameOver(), 3000);
		tableMain.innerHTML = '';
		currentScore = 0;
		currentFail = 0;
		fails.innerHTML = '';
		success.innerHTML = '';
		
	}
}

function changeBackgroundColor() {
	changeAct = setTimeout(function () {
		document.getElementById('body').style.backgroundColor = 'yellow';
	}, null);
	changeBack = setTimeout(function () {
		document.getElementById('body').style.backgroundColor = 'lightgreen';
	}, 300);
}

function showMole() {
	let randomChoice =
		Math.floor(Math.random() * (currentLevel * currentLevel)) + 1;
	let randomCell = document.getElementById(randomChoice);
	randomCell.append(mole);
	mole.classList.add('mole');
	mole.classList.remove('unvisible');
	// let randomNumber = ((Math.random() * 0.5) + 1);
	setTimeout(hideMole, 650);
}

function hideMole() {
	let i;
	// let randomNumber = ((Math.random() * 0.75) + 0.25);
	for (i = 1; i <= currentLevel * currentLevel; i++) {
		if (document.getElementById(i).contains(mole)) {
			mole.classList.add('unvisible');
		}
	}
	setTimeout(showMole, 500);
}

function displayTableDeleteHeader() {
	tableContainer.classList.remove('unvisible');
	header.classList.add('unvisible');
	document.getElementById('entrance').classList.add('unvisible');
	playerScales.classList.remove('unvisible');
	
}

function functionForGameOver(){
	tableContainer.classList.add('unvisible');
	document.getElementById('entrance').classList.remove('unvisible');
	playerScales.classList.add('unvisible');
}

function getTheHighestScore(){
	scoresList.forEach(() => {
highestScore.innerHTML = Math.max(...scoresList);
	});
	
}



