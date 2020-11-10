export default class Harpoon {
    constructor(x, y, ctx) {
        this.ctx = ctx; // Canvas
        this.dx = x; // Initial X position
        this.dy = y; // Initial Y position
        this.sw = 10; // Image width
        this.sh = 0; // Image height
        this.hit = false; // If it hit something
        this.HarpoonSprite = new Image();
        this.HarpoonSprite.src = '../imgs/harpoon.png';
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.HarpoonSprite, 0, 0, this.sw, this.sh, this.dx, this.dy, this.sw, this.sh);
    }

    update() {
        if (this.dy > 10 && !this.hit) {
            this.dy -= 3;
            this.sh += 3;
            return true;
        } else {
            return false;
        }
    }

    collision(ball_x, ball_y, ball_d) {
        if (ball_x + ball_d < this.dx || ball_x > this.dx + this.sw || ball_y + ball_d < this.dy) {
            return false;
        } else {
            this.hit = true;
            return true; 
        }
    }
}