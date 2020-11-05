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
        let time = 5;
        let gameisOver = false;
        //Test provalvelmente remover depois

        //Recebe o numero do nivel do menu e identifica o nome do level

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
                infoBar();
                player2.Desenho();
                player1.Desenho();
                window.requestAnimationFrame(render);

            } else if (gameisOver) {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = "white";
                ctx.font = "20px retrogf"
                ctx.fillText("Game Over", 240, 180);
                ctx.font = "14px retrogf"
                ctx.fillText("Insert coin", 240, 220);
                player1 = null
                player2 = null
                window.addEventListener("click", function () {
                    console.log("Restarted")
                    gameisOver = false;
                    time = 100;
                    player1 = new Players(ctx, W, H, HH, HW, "P1");
                    player2 = new Players(ctx, W, H, HH, HW, "P2");
                })
                window.requestAnimationFrame(render);

            }

        }
        render();

        function timer() {
            if (time > 0) {
                time--;
            } else {
                // Quando o tempo acaba, o jogo termina (ainda por alterar, apenas para testar)
                gameisOver = true
            }
        }

        function infoBar() {
            ctx.beginPath();
            // Barra Preta
            ctx.fillStyle = "black";
            ctx.fillRect(0, 300, 480, 60);
            ctx.fill();
            //Detalhes da fonte
            ctx.fillStyle = "white";
            ctx.font = "12px retrogf"
            //Player1
            ctx.fillText(`Player 1`, 50, 320);
            //Faltam fazer as vidas
            
            //Player2
            ctx.fillText(`Player 2`, 430, 320);
            //Faltam fazer as vidas

            //
            //
            //General data
            //Level
            ctx.fillText(`${level}`, 240, 320);
            //Points
            ctx.fillText(`Points: ${points}`, 240, 350);
            ctx.font = "15px retrogf"
            //Time
            ctx.fillText(`Time: ${time}`, 410, 30)
            ctx.closePath();


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