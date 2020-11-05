export default class Ball {
    constructor(ctx, H, W, x, y, r, dir) {
        this.ctx = ctx;
        this.H = H;
        this.W = W;
        this.x = x;
        this.y = y;
        this.r = r;
        this.dir = dir;
        this.angle = 80 * Math.PI / 180;
        this.vX = 7 * Math.cos(this.angle);
        this.vY = 2 * Math.sin(this.angle);
        this.a = 0.1; // Gravidade
        //this.k_elast = 0.98; // Elasticidade
        //this.cc = 0; // Contador de Colisões
        //this.limit = false // Após a bola bater um número determinado de vezes, desativamos a elasticidade
        this.ballSprite = new Image();
        this.ballSprite.src = '../imgs/Pang_Ballons.png';
    }
    draw() {
        this.ctx.beginPath()
        //Falta mais parametros
        this.ctx.drawImage(this.ballSprite, 0, 0, 40, 40, this.x, this.y, 40, 40)
    }
    update() {
        // if circle hits the bottom of the Canvas
        if (this.y > this.H - 70 - 40 /*|| this.y < 10*/) { // 70 = altura da info + borda e 40 é diametro da bola
            this.vY = -0.98*this.vY;
            this.vX -= 0.05 * this.vX;
        }
        else if (this.x > this.W - 40 - 10 || this.x < 10) {
            this.vX = -this.vX
        }
        else {
            this.vY += this.a;
        }
        this.x += this.vX; // update circle X position (uniform motion)
        this.y += this.vY; // update circle Y position 

    }
}