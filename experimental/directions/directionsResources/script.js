var titlecontainer = document.getElementById("title");
var gamecontainer = document.getElementById("gamemain");
var dircon = document.getElementById("dir");
var scdisp = document.getElementById("scdisp");
var leftbtn = document.getElementById("leftbtn");
var rightbtn = document.getElementById("rightbtn");
function startGame() {
	score = 0;
	titlecontainer.style.display = "none";
	gamecontainer.style.display = "block";
	resetArrays();
	resetDisplay();
	newDir();
}
function choose(arr) {return arr[Math.floor(Math.random()*arr.length)];}

var dir = null;
var mover = null;
var score = 0;
var bestscore = 0;
var DIRS = ["L", "R"];
var ldirs = ["Left"];
var rdirs = ["Right"];
var ndirs = ["Nothing"];
var lrdirs = ["Not Nothing"];
function newDir() {
	clearInterval(mover);
	updateArrays();
	dir = choose(DIRS);
	if (dir === "L") {
		dircon.innerHTML = choose(ldirs);
	}
	if (dir === "R") {
		dircon.innerHTML = choose(rdirs);
	}
	if (dir === "N") {
		dircon.innerHTML = choose(ndirs);
	}
	if (dir === "LR") {
		dircon.innerHTML = choose(lrdirs);
	}
	mover = move();
}

function leftClick() {
	if (dir === "L" || dir === "LR") {
		if (leftbtn.innerHTML === "Left") {
			document.getElementById("bbar").style.width = "1%";
			clearInterval(mover);
			score += 1;
			newDir();
			return 0;
		}
	}
	if (dir === "R" || dir === "LR") {
		if (leftbtn.innerHTML === "Right") {
			document.getElementById("bbar").style.width = "1%";
			clearInterval(mover);
			score += 1;
			newDir();
			return 0;
		}
	}
	timeUp();
}
function rightClick() {
	if (dir === "R" || dir === "LR") {
		if (rightbtn.innerHTML === "Right") {
			document.getElementById("bbar").style.width = "1%";
			clearInterval(mover);
			score += 1;
			newDir();
			return 0;
		}
	}
	if (dir === "L" || dir === "LR") {
		if (rightbtn.innerHTML === "Left") {
			document.getElementById("bbar").style.width = "1%";
			clearInterval(mover);
			score += 1;
			newDir();
			return 0;
		}
	}
	timeUp();
}

function switchDisplay() {
	leftbtn.innerHTML = "Right";
	rightbtn.innerHTML = "Left";
}
function resetDisplay() {
	leftbtn.innerHTML = "Left";
	rightbtn.innerHTML = "Right";
}

function resetArrays() {
	ldirs = ["Left"];
	rdirs = ["Right"];
	ndirs = ["Nothing"];
	lrdirs = ["Not Nothing"];
	DIRS = ["L", "R"];
}

function updateArrays() {
	if (score > 9 && score < 20) {
		ldirs.push("Not Right");
		rdirs.push("Not Left");
	}
	if (score > 19 && score < 30) {
		DIRS.push("N");
	}
	if (score > 29 && score < 40) {
		ldirs.push("Not Not Left");
		rdirs.push("Not Not Right");
		ndirs.push("Not Not Nothing");
		DIRS.push("LR");
	}
	if (score > 39) {
		var r = choose([0, 1, 2, 3]);
		if (r > 1) {switchDisplay();} else {resetDisplay();}
	}
	if (score > 39 && score < 50) {
		ldirs.push("My Right");
		rdirs.push("My Left");
	}
}

function move() {
  var i = 0;
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("bbar");
    var width = 1;
    var int = score < 10 ? 30 : score < 20 ? 25 : 20;
    var id = setInterval(frame, int);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        if (dir !== "N") {timeUp();} else {newDir(); score += 1;}
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
  return id;
}

function timeUp() {
	gamecontainer.style.display = "none";
	if (score > bestscore) {
		bestscore = score;
	}
	titlecontainer.style.display = "block";
	scdisp.innerHTML = "Your score was " + score + ", your best is " + bestscore;
}

resetDisplay();