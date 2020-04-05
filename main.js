var isInit = false;
var n = 1;
var d = 1;
var time;
var handler;

function timer() {
    document.getElementById("timer").innerText = ((new Date() - time) / 1000);
    handler = setTimeout(timer, 1);
}


function init() {
    if (!isInit) {
        isInit = true;
        n = 1;
        d = 1;
        time = new Date();
        handler = setTimeout(timer, 1);
        document.getElementById("instructions").className = "hidden";
        document.getElementById("again").className = "hidden";
        document.getElementById("game").className = "";
        document.getElementById("buttonContainer").className = "";
        document.getElementById("display").innerText = "1";
    }
    
}

function step() {
    n = n + 1;
    if (n == 100) {
        return victory();
    }
    const k = parseInt(Math.random() * 10);
    console.log(k);
    if (k != 3 && k != 6) {
        d = n;
    } else if (k == 3) {
        d = n - parseInt(Math.random() * 20);
    } else if (k == 6) {
        d = n + parseInt(Math.random() * 20);
    }
    document.getElementById("display").innerText = d;
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
    document.getElementById("display").innerText = "Game Over";
    document.getElementById("buttonContainer").className = "hidden";
    document.getElementById("again").className = "";
    window.clearTimeout(handler);
}

function victory() {
    isInit = false;
    document.getElementById("display").innerText = "You Win";
    window.clearTimeout(handler);
}