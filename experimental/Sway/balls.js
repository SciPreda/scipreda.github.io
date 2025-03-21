// Balls
// PLEASE NOTE: This is a very old project from 2019. I found this randomly lying around in a folder and decided to add it because it's one of the cool ones.
var hsub = 130, wsub = 50;
var ah = screen.availHeight - hsub, aw = screen.availWidth - wsub; //this excludes Windows Taskbar
setInterval(function(){
	ah = screen.availHeight - hsub;
	aw = screen.availWidth - wsub;
}, 1000); //auto updater
var canvas = document.getElementById("game_canvas");
canvas.width = aw;
canvas.height = ah;
function setBG(bg) {
	canvas.style.background = bg;
	document.body.style.background = bg;
}
var ctx = canvas.getContext("2d");
//IT BEGINS
var titleposx = canvas.width/2 - 75;
var titleposy = canvas.height/2;
ctx.fillStyle = "#bbb";
var titlePlayed = 0;
ctx.lineWidth = 3;

var char = {
	x: canvas.width/2,
	y: canvas.height/2
};
var controlsSetup = {
	upon: 0,
	lefton: 0,
	downon: 0,
	righton: 0
};
var BALLS = [];
var BallsInterval;
var ScoreInterval;
var timetitle = 800, ballLvl = 1, bc = 0, level = 1, score = 0;
var Dirs = ["TU1", "TU2", "TU3", "TD1", "TD2", "TD3", "TL1", "TL2", "TL3", "TR1", "TR2", "TR3"];
function choose(arr) {return arr[Math.floor(Math.random() * arr.length)];}


