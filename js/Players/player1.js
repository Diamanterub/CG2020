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
        var timerRight = null;
        var timerLeft = null;
        let value = false;

        this.RightMove = true; // Por default, os players estão virados para o lado direito,
        this.LeftMove = false; 
        let Harpoon = false; // mas estas variáveis servem para detetar e efetuar determinado drawImage.

        this.PRMSB = function() { // No ficheiro de sprites de movimento e respiração (para a direita)
            pRMSB++; // são usados apenas o primeiro e o segundo.
            if (pRMSB == 2) pRMSB = 0;
        }
        this.PLMSB = function() { // No ficheiro de sprites de movimento e respiração (para a esquerda)
            pLMSB--; // são usados apenas o último e o penúltimo.
            if (pLMSB == 15) pLMSB = 17;
        }    
        this.PHWRS = function() { // No ficheiro de sprites de movimento e respiração (para a direita)
            pHWRS++; // são usados apenas o primeiro e o segundo.
            if (pHWRS == 14) pHWRS = 1;
        }    
        this.PHWLS = function() { // No ficheiro de sprites de movimento e respiração (para a direita)
            pHWLS--; // são usados apenas o primeiro e o segundo.
            if (pHWLS == 4) pHWLS = 17;
        }

        window.addEventListener("load", this.myInit(), true); 
        // Quando o ecrã é carregado, são acionadas as funções para o movimento e respiração das personagens.
        //Tanto para o lado direito e esquerdo, são usados dois frames do sprite a cada segundo (Movimento e respiração)

        this.GetSprite = function(sprite) {
            switch (sprite) {
                case "pRMSB": return pRMSB;
                case "pLMSB": return pLMSB;
                case "pHWRS": return pHWRS;
                case "pHWLS": return pHWLS;
            }
        }
        /*this.test = function(test){
            switch(test) {
                case "1": return 24;
                case "2": return 10;
            }
        }
        this.hBSX = function(hbsx){
            switch(hbsx){
                case "move": return 37;
                case "harpoon": return 48;
            }
        }
        this.hBSY = function(hbsy){
            switch(hbsy){
                case "move": return 48;
                case "harpoon": return 48;
            }
        }*/
        //
        this.startHarpoonAnimation = function() {
            // Then you initilize the variable
            timerRight = setInterval(this.PHWRS, 1000/28);
            timerLeft = setInterval(this.PHWLS, 1000/28);
          }
        //  
        this.stopHarpoonAnimation = function() {
            // To cancel an interval, pass the timer to clearInterval()
            clearInterval(timerRight);
            clearInterval(timerLeft);
          }  
        this.preventSpam = function(){
            return value;
          }
        this.turnTrue = function(){
            value = true;
        }
        this.turnFalse = function(){
            value = false;
            Harpoon = false;
        }
        this.GetHarpoon = function() {
            return Harpoon;
          }
    }

    myInit() { setInterval(this.PRMSB, 1000 / 2), setInterval(this.PLMSB, 1000 / 2)}

    Desenho() {
        this.ctx.beginPath();
        let Dir, hStatus;
        //hStatus = this.GetHarpoon?  
        if (this.RightMove && !Harpoon) {
            Dir = this.GetSprite("pRMSB");
            /*N = this.Harpoon? this.test("2") : this.test("1");
            sizeX = this.Harpoon ? this.hBSX("harpoon") : this.hBSX("move");
            sizeY = this.Harpoon ? this.hBSY("harpoon") : this.hBSY("move");
            Sprite = this.Right;*/
            this.ctx.drawImage(this.Right, 24 + (Dir + 1) + Dir * 124, 31, 37, 48, this.X - this.HW / 2, this.H - this.HH - 60, 37, 48);
        } else if (this.RightMove && this.Harpoon){
            Dir = this.GetSprite("pHWRS");
            /*N = 64;
            sizeX = this.Harpoon ? this.hBSX("harpoon") : this.hBSX("move");
            sizeY = this.Harpoon ? this.hBSY("harpoon") : this.hBSY("move");
            Sprite = this.Left;*/
            this.ctx.drawImage(this.Right, 24 + (Dir + 1) + Dir * 124, 31, 37, 48, this.X - this.HW / 2, this.H - this.HH - 60, 37, 48);
        } else if (this.LeftMove && !this.Harpoon){
            Dir = this.GetSprite("pLMSB");
            this.ctx.drawImage(this.Left, 70 + (Dir + 1) + Dir * 124, 31, 48, 48, this.X - this.HW / 2, this.H - this.HH - 60, 48, 48);
        } else if (this.LeftMove && this.Harpoon){
            Dir = this.GetSprite("pHWLS");
            this.ctx.drawImage(this.Left, 64 + (Dir + 1) + Dir * 124, 31, 48, 48, this.X - this.HW / 2, this.H - this.HH - 60, 48, 48);
        }
        this.ctx.fillStyle = "blue";
        this.ctx.textAlign = 'center';
        this.ctx.font = "10px Amiga Forever Pro2"
        this.ctx.fillText("P1", this.X, this.H - 110 - this.GetSprite("pRMSB"));
        this.ctx.fill();
        this.ctx.closePath();
        if (this.rightKey && this.X < this.W - this.HW + this.HW / 2) this.X++;
        if (this.leftKey && this.X > 0 + this.HW / 2) this.X--;
    }

    ArrowPressed(e) {
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
                console.log(this.preventSpam());
                if (!this.preventSpam()){
                this.turnTrue();
                this.Harpoon = true;
                this.startHarpoonAnimation();
                setTimeout(this.stopHarpoonAnimation, 460); //460
                setTimeout(this.turnFalse, 461); // 461
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
}
