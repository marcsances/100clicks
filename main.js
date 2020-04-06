var isInit = false;
var n = 1;
var d = 1;
var time;
var handler;
var infinite = false;
var tutorial = false;
var ok_aud = new Audio('ok.wav');
var fail_aud = new Audio('fail.wav');

function timer() {
    document.getElementById("timer").innerText = (!tutorial ? (new Date() - time) / 1000 : n);
    handler = setTimeout(timer, 10);
}


function init(mode) {
    if (!isInit) {
        isInit = true;
        if (mode != -1) {
            infinite = (mode == 1);
            tutorial = (mode == 2);
        }
        n = 1;
        d = 1;
        time = new Date();
        handler = setTimeout(timer, 10);
        document.getElementById("instructions").className = "hidden";
        document.getElementById("again").className = "hidden";
        document.getElementById("game").className = "";
        document.getElementById("buttonContainer").className = "";
        document.getElementById("n").innerText = "1";
        document.getElementById("over").className = "hidden";
        document.getElementById("over").innerHTML = "Game Over:&nbsp;";
        document.getElementById("lower").className = "";
        document.getElementById("same").className = "";
        document.getElementById("higher").className = "";
        document.getElementById("lower").onclick = lower;
        document.getElementById("higher").onclick = higher;
        document.getElementById("same").onclick = same;
        if (tutorial) document.getElementById("same").className = "hint";
    }
    
}

function step() {
    ok_aud.play();
    window.navigator.vibrate(50);
    n = n + 1;
    if (n == 100 && !infinite) {
        return victory();
    }
    const k = parseInt(Math.random() * 10);
    if (k <= 3 || k > 6) {
        d = n;
    } else if (k <= 5) {
        d = n - parseInt(Math.random() * 5);
    } else if (k > 5) {
        d = n + parseInt(Math.random() * 5);
    }
    if (tutorial) {
        if (d < n) {
            document.getElementById("lower").className = "hint";
            document.getElementById("same").className = "";
            document.getElementById("higher").className = "";
        } else if (d == n) {
            document.getElementById("lower").className = "";
            document.getElementById("same").className = "hint";
            document.getElementById("higher").className = "";
        } else if (d > n) {
            document.getElementById("lower").className = "";
            document.getElementById("same").className = "";
            document.getElementById("higher").className = "hint";
        }
    }
    document.getElementById("n").innerText = d;
}

function lower(e) {
    if (!e.screenX) return;
    init();
    if (d < n) {
        step();
    } else {
        gameOver();
    }
}

function same(e) {
    if (!e.screenX) return;
    init();
    if (d == n) {
        step();
    } else {
        gameOver();
    }
}

function higher(e) {
    if (!e.screenX) return;
    init();
    if (d > n) {
        step();
    } else {
        gameOver();
    }
}

function gameOver() {
    window.navigator.vibrate(300);
    fail_aud.play();
    isInit = false;
    document.getElementById("n").innerText = n;
    document.getElementById("over").className = "";
    document.getElementById("buttonContainer").className = "hidden";
    document.getElementById("again").className = "";
    window.clearTimeout(handler);
}

function victory() {
    isInit = false;
    document.getElementById("over").innerHTML = !tutorial ? "You Win:&nbsp;" : "Tutorial Over:&nbsp;";
    document.getElementById("over").className = "";
    window.clearTimeout(handler);
}

function menu() {
    isInit = false;
    document.getElementById("instructions").className = "";
    document.getElementById("again").className = "hidden";
    document.getElementById("game").className = "hidden";
    document.getElementById("buttonContainer").className = "";
    document.getElementById("n").innerText = "1";
    document.getElementById("over").className = "hidden";
    document.getElementById("over").innerHTML = "Game Over:&nbsp;";
}

function keyboard(e) {
    switch (e.code) {
        case "ArrowDown":
        case "ArrrowUp":
            same();
            break;
        case "ArrowLeft":
            lower();
            break;
        case "ArrowRight":
            higher();
            break;
        case "Enter":
            init(-1);
            break;
    }
}

document.onkeydown = keyboard;
