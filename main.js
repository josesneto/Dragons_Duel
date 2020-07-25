
/*----------------------------- GLOBAL VARIABLES --------------------------------*/

var x = 0;
var r = false;
var state1 = 'n';
var state2 = 'n';
var rf = false;
var mainButtonState = "none";
var victories = 0;
var defeats = 0;

/*----------------------------- INTERVALS DEFINITION --------------------------------*/

function defineIntervals() {
	i =	setInterval(invokeEnemyAttack, 500);
	j = setInterval(chargeEnergyBars, 30);
	l = setInterval(updatePlayerDragonBreath, 30);
}

/*-------------------- ATTACK MADE BY THE PLAYER AND CONSEQUENCES ---------------------*/

function performAttack() {
	console.log('done');
	var soundSource = document.getElementById('sound-source1');
	var energy1 = document.getElementById('energy1');
	var force2 = document.getElementById('force2');
	var breath = document.getElementById('breath1');
	if (energy1.value == 100) {
		state1 = 'f';
		changeMainButton("charging");
		soundSource.innerHTML = '<audio src="fire-sound.mp3" type="audio/mpeg" autoplay></audio>';		
		if (breath.value < 33) {
			var level = 1;
		}
		if (breath.value >= 33 && breath.value < 66) {
			var level = 2;
		}
		if (breath.value >= 66 && breath.value < 99) {
			var level = 3;
		}
		if (breath.value >= 99) {
			var level = 4;
		}
		force2.value -= 3 * level;
		energy1.value -= 30 * level;
		breath.value = 0;
	}
	if (force2.value == 0) {
		var messageBox = document.getElementById('message-box');
		messageBox.innerHTML = '<p><b>YOU WON!<br/>DO YOU WANT TO PLAY AGAIN?</b></p>';
		victories++;
		state1 = 'n';
		state2 = 'n';
		updateScore();
		clearIntervals();
		changeMainButton('restart');
	}
}

/*----------------- ATTACK MADE BY THE ENEMY AND CONSEQUENCES -------------------------*/

function invokeEnemyAttack() {
	var level = Math.floor((Math.random() * 6));
	var soundSource = document.getElementById('sound-source2');
	var energy2 = document.getElementById('energy2');
	var force1 = document.getElementById('force1');
	if (energy2.value == 100 && level < 5) {
		force1.value -= 3*level;
		energy2.value -= 30*level;
		state2 = 'f';
		soundSource.innerHTML = '<audio src="fire-sound.mp3" type="audio/mpeg" autoplay></audio>';
	}
	if (force1.value == 0) {
		var messageBox = document.getElementById('message-box');
		messageBox.innerHTML = '<p><b>YOU LOSE...<br/>DO YOU WANT TO RETRY?</b></p>';
		soundSource.innerHTML = '';
		defeats++;
		state1 = 'n';
		state2 = 'n';
		updateScore();
		clearIntervals();
		changeMainButton('restart');
	}
}

/*------------------------- RECHARGES ENERGY BARS ----------------------- */

function chargeEnergyBars() {
	var soundSource1 = document.getElementById('sound-source1');
	var soundSource2 = document.getElementById('sound-source2');
	var energy1 = document.getElementById('energy1');
	var energy2 = document.getElementById('energy2');
	energy1.value++;
	energy2.value++;
	if (energy1.value == 100) {
		state1 = 'n';
		soundSource1.innerHTML = '';
		changeMainButton("fire");
	}
	if (energy2.value == 100) {
		state2 = 'n';
		soundSource2.innerHTML = '';
	}
}

/*------------------------------- ANIMATES THE DRAGONS FRAMES --------------------------------*/

function updateAnimationFrames() {
	dragon1 = document.getElementById('dragon1');
	dragon2 = document.getElementById('dragon2');
	dragon1.innerHTML = "<img src='img/d1" + state1 + x + ".svg'/>";
	dragon2.innerHTML = "<img src='img/d2" + state2 + x + ".svg'/>";
	if (r == false && x < 9) {
		x++;
	}
	if (r == true && x >= 0) {
		x--;
	}
	if (x == 9 ) {
		r = true;
	}
	if (x == 0) {
		r = false;
	}
}

/*----------------------------- UPDATES THE BREATH OF THE PLAYER'S DRAGON --------------------------*/

function updatePlayerDragonBreath() {
	var breath = document.getElementById('breath1');
	if (rf == false && breath.value < 100) {
			breath.value += 5;
		}
		if (rf == true && breath.value > 0) {
			breath.value -= 5;
		}
		if (breath.value == 100 ) {
			rf = true;
		}
		if (breath.value == 0) {
			rf = false;
		}
	}

/*----------------------------- MAIN BUTTON APPEARANCE--------------------------------*/

function changeMainButton(option) {
	mainButton = document.getElementById('main-button');
	if (option == 'fire' && mainButtonState != 'fire') {
		mainButton.innerHTML = "<i class='fa fa-fire fa-5x' onclick='performAttack()'></i><br/><br/><p><b>FIRE!</b></p>";
		document.body.focus();
	}
	if (option == 'charging' && mainButtonState != 'charging') {
		mainButton.innerHTML = "<i class='fa fa-spinner fa-pulse fa-5x fa-fw'></i><br/><br/><p><b>CHARGING...</b></p>";
	}
	if (option == 'restart' && mainButtonState != 'restart') {
		mainButton.innerHTML = "<i class='fa fa-repeat fa-5x' onclick='restartGame()'></i><br/><br/><p><b>RESTART</b></p>";
	}
	mainButtonState = option;
	console.log('button updated');
}

/*----------------------------- RESTARTS THE GAME --------------------------------*/

function restartGame() {
	var messageBox = document.getElementById('message-box');
	messageBox.innerHTML = '';
	changeMainButton('charging');
	var force1 = document.getElementById('force1');
	var force2 = document.getElementById('force2');
	force1.value = 100;
	force2.value = 100;
	defineIntervals();
}

/*----------------------------- TURN OFF INTERVALS --------------------------------*/

function clearIntervals() {
	clearInterval(i);
	clearInterval(j);
	clearInterval(l);
}

/*----------------------------- UPDATES THE SCOREBOARDS ------------------------*/

function updateScore() {
	victoriesElement = document.getElementById("victories");
	defeatsElement = document.getElementById("defeats");
	victoriesElement.innerHTML = '<p><b>' + victories + '</b></p>';
	defeatsElement.innerHTML = '<p><b>' + defeats + '</b></p>';
}

/*----------------------------- MAIN EXECUTION --------------------------------*/

document.body.focus();
document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {		
		enemyLife = document.getElementById('force2').value;
		playerLife = document.getElementById('force1').value;
		if (enemyLife > 0 && playerLife > 0) {
			performAttack();
		}
    }
}

k = setInterval(updateAnimationFrames, 90);
updateScore();
defineIntervals();
changeMainButton('charging');