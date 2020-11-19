import Players from './players.js';
import Background from './background.js';
import Ball from './ball.js';

export default class GameCanvas {
    constructor() {
        const canvas = document.querySelector('#game');
        const ctx = canvas.getContext("2d");

        const W = canvas.width;
        const H = canvas.height;

        let background = new Background(ctx, "B1");
        let player1 = new Players(ctx, W, H, "P1");
        let player2 = new Players(ctx, W, H, "P2");
        let lifeImg = new Image();
        lifeImg.src = "../imgs/lives.png";
        let balls = [];
        let points = 0;
        let level = "";
        //Test remove later
        let levelNum = 3;
        let time = 120;
        let gameisOver = false;
        let lifesPlayer1 = 3;
        let lifesPlayer2 = 3;
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
                balls = [new Ball(ctx, H, W, 200, 60, 40, 1)]; // Isto tem de ter variáveis
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
                window.removeEventListener("click", restart);
                // Background
                background.Draw();
                if (lifesPlayer1 == 0) {
                    player1 = null;
                } else {
                    player1.Desenho();
                }
                if (lifesPlayer2 == 0) {
                    player2 = null;
                } else {
                    player2.Desenho();
                }
                if (lifesPlayer1 == 0 && lifesPlayer2 == 0) {
                    gameisOver = true;
                }
                infoBar();
                for (let i = balls.length - 1; i >= 0; i--) {
                    balls[i].update();
                    balls[i].draw();
                    let collision1 = player1 != null ? balls[i].collision(player1.ReturnShot()) : false;
                    let collision2 = player2 != null ? balls[i].collision(player2.ReturnShot()) : false;
                    try {
                        if (collision1 !== false) {
                            balls[i] = new Ball(ctx, H, W, collision1[0], collision1[1], collision1[2] - collision1[3], 1);
                            balls.push(new Ball(ctx, H, W, collision1[0], collision1[1], collision1[2] - collision1[3], -1));
                            points += collision1[4];
                        }
                        if (collision2 !== false) {
                            balls[i] = new Ball(ctx, H, W, collision2[0], collision2[1], collision2[2] - collision2[3], 1);
                            balls.push(new Ball(ctx, H, W, collision2[0], collision2[1], collision2[2] - collision2[3], -1));
                            points += collision2[4];
                        }
                    } catch (error) {
                        balls.splice(i, 1);
                    }
                    try {
                        player1 != null ? balls[i].collision(player1) ? lifesPlayer1-- : {} : {};
                        player2 != null ? balls[i].collision(player2) ? lifesPlayer2-- : {} : {};
                    } catch (error) {}
                }
            } else if (gameisOver) {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = "white";
                ctx.font = "20px retrogf"
                ctx.fillText("Game Over", 240, 180);
                ctx.font = "14px retrogf"
                ctx.fillText("Insert coin", 240, 220);
                player1 = null;
                player2 = null;
                balls = null;
                points = 0;
                window.addEventListener("click", restart)
            }
            window.requestAnimationFrame(render);
        }
        render();

        function restart() {
            console.log(gameisOver)
            gameisOver = false;
            time = 120;
            player1 = new Players(ctx, W, H, "P1");
            player2 = new Players(ctx, W, H, "P2");
            balls = [new Ball(ctx, H, W, 200, 60, 40, 1)];
            lifesPlayer1 = 3;
            lifesPlayer2 = 3;
        }

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
            ctx.fillText("Player 1", 50, 320);
            //Vidas do Player 1
            ctx.drawImage(lifeImg, lifesPlayer1 * 50, 0, 50, 16, 20, 334, 50, 16);
            //Player2
            ctx.fillText("Player 2", 430, 320);
            //Vidas do Player 2
            ctx.drawImage(lifeImg, lifesPlayer2 * 50, 0, 50, 16, 410, 334, 50, 16);
            
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
            player1 != null ? player1.ArrowPressed(e) : {};
            player2 != null ? player2.ArrowPressed(e) : {};
        }

        function ArrowReleased(e) {
            player1 != null ? player1.ArrowReleased(e) : {};
            player2 != null ? player2.ArrowReleased(e) : {};
        }
        window.addEventListener('keydown', ArrowPressed);
        window.addEventListener('keyup', ArrowReleased);
    }
}