function CollisionTest() {
	var bx = this.pos[0], by = this.pos[1];
	var cx = char.x, cy = char.y;
	var minr = 33;
	var cdis = Math.abs(Math.sqrt((bx-cx)**2 + (by-cy)**2));
	if (cdis < minr) { //fix this
		alert("GAME OVER! Press OK to restart.");
		ctx.fillStyle = "#bbb";
		canvas.style.background = "#bbb";
		document.body.style.background = "#bbb";
		titlePlayed = 0;
		level = 1;
		ballLvl = 1;
		score = 0;
		bc = 0;
		setTimeout(function(){BALLS = [];char.x = canvas.width/2; char.y = canvas.height/2;}, 3350);
		clearInterval(BallsInterval); clearInterval(ScoreInterval);
	}
}
function Ball(dir, spd) {
	BALLS.push(this);
	this.dir = dir;
	if (dir === "rand" || dir === undefined) {this.dir = choose(Dirs);}
	this.pos = [0, 0];
	this.to = [0, 0];
	this.id = choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]); //seems random enough
	var s = spd || 5;

	//coords setup
	switch (this.dir) {
		case "TU1":
			this.pos = [canvas.width/2 - 50, canvas.height + 123];
			break;
		case "TU2":
			this.pos = [canvas.width/2, canvas.height + 123];
			break;
		case "TU3":
			this.pos = [canvas.width/2 + 50, canvas.height + 123];
			break;
		case "TD1":
			this.pos = [canvas.width/2 - 50, -123];
			break;
		case "TD2":
			this.pos = [canvas.width/2, -123];
			break;
		case "TD3":
			this.pos = [canvas.width/2 + 50, -123];
			break;
		case "TL1":
			this.pos = [canvas.width + 123, canvas.height/2 - 50];
			break;
		case "TL2":
			this.pos = [canvas.width + 123, canvas.height/2];
			break;
		case "TL3":
			this.pos = [canvas.width + 123, canvas.height/2 + 50];
			break;
		case "TR1":
			this.pos = [-123, canvas.height/2 - 50];
			break;
		case "TR2":
			this.pos = [-123, canvas.height/2];
			break;
		case "TR3":
			this.pos = [-123, canvas.height/2 + 50];
			break;
	}
	if (this.dir === "TL1" || this.dir === "TL2" || this.dir === "TL3") {this.to = [-s, 0];}
	if (this.dir === "TR1" || this.dir === "TR2" || this.dir === "TR3") {this.to = [s, 0];}
	if (this.dir === "TU1" || this.dir === "TU2" || this.dir === "TU3") {this.to = [0, -s];}
	if (this.dir === "TD1" || this.dir === "TD2" || this.dir === "TD3") {this.to = [0, s];}

	//coords check and remove
	this.check = function() {
		if (this.pos[0] < -175) {remBall(this.id);}
		if (this.pos[0] > canvas.width + 175) {remBall(this.id);}
		if (this.pos[1] < -175) {remBall(this.id);}
		if (this.pos[1] > canvas.height + 175) {remBall(this.id);}
	};
	this.collision = CollisionTest;
}
function AccelerativeBall(dir, spd, acc) {
	BALLS.push(this);
	this.dir = dir;
	if (dir === "rand" || dir === undefined) {this.dir = choose(Dirs);}
	this.pos = [0, 0];
	this.to = [0, 0];
	this.id = choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]); //seems random enough
	var s = spd || 1;
	this.acc = acc || 1.02;

	switch (this.dir) {
		case "TU1":
			this.pos = [canvas.width/2 - 50, canvas.height + 123];
			break;
		case "TU2":
			this.pos = [canvas.width/2, canvas.height + 123];
			break;
		case "TU3":
			this.pos = [canvas.width/2 + 50, canvas.height + 123];
			break;
		case "TD1":
			this.pos = [canvas.width/2 - 50, -123];
			break;
		case "TD2":
			this.pos = [canvas.width/2, -123];
			break;
		case "TD3":
			this.pos = [canvas.width/2 + 50, -123];
			break;
		case "TL1":
			this.pos = [canvas.width + 123, canvas.height/2 - 50];
			break;
		case "TL2":
			this.pos = [canvas.width + 123, canvas.height/2];
			break;
		case "TL3":
			this.pos = [canvas.width + 123, canvas.height/2 + 50];
			break;
		case "TR1":
			this.pos = [-123, canvas.height/2 - 50];
			break;
		case "TR2":
			this.pos = [-123, canvas.height/2];
			break;
		case "TR3":
			this.pos = [-123, canvas.height/2 + 50];
			break;
	}
	if (this.dir === "TL1" || this.dir === "TL2" || this.dir === "TL3") {this.to = [-s, 0];}
	if (this.dir === "TR1" || this.dir === "TR2" || this.dir === "TR3") {this.to = [s, 0];}
	if (this.dir === "TU1" || this.dir === "TU2" || this.dir === "TU3") {this.to = [0, -s];}
	if (this.dir === "TD1" || this.dir === "TD2" || this.dir === "TD3") {this.to = [0, s];}

	this.check = function() {
		this.to[0] *= this.acc;
		this.to[1] *= this.acc;
		if (this.pos[0] < -175) {remBall(this.id);}
		if (this.pos[0] > canvas.width + 175) {remBall(this.id);}
		if (this.pos[1] < -175) {remBall(this.id);}
		if (this.pos[1] > canvas.height + 175) {remBall(this.id);}
	};
	this.collision = CollisionTest;
}
function AccelBall(dir, spd) {
	BALLS.push(this);
	this.dir = dir;
	if (dir === "rand" || dir === undefined) {this.dir = choose(Dirs);}
	this.pos = [0, 0];
	this.to = [0, 0];
	this.id = choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]);
	var s = spd || 5;

	switch (this.dir) {
		case "TU1":this.pos = [canvas.width/2 - 50, canvas.height + 123];break;
		case "TU2":this.pos = [canvas.width/2, canvas.height + 123];break;
		case "TU3":this.pos = [canvas.width/2 + 50, canvas.height + 123];break;
		case "TD1":this.pos = [canvas.width/2 - 50, -123];break;
		case "TD2":this.pos = [canvas.width/2, -123];break;
		case "TD3":this.pos = [canvas.width/2 + 50, -123];break;
		case "TL1":this.pos = [canvas.width + 123, canvas.height/2 - 50];break;
		case "TL2":this.pos = [canvas.width + 123, canvas.height/2];break;
		case "TL3":this.pos = [canvas.width + 123, canvas.height/2 + 50];break;
		case "TR1":this.pos = [-123, canvas.height/2 - 50];break;
		case "TR2":this.pos = [-123, canvas.height/2];break;
		case "TR3":this.pos = [-123, canvas.height/2 + 50];break;
	}
	if (this.dir === "TL1" || this.dir === "TL2" || this.dir === "TL3") {this.to = [-s, 0];}
	if (this.dir === "TR1" || this.dir === "TR2" || this.dir === "TR3") {this.to = [s, 0];}
	if (this.dir === "TU1" || this.dir === "TU2" || this.dir === "TU3") {this.to = [0, -s];}
	if (this.dir === "TD1" || this.dir === "TD2" || this.dir === "TD3") {this.to = [0, s];}

	this.check = function() {
		if (this.pos[0] < canvas.width/2 + 75 && this.pos[0] > canvas.width/2 - 75) {this.to[0] *= 2;}
		if (this.pos[1] < canvas.height/2 + 75 && this.pos[1] > canvas.height/2 - 75) {this.to[1] *= 2;}

		if (this.pos[0] < -175) {remBall(this.id);}
		if (this.pos[0] > canvas.width + 175) {remBall(this.id);}
		if (this.pos[1] < -175) {remBall(this.id);}
		if (this.pos[1] > canvas.height + 175) {remBall(this.id);}
	};
	this.collision = CollisionTest;
}
function FakeBall(dir, spd) {
	BALLS.push(this);
	this.dir = dir;
	if (dir === "rand" || dir === undefined) {this.dir = choose(Dirs);}
	this.pos = [0, 0];
	this.to = [0, 0];
	this.id = choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]);
	var s = spd || 5;

	switch (this.dir) {
		case "TU1":this.pos = [canvas.width/2 - 50, canvas.height + 123];break;
		case "TU2":this.pos = [canvas.width/2, canvas.height + 123];break;
		case "TU3":this.pos = [canvas.width/2 + 50, canvas.height + 123];break;
		case "TD1":this.pos = [canvas.width/2 - 50, -123];break;
		case "TD2":this.pos = [canvas.width/2, -123];break;
		case "TD3":this.pos = [canvas.width/2 + 50, -123];break;
		case "TL1":this.pos = [canvas.width + 123, canvas.height/2 - 50];break;
		case "TL2":this.pos = [canvas.width + 123, canvas.height/2];break;
		case "TL3":this.pos = [canvas.width + 123, canvas.height/2 + 50];break;
		case "TR1":this.pos = [-123, canvas.height/2 - 50];break;
		case "TR2":this.pos = [-123, canvas.height/2];break;
		case "TR3":this.pos = [-123, canvas.height/2 + 50];break;
	}
	if (this.dir === "TL1" || this.dir === "TL2" || this.dir === "TL3") {this.to = [-s, 0];}
	if (this.dir === "TR1" || this.dir === "TR2" || this.dir === "TR3") {this.to = [s, 0];}
	if (this.dir === "TU1" || this.dir === "TU2" || this.dir === "TU3") {this.to = [0, -s];}
	if (this.dir === "TD1" || this.dir === "TD2" || this.dir === "TD3") {this.to = [0, s];}

	this.check = function() {
		if (this.pos[0] < -175) {remBall(this.id);}
		if (this.pos[0] > canvas.width + 175) {remBall(this.id);}
		if (this.pos[1] < -175) {remBall(this.id);}
		if (this.pos[1] > canvas.height + 175) {remBall(this.id);}
	};
	this.collision = function() {}; //blank :)
}
function FreezyBall(dir, lagspd, minus) {
	BALLS.push(this);
	this.dir = dir;
	if (dir === "rand" || dir === undefined) {this.dir = choose(Dirs);}
	this.pos = [0, 0];
	this.to = [0, 0];
	this.time = 60;
	this.lagspd = lagspd || 150;
	this.minus = minus || 2;
	this.id = choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"])
		+ choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]) + choose(["0", "1", "2", "3"]);

	switch (this.dir) {
		case "TU1":this.pos = [canvas.width/2 - 50, canvas.height + 123];break;
		case "TU2":this.pos = [canvas.width/2, canvas.height + 123];break;
		case "TU3":this.pos = [canvas.width/2 + 50, canvas.height + 123];break;
		case "TD1":this.pos = [canvas.width/2 - 50, -123];break;
		case "TD2":this.pos = [canvas.width/2, -123];break;
		case "TD3":this.pos = [canvas.width/2 + 50, -123];break;
		case "TL1":this.pos = [canvas.width + 123, canvas.height/2 - 50];break;
		case "TL2":this.pos = [canvas.width + 123, canvas.height/2];break;
		case "TL3":this.pos = [canvas.width + 123, canvas.height/2 + 50];break;
		case "TR1":this.pos = [-123, canvas.height/2 - 50];break;
		case "TR2":this.pos = [-123, canvas.height/2];break;
		case "TR3":this.pos = [-123, canvas.height/2 + 50];break;
	}

	this.check = function() {
		this.time -= this.minus;
		if (this.time < 0) {
			this.time = 60;
			if (this.dir === "TL1" || this.dir === "TL2" || this.dir === "TL3") {this.pos[0] -= this.lagspd;}
			if (this.dir === "TR1" || this.dir === "TR2" || this.dir === "TR3") {this.pos[0] += this.lagspd;}
			if (this.dir === "TU1" || this.dir === "TU2" || this.dir === "TU3") {this.pos[1] -= this.lagspd;}
			if (this.dir === "TD1" || this.dir === "TD2" || this.dir === "TD3") {this.pos[1] += this.lagspd;}
		}
		if (this.pos[0] < -175) {remBall(this.id);}
		if (this.pos[0] > canvas.width + 175) {remBall(this.id);}
		if (this.pos[1] < -175) {remBall(this.id);}
		if (this.pos[1] > canvas.height + 175) {remBall(this.id);}
	};
	this.collision = CollisionTest;
}



