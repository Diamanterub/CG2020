//
const canvas = document.querySelector('#game');
const ctx = canvas.getContext("2d");

// Imagens

// Fonte das imagens das personagens (algumas foram alteradas, neste caso para o Player 2):
// https://www.spriters-resource.com/pc_computer/cardsagaswars/sheet/106811/
// Estes sprites não são para uso comercial.

let P1Right = new Image();
P1Right.src = '../imgs/p1right.png'; // Sprite para o Player 1 quando se move para a direita
let P1Left = new Image();
P1Left.src = '../imgs/p1left.png'; // Sprite para o Player 1 quando se move para a esquerda
let P2Right = new Image();
P2Right.src = '../imgs/p2right.png'; // Sprite para o Player 2 quando se move para a direita
let P2Left = new Image();
P2Left.src = '../imgs/p2left.png'; // Sprite para o Player 2 quando se move para a esquerda

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
let frameIndex3 = 17;
let frameIndex4 = 17;

window.addEventListener("load", myInit, true);

function myInit() { P1Breath(), P2Breath(), P1BL(), P2BL() };

function P1Breath() {
    setInterval(breath1, 1000 / 1.9); //
};

function P2Breath() {
    setInterval(breath2, 1000 / 2.1); //
};

function P1BL() {
    setInterval(left1, 1000 / 1.9); //
};

function P2BL() {
    setInterval(left2, 1000 / 2.1); //
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

function left1() {
    frameIndex3--;
    if (frameIndex3 == 15)
        frameIndex3 = 17;
}

function left2() {
    frameIndex4--;
    if (frameIndex4 == 15)
        frameIndex4 = 17;
}

let P1RightMove = P2RightMove = true;
let P1LeftMove = P2LeftMove = false;

// Funções
function render() {
    // Apaga a cada renderização de modo a atualizar os frames
    ctx.clearRect(0, 0, W, H);
    // Desenho
    // Player 2 (primeiro se desenha esta personagem, para que o Player 1 esteja numa camada a frente)
    ctx.beginPath();
    if (P2RightMove) {
        ctx.drawImage(P2Right, 23 + (frameIndex2 + 1) + frameIndex2 * 124, 32, 37, 47, x2 - HC, H - 100, 37, 47);
    } else if (P2LeftMove) {
        ctx.drawImage(P2Left, 64 + (frameIndex4 + 1) + frameIndex4 * 124, 32, 37, 47, x2 - HC, H - 100, 37, 47);
    }
    ctx.fillStyle = "rbga(0, 0, 0, 0.5)";
    ctx.textAlign = 'center';
    ctx.fillText("P2", x2, H - 110 - frameIndex2);
    ctx.fill();
    ctx.closePath();
    if (letterDKey && x2 < W - HW + HC)
        x2++;
    if (letterAKey && x2 > 0 + HC)
        x2--;
    //Player 1
    ctx.beginPath();
    if (P1RightMove) {
        ctx.drawImage(P1Right, 23 + (frameIndex1 + 1) + frameIndex1 * 124, 32, 37, 47, x1 - HC, H - 100, 37, 47);
    } else if (P1LeftMove) {
        ctx.drawImage(P1Left, 64 + (frameIndex3 + 1) + frameIndex3 * 124, 32, 37, 47, x1 - HC, H - 100, 37, 47);
    }
    ctx.fillStyle = "rbga(0, 0, 0, 0.5)";
    ctx.textAlign = 'center';
    ctx.fillText("P1", x1, H - 110 - frameIndex1);
    ctx.fill();
    ctx.closePath();
    if (rightKey && x1 < W - HW + HC)
        x1++;
    if (leftKey && x1 > 0 + HC)
        x1--;

    window.requestAnimationFrame(render);
}
render();

function ArrowPressed(e) {
    if (e.key == 'ArrowRight') {
        rightKey = true;
        P1RightMove = true;
        P1LeftMove = false;
    } else if (e.key == 'ArrowLeft') {
        leftKey = true;
        P1RightMove = false;
        P1LeftMove = true;
    } else if (e.key == 'd') {
        letterDKey = true;
        P2RightMove = true;
        P2LeftMove = false;
    } else if (e.key == 'a') {
        letterAKey = true;
        P2RightMove = false;
        P2LeftMove = true;
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