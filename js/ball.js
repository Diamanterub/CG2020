export default class Ball {
    constructor(ctx, H, W, x, y, r, dir) {
        this.ctx = ctx;
        this.H = H;
        this.W = W;
        this.x = x;
        this.y = y;
        this.r = r;
        this.dir = dir
        this.angle = -40 * Math.PI / 180;
        this.vX = 8 * Math.cos(this.angle)
        this.vY = 8 * Math.sin(this.angle)
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
        if (this.y > this.H - this.r) {

            this.vY = -this.vY

        } else {

        }

        if (this.x > this.W - this.r || this.x < 0) {
            console.log(this.x, this.H, this.r);
            this.vX = -this.vX

        } else {

        }
        this.x += this.vX; // update circle X position (uniform motion)
        this.y += this.vY; // update circle Y position 

    }






}