function remBall(id) {
	for (var i=0; i<BALLS.length; i++) {
		let b = BALLS[i];
		if (b.id === id) {
			BALLS.splice(i, 1);
		}
	}
}
function drawBalls() {
	for (var i=0; i<BALLS.length; i++) {
		var b = BALLS[i];
		b.pos[0] += b.to[0];
		b.pos[1] += b.to[1];
		ctx.beginPath();
		ctx.arc(b.pos[0], b.pos[1], 18, 0, 2 * Math.PI);
		if (b.constructor === FakeBall) {
			ctx.strokeStyle = "#444";
			ctx.fillStyle = "#444";
		} else {
			ctx.strokeStyle = "#000";
			ctx.fillStyle = "#000";
		}
		ctx.stroke();
		ctx.fill();
		b.check();
		b.collision();
	}
}

function drawGrid() {
	ctx.strokeStyle = "#fff";
	ctx.beginPath();
	ctx.moveTo(canvas.width/2 - 75, canvas.height/2 - 75);
	ctx.lineTo(canvas.width/2 + 75, canvas.height/2 - 75);
	ctx.lineTo(canvas.width/2 + 75, canvas.height/2 + 75);
	ctx.lineTo(canvas.width/2 - 75, canvas.height/2 + 75);
	ctx.lineTo(canvas.width/2 - 75, canvas.height/2 - 75);

	ctx.moveTo(canvas.width/2 - 75, canvas.height/2 - 25);
	ctx.lineTo(canvas.width/2 + 75, canvas.height/2 - 25);
	ctx.moveTo(canvas.width/2 - 75, canvas.height/2 + 25);
	ctx.lineTo(canvas.width/2 + 75, canvas.height/2 + 25);

	ctx.moveTo(canvas.width/2 - 25, canvas.height/2 - 75);
	ctx.lineTo(canvas.width/2 - 25, canvas.height/2 + 75);
	ctx.moveTo(canvas.width/2 + 25, canvas.height/2 - 75);
	ctx.lineTo(canvas.width/2 + 25, canvas.height/2 + 75);

	ctx.stroke();
	ctx.closePath();
}
function drawChar() {
	ctx.strokeStyle = "#fff";
	ctx.fillStyle = "#fff";
	ctx.beginPath();
	ctx.arc(char.x, char.y, 15, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}
function drawInfos() {
	ctx.fillStyle = "#000";
	ctx.font = "15px Arial";
	ctx.fillText("Score: " + score, 30, 30);
	ctx.fillText("Level: " + level, 30, 60);
}
function charCoordinateCheck() {
	if (char.x < canvas.width/2 - 50) {char.x = canvas.width/2 - 50;}
	if (char.x > canvas.width/2 + 50) {char.x = canvas.width/2 + 50;}
	if (char.y < canvas.height/2 - 50) {char.y = canvas.height/2 - 50;}
	if (char.y > canvas.height/2 + 50) {char.y = canvas.height/2 + 50;}
}

document.addEventListener("keydown", function(e){
	var key = e.key;
	if (key === "w" && controlsSetup.upon === 0) {controlsSetup.upon = 1; char.y -= 50;}
	if (key === "a" && controlsSetup.lefton === 0) {controlsSetup.lefton = 1; char.x -= 50;}
	if (key === "s" && controlsSetup.downon === 0) {controlsSetup.downon = 1; char.y += 50;}
	if (key === "d" && controlsSetup.righton === 0) {controlsSetup.righton = 1; char.x += 50;}
	if (key === "ArrowUp" && controlsSetup.upon === 0) {controlsSetup.upon = 1; char.y -= 50;}
	if (key === "ArrowLeft" && controlsSetup.lefton === 0) {controlsSetup.lefton = 1; char.x -= 50;}
	if (key === "ArrowDown" && controlsSetup.downon === 0) {controlsSetup.downon = 1; char.y += 50;}
	if (key === "ArrowRight" && controlsSetup.righton === 0) {controlsSetup.righton = 1; char.x += 50;}
	if (key === "u") {upLevel(5);}
});
document.addEventListener("keyup", function(e){
	var key = e.key;
	if (key === "w") {controlsSetup.upon = 0;}
	if (key === "a") {controlsSetup.lefton = 0;}
	if (key === "s") {controlsSetup.downon = 0;}
	if (key === "d") {controlsSetup.righton = 0;}
	if (key === "ArrowUp") {controlsSetup.upon = 0;}
	if (key === "ArrowLeft") {controlsSetup.lefton = 0;}
	if (key === "ArrowDown") {controlsSetup.downon = 0;}
	if (key === "ArrowRight") {controlsSetup.righton = 0;}
});

function setBallsNOW() {
	if (level === 1) {
		BallsInterval = setInterval(function(){new Ball()}, 2000);
	}
	if (level === 2) {
		clearInterval(BallsInterval);
		setBG("#ffb366");
		setTimeout(function(){BallsInterval = setInterval(function(){new Ball()}, 1000);}, 100);
	}
	if (level === 3) {
		clearInterval(BallsInterval);
		setBG("#80ffff");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var b = new Ball();
			var c;
			if (b.dir === "TU1") {c = new Ball("TD3");}
			if (b.dir === "TU2") {c = new Ball("TD2");}
			if (b.dir === "TU3") {c = new Ball("TD1");}
			if (b.dir === "TD1") {c = new Ball("TU3");}
			if (b.dir === "TD2") {c = new Ball("TU2");}
			if (b.dir === "TD3") {c = new Ball("TU1");}
			if (b.dir === "TL1") {c = new Ball("TR3");}
			if (b.dir === "TL2") {c = new Ball("TR2");}
			if (b.dir === "TL3") {c = new Ball("TR1");}
			if (b.dir === "TR1") {c = new Ball("TL3");}
			if (b.dir === "TR2") {c = new Ball("TL2");}
			if (b.dir === "TR3") {c = new Ball("TL1");}
		}, 1700);}, 100);
	}
	if (level === 4) {
		clearInterval(BallsInterval);
		setBG("#00e600");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var b = new Ball(choose(["TU2", "TD2", "TL2", "TR2"]));
			var c;
			if (b.dir === "TU2") {c = new Ball(choose(["TU1", "TU3"]));}
			if (b.dir === "TD2") {c = new Ball(choose(["TD1", "TD3"]));}
			if (b.dir === "TL2") {c = new Ball(choose(["TL1", "TL3"]));}
			if (b.dir === "TR2") {c = new Ball(choose(["TR1", "TR3"]));}
		}, 1500);}, 100);
	}
	if (level === 5) {
		clearInterval(BallsInterval);
		setBG("#de0000");
		setTimeout(function(){BallsInterval = setInterval(function(){
			new Ball();
			new Ball();
		}, 1500);}, 100);
	}
	if (level === 6) {
		clearInterval(BallsInterval);
		setBG("#0000ee");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var b = new Ball();
			setTimeout(function(){new Ball(b.dir)}, 200);
			setTimeout(function(){new Ball(b.dir)}, 400);
		}, 1000);}, 100);
	}
	if (level === 7) {
		clearInterval(BallsInterval);
		setBG("#f400ee");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var b = new Ball(choose(["TU1", "TU3", "TD1", "TD3", "TL1", "TL3", "TR1", "TR3"]));
			var d;
			if (b.dir === "TU1" || b.dir === "TU3") {d = "TU2";}
			if (b.dir === "TD1" || b.dir === "TD3") {d = "TD2";}
			if (b.dir === "TL1" || b.dir === "TL3") {d = "TL2";}
			if (b.dir === "TR1" || b.dir === "TR3") {d = "TR2";}
			setTimeout(function(){new Ball(d)}, 150);
			setTimeout(function(){new Ball(b.dir)}, 300);
		}, 1500);}, 100);
	}
	if (level === 8) {
		clearInterval(BallsInterval);
		setBG("#00eeee");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var b = new Ball(choose(["TU1", "TU3", "TD1", "TD3", "TL1", "TL3", "TR1", "TR3"]));
			var d, e;
			if (b.dir === "TU1" || b.dir === "TU3") {d = "TU2";}
			if (b.dir === "TD1" || b.dir === "TD3") {d = "TD2";}
			if (b.dir === "TL1" || b.dir === "TL3") {d = "TL2";}
			if (b.dir === "TR1" || b.dir === "TR3") {d = "TR2";}
			if (b.dir === "TU1") {e = "TU3"}
			if (b.dir === "TU3") {e = "TU1"}
			if (b.dir === "TD1") {e = "TD3"}
			if (b.dir === "TD3") {e = "TD1"}
			if (b.dir === "TL1") {e = "TL3"}
			if (b.dir === "TL3") {e = "TL1"}
			if (b.dir === "TR1") {e = "TR3"}
			if (b.dir === "TR3") {e = "TR1"}
			setTimeout(function(){new Ball(d)}, 600);
			setTimeout(function(){new Ball(e)}, 1200);
		}, 2500);}, 100);
	}
	if (level === 9) {
		clearInterval(BallsInterval);
		setBG("#ddd");
		setTimeout(function(){BallsInterval = setInterval(function(){
			new AccelerativeBall();
		}, 1500);}, 100);
	}
	if (level === 10) {
		clearInterval(BallsInterval);
		setBG("#f05");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var a = new Ball();
			setTimeout(function(){new AccelerativeBall(a.dir, 1.5)}, 10);
		}, 1500);}, 100);
	}
	if (level === 11) {
		clearInterval(BallsInterval);
		setBG("#73e");
		setTimeout(function(){BallsInterval = setInterval(function(){
			new Ball("rand", 4);
		}, 800);}, 100);
	}
	if (level === 12) {
		clearInterval(BallsInterval);
		setBG("#de4");
		setTimeout(function(){BallsInterval = setInterval(function(){
			new AccelBall();
		}, 1500);}, 100);
	}
	if (level === 13) {
		clearInterval(BallsInterval);
		setBG("#274");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var b = new Ball();
			new Ball(b.dir, 6);
			new Ball(b.dir, 7);
		}, 1500);}, 100);
	}
	if (level === 14) {
		clearInterval(BallsInterval);
		setBG("#ece");
		setTimeout(function(){BallsInterval = setInterval(function(){
			new Ball();
			new AccelerativeBall();
		}, 1500);}, 100);
	}
	if (level === 15) {
		clearInterval(BallsInterval);
		setBG("#99ff99");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var b = new AccelerativeBall();
			var c;
			if (b.dir === "TU1") {c = new AccelerativeBall("TD3");}
			if (b.dir === "TU2") {c = new AccelerativeBall("TD2");}
			if (b.dir === "TU3") {c = new AccelerativeBall("TD1");}
			if (b.dir === "TD1") {c = new AccelerativeBall("TU3");}
			if (b.dir === "TD2") {c = new AccelerativeBall("TU2");}
			if (b.dir === "TD3") {c = new AccelerativeBall("TU1");}
			if (b.dir === "TL1") {c = new AccelerativeBall("TR3");}
			if (b.dir === "TL2") {c = new AccelerativeBall("TR2");}
			if (b.dir === "TL3") {c = new AccelerativeBall("TR1");}
			if (b.dir === "TR1") {c = new AccelerativeBall("TL3");}
			if (b.dir === "TR2") {c = new AccelerativeBall("TL2");}
			if (b.dir === "TR3") {c = new AccelerativeBall("TL1");}
		}, 1700);}, 100);
	}
	if (level === 16) {
		clearInterval(BallsInterval);
		setBG("#8080ff");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var b = new Ball(choose(["TU2", "TD2", "TL2", "TR2"]));
			var r;
			if (b.dir === "TU2") {
				r = choose(["TU1", "TU3"]); if (r === "TU1") {new Ball(r); new FakeBall("TU3");} else {new Ball(r); new FakeBall("TU1");}
			}
			if (b.dir === "TD2") {
				r = choose(["TD1", "TD3"]); if (r === "TD1") {new Ball(r); new FakeBall("TD3");} else {new Ball(r); new FakeBall("TD1");}
			}
			if (b.dir === "TL2") {
				r = choose(["TL1", "TL3"]); if (r === "TL1") {new Ball(r); new FakeBall("TL3");} else {new Ball(r); new FakeBall("TL1");}
			}
			if (b.dir === "TR2") {
				r = choose(["TR1", "TR3"]); if (r === "TR1") {new Ball(r); new FakeBall("TR3");} else {new Ball(r); new FakeBall("TR1");}
			}
		}, 1700);}, 100);
	}
	if (level === 17) {
		clearInterval(BallsInterval);
		setBG("#aa80ff");
		setTimeout(function(){BallsInterval = setInterval(function(){
			new FreezyBall();
		}, 1200);}, 100);
	}
	if (level === 18) {
		clearInterval(BallsInterval);
		setBG("#bbf");
		setTimeout(function(){BallsInterval = setInterval(function(){
			var f = new Ball();
			setTimeout(function(){new FreezyBall(f.dir);}, 200);
		}, 1700);}, 100);
	}
}
function setScoreNOW() {
	ScoreInterval = setInterval(function(){score++;}, 2000);
}

