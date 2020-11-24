import ResizeWindow from './resize.js';
import GameCanvas from './canvas.js';

class App {
    constructor() {
        document.getElementById('one_opt').addEventListener('click', (event) => { this.begin(0) });
        document.getElementById('two_opt').addEventListener('click', (event) => { this.begin(3) });
        
        this.resizeWindow = new ResizeWindow();
    }

    begin(n) {
        document.getElementById("svg").remove();
        this.gameCanvas = new GameCanvas(n);
        console.log(n)
    }

}

new App();