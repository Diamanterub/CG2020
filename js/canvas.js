import Players from './players.js';
import Background from './background.js';

export default class GameCanvas {
    constructor() {
        const canvas = document.querySelector('#game');
        const ctx = canvas.getContext("2d");

        const W = canvas.width;
        const H = canvas.height;
        const HH = 47; // Altura da Hitbox e das personagens
        const HW = 37; // Largura da hitbox e das personages

        let background = new Background(ctx, "B1");
        let player1 = new Players(ctx, W, H, HH, HW, "P1");
        let player2 = new Players(ctx, W, H, HH, HW, "P2");
        let points = 0;
        let level = "";
        //Test remove later
        let levelNum = 3;
        let time = 100;
        let gameisOver = false;
        //Test provalvelmente remover depois

        //Ele recebe o numero do nivel do menu e identifica o nome do level

        switch (levelNum) {
            case 1:
                ////Placeholder Missing/Not official name
                level = "Village";
                break;
            case 2:
                //Placeholder Missing/Not official name
                level = "Ruins"
                break;
            case 3:
                //Placeholder Missing/Not official name
                level = "Waterfall"
                setInterval(timer, 1000);
                break;

            default:

                break;
        }

        // Funções
        function render() {
            // Apaga a cada renderização de modo a atualizar os frames
            ctx.clearRect(0, 0, W, H);
            if (!gameisOver) {
                // Background
                background.Draw();
                // Barra com os detalhes do jogadores (por fazer)
                ctx.beginPath();
                ctx.fillStyle = "black";
                ctx.fillRect(0, 300, 480, 60);
                ctx.fill();
                ctx.fillStyle = "white";
                ctx.font = "12px Amiga Forever Pro2"
                //Player1
                ctx.fillText(`Player 1`, 50, 320);
                //Faltam fazer as vidas
                //Player2
                ctx.fillText(`Player 2`, 430, 320);
                //Faltam fazer as vidas
                //General data
                //Level
                ctx.fillText(`${level}`, 240, 320);
                //Points
                ctx.fillText(`Points: ${points}`, 240, 350);
                ctx.font = "15px Amiga Forever Pro2"
                //Time
                ctx.fillText(`Time: ${time}`, 410, 30)
                ctx.closePath();
                player2.Desenho();
                player1.Desenho();
                window.requestAnimationFrame(render);

            } else if (gameisOver) {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = "white";
                tx.font = "20px Amiga Forever Pro2"
                ctx.fillText("Game Over", 240, 180);;
            }

        }
        render();

        function timer() {
            if (time > 0) {
                time--;
            } else {
                //For Debug process por favor comentam a mudança de estado da variável comentem isto 
                gameisOver = true
            }
        }

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