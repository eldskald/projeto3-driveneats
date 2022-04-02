let pegouPrato = null;
let pegouBebida = null;
let pegouSobremesa = null;

// Pesquisei no google como achar o pai de um tag e como fazer querySelector
// só nos filhos de um tag em particular. Encontrei o parentNode e que dá pra
// botar querySelector direto no tag ao invés de no document e funciona.
function escolherItem (item) {
    let divPai = item.parentNode;

    // Ativamos/desativamos a borda de seleção e checkmark.
    let selecionado = divPai.querySelector(".selecionado");
    if (selecionado !== null) {
        selecionado.classList.remove("selecionado");
        let checkMark = selecionado.querySelector("ion-icon");
        checkMark.classList.add("escondido");
    }
    item.classList.add("selecionado");
    let checkMark = item.querySelector("ion-icon");
    checkMark.classList.remove("escondido");
    
    // Para descobrir se estamos em um prato, bebida ou sobremesa, vamos pro
    // pai do pai e checamos o h1 filho dele. Veja no html como eles são únicos!
    let titulo = divPai.parentNode.querySelector("h1").innerHTML;
    if (titulo === "Primeiro, seu prato") {
        pegouPrato = item.querySelector("h1").innerHTML;
    } else if (titulo === "Agora, sua bebida") {
        pegouBebida = item.querySelector("h1").innerHTML;
    } else if (titulo === "Por fim, sua sobremesa") {
        pegouSobremesa = item.querySelector("h1").innerHTML;
    }

    // Checamos aqui se um combo inteiro foi selecionado para então ligar o botão
    // de finalizar pedido.
    if (pegouPrato && pegouBebida && pegouSobremesa) {
        document.querySelector(".botao-fechar-pedido").classList.add("botao-pronto");
        document.querySelector(".texto-nao-pronto").classList.add("escondido");
        document.querySelector(".texto-pronto").classList.remove("escondido");
    }
}

function finalizarPedido () {
    if (pegouPrato && pegouBebida && pegouSobremesa) {
        let nome = prompt("Qual o seu nome?");
        let endereco = prompt("Qual o seu endereço?");
        irParaWA(nome, endereco);
    }
}

function irParaWA (nome, endereco) {
    let mensagem = encodeURIComponent("Olá, gostaria de fazer o pedido:\n");
    mensagem += encodeURIComponent("- Prato: Frango Yin Yang\n");
    mensagem += encodeURIComponent("- Bebida: Coquinha Gelada\n");
    mensagem += encodeURIComponent("- Sobremesa: Pudim\n");
    mensagem += encodeURIComponent("Total: R$ 27.70\n\n");
    mensagem += encodeURIComponent(`Nome: ${nome}\n`);
    mensagem += encodeURIComponent(`Endereço: ${endereco}...`);
    window.location.href = "https://wa.me/5511976429946/?text=" + mensagem;
}