function checkScore() {
	if (score > 9 && score < 20) {level = 2; setBalls();}
	if (score > 19 && score < 30) {level = 3; setBalls();}
	if (score > 29 && score < 40) {level = 4; setBalls();}
	if (score > 39 && score < 50) {level = 5; setBalls();}
	if (score > 49 && score < 60) {level = 6; setBalls();}
	if (score > 59 && score < 70) {level = 7; setBalls();}
	if (score > 69 && score < 80) {level = 8; setBalls();}
	if (score > 79 && score < 90) {level = 9; setBalls();}
	if (score > 89 && score < 100) {level = 10; setBalls();}
	if (score > 99 && score < 110) {level = 11; setBalls();}
	if (score > 109 && score < 120) {level = 12; setBalls();}
	if (score > 119 && score < 130) {level = 13; setBalls();}
	if (score > 129 && score < 140) {level = 14; setBalls();}
	if (score > 139 && score < 150) {level = 15; setBalls();}
	if (score > 149 && score < 160) {level = 16; setBalls();}
	if (score > 159 && score < 170) {level = 17; setBalls();}
	if (score > 169 && score < 180) {level = 18; setBalls();}
}
function setBalls() {
	if (ballLvl !== level) {
		ballLvl = level;
		setBallsNOW();
	}
}

function rendering() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (titlePlayed === 0) {
		titlePlayed = 1;
		setTimeout(function(){
			function setFill(fill) {ctx.fillStyle = fill;}
			setFill("#ddd");
			setTimeout(function(){setFill("#fff")}, timetitle);
			setTimeout(function(){setFill("#ddd")}, timetitle * 2);
			setTimeout(function(){setFill("#bbb")}, timetitle * 3);
			setTimeout(function(){titleposy = 200; titlePlayed = 2}, (timetitle * 3)+200);
			timetitle = 500;
		}, timetitle+1200);
	}
	if (titlePlayed === 1) {ctx.font = "50px Arial";ctx.fillText("SWAY", titleposx, titleposy);}
	if (titlePlayed === 2) {
		drawGrid();
		charCoordinateCheck();
		drawChar();
		drawBalls();
		drawInfos();
	}
	if (bc === 0 && titlePlayed === 2) {
		bc = 1;
		setBallsNOW();
		setScoreNOW();
	}
	checkScore();
	requestAnimationFrame(rendering);
}
rendering();

function upLevel(t) {
	level += 1 * t;
	score += 10 * t;
}