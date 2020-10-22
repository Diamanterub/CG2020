//
const canvas = document.querySelector('#game');
const ctx = canvas.getContext("2d");

//
let P1Right = new Image();
P1Right.src = '../imgs/p1right.png'; //
let P2Right = new Image();
P2Right.src = '../imgs/p2right.png'; //
//
const W = canvas.width;
const H = canvas.height;
const HH = 47,
    HW = 37,
    HC = 18.5;

let rightKey = leftKey = letterDKey = letterAKey = false;
let x1 = W / 2;
let x2 = W / 2;

let frameIndex1 = 0;
let frameIndex2 = 0;

P1Right.onload = function() {
    setInterval(breath1, 1000 / 1.9); //
};
P2Right.onload = function() {
    setInterval(breath2, 1000 / 2.1); //
};

function breath1() {
    frameIndex1++;
    if (frameIndex1 == 2)
        frameIndex1 = 0;
}

function breath2() {
    frameIndex2++;
    if (frameIndex2 == 2)
        frameIndex2 = 0;
}
// Funções
function render() {
    //Clear
    ctx.clearRect(0, 0, W, H);
    //Draw
    //Player 2 
    ctx.beginPath();
    ctx.fillStyle = "rbga(0, 0, 0, 0.5)";
    ctx.drawImage(P2Right, 23 + (frameIndex2 + 1) + frameIndex2 * 124, 32, 37, 47, x2 - HC, H - 100, 37, 47);
    //ctx.fillRect(x2 - HC, H - 100, HW, HH);
    ctx.textAlign = 'center';
    ctx.fillText("P2", x2, H - 110 - frameIndex2);
    ctx.fill();
    ctx.closePath();
    //Player 1
    ctx.beginPath();
    ctx.drawImage(P1Right, 23 + (frameIndex1 + 1) + frameIndex1 * 124, 32, 37, 47, x1 - HC, H - 100, 37, 47);
    //ctx.fillRect(x1 - HC, H - 100, HW, HH);
    ctx.fillStyle = "rbga(0, 0, 0, 0.5)";
    ctx.textAlign = 'center';
    ctx.fillText("P1", x1, H - 110 - frameIndex1);
    ctx.fill();
    ctx.closePath();

    //Update Player 1
    if (rightKey && x1 < W - HW + HC)
        x1++;
    if (leftKey && x1 > 0 + HC)
        x1--;
    //Update Player 2
    if (letterDKey && x2 < W - HW + HC)
        x2++;
    if (letterAKey && x2 > 0 + HC)
        x2--;
    window.requestAnimationFrame(render);
}
render();

function ArrowPressed(e) {
    if (e.key == 'ArrowRight') {
        rightKey = true;
    } else if (e.key == 'ArrowLeft') {
        leftKey = true;
    } else if (e.key == 'd') {
        letterDKey = true;
    } else if (e.key == 'a') {
        letterAKey = true;
    }
}

function ArrowReleased(e) {
    if (e.key == 'ArrowRight') {
        rightKey = false;
    } else if (e.key == 'ArrowLeft') {
        leftKey = false;
    } else if (e.key == 'd') {
        letterDKey = false;
    } else if (e.key == 'a') {
        letterAKey = false;
    }
}

window.addEventListener('keydown', ArrowPressed);
window.addEventListener('keyup', ArrowReleased);