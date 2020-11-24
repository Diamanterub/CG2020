import Players from './players.js';
import Background from './background.js';
import Ball from './ball.js';
import PowerUp from './powerup.js';

export default class GameCanvas {
    constructor(n) {
        //n = Vidas do jogador 2 (0 se 1 Player, 3 se 2 Players)

        const canvas = document.querySelector('#game');
        const ctx = canvas.getContext("2d");

        const W = canvas.width;
        const H = canvas.height;

        let background;
        let player1 = new Players(ctx, W, H, "P1");
        let player2 = new Players(ctx, W, H, "P2");
        let lifeImg = new Image();
        lifeImg.src = "../imgs/lives.png";
        let balls = [];
        let points = [0, 0, 0];
        let level = "";
        let levelNum = 1;
        let time = 120;
        let gameisOver = false;
        let lifesPlayer1 = 3;
        let lifesPlayer2 = n;
        setInterval(timer,1000);
        levelMech(levelNum);
        let powerups = [];

        // Funções
        render();
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
                if (powerups.length > 0) {
                    for (let i = 0; i < powerups.length; i++) {
                        powerups[i].update();
                        powerups[i].draw();
                        if (player1 != null) {
                            if (powerups[i].collision(player1)) {
                                powerups[i].power != "life" ? CatchPowerUp(powerups[i].power, player1) : CatchPowerUp(powerups[i].power, 1);
                                powerups.splice(i, 1); continue;
                            }
                        }
                        if (player2 != null) {
                            if (powerups[i].collision(player2)) {
                                powerups[i].power != "life" ? CatchPowerUp(powerups[i].power, player2) : CatchPowerUp(powerups[i].power, 2);
                                powerups.splice(i, 1); continue;
                            }
                        }
                    }
                }
                infoBar();
                for (let i = balls.length - 1; i >= 0; i--) {
                    balls[i].update();
                    balls[i].draw();
                    let collision1 = player1 != null ? balls[i].collision(player1.ReturnShot()) : false;
                    let collision2 = player2 != null ? balls[i].collision(player2.ReturnShot()) : false;
                    try {
                        if (collision1 !== false) {
                            points[levelNum - 1] += collision1[4];
                            createPowerUp(collision1[0], collision1[1]);
                            balls[i] = new Ball(ctx, H, W, collision1[0], collision1[1], collision1[2] - collision1[3], 1, collision1[5]);
                            balls.push(new Ball(ctx, H, W, collision1[0], collision1[1], collision1[2] - collision1[3], -1, collision1[5]));
                            continue;
                        }
                        if (collision2 !== false) {
                            points[levelNum - 1] += collision2[4];
                            createPowerUp(collision2[0], collision2[1]);
                            balls[i] = new Ball(ctx, H, W, collision2[0], collision2[1], collision2[2] - collision2[3], 1, collision2[5]);
                            balls.push(new Ball(ctx, H, W, collision2[0], collision2[1], collision2[2] - collision2[3], -1, collision2[5]));
                        }
                    } catch (error) {
                        balls.splice(i, 1);
                    }
                    try {
                        player1 != null ? balls[i].collision(player1) ? lifesPlayer1-- : {} : {};
                        player2 != null ? balls[i].collision(player2) ? lifesPlayer2-- : {} : {};
                    } catch (error) {}
                }
                if (balls.length == 0) {
                    if (levelNum < 3) {
                        levelNum++;
                        player1 = null;
                        player2 = null;
                        restart()
                    } else {
                        ctx.fillStyle = "black";
                        ctx.fillRect(0, 0, W, H);
                        ctx.fillStyle = "white";
                        ctx.font = "20px retrogf"
                        ctx.fillText("Well done", 240, 180);
                        ctx.font = "14px retrogf"
                        ctx.fillText("You have completed the game", 240, 220);
                    }
                }
            } else if (gameisOver) {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, W, H);
                ctx.fillStyle = "white";
                ctx.font = "20px retrogf"
                ctx.fillText("Game Over", 240, 180);
                ctx.font = "14px retrogf"
                ctx.fillText("Insert a coin", 240, 220);
                player1 = null;
                player2 = null;
                balls = null;
                window.addEventListener("click", restart)
            }
            window.requestAnimationFrame(render);
        }

        function restart() {
            gameisOver = false;
            time = 120;
            powerups = [];
            player1 = new Players(ctx, W, H, "P1");
            player2 = new Players(ctx, W, H, "P2");
            lifesPlayer1 = 3;
            lifesPlayer2 = n;
            levelMech(levelNum)
        }
        
        function levelMech(id) {            
            switch (id) {
                case 1:
                    level = "Hibiscus Forest | 1";
                    background = new Background(ctx, "B1");
                    balls = [new Ball(ctx, H, W, 200, 60, 40, 1, 0)];
                    points[0] = 0;
                    break;
                case 2:
                    level = "Londo Ruins | 2"
                    background = new Background(ctx, "B2");
                    balls = [new Ball(ctx, H, W, 100, 60, 40, 1, 44)];
                    balls.push(new Ball(ctx, H, W, 300, 60, 40, 1, 44));
                    points[1] = points[0];
                    break;
                case 3:
                    level = "Mura Waterfall | 3"
                    background = new Background(ctx, "B3");
                    balls = [new Ball(ctx, H, W, 100, 60, 40, 1, 88)];
                    balls.push(new Ball(ctx, H, W, 200, 60, 40, 1, 88));
                    balls.push(new Ball(ctx, H, W, 300, 60, 40, 1, 88));
                    points[2] = points[1];
                    break;
            }
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
            ctx.fillText(`Points: ${points[levelNum - 1]}`, 240, 350);
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

        //POWERUPS
        function createPowerUp(x, y) {
            if (Math.random() <= 20/100)
            {
                const powers = ["speed","invenc","fastfire","slow","time","life"];
                const index = Math.floor(Math.random() * 5.9);
                powerups.push(new PowerUp(x, y, powers[index], ctx, H));
            }
        }

        async function CatchPowerUp(power, player) {
            switch (power) {
                case "speed":
                    player.PowerUps("speed", true);
                    await sleep(3000);
                    player.PowerUps("speed", false);
                    break;
    
                case "invenc":
                    player.PowerUps("invenc");
                    break;
    
                case "fastfire":
                    player.PowerUps("fastfire", true);
                    await sleep(3000);
                    player.PowerUps("fastfire", false);
                    break;

                case "slow":
                    balls.forEach(ball => { ball.PowerUpSlow(true); });
                    await sleep(3000)
                    balls.forEach(ball => { ball.PowerUpSlow(false); });
                    break;

                case "time":
                    time += 15;
                    break;

                case "life":
                    player == 1 ? 
                    lifesPlayer1 += lifesPlayer1 < 3 ? 1 : 0
                    : lifesPlayer2 += lifesPlayer2 < 3 ? 1 : 0;
                    break;
            }
        }

        // Função de espera
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
}