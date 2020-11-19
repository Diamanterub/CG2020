export default class Ball {
    constructor(ctx, H, W, x, y, d, dir, c) {
        this.ctx = ctx;
        this.H = H;
        this.W = W;
        this.x = x;
        this.y = y;
        this.d = d; // diametro
        this.c = c; // cor
        this.pop; // Quantidade a subtrair ao tamanho quando rebenta
        this.jump; //altura a que cada bola deve subir
        this.sX, this.sY; // ponto "0, 0" no sprite para se desenhar a bola
        this.points; // pontuação dada por rebentar a bola
        try { this.set(); // define as variáveis
        } catch (error) { throw(error); } // ou cancela a criação da bola
        this.angle = 75;
        this.vX = 4 * Math.cos(this.angle * Math.PI / 180) * dir;
        this.vY = -1 * Math.sin(this.angle * Math.PI / 180);
        this.g = 0; // Gravidade
        this.ballSprite = new Image();
        this.ballSprite.src = '../imgs/ballons.png';
        this.b = 10; // Altura ou largura da borda
        this.ibh = 60; // Altura da caixa de info
        this.safezone = 230; // Altura a que as bolas sobem se forem rebentas muito perto do player
        this.slow = 1; // Abrandar as bolas quando ativado o PowerUp
        this.fixSlow = 1; // Corrigir a altura quando o PowerUp Slow é ativado
    }
    set() {
        switch (this.d) {
            case 40:
                this.jump = -4;
                this.sX = 0;
                this.sY = 0;
                this.pop = 14;
                this.points = 100;
                break;
                
            case 26:
                this.jump = -3.6;
                this.sX = 41;
                this.sY = 7;
                this.pop = 12;
                this.points = 200;
                break;
        
            case 14:
                this.jump = -3.3;
                this.sX = 68;
                this.sY = 13;
                this.pop = 7;
                this.points = 300;
                break;
                
            case 7:
                this.jump = -3;
                this.sX = 83;
                this.sY = 16;
                this.pop = 1;
                this.points = 400;
                break;

            default:
                throw("Pop");
        }
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.drawImage(this.ballSprite, this.sX, this.sY + this.c, this.d, this.d, this.x, this.y, this.d, this.d)
        this.ctx.arc(this.x + this.d/2, this.y + this.d/2, this.d/2, 0, 2*Math.PI);
        this.ctx.stroke();
    }
    update() {
        if (this.safezone >= this.y) { this.g = 1/20; }
        // Colisão com o solo
        if (this.y + this.d > this.H - this.ibh - this.b - 2) { // Se a posição da bola for abaixo do limite, a bola "salta" com efeito da elasticidade 
            this.y = this.H - this.ibh - this.b - 2 - this.d; //garantir que a bola não fica presa no chão
            this.vY = -this.vY; // Inversão do sentido do ângulo com elasticidade
            this.vY = this.jump * this.fixSlow * Math.sin(this.angle * Math.PI / 180);
        }
        // Colisão com os lados
        else if (this.x > this.W - this.d - this.b || this.x < this.b) {
            this.vX = -this.vX // Inversão do sentido do ângulo
            this.x += this.vX; // para não ficar preso na parede
        }
        else {
            this.vY += this.g; // Efeito de gravidade
        }
        this.x += this.vX / this.slow; // Atualização da posição X da bola
        this.y += this.vY / this.slow; // Atualização da posição Y da bola
    }
    collision(entity) {
        if (entity != null) {
            return entity.collision(this.x, this.y, this.d) ? [this.x, this.y, this.d, this.pop, this.points, this.c] : false;
        } else {
            return false;
        }
    }

    PowerUpSlow(state) {
        if (state) {
            this.slow = 2;
            this.fixSlow = 1.2;
        } else {
            this.slow = 1;
            this.fixSlow = 1;    
        }
    }
}