Game.InitLevelByScore = function() {
	switch (this.score) {
	case 10:
		this.level = 2;
		this.ballsIntervalTime = 750;
		this.resetBallsInterval();
		break;
	case 30:
		this.level = 3;
		this.ballsIntervalTime = 1000;
		this.resetBallsInterval();
		break;
	case 60:
		this.level = 4;
		this.ballsIntervalTime = 1500;
		this.resetBallsInterval();
		break;
	case 90:
		this.level = 5;
		this.ballsIntervalTime = 1250;
		this.resetBallsInterval();
		break;
	case 150:
		this.level = 6;
		this.ballsIntervalTime = 400;
		this.resetBallsInterval();
		break;
	case 190:
		this.level = 7;
		this.ballsIntervalTime = 1000;
		this.resetBallsInterval();
		break;
	case 220:
		this.level = 8;
		this.ballsIntervalTime = 1500;
		this.resetBallsInterval();
		break;
	case 240:
		this.level = 9;
		this.ballsIntervalTime = 2000;
		this.resetBallsInterval();
		break;
	case 260:
		this.level = 10;
		this.ballsIntervalTime = 1500;
		this.resetBallsInterval();
		break;
	case 290:
		this.level = 11;
		this.ballsIntervalTime = 500;
		this.resetBallsInterval();
		break;
	case 330:
		this.level = 12;
		this.ballsIntervalTime = 750;
		this.resetBallsInterval();
		break;
	case 350:
		this.level = 13;
		this.ballsIntervalTime = 1000;
		this.resetBallsInterval();
		break;
	case 370:
		this.level = 14;
		this.ballsIntervalTime = 1250;
		this.resetBallsInterval();
		break;
	case 400:
		this.level = 15;
		this.ballsIntervalTime = 400;
		this.resetBallsInterval();
		break;
	case 430:
		this.level = 16;
		this.ballsIntervalTime = 1500;
		this.resetBallsInterval();
		break;
	case 440:
		this.level = 17;
		this.ballsIntervalTime = 1000;
		this.resetBallsInterval();
		break;
	case 460:
		this.level = 18;
		this.ballsIntervalTime = 1500;
		this.resetBallsInterval();
		break;
	case 490:
		this.level = 19;
		this.ballsIntervalTime = 2000;
		this.resetBallsInterval();
		break;
	case 520:
		this.level = 20;
		this.ballsIntervalTime = 750;
		this.resetBallsInterval();
		break;
	case 540:
		this.level = 21;
		this.ballsIntervalTime = 1000;
		this.resetBallsInterval();
		break;
	case 560:
		this.level = 22;
		this.ballsIntervalTime = 750;
		this.resetBallsInterval();
		break;
	case 580:
		this.level = 23;
		this.ballsIntervalTime = 1250;
		this.resetBallsInterval();
		break;
	case 600:
		this.level = 24;
		this.ballsIntervalTime = 1000;
		this.resetBallsInterval();
		break;
	case 630:
		this.level = 25;
		this.ballsIntervalTime = 750;
		this.resetBallsInterval();
		break;
	case 660:
		this.level = 26;
		this.ballsIntervalTime = 500;
		this.resetBallsInterval();
		break;
	case 690:
		this.level = 27;
		this.ballsIntervalTime = 1500;
		this.resetBallsInterval();
		break;
	case 720:
		this.level = 28;
		this.ballsIntervalTime = 1000;
		this.resetBallsInterval();
		break;
	}
};
function InitBalls() {
	var ballsInit = [], ds = "", posx = [], posy = [], ca = [-100, -50, 0, 50, 100];
	switch (Game.level) {
	case 1:
		Game.recol("#bbb");
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.8);
		Game.balls.push(ballsInit[0]);
		break;
	case 2:
		Game.recol("#ddd");
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.5);
		Game.balls.push(ballsInit[0]);
		break;
	case 3:
		Game.recol("aquamarine");
		ballsInit.push(new Ball());
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.2);
		ds = Game.setRandPos(ballsInit[1].pos);
		Game.setMov(ballsInit[1], ds, 1.2);
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 4:
		Game.recol("hotpink");
		ballsInit.push(new Ball());
		ballsInit.push(new Ball());
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.4);
		ballsInit[1].copy(ballsInit[0]);
		ballsInit[2].copy(ballsInit[0]);
		Game.balls.push(ballsInit[0]);
		setTimeout(function(){Game.balls.push(ballsInit[1]);}, 500);
		setTimeout(function(){Game.balls.push(ballsInit[2]);}, 1000);
		break;
	case 5:
		Game.recol("lightsalmon");
		for (var i = 0; i < 4; i++) {
			ballsInit.push(new Ball());
		}
		ballsInit.push(new FakeBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.4);
		posx.push(ballsInit[0].pos.x);
		posy.push(ballsInit[0].pos.y);
		for (var i = 1; i < 5; i++) {
			ballsInit[i].copy(ballsInit[0]);
		}
		switch (ds) {
		case "u":
		case "d":
			for (var i = 1; i < ballsInit.length; i++) {
				while (posx.includes(ballsInit[i].pos.x)) {
					ballsInit[i].pos.x = choose(ca);
				}
				posx.push(ballsInit[i].pos.x);
			}
			break;
		case "l":
		case "r":
			for (var i = 1; i < ballsInit.length; i++) {
				while (posy.includes(ballsInit[i].pos.y)) {
					ballsInit[i].pos.y = choose(ca);
				}
				posy.push(ballsInit[i].pos.y);
			}
			break;
		}
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 6:
		Game.recol("lightorange");
		ballsInit.push(choose([new Ball(), new FakeBall()]));
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.6);
		Game.balls.push(ballsInit[0]);
		break;
	case 7:
		Game.recol("beige");
		ballsInit.push(new Ball());
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.5);
		ds = Game.setRandOpposePos(ballsInit[1].pos, ds);
		Game.setMov(ballsInit[1], ds, 1.5);
		switch (ds) {
		case "u":
		case "d":
			ballsInit[1].copyPosX(ballsInit[0]);
			break;
		case "l":
		case "r":
			ballsInit[1].copyPosY(ballsInit[0]);
			break;
		}
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 8:
		Game.recol("fuchsia");
		ballsInit.push(new AccelBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.2);
		Game.balls.push(ballsInit[0]);
		break;
	case 9:
		Game.recol("tan");
		ballsInit.push(new Ball());
		ballsInit.push(new AccelBall());
		ballsInit.push(new AccelBall(1.012));
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.1);
		ballsInit[1].copy(ballsInit[0]);
		ballsInit[2].copy(ballsInit[0]);
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 10:
		Game.recol("lavender");
		ballsInit.push(new Ball());
		ballsInit.push(new Ball());
		ballsInit.push(new AccelBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.5);
		ballsInit[1].copy(ballsInit[0]);
		ballsInit[2].copy(ballsInit[0]);
		switch (ds) {
		case "u":
		case "d":
			ballsInit[1].randomPosX(ballsInit[0]);
			ballsInit[2].randomPosX(ballsInit[0]);
			break;
		case "l":
		case "r":
			ballsInit[1].randomPosY(ballsInit[0]);
			ballsInit[2].randomPosY(ballsInit[0]);
			break;
		}
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 11:
		Game.recol("green");
		ballsInit.push(choose([new Ball(), new AccelBall(1.005)]));
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.2);
		Game.balls.push(ballsInit[0]);
		break;
	case 12:
		Game.recol("blue");
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.3);
		switch (ds) {
		case "u":
		case "d":
			ballsInit[0].mov.x = choose([0.45, 0.35, 0.25, -0.25, -0.35, -0.45]);
			break;
		case "l":
		case "r":
			ballsInit[0].mov.y = choose([0.45, 0.35, 0.25, -0.25, -0.35, -0.45]);
			break;
		}
		Game.balls.push(ballsInit[0]);
		break;
	case 13:
		Game.recol("powderblue");
		ballsInit.push(new Ball());
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.3);
		switch (ds) {
		case "u":
		case "d":
			ballsInit[0].mov.x = choose([0.45, 0.35, 0.25, 0.15]);
			ballsInit[1].copy(ballsInit[0]).mulMovX(-1);
			break;
		case "l":
		case "r":
			ballsInit[0].mov.y = choose([0.45, 0.35, 0.25, 0.15]);
			ballsInit[1].copy(ballsInit[0]).mulMovY(-1);
			break;
		}
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 14:
		Game.recol("palegreen");
		ballsInit.push(new Ball());
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.4);
		switch (ds) {
		case "u":
		case "d":
			ballsInit[0].mov.x = choose([0.65, 0.45, 0.25, -0.25, -0.45, -0.65]);
			break;
		case "l":
		case "r":
			ballsInit[0].mov.y = choose([0.65, 0.45, 0.25, -0.25, -0.45, -0.65]);
			break;
		}
		ds = Game.setRandPos(ballsInit[1].pos);
		Game.setMov(ballsInit[1], ds, 1.4);
		switch (ds) {
		case "u":
		case "d":
			ballsInit[1].mov.x = choose([0.6, 0.4, 0.2, -0.2, -0.4, -0.6]);
			break;
		case "l":
		case "r":
			ballsInit[1].mov.y = choose([0.6, 0.4, 0.2, -0.2, -0.4, -0.6]);
			break;
		}
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 15:
		Game.recol("palevioletred");
		ballsInit.push(choose([new Ball(), new Ball(), new FakeBall()]));
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.3);
		switch (ds) {
		case "u":
		case "d":
			ballsInit[0].mov.x = choose([0.5, 0.35, 0.25, -0.25, -0.35, -0.5]);
			break;
		case "l":
		case "r":
			ballsInit[0].mov.y = choose([0.5, 0.35, 0.25, -0.25, -0.35, -0.5]);
			break;
		}
		Game.balls.push(ballsInit[0]);
		break;
	case 16:
		Game.recol("darkkhaki");
		ballsInit.push(new HopBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 150);
		Game.balls.push(ballsInit[0]);
		break;
	case 17:
		Game.recol("darkred");
		ballsInit.push(new Ball());
		ballsInit.push(new HopBall(100));
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.3);
		ballsInit[1].copyPos(ballsInit[0]);
		Game.setMov(ballsInit[1], ds, 175);
		Game.balls.push(ballsInit[0]);
		setTimeout(function(){Game.balls.push(ballsInit[1]);}, 500);
		break;
	case 18:
		Game.recol("darkorchid");
		ballsInit.push(new AccelBall(1.003));
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.25);
		switch (ds) {
		case "u":
		case "d":
			if (Math.abs(ballsInit[0].pos.x) !== 100) {
				ballsInit.push(new Ball());
				ballsInit[1].copy(ballsInit[0]);
				ballsInit[1].pos.x = ballsInit[0].pos.x + 50;
				ballsInit[2].copy(ballsInit[0]);
				ballsInit[2].pos.x = ballsInit[0].pos.x - 50;
			} else {
				ballsInit[1].copy(ballsInit[0]);
				ballsInit[1].pos.x = ballsInit[0].pos.x === 100 ? 50 : -50;
			}
			break;
		case "l":
		case "r":
			if (Math.abs(ballsInit[0].pos.y) !== 100) {
				ballsInit.push(new Ball());
				ballsInit[1].copy(ballsInit[0]);
				ballsInit[1].pos.y = ballsInit[0].pos.y + 50;
				ballsInit[2].copy(ballsInit[0]);
				ballsInit[2].pos.y = ballsInit[0].pos.y - 50;
			} else {
				ballsInit[1].copy(ballsInit[0]);
				ballsInit[1].pos.y = ballsInit[0].pos.y === 100 ? 50 : -50;
			}
			break;
		}
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 19:
		Game.recol("darkolivegreen");
		ballsInit.push(new Ball());
		ballsInit.push(new AccelBall(1.007));
		ballsInit.push(new HopBall(150));
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.35);
		ds = Game.setRandPos(ballsInit[1].pos);
		Game.setMov(ballsInit[1], ds, 1.1);
		ds = Game.setRandPos(ballsInit[2].pos);
		Game.setMov(ballsInit[2], ds, 125);
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 20:
		Game.recol("sienna");
		ballsInit.push(new HopBall(75));
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 100);
		Game.balls.push(ballsInit[0]);
		break;
	case 21:
		Game.recol("black");
		ballsInit.push(new FadeBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.3);
		Game.balls.push(ballsInit[0]);
		break;
	case 22:
		Game.recol("lemonchiffon");
		ballsInit.push(new SuddenBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.2);
		ballsInit[0].fmov = new Point(ballsInit[0].mov.x * 12, ballsInit[0].mov.y * 12);
		Game.balls.push(ballsInit[0]);
		break;
	case 23:
		Game.recol("magenta");
		ballsInit.push(new AccelBall());
		ballsInit.push(new SuddenBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.1);
		ds = Game.setRandPos(ballsInit[1].pos);
		Game.setMov(ballsInit[1], ds, 1.2);
		ballsInit[1].fmov = new Point(ballsInit[1].mov.x * 10, ballsInit[1].mov.y * 10);
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 24:
		Game.recol("plum");
		ballsInit.push(new SuddenBall());
		ballsInit.push(new SuddenBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.2);
		ballsInit[0].fmov = new Point(ballsInit[0].mov.x * 13, ballsInit[0].mov.y * 13);
		ds = Game.setRandPos(ballsInit[1].pos);
		Game.setMov(ballsInit[1], ds, 1.2);
		ballsInit[1].fmov = new Point(ballsInit[1].mov.x * 13, ballsInit[1].mov.y * 13);
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 25:
		Game.recol("goldenrod");
		ballsInit.push(new Ball());
		ballsInit.push(new Ball());
		ballsInit.push(new Ball());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.6);
		ballsInit[1].copy(ballsInit[0]);
		ballsInit[2].copy(ballsInit[0]);
		switch (ds) {
		case "u":
		case "d":
			ballsInit[1].randomPosX(ballsInit[0]);
			break;
		case "l":
		case "r":
			ballsInit[1].randomPosY(ballsInit[0]);
			break;
		}
		Game.balls.push(ballsInit[0]);
		setTimeout(function(){Game.balls.push(ballsInit[1]);}, 150);
		setTimeout(function(){Game.balls.push(ballsInit[2]);}, 300);
		break;
	case 26:
		Game.recol("black");
		ballsInit.push(new FadeBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.55);
		Game.balls.push(ballsInit[0]);
		break;
	case 27:
		Game.recol("tomato");
		ballsInit.push(new Ball());
		ballsInit.push(new AccelBall(1.005));
		ballsInit.push(new SuddenBall());
		ds = Game.setRandPos(ballsInit[0].pos);
		Game.setMov(ballsInit[0], ds, 1.2);
		ds = Game.setRandPos(ballsInit[1].pos);
		Game.setMov(ballsInit[1], ds, 1.1);
		ds = Game.setRandPos(ballsInit[2].pos);
		Game.setMov(ballsInit[2], ds, 1.2);
		ballsInit[2].fmov = new Point(ballsInit[2].mov.x * 13, ballsInit[2].mov.y * 13);
		Game.balls = Game.balls.concat(ballsInit);
		break;
	case 28:
		alert("You won! That's all for now, more levels may or may not be added soon.");
		Game.level = 1;
		Game.score = 0;
		Game.balls = [];
		Game.ballsIntervalTime = 1000;
		Game.char.pos = new Point();
		Game.recol();
		Game.resetBallsInterval();
		break;
	}
}
Game.resetBallsInterval();