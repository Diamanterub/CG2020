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

// Fonte do fundo do níveis:
// https://imgur.com/gallery/0AnOW (contém 7 gifs)
// Estes gifs foram recortados em tamanho w em frames para criar ficheiros sprite.

let B1 = new Image(); // GIF 1/7 com 7 frames 
B1.src = '../imgs/background1.png'; // Valores: bIMGS 0 to 7 ; setInterval 1000 / 9

let B2 = new Image(); // GIF 4/7 com 4 frames
B2.src = '../imgs/background2.png'; // Valores: bIMGS 0 to 4 ; setInterval 1000 / 12

let B3 = new Image(); // GIF 6/7 com 11 frames
B3.src = '../imgs/background3.png'; // Valores: bIMGS 0 to 11 ; setInterval 1000 / 13

//
const W = canvas.width;
const H = canvas.height;
const HH = 47; // Altura da Hitbox e das personagens
const HW = 37; // Largura da hitbox e das personages

let rightKey = leftKey = letterDKey = letterAKey = false;
let x1 = W / 2; // Posição do Player 1 relativa a largura do ambiente (inicialmente no centro por default)
let x2 = W / 2; // Posição do Player 2 relativa a largura do ambiente (inicialmente no centro por default)

window.addEventListener("load", myInit, true); // Quando o ecrã é carregado, 
function myInit() { sIPRMSB(), sIPLMSB(), sIBIMGS()}; // são acionadas as funções para o movimento e respiração das personagens.

// Tanto para o lado direito e esquerdo, são usados dois frames do sprite a cada segundo (Movimento e respiração)
function sIPRMSB() {
    setInterval(PRMSB, 1000 / 2);
};

function sIPLMSB() {
    setInterval(PLMSB, 1000 / 2);
};

// 13 frames (2 to 14)
function sIPHWRS() { // - CHAMADO APENAS UMA VEZ
    setInterval(PHWRS, 1000/26);
} // 13 frames (16 to 4) 
function sIPHLRS() { // - CHAMADO APENAS UMA VEZ
    setInterval(PHWLS, 1000/26);
}

// Timer para o background do nível
function sIBIMGS() {
    setInterval(BIMGS, 1000 / 13);
};

let pRMSB = 0; // Player Right Movement Sprite and Breath
let pLMSB = 17; // Player Left Movement Sprite and Breath
let pHWRS = 2; // Player Harpoon While Right Sprite
let pHWLS = 16; // Player Harpoon While Left Sprite
let bIMGS = 0; // Background Image Sprite

function BIMGS() {
    bIMGS++;
    if (bIMGS == 11)
        bIMGS = 0;
}

function PRMSB() { // No ficheiro de sprites de movimento e respiração (para a direita)
    pRMSB++; // são usados apenas o primeiro e o segundo.
    if (pRMSB == 2)
        pRMSB = 0;
}

function PLMSB() { // No ficheiro de sprites de movimento e respiração (para a esquerda)
    pLMSB--; // são usados apenas o último e o penúltimo.
    if (pLMSB == 15)
        pLMSB = 17;
}

function PHWRS() { // No ficheiro de sprites de movimento e respiração (para a direita)
    pHWRS++; // são usados apenas o primeiro e o segundo.
    if (pHWRS == 14)
        pHWRS = 2;
}

function PHWLS() { // No ficheiro de sprites de movimento e respiração (para a direita)
    pHWLS--; // são usados apenas o primeiro e o segundo.
    if (pHWLS == 4)
        pHWLS = 16;
}

let P1RightMove = P2RightMove = true; // Por default, os players estão virados para o lado direito,
let P1LeftMove = P2LeftMove = P1Harpoon = P2Harpoon = false; // mas estas variáveis servem para detetar e efetuar determinado drawImage.

