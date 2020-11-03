export default class Background {
    constructor(ctx, bg) {
        this.ctx = ctx;

        // Fonte do fundo do níveis:
        // https://imgur.com/gallery/0AnOW (contém 7 gifs)
        // Estes gifs foram recortados em tamanho w em frames para criar ficheiros sprite.

        let Frames, MaxVal;
        switch (bg) {
            case "B1":
                this.BG = new Image(); // GIF 1/7 com 7 frames 
                this.BG.src = '../imgs/background1.png'; // Valores: BgImgSprite 0 to 7 ; setInterval 1000 / 9
                Frames = 9; MaxVal = 7;
            break;
            case "B2":
                this.BG = new Image(); // GIF 4/7 com 4 frames
                this.BG.src = '../imgs/background2.png'; // Valores: BgImgSprite 0 to 4 ; setInterval 1000 / 12
                Frames = 12; MaxVal = 4;
            break;
            case "B3":
                this.BG = new Image(); // GIF 6/7 com 11 frames
                this.BG.src = '../imgs/background3.png'; // Valores: BgImgSprite 0 to 11 ; setInterval 1000 / 13
                Frames = 13; MaxVal = 11;
            break;
        }
        
        let BgImgSprite = 0; // Background Image Sprite
        // Timer para o background do nível
        setInterval(FrameIncrement, 1000 / Frames)
        function FrameIncrement() {
            BgImgSprite++;
            if (BgImgSprite == MaxVal) BgImgSprite = 0;
        }

        this.GetBgSprite = function() { // Função para o desenho 
            return BgImgSprite;
        }
    }

    Draw() {
        this.ctx.beginPath();
        this.ctx.drawImage(this.BG, this.GetBgSprite() * 480, 0, 480, 300, 0, 0, 480, 300);
        this.ctx.closePath();
    }
}