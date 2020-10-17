// Função para alterar a posição da imagem em relação a área visível
function resizeWindow() {
    // A posição da imagem é alterada para "center -[((altura da imagem background-1) - área visível) a dividir por 2]px"
    if (window.innerHeight <= 1080) {
        var value = "center " + "-" + (1079 - window.innerHeight) / 2 + "px";

    } else {
        var value = "center " + (window.innerHeight - 1079) / 2 + "px";
    }
    document.body.style.backgroundPosition = value;
}
// A medida que se altera o tamanho da área visível, a função é executada
window.onresize = resizeWindow;
resizeWindow();