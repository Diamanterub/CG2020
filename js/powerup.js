export default class PowerUp {
    constructor(x, y, power, ctx, H) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.H = H;
        this.power = power;
        this.powerSprite = new Image();
        this.powerSprite.scr = '../imgs/slow.png';
    }
    async draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "white";
        this.ctx.moveTo(this.x, this.y)
        this.ctx.lineTo(this.x + 26, this.y)
        this.ctx.lineTo(this.x + 26, this.y + 26)
        this.ctx.lineTo(this.x, this.y + 26)
        this.ctx.lineTo(this.x, this.y)
        this.ctx.fill()
        this.ctx.beginPath();
        this.ctx.drawImage(this.powerSprite, this.x, this.y);
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
