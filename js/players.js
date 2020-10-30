export default class Player1 {
    constructor(ctx, W, H, HH, HW, P) {  
        this.ctx = ctx;
        this.W = W;
        this.H = H;
        this.HH = HH;
        this.HW = HW;

        this.P = P;
        switch (P) {
            case "P1":
                this.Player = {
                    "RightSprite" : '../../imgs/p1right.png',
                    "LeftSprite" : '../../imgs/p1left.png',
                    "StartPos" : this.W / 2 - this.W / 10,
                    "StartRight" : true,
                    "StartLeft" : false,
                    "Color" : "#7080df",
                    "RightKey" : 'ArrowRight',
                    "LeftKey" : 'ArrowLeft',
                    "UpKey": 'ArrowUp'
                }
            break;

            case "P2":
                this.Player = {
                    "RightSprite" : '../../imgs/p2right.png',
                    "LeftSprite" : '../../imgs/p2left.png',
                    "StartPos" : this.W / 2 + this.W / 10,
                    "StartRight" : false,
                    "StartLeft" : true,
                    "Color" : "#a2000b",
                    "RightKey" : 'd',
                    "LeftKey" : 'a',
                    "UpKey": 'w'
                }
            break;
        }

        // Imagens
        
        // Fonte das imagens das personagens (algumas foram alteradas, neste caso para o Player 2):
        // https://www.spriters-resource.com/pc_computer/cardsagaswars/sheet/106811/
        // Estes sprites não são para uso comercial.

        this.Right = new Image();
        this.Right.src = this.Player.RightSprite; // Sprite para o Player 1 quando se move para a direita
        this.Left = new Image();
        this.Left.src = this.Player.LeftSprite; // Sprite para o Player 1 quando se move para a esquerda

        this.rightKey = false; this.leftKey = false;
        this.X = this.Player.StartPos; // Posição do Player 1 relativa a largura do ambiente

        this.pRMSB = 0; // Player Right Movement Sprite and Breath
        this.pLMSB = 17; // Player Left Movement Sprite and Breath
        this.pHWRS = 1; // Player Harpoon While Right Sprite
        this.pHWLS = 16; // Player Harpoon While Left Sprite
        var timerRight = null; // Temporazidor enquanto virada para direita
        var timerLeft = null; // Temporazidor enquanto virada para esquerda
        this.antiSpam = false; // Anti Spam de clicar na animação do arpão

        this.RightMove = this.Player.StartRight; // Por default, o Player 1 está virado para o lado direito
        this.LeftMove = this.Player.StartLeft; // e estas variáveis servem para distinguir a que lado o jogador está virado.
        this.Harpoon = false; // Esta é outra variável para o caso do arpão ser acionado.

        /* Quando o ecrã é carregado, é acionada uma função que irá executar outras funções relativas ao 
        movimento e respiração da personagem.*/
        window.addEventListener("load", this.myInit(), true); 

        // Para a animação do arpão em 1 segundo são dados 28 frames, mas definimos o tempo para 0.5s, logo são dados 14 frames nesse tempo
        this.startHarpoonAnimation = function() {
            timerRight = setInterval(() => {this.PHWRS()}, 1000/28);
            timerLeft = setInterval(() => {this.PHWLS()}, 1000/28);
        }
        // Após passar um timeOut de 480ms, esta função é executada para parar a animação do arpão
        this.stopHarpoonAnimation = function() {
            clearInterval(timerRight);
            clearInterval(timerLeft);
        }
    }
    // São acionadas as funções para o movimento e respiração da personagem.
    myInit() { setInterval(() => {this.PRMSB()}, 1000 / 2), setInterval(() => {this.PLMSB()}, 1000 / 2)}

    Desenho() {
        this.ctx.beginPath();
        let Turn, //Virar para a direita ou esquerda
        Index, //Index no sprite
        Center = 11, // Esta variável serve para centrar a personagem em função a abscissa do sprite
        Dir, // Definir qual variável usar relativa ao lado em que se está virado e se há uso do arpão
        DirCalc = function(p) { return Index-Center + (p + 1) + p * 124; }, // Função para facilitar mudança da fórmula
        Border = 10, // Tamanho da borda
        LeftAdj = 48; // Ajuste necessário no caso de o player estar virado para a esquerda
        if (this.RightMove) {
            Turn = this.Right;
            Index = 23;
            Dir = this.Harpoon ? this.pHWRS : this.pRMSB;
        } else {
            Turn = this.Left;
            Index = 64;
            Dir = this.Harpoon ? this.pHWLS : this.pLMSB;
            LeftAdj += Center;
        }
        this.ctx.drawImage(Turn, DirCalc(Dir), 31, LeftAdj, 48, this.X - this.HW / 2, this.H - this.HH - 70, LeftAdj, 48);
        
        // Texto que indica o "nome" do jogador
        this.ctx.fillStyle = this.Player.Color;
        this.ctx.textAlign = 'center';
        this.ctx.font = "10px Amiga Forever Pro2"
        this.ctx.fillText(this.P, this.X+11, this.H - 120);
        this.ctx.fill();
        this.ctx.closePath();
        // Limitação vertical relativa a área do canvas
        if (this.rightKey && this.X < this.W - this.HW + this.HW / 2 - Center - Border) this.X++;
        if (this.leftKey && this.X > 0 + this.HW / 2 - Center + Border) this.X--;
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
        // são usados do 2º ao 15º (para a animação do arpão).
        this.pHWRS == 13 ? this.pHWRS = 1 : this.pHWRS++;
    }    
    PHWLS() { // No ficheiro de sprites de movimento e respiração (para a direita)
        // são usados do 17º ao 4º (para a animação do arpão).
        this.pHWLS == 4 ? this.pHWLS = 16 : this.pHWLS--; 
    }

    async ArrowPressed(e) {
        switch (e.key) {
            case this.Player.RightKey:
                this.rightKey = true;
                this.leftKey = false;
                this.RightMove = true;
                this.LeftMove = false;
            break;            
            case this.Player.LeftKey:
                this.leftKey = true;
                this.rightKey = false;
                this.LeftMove = true;
                this.RightMove = false;
            break;
            case this.Player.UpKey:
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
            case this.Player.RightKey:
                this.rightKey = false;
            break;
            case this.Player.LeftKey:
                this.leftKey = false;
            break;
        }
    }

    // Função de espera
    sleep(ms) { return new Promise( resolve => setTimeout(resolve, ms) ); }
}
