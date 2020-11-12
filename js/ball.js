export default class Ball {
    constructor(ctx, H, W, x, y, d, dir) {
        this.ctx = ctx;
        this.H = H;
        this.W = W;
        this.x = x;
        this.y = y;
        this.d = d; // diametro
        this.angle; // ângulo do movimentoinfo
        this.pop; // Quantidade a subtrair ao tamanho quando rebenta
        this.jump; //altura a que cada bola deve subir
        this.sX, this.sY; // ponto "0, 0" no sprite para se desenhar a bola
        this.max_cc; // Valor máximo ao contador
        this.k_elast; // Elasticidade Inicial
        try { this.set(); // define as variáveis
        } catch (error) { throw(error); } // ou cancela a criação da bola
        this.vX = 4 * Math.cos(this.angle * Math.PI / 180) * dir;
        this.vY = -1 * Math.sin(this.angle * Math.PI / 180);
        this.g = 0; // Gravidade
        this.cc = 0; // Contador de Colisões (após determinado número de colisões no solo, altera-se a elasticidade)
        this.ballSprite = new Image();
        this.ballSprite.src = '../imgs/ballons.png';
        this.b = 10; // Altura ou largura da borda
        this.ibh = 60; // Altura da caixa de info
    }
    set() {
        switch (this.d) {
            case 40:
                this.jump = 48;
                this.angle = 75;
                this.sX = 0;
                this.sY = 0;
                this.pop = 14;
                this.max_cc = 5;
                this.k_elast = 0.98;
                break;
                
            case 26:
                this.jump = (this.y < 160 ? this.y-10 : this.y - 50);
                this.angle = 75;
                this.sX = 41;
                this.sY = 7;
                this.pop = 12;
                this.max_cc = 3;
                this.k_elast = 0.94;
                break;
        
            case 14:
                this.jump = (this.y < 180 ? this.y-10 : this.y - 50);
                this.angle = 75;
                this.sX = 68;
                this.sY = 13;
                this.pop = 7;
                this.max_cc = 2;
                this.k_elast = 0.90;
                break;
                
            case 7:
                this.jump = (this.y < 200 ? this.y-10 : this.y - 50);
                this.angle = 75;
                this.sX = 83;
                this.sY = 16;
                this.pop = 1;
                this.max_cc = 2;
                this.k_elast = 0.90;
                break;

            default:
                throw("Pop");
        }
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.drawImage(this.ballSprite, this.sX, this.sY, this.d, this.d, this.x, this.y, this.d, this.d)
        this.ctx.arc(this.x + this.d/2, this.y + this.d/2, this.d/2, 0, 2*Math.PI);
        this.ctx.stroke();
    }
    update() {
        if (this.jump >= this.y) { this.g = 1/20; }
        // Após 10 colisões no solo, a elasticidade é alterada para que o salto esteja sempre ao mesmo nível
        
        if(this.cc == this.max_cc) this.k_elast = 1;
        // Colisão com o solo
        if (this.y + this.d > this.H - this.ibh - this.b - 2) { // Se a posição da bola for abaixo do limite, a bola "salta" com efeito da elasticidade 
            this.y = this.H - this.ibh - this.b - 2 - this.d; //garantir que a bola não fica presa no chão
            this.vY = -this.k_elast*this.vY; // Inversão do sentido do ângulo com elasticidade
            this.cc++;
            console.log(this.k_elast);
        }
        // Colisão com os lados
        else if (this.x > this.W - this.d - this.b || this.x < this.b) {
            this.vX = -this.vX // Inversão do sentido do ângulo
            this.x += this.vX; // para não ficar preso na parede
        }
        else {
            this.vY += this.g; // Efeito de gravidade
        }
        this.x += this.vX; // Atualização da posição X da bola
        this.y += this.vY; // Atualização da posição Y da bola
    }
    collision(entity) {
        if (entity != null) {
            return entity.collision(this.x, this.y, this.d) ? [this.x, this.y, this.d, this.pop] : false;
        } else {
            return false;
        }
    }
}