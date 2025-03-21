/* REVISED SCRIPT FOR SWAYMORE
 * MADE BY SCIPRED 2025
 *
 * [ Notable Improvements compared to original script (balls.js) ]
 * Game Object to prevent multiple variable initialization statements
 * Using Point constructor instead of two-element Array
 * Canvas automatic resize on load
 * Context translation
 * Better use of switch instead of multiple if statements
 * Remove balls based on position instead of randomly generated ID, which was unreliable
 * Context drawing functions placed into one Render function
 * Cleaner Interval and ball spawn handling
 * Score based on balls cleared instead of arbitrary increment
 * Separate script for level initialization (ballsinit.js)
*/

// polyfills
function choose(arr) {return arr[Math.floor(Math.random() * arr.length)];}
function gTag(tag) {return document.getElementsByTagName(tag);}
if (Object.assign === undefined) {
	(function() {
		Object.assign = function(target) {
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}
			var output = Object(target);
			for (var index = 1; index < arguments.length; index++) {
				var source = arguments[index];
				if (source !== undefined && source !== null) {
					for (var nextKey in source) {
						if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
							output[nextKey] = source[nextKey];
						}
					}
				}
			}
			return output;
		};
	})();
}

var Game = {
	balls: [],
	ballsInterval: null,
	ballsIntervalTime: 1000,
	canvas: gTag("canvas")[0],
	char: {
		pos: new Point()
	},
	checkCharCoords: function() {
		if (this.char.pos.x < -100) this.char.pos.x = -100;
		if (this.char.pos.x > 100) this.char.pos.x = 100;
		if (this.char.pos.y < -100) this.char.pos.y = -100;
		if (this.char.pos.y > 100) this.char.pos.y = 100;
	},
	checkCollision: function() {
		for (var i = 0; i < Game.balls.length; i++) {
			if (Game.balls[i].type !== "fake") {
				var minr = 36;
				var cdis = Math.abs(Math.sqrt((Game.balls[i].pos.x - Game.char.pos.x) ** 2 + (Game.balls[i].pos.y - Game.char.pos.y) ** 2));
				if (cdis < minr) {
					alert("GAME OVER! Press OK to restart.");
					this.level = 1;
					this.score = 0;
					this.balls = [];
					this.ballsIntervalTime = 1000;
					this.char.pos = new Point();
					this.recol();
					this.resetBallsInterval();
				}
			}
		}
	},
	controls: {
		up: true,
		down: true,
		left: true,
		right: true
	},
	DIR: ["u", "l", "d", "r"],
	InitLevelByScore: function() {},
	level: 1,
	recol: function(c) {
		this.canvas.style.backgroundColor = c || "#aaa";
	},
	resetBallsInterval: function() {
		clearInterval(this.ballsInterval);
		this.ballsInterval = setInterval(InitBalls, this.ballsIntervalTime);
	},
	score: 0,
	setMov: function(b, d, n) {
		switch (d) {
		case "u":
			b.mov.y = -n;
			break;
		case "l":
			b.mov.x = -n;
			break;
		case "d":
			b.mov.y = n;
			break;
		case "r":
			b.mov.x = n;
			break;
		}
	},
	setRandPos: function(p) {
		var d;
		d = choose(this.DIR);
		switch(d) {
		case "u":
			p.x = choose([-100, -50, 0, 50, 100]);
			p.y = Game.spawnOffset - 50;
			break;
		case "l":
			p.x = Game.spawnOffset - 50;
			p.y = choose([-100, -50, 0, 50, 100]);
			break;
		case "d":
			p.x = choose([-100, -50, 0, 50, 100]);
			p.y = -Game.spawnOffset + 50;
			break;
		case "r":
			p.x = -Game.spawnOffset + 50;
			p.y = choose([-100, -50, 0, 50, 100]);
			break;
		}
		return d;
	},
	setRandOpposePos: function(p, od) {
		var d;
		d = od === "u" ? "d" : od === "d" ? "u" : od === "l" ? "r" : "l";
		switch(d) {
		case "u":
			p.x = choose([-100, -50, 0, 50, 100]);
			p.y = Game.spawnOffset - 50;
			break;
		case "l":
			p.x = Game.spawnOffset - 50;
			p.y = choose([-100, -50, 0, 50, 100]);
			break;
		case "d":
			p.x = choose([-100, -50, 0, 50, 100]);
			p.y = -Game.spawnOffset + 50;
			break;
		case "r":
			p.x = -Game.spawnOffset + 50;
			p.y = choose([-100, -50, 0, 50, 100]);
			break;
		}
		return d;
	},
	spawnOffset: 0
};
var ctx = Game.canvas.getContext("2d");

