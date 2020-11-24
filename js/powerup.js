export default class PowerUp {
    constructor(x, y, power, ctx, H) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.H = H;
        this.power = power;
        this.powerSprite = new Image();
        this.powerSprite.src = '../imgs/' + power + '.png';
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "rgba(200, 200, 200, 0.4)";
        this.ctx.arc(this.x + 13, this.y + 13, 13, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.drawImage(this.powerSprite, 0, 0, 26, 26, this.x, this.y, 26, 26)
        this.ctx.closePath()
    }
    update() {
        if (this.y + 26 > this.H - 60 - 10) {
            this.y = this.H - 60 - 10 - 26;
        } else {
            this.y++;
        }
    }
    collision(player) {
        return player.collision(this.x, this.y, 26, "power");
    }
}