// Funções
function render() {
    // Apaga a cada renderização de modo a atualizar os frames
    ctx.clearRect(0, 0, W, H);
    // Background
    ctx.beginPath();
    ctx.drawImage(B3, bIMGS * 480, 0, 480, 300, 0, 0, 480, 300);
    ctx.closePath();
    // Barra com os detalhes do jogadores (por fazer)
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 300, 480, 60);
    ctx.fill();
    ctx.closePath();
    // Desenho
    // Player 2 (primeiro se desenha esta personagem, para que o Player 1 esteja numa camada a frente)
    ctx.beginPath();
    if (P2RightMove && !P2Harpoon) { // Se o movimento for para a direita
        ctx.drawImage(P2Right, 23 + (pRMSB + 1) + pRMSB * 124, 32, 37, 47, x2 - HW / 2, H - HH - 60, 37, 47);
    } else if (P2LeftMove && !P2Harpoon) { // Se o movimento for para a esquerda
        ctx.drawImage(P2Left, 64 + (pLMSB + 1) + pLMSB * 124, 32, 37, 47, x2 - HW / 2, H - HH - 60, 37, 47);
    } else if (P2RightMove && P2Harpoon){
        ctx.drawImage(P2Right, 23 + (pHWRS + 1) + pHWRS * 124, 32, 37, 47, x2 - HW / 2, H - HH - 60, 37, 47);
    } else if (P2LeftMove && P2Harpoon){
        ctx.drawImage(P2Left, 64 + (pHWLS + 1) + pHWLS * 124, 32, 37, 47, x2 - HW / 2, H - HH - 60, 37, 47);
    }
    ctx.fillStyle = "red";
    ctx.textAlign = 'center';
    ctx.fillText("P2", x2, H - 110 - pRMSB);
    ctx.fill();
    ctx.closePath();
    if (letterDKey && x2 < W - HW + HW / 2)
        x2++;
    if (letterAKey && x2 > 0 + HW / 2)
        x2--;
    //Player 1
    ctx.beginPath();
    if (P1RightMove && !P1Harpoon) {
        ctx.drawImage(P1Right, 23 + (pRMSB + 1) + pRMSB * 124, 32, 37, 47, x1 - HW / 2, H - HH - 60, 37, 47);
    } else if (P1LeftMove && !P1Harpoon) {
        ctx.drawImage(P1Left, 64 + (pLMSB + 1) + pLMSB * 124, 32, 37, 47, x1 - HW / 2, H - HH - 60, 37, 47);
    } else if (P1RightMove && P1Harpoon){
        ctx.drawImage(P1Right, 23 + (pHWRS + 1) + pHWRS * 124, 32, 37, 47, x1 - HW / 2, H - HH - 60, 37, 47);
    } else if (P1LeftMove && P1Harpoon){
        ctx.drawImage(P1Left, 64 + (pHWLS + 1) + pHWLS * 124, 32, 37, 47, x1 - HW / 2, H - HH - 60, 37, 47);
    }
    ctx.fillStyle = "blue";
    ctx.textAlign = 'center';
    ctx.fillText("P1", x1, H - 110 - pRMSB);
    ctx.fill();
    ctx.closePath();
    if (rightKey && x1 < W - HW + HW / 2)
        x1++;
    if (leftKey && x1 > 0 + HW / 2)
        x1--;
    window.requestAnimationFrame(render);
}
render();

function ArrowPressed(e) {
    if (e.key == 'ArrowRight') {
        rightKey = true;
        leftKey = false;
        P1RightMove = true;
        P1LeftMove = false;
        P1Harpoon = false;
    } else if (e.key == 'ArrowLeft') {
        leftKey = true;
        rightKey = false;
        P1LeftMove = true;
        P1RightMove = false;
        P1Harpoon = false;
    } else if (e.key == 'ArrowUp'){
        P1Harpoon = true;
    } else if (e.key == 'd') {
        letterDKey = true;
        letterAKey = false;
        P2RightMove = true;
        P2LeftMove = false;
    } else if (e.key == 'a') {
        letterAKey = true;
        letterDKey = false;
        P2LeftMove = true;
        P2RightMove = false;
    } else if (e.key == 'w') {
        P2Harpoon = true;
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