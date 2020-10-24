import Player1 from './Players/player1.js';
import Player2 from './Players/player2.js';

export default class GameCanvas {
    constructor() {
        const canvas = document.querySelector('#game');
        const ctx = canvas.getContext("2d");

        const W = canvas.width;
        const H = canvas.height;
        const HH = 47; // Altura da Hitbox e das personagens
        const HW = 37; // Largura da hitbox e das personages
        
        // Fonte do fundo do níveis:
        // https://imgur.com/gallery/0AnOW (contém 7 gifs)
        // Estes gifs foram recortados em tamanho w em frames para criar ficheiros sprite.
        
        let B1 = new Image(); // GIF 1/7 com 7 frames 
        B1.src = '../imgs/background1.png'; // Valores: bIMGS 0 to 7 ; setInterval 1000 / 9
        
        let B2 = new Image(); // GIF 4/7 com 4 frames
        B2.src = '../imgs/background2.png'; // Valores: bIMGS 0 to 4 ; setInterval 1000 / 12
        
        let B3 = new Image(); // GIF 6/7 com 11 frames
        B3.src = '../imgs/background3.png'; // Valores: bIMGS 0 to 11 ; setInterval 1000 / 13
        
        let bIMGS = 0; // Background Image Sprite

        // Timer para o background do nível
        setInterval(BIMGS, 1000 / 13)
        function BIMGS() {
            bIMGS++;
            if (bIMGS == 11)
                bIMGS = 0;
        }

        let player1 = new Player1(ctx, W, H, HH, HW);
        let player2 = new Player2(ctx, W, H, HH, HW);
        
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
            player2.Desenho();
            player1.Desenho();
            window.requestAnimationFrame(render);            
        }
        render();
        
        function ArrowPressed(e) {
            player1.ArrowPressed(e);
            player2.ArrowPressed(e);
        }
        
        function ArrowReleased(e) {
            player1.ArrowReleased(e);
            player2.ArrowReleased(e);
        }
        
        window.addEventListener('keydown', ArrowPressed);
        window.addEventListener('keyup', ArrowReleased);
    }
}