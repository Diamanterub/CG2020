export default class Ball {
    constructor(ctx, H, W, x, y, r) {
        this.ctx = ctx;
        this.H = H;
        this.W = W;
        this.x = x;
        this.y = y;
        this.r = r;
        this.angle = 75 * Math.PI / 180;
        this.vX = 4* Math.cos(this.angle);
        this.vY = 1 * Math.sin(this.angle);
        this.a = 1/20; // Gravidade
        this.k_elast = 0.98 // Elasticidade Inicial
        this.cc = 0; // Contador de Colisões (após determinado número de colisões no solo, altera-se a elasticidade)
        this.ballSprite = new Image();
        this.ballSprite.src = '../imgs/ballons.png';
        this.b = 10; // Altura ou largura da borda
        this.ibh = 60 // Altura da caixa de info
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.drawImage(this.ballSprite, 0, 0, 40, 40, this.x-this.r, this.y-this.r, 40, 40)
        this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        this.ctx.stroke();
    }
    update() {
        // Após 10 colisões no solo, a elasticidade é alterada para que o salto esteja sempre ao mesmo nível
        if(this.cc == 10) this.k_elast = 1;
        // Colisão com o solo
        if (this.y + this.r > this.H - this.ibh - this.b - 2) { // Se a posição da bola for abaixo do limite, a bola "salta" com efeito da elasticidade 
            this.vY = -this.k_elast*this.vY; // Inversão do sentido do ângulo com elasticidade
            this.vX -= 0.05 * this.vX; // Atrito
            this.cc++; // Contador de colisões
        }
        // Colisão com os lados
        else if (this.x > this.W - this.r - this.b || this.x < 30) {
            this.vX = -this.vX // Inversão do sentido do ângulo
        }
        else {
            this.vY += this.a; // Efeito de gravidade
        }
        this.x += this.vX; // Atualização da posição X da bola
        this.y += this.vY; // Atualização da posição Y da bola
    }
}