function canvasResize() {
	// square the canvas
	if (window.innerWidth > window.innerHeight) {
		Game.canvas.width = window.innerHeight;
		Game.canvas.height = window.innerHeight;
	} else {
		Game.canvas.width = window.innerWidth;
		Game.canvas.height = window.innerWidth;
	}
	// move point of origin into middle. note that default +y is down and -y is up
	ctx.translate(Game.canvas.width / 2, Game.canvas.height / 2);
	Game.spawnOffset = Game.canvas.width < Game.canvas.height ? Game.canvas.height * 0.7 : Game.canvas.width * 0.7;
	Render();
}
window.onload = canvasResize;

function Point(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

function Ball(pos, mov) {
	this.pos = pos || new Point();
	this.mov = mov || new Point();
	this.col = "black";
	this.type = "normal";
}
Object.assign(Ball.prototype, {
	copy: function(b) {
		this.pos = new Point(b.pos.x, b.pos.y);
		this.mov = new Point(b.mov.x, b.mov.y);
		return this;
	},
	copyMov: function(b) {
		this.mov = new Point(b.mov.x, b.mov.y);
		return this;
	},
	copyPos: function(b) {
		this.pos = new Point(b.pos.x, b.pos.y);
		return this;
	},
	copyPosX: function(b) {
		this.pos = new Point(b.pos.x, this.pos.y);
		return this;
	},
	copyPosY: function(b) {
		this.pos = new Point(this.pos.x, b.pos.y);
		return this;
	},
	isWithinGridlines: function() {
		return this.pos.x < 125 && this.pos.x > -125 && this.pos.y < 125 && this.pos.y > -125;
	},
	mulMov: function(p) {
		this.mov.x *= p.x;
		this.mov.y *= p.y;
		return this;
	},
	mulMovScalar: function(s) {
		return this.mulMov(new Point(s, s));
	},
	mulMovX: function(x) {
		this.mov.x *= x;
		return this;
	},
	mulMovY: function(y) {
		this.mov.y *= y;
		return this;
	},
	randomPosX: function(bexcl) {
		var ca = [-100, -50, 0, 50, 100];
		for (var i = 0; i < ca.length; i++) {
			if (ca[i] === bexcl.pos.x) {
				ca.splice(i, 1);
			}
		}
		this.pos.x = choose(ca);
		return this;
	},
	randomPosY: function(bexcl) {
		var ca = [-100, -50, 0, 50, 100];
		for (var i = 0; i < ca.length; i++) {
			if (ca[i] === bexcl.pos.y) {
				ca.splice(i, 1);
			}
		}
		this.pos.y = choose(ca);
		return this;
	},
	setMov: function(p) {
		this.mov = new Point(p.x, p.y);
		return this;
	},
	setPos: function(p) {
		this.pos = new Point(p.x, p.y);
		return this;
	}
});
function FakeBall(pos, mov) {
	Ball.call(this, pos, mov);
	this.col = "gray";
	this.type = "fake";
}
FakeBall.prototype = Object.create(Ball.prototype);
FakeBall.prototype.constructor = FakeBall;
function AccelBall(accel, pos, mov) {
	Ball.call(this, pos, mov);
	this.col = "#600";
	this.type = "accel";
	this.accel = accel || 1.01;
}
AccelBall.prototype = Object.create(Ball.prototype);
AccelBall.prototype.constructor = AccelBall;
function HopBall(latency, pos, mov) {
	Ball.call(this, pos, mov);
	this.col = "#099";
	this.type = "hop";
	this.latency = latency || 200;
	this.latencyCurrent = latency || 200;
}
HopBall.prototype = Object.create(Ball.prototype);
HopBall.prototype.constructor = HopBall;
function FadeBall(pos, mov) {
	Ball.call(this, pos, mov);
	this.col = "rgb(0, 255, 0)";
	this.type = "fade";
}
FadeBall.prototype = Object.create(Ball.prototype);
FadeBall.prototype.constructor = FadeBall;
function SuddenBall(fmov, pos, mov) {
	Ball.call(this, pos, mov);
	this.col = "#c33";
	this.type = "sudden";
	this.fmov = fmov || new Point(this.mov.x * 10, this.mov.y * 10);
}
SuddenBall.prototype = Object.create(Ball.prototype);
SuddenBall.prototype.constructor = SuddenBall;

function Render() {
	ctx.clearRect(-Game.canvas.width * 4, -Game.canvas.height * 4, Game.canvas.width * 8, Game.canvas.height * 8);
	// Draw bounding box (debug)
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(Game.spawnOffset, Game.spawnOffset);
	ctx.lineTo(Game.spawnOffset, -Game.spawnOffset);
	ctx.lineTo(-Game.spawnOffset, -Game.spawnOffset);
	ctx.lineTo(-Game.spawnOffset, Game.spawnOffset);
	ctx.lineTo(Game.spawnOffset, Game.spawnOffset);
	ctx.stroke();
	ctx.closePath();
	// Draw grid
	ctx.strokeStyle = "black";
	ctx.lineWidth = 2;
	ctx.beginPath();
	for (var i = -125; i < 150; i += 50) {
		ctx.moveTo(i, 125);
		ctx.lineTo(i, -125);
	}
	for (var i = -125; i < 150; i += 50) {
		ctx.moveTo(125, i);
		ctx.lineTo(-125, i);
	}
	ctx.stroke();
	ctx.closePath();
	// Draw character
	Game.checkCharCoords();
	ctx.strokeStyle = "black";
	ctx.fillStyle = "white";
	ctx.beginPath();
	ctx.arc(Game.char.pos.x, Game.char.pos.y, 18, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
	// Draw information
	ctx.font = "17px Consolas";
	ctx.fillStyle = "black";
	ctx.fillText("Score: " + Game.score, (-Game.canvas.width / 2) * 0.975, (-Game.canvas.height / 2) + 20);
	ctx.fillText("Level: " + Game.level, (-Game.canvas.width / 2) * 0.975, (-Game.canvas.height / 2) + 50);
	// Update balls / Draw balls
	for (var i = 0; i < Game.balls.length; i++) {
		if (Game.balls[i].type !== "hop") {
			Game.balls[i].pos.x += Game.balls[i].mov.x;
			Game.balls[i].pos.y += Game.balls[i].mov.y;
		} else {
			Game.balls[i].latencyCurrent--;
			if (Game.balls[i].latencyCurrent < 0) {
				Game.balls[i].pos.x += Game.balls[i].mov.x;
				Game.balls[i].pos.y += Game.balls[i].mov.y;
				Game.balls[i].latencyCurrent = Number(Game.balls[i].latency);
			}
		}
		if (Game.balls[i].type === "accel") {
			Game.balls[i].mulMovScalar(Game.balls[i].accel);
		}
		if (Game.balls[i].type === "sudden" && Game.balls[i].isWithinGridlines()) {
			Game.balls[i].setMov(Game.balls[i].fmov);
		}
		if (Game.balls[i].pos.x < -Game.spawnOffset || Game.balls[i].pos.x > Game.spawnOffset || Game.balls[i].pos.y < -Game.spawnOffset || Game.balls[i].pos.y > Game.spawnOffset) {
			Game.balls.splice(i, 1);
			Game.score++;
			Game.InitLevelByScore();
		} else {
			if (Game.balls[i].type === "fade") {
				var colarr = Game.balls[i].col.split(", ");
				if (Number(colarr[1]) > 0) {
					colarr[1] = String(Number(colarr[1]) - 1);
					Game.balls[i].col = colarr.join(", ");
				} else if (Number(colarr[1]) <= 0) {
					Game.balls[i].col = "black";
				}
			}
			ctx.strokeStyle = Game.balls[i].col;
			ctx.fillStyle = Game.balls[i].col;
			ctx.beginPath();
			ctx.arc(Game.balls[i].pos.x, Game.balls[i].pos.y, 18, 0, 2 * Math.PI);
			ctx.stroke();
			ctx.fill();
			Game.balls[i].ttl++;
		}
	}
	Game.checkCollision();

	requestAnimationFrame(Render);
}

document.addEventListener("keydown", function(e) {
	var k = e.key.toLowerCase();
	switch (k) {
	case "w":
	case "arrowup":
		if (Game.controls.up) {
			Game.controls.up = false;
			Game.char.pos.y -= 50;
		}
		break;
	case "a":
	case "arrowleft":
		if (Game.controls.left) {
			Game.controls.left = false;
			Game.char.pos.x -= 50;
		}
		break;
	case "s":
	case "arrowdown":
		if (Game.controls.down) {
			Game.controls.down = false;
			Game.char.pos.y += 50;
		}
		break;
	case "d":
	case "arrowright":
		if (Game.controls.right) {
			Game.controls.right = false;
			Game.char.pos.x += 50;
		}
	}
});
document.addEventListener("keyup", function(e) {
	var k = e.key.toLowerCase();
	switch (k) {
	case "w":
	case "arrowup":
		Game.controls.up = true;
		break;
	case "a":
	case "arrowleft":
		Game.controls.left = true;
		break;
	case "s":
	case "arrowdown":
		Game.controls.down = true;
		break;
	case "d":
	case "arrowright":
		Game.controls.right = true;
		break;
	}
});