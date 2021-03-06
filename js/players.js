import Harpoons from './harpoon.js'

export default class Player1 {
    constructor(ctx, W, H, P) {
        this.ctx = ctx;
        this.W = W;
        this.H = H;

        // Imagens

        // Fonte das imagens das personagens (algumas foram alteradas, neste caso para o Player 2):
        // https://www.spriters-resource.com/pc_computer/cardsagaswars/sheet/106811/
        // Estes sprites não são para uso comercial.

        this.P = P;
        switch (P) {
            case "P1":
                this.Player = {
                    "RightSprite": '../imgs/p1right.png',
                    "LeftSprite": '../imgs/p1left.png',
                    "StartPos": this.W / 2 - this.W / 10,
                    "StartRight": true,
                    "StartLeft": false,
                    "Color": "#7080df",
                    "RightKey": ['ArrowRight', ''],
                    "LeftKey": ['ArrowLeft', ''],
                    "UpKey": ['ArrowUp', '']
                }
                break;

            case "P2":
                this.Player = {
                    "RightSprite": '../imgs/p2right.png',
                    "LeftSprite": '../imgs/p2left.png',
                    "StartPos": this.W / 2 + this.W / 10,
                    "StartRight": false,
                    "StartLeft": true,
                    "Color": "#a2000b",
                    "RightKey": ['d', 'D'],
                    "LeftKey": ['a', 'A'],
                    "UpKey": ['w', 'W']
                }
                break;
        }

        this.Right = new Image();
        this.Right.src = this.Player.RightSprite; // Sprite para o Player 1 quando se move para a direita
        this.Left = new Image();
        this.Left.src = this.Player.LeftSprite; // Sprite para o Player 1 quando se move para a esquerda

        this.rightKey = false;
        this.leftKey = false;
        this.X = this.Player.StartPos; // Posição do Player 1 relativa a largura do ambiente

        this.HH = 47; // Altura da Hitbox e das personagens
        this.HW = 57; // Largura da hitbox e das personagens
        this.pRMSB = 0; // Player Right Movement Sprite and Breath
        this.pLMSB = 17; // Player Left Movement Sprite and Breath
        this.pHWRS = 2; // Player Harpoon While Right Sprite
        this.pHWLS = 15; // Player Harpoon While Left Sprite
        var timerRight = null; // Temporazidor enquanto virada para direita
        var timerLeft = null; // Temporazidor enquanto virada para esquerda
        let shot = null; // Disparo em sí
        this.fireRate = 1 // Velocidade do arpão
        this.speed = 1.3; // Velocidade do jogador
        this.invencibility = false; // Invencibilidade após ser atingido
        this.invencFrame = 0; // Frame a mostrar quando invencivel

        this.CreateHarpoon = function (x, y) {
            shot = new Harpoons(x, y, this.ctx, this.fireRate);
            function FireHarpoon() {
                if (shot.update()) {
                    shot.draw();
                    window.requestAnimationFrame(FireHarpoon);
                } else {
                    shot = null;
                }
            }
            FireHarpoon();
        }

        this.ReturnShot = function () { return shot; }

        this.RightMove = this.Player.StartRight; // Por default, o Player 1 está virado para o lado direito
        this.LeftMove = this.Player.StartLeft; // e estas variáveis servem para distinguir a que lado o jogador está virado.

        /* Quando o ecrã é carregado, é acionada uma função que irá executar outras funções relativas ao 
        movimento e respiração da personagem.*/
        window.addEventListener("load", this.myInit(), true);

        // Para a animação do arpão em 1 segundo são dados 28 frames, mas definimos o tempo para 480ms, sendo usados 13 frames.
        this.startHarpoonAnimation = function () {
            timerRight = setInterval(() => { this.PHWRS() }, 1000 / 28);
            timerLeft = setInterval(() => { this.PHWLS() }, 1000 / 28);
        }
        // Após passar 480ms, esta função é executada para parar a animação do arpão
        this.stopHarpoonAnimation = function () {
            clearInterval(timerRight);
            clearInterval(timerLeft);
        }
    }
    // São acionadas as funções para o movimento e respiração da personagem.
    myInit() {
        setInterval(() => { this.PRMSB() }, 1000 / 2),
        setInterval(() => { this.PLMSB() }, 1000 / 2)
    }

    Desenho() {
        //this.invencFrame = this.invencibility ? this.RightMove ? 1 : -1 : 0;
        let Turn, //Virar para a direita ou esquerda
            Index, //Index no sprite
            Center = 11, // Esta variável serve para centrar a personagem em função a abscissa do sprite
            Dir, // Definir qual variável usar relativa ao lado em que se está virado e se há uso do arpão
            DirCalc = function (p) {
                return Index - Center + (p + 1) + p * 124;
            }, // Função para facilitar mudança da fórmula
            Border = 10, // Tamanho da borda
            LeftAdj = 48; // Ajuste necessário no caso de o player estar virado para a esquerda
        if (this.RightMove) {
            Turn = this.Right;
            Index = 23; // Distancia em píxeis entre o espaço vazio e a "hitbox" do personagem no sprite
            Dir = this.ReturnShot() != null ? this.pHWRS : this.pRMSB;
        } else {
            Turn = this.Left;
            Index = 64; // Distancia em píxeis entre o espaço vazio e a "hitbox" do personagem no sprite
            Dir = this.ReturnShot() != null ? this.pHWLS : this.pLMSB;
            LeftAdj += Center;
        }
        // HITBOX
        // let align = Center*1.3;
        // align += this.RightMove ? 0 : 2;
        // this.ctx.beginPath()
        // this.ctx.moveTo(this.X - this.HW / 2 + align, this.H - this.HH - 70)
        // this.ctx.lineTo(this.X + align, this.H - this.HH - 70)
        // this.ctx.lineTo(this.X + align, this.H - 70)
        // this.ctx.lineTo(this.X - this.HW / 2 + align, this.H - 70)
        // this.ctx.lineTo(this.X - this.HW / 2 + align, this.H - this.HH  - 70)
        // this.ctx.stroke()
        if (!this.invencFrame) {
            this.ctx.beginPath();
            this.ctx.drawImage(Turn, DirCalc(Dir), 31, LeftAdj, 48, this.X - this.HW / 2, this.H - this.HH - 70, LeftAdj, 48);
        }
        /* 31 - Distancia em píxeis entre o espaço vazio e a "hitbox" do personagem no sprite relativo ao eixo y.
           48 - Altura da "hitbox" da personagem.
           70 - Altura da caixa preta com detalhes + altura da borda do fundo */

        // Texto que indica o "nome" do jogador
        this.ctx.fillStyle = this.Player.Color;
        this.ctx.textAlign = 'center';
        this.ctx.font = "10px retrogf"
        this.ctx.fillText(this.P, this.X, this.H - 120);
        this.ctx.fill();
        this.ctx.closePath();
        // Limitação vertical relativa a área do canvas
        if (this.rightKey && this.X < this.W - Center - Border) this.X = +this.X + this.speed;
        if (this.leftKey && this.X > 0 + this.HW / 2 - Center + Border) this.X = +this.X - this.speed;
    }

    PRMSB() { // No ficheiro de sprites do lado esquerdo
        // são usados apenas o primeiro e o segundo (para respiração e movimento).
        this.pRMSB == 1 ? this.pRMSB = 0 : this.pRMSB++;
    }
    PLMSB() { // No ficheiro de sprites do lado esquerdo
        // são usados apenas o último e o penúltimo (para respiração e movimento).
        this.pLMSB == 16 ? this.pLMSB = 17 : this.pLMSB--;
    }
    PHWRS() { // No ficheiro de sprites (para a direita)
        // são usados do 3º ao 15º (para a animação do arpão).
        this.pHWRS == 14 ? this.pHWRS = 2 : this.pHWRS++;
    }
    PHWLS() { // No ficheiro de sprites de movimento e respiração (para a direita)
        // são usados do 17º ao 5º (para a animação do arpão).
        this.pHWLS == 3 ? this.pHWLS = 15 : this.pHWLS--;
    }

    async ArrowPressed(e) {
        switch (e.key) {
            case this.Player.RightKey[0]:
            case this.Player.RightKey[1]:
                this.rightKey = true;
                this.leftKey = false;
                this.RightMove = true;
                this.LeftMove = false;
                break;
            case this.Player.LeftKey[0]:
            case this.Player.LeftKey[1]:
                this.leftKey = true;
                this.rightKey = false;
                this.LeftMove = true;
                this.RightMove = false;
                break;
            case this.Player.UpKey[0]:
            case this.Player.UpKey[1]:
                if (this.ReturnShot() == null) {
                    this.startHarpoonAnimation();
                    this.CreateHarpoon(this.RightMove ? this.X - 15 : this.X, this.H - this.HH - 70, this.ctx);
                    await this.sleep(480);
                    this.stopHarpoonAnimation();
                }
                break;
        }
    }

    ArrowReleased(e) {
        switch (e.key) {
            case this.Player.RightKey[0]:
            case this.Player.RightKey[1]:
                this.rightKey = false;
                break;
            case this.Player.LeftKey[0]:
            case this.Player.LeftKey[1]:
                this.leftKey = false;
                break;
        }
    }

    collision(ent_x, ent_y, ent_d, type) {
        let Center = 11; // Variável igual ao Center no Desenho()
        let align = Center*1.3; // Alinhar a hitbox com o jogador
        align += this.RightMove ? 0 : 2; // Correção Esquerda/Direita
        if (ent_x + ent_d < this.X - this.HW / 2 + align // Completamente à esquerda
        || ent_x > this.X + align // Completamente à direita
        || ent_y + ent_d < this.H - this.HH - 70) { // Completamente acima
            return false;
        } else {
            if (type == "ball") {
                if (!this.invencibility) { // Invencivel
                    this.hit();
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        }
    }

    async hit() {
        this.invencibility = true;
        let flash = setInterval(() => { this.invencFrame = !this.invencFrame; }, 100);
        await this.sleep(3000);
        this.invencibility = false;
        clearInterval(flash);
    }

    // Função de espera
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    PowerUps(power, state) {
        switch (power) {
            case "speed":
                this.speed = state ? 2.3 : 1.3;
                break;

            case "invenc":
                this.hit();
                break;

            case "fastfire":
                this.fireRate = state ? 2 : 1;
                break;
        }
    }
}