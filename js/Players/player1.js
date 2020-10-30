export default class Player1 {
    constructor(ctx, W, H, HH, HW) {  
        this.ctx = ctx;
        this.W = W;
        this.H = H;
        this.HH = HH;
        this.HW = HW;

        // Imagens
        
        // Fonte das imagens das personagens (algumas foram alteradas, neste caso para o Player 2):
        // https://www.spriters-resource.com/pc_computer/cardsagaswars/sheet/106811/
        // Estes sprites não são para uso comercial.

        this.Right = new Image();
        this.Right.src = '../../imgs/p1right.png'; // Sprite para o Player 1 quando se move para a direita
        this.Left = new Image();
        this.Left.src = '../../imgs/p1left.png'; // Sprite para o Player 1 quando se move para a esquerda

        this.rightKey = false; this.leftKey = false;
        this.X = this.W / 2 - this.W / 10; // Posição do Player 1 relativa a largura do ambiente

        let pRMSB = 0; // Player Right Movement Sprite and Breath
        let pLMSB = 17; // Player Left Movement Sprite and Breath
        let pHWRS = 1; // Player Harpoon While Right Sprite
        let pHWLS = 16; // Player Harpoon While Left Sprite
        var timerRight = null; // Temporazidor enquanto virada para direita
        var timerLeft = null; // Temporazidor enquanto virada para esquerda
        this.antiSpam = false; // Anti Spam de clicar na animação do arpão

        this.RightMove = true; // Por default, o Player 1 está virado para o lado direito
        this.LeftMove = false; // e estas variáveis servem para distinguir a que lado o jogador está virado.
        this.Harpoon = false; // Esta é outra variável para o caso do arpão ser acionado.

        this.PRMSB = function() { // No ficheiro de sprites do lado esquerdo
            pRMSB++; // são usados apenas o primeiro e o segundo (para respiração e movimento).
            if (pRMSB == 2) pRMSB = 0;
        }
        this.PLMSB = function() { // No ficheiro de sprites do lado esquerdo
            pLMSB--; // são usados apenas o último e o penúltimo (para respiração e movimento).
            if (pLMSB == 15) pLMSB = 17;
        }    
        this.PHWRS = function() { // No ficheiro de sprites (para a direita)
            pHWRS++; // são usados do 2º ao 15º (para a animação do arpão).
            if (pHWRS == 14) pHWRS = 1;
        }    
        this.PHWLS = function() { // No ficheiro de sprites de movimento e respiração (para a direita)
            pHWLS--; // são usados do 17º ao 4º (para a animação do arpão).
            if (pHWLS == 3) pHWLS = 16;
        }

        /* Quando o ecrã é carregado, é acionada uma função que irá executar outras funções relativas ao 
        movimento e respiração da personagem.*/
        window.addEventListener("load", this.myInit(), true); 

        /* Esta função aproveita funções relativas a transição dos sprites para também alterar o valor 
        sX no drawImage. */
        this.GetSprite = function(sprite) {
            switch (sprite) {
                case "pRMSB": return pRMSB;
                case "pLMSB": return pLMSB;
                case "pHWRS": return pHWRS;
                case "pHWLS": return pHWLS;
            }
        }
        // Para a animação do arpão em 1 segundo são dados 28 frames, mas definimos o tempo para 0.5s, logo são dados 14 frames nesse tempo
        this.startHarpoonAnimation = function() {
            timerRight = setInterval(this.PHWRS, 1000/28);
            timerLeft = setInterval(this.PHWLS, 1000/28);
        }
        // Após passar um timeOut de 480ms, esta função é executada para parar a animação do arpão
        this.stopHarpoonAnimation = function() {
            clearInterval(timerRight);
            clearInterval(timerLeft);
        }
    }
    // São acionadas as funções para o movimento e respiração da personagem.
    myInit() { setInterval(this.PRMSB, 1000 / 2), setInterval(this.PLMSB, 1000 / 2)}

    Desenho() {
        this.ctx.beginPath();
        let Dir; // Definir qual função usar relativa ao lado em que se está virado e há uso do arpão
        let n = 11; // Esta variável serve para centrar a personagem em função a abscissa do sprite
        let bs = 10; // Tamanho da borda
        if (this.RightMove && !this.Harpoon) {
            Dir = this.GetSprite("pRMSB");
            this.ctx.drawImage(this.Right, 23-n + (Dir + 1) + Dir * 124, 31, 48, 48, this.X - this.HW / 2, this.H - this.HH - 70, 48, 48);
        } else if (this.RightMove && this.Harpoon){
            Dir = this.GetSprite("pHWRS");
            this.ctx.drawImage(this.Right, 23-n + (Dir + 1) + Dir * 124, 31, 48, 48, this.X - this.HW / 2, this.H - this.HH - 70, 48, 48);
        } else if (this.LeftMove && !this.Harpoon){
            Dir = this.GetSprite("pLMSB");
            this.ctx.drawImage(this.Left, 64-n + (Dir + 1) + Dir * 124, 31, 48+n, 48, this.X - this.HW / 2, this.H - this.HH - 70, 48+n, 48);
        } else if (this.LeftMove && this.Harpoon){
            Dir = this.GetSprite("pHWLS");
            this.ctx.drawImage(this.Left, 64-n + (Dir + 1) + Dir * 124, 31, 48+n, 48, this.X - this.HW / 2, this.H - this.HH - 70, 48+n, 48);
        }
        // Texto que indica o "nome" do jogador
        this.ctx.fillStyle = "#7080df";
        this.ctx.textAlign = 'center';
        this.ctx.font = "10px Amiga Forever Pro2"
        this.ctx.fillText("P1", this.X+11, this.H - 120);
        this.ctx.fill();
        this.ctx.closePath();
        // Limitação vertical relativa a área do canvas
        if (this.rightKey && this.X < this.W - this.HW + this.HW / 2 - n - bs) this.X++;
        if (this.leftKey && this.X > 0 + this.HW / 2 - n + bs) this.X--;
    }

    async ArrowPressed(e) {
        switch (e.key) {
            case 'ArrowRight':
                this.rightKey = true;
                this.leftKey = false;
                this.RightMove = true;
                this.LeftMove = false;
            break;            
            case 'ArrowLeft':
                this.leftKey = true;
                this.rightKey = false;
                this.LeftMove = true;
                this.RightMove = false;
            break;
            case 'ArrowUp':
                // Se for pressionado, após aprox. 0,5s o utilizador pode voltar pressionar.
                if (!this.antiSpam){
                this.antiSpam = true;
                this.Harpoon = true;
                this.startHarpoonAnimation();
                await this.sleep(480);
                this.stopHarpoonAnimation();
                await this.sleep(481);
                this.antiSpam = false;
                this.Harpoon = false;
                    }
            break;
        }
    }
    
    ArrowReleased(e) {
        switch (e.key) {
            case 'ArrowRight':
                this.rightKey = false;
            break;
            case 'ArrowLeft':
                this.leftKey = false;
            break;
        }
    }

    // Função de espera
    sleep(ms) { return new Promise( resolve => setTimeout(resolve, ms) ); }
}
