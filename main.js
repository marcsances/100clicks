var isInit = false;
var n = 1;
var d = 1;
var time;
var handler;
var infinite = false;

function timer() {
    document.getElementById("timer").innerText = ((new Date() - time) / 1000);
    handler = setTimeout(timer, 10);
}


function init(inf) {
    if (!isInit) {
        isInit = true;
        infinite = inf;
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


    }
    
}

function step() {
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
    document.getElementById("n").innerText = d;
}

function lower() {
    init();
    if (d < n) {
        step();
    } else {
        gameOver();
    }
}

function same() {
    init();
    if (d == n) {
        step();
    } else {
        gameOver();
    }
}

function higher() {
    init();
    if (d > n) {
        step();
    } else {
        gameOver();
    }
}

function gameOver() {
    isInit = false;
    document.getElementById("n").innerText = n;
    document.getElementById("over").className = "";
    document.getElementById("buttonContainer").className = "hidden";
    document.getElementById("again").className = "";
    window.clearTimeout(handler);
}

function victory() {
    isInit = false;
    document.getElementById("over").innerHTML = "You Win:&nbsp;";
    document.getElementById("over").className = "";
    window.clearTimeout(handler);
}