// Função para alterar a posição da imagem em relação a área visível
function resizeWindow() {
    // A posição da imagem é alterada para "center -[((altura da imagem background-1) - área visível) a dividir por 2]px"
    var value = "center " + "-" + (1079 - window.innerHeight) / 2 + "px";
    document.body.style.backgroundPosition = value;
}
// A medida que se altera o tamanho da área visível, a função é executada
window.onresize = resizeWindow;
resizeWindow();

// Nota: a proprieda é inútil se o nível de zoom for baixo (quando a área do background-image é inferior a área visível)