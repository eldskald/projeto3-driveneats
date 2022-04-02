let pegouPrato = null;
let pegouBebida = null;
let pegouSobremesa = null;

let precoPrato = null;
let precoBebida = null;
let precoSobremesa = null;

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
        precoPrato = item.querySelector("h4").innerHTML;
    } else if (titulo === "Agora, sua bebida") {
        pegouBebida = item.querySelector("h1").innerHTML;
        precoBebida = item.querySelector("h4").innerHTML;
    } else if (titulo === "Por fim, sua sobremesa") {
        pegouSobremesa = item.querySelector("h1").innerHTML;
        precoSobremesa = item.querySelector("h4").innerHTML;
    }

    // Checamos aqui se um combo inteiro foi selecionado para então ligar o botão
    // de finalizar pedido.
    if (pegouPrato && pegouBebida && pegouSobremesa) {
        document.querySelector(".botao-fechar-pedido").classList.add("botao-pronto");
        document.querySelector(".texto-nao-pronto").classList.add("escondido");
        document.querySelector(".texto-pronto").classList.remove("escondido");
    }
}

function confirmarPedido () {
    if (pegouPrato && pegouBebida && pegouSobremesa) {
        document.querySelector(".background-cinza").classList.remove("escondido");

        document.querySelector(".prato-nome").innerHTML = pegouPrato;
        document.querySelector(".prato-preco").innerHTML = precoPrato;
        document.querySelector(".bebida-nome").innerHTML = pegouBebida;
        document.querySelector(".bebida-preco").innerHTML = precoBebida;
        document.querySelector(".sobremesa-nome").innerHTML = pegouSobremesa;
        document.querySelector(".sobremesa-preco").innerHTML = precoSobremesa;

        let precoTotal = Number(precoPrato.replace(",", "."));
        precoTotal += Number(precoBebida.replace(",", "."));
        precoTotal += Number(precoSobremesa.replace(",", "."));
        precoTotal = precoTotal.toFixed(2).replace(".", ",");
        document.querySelector(".preco-total").innerHTML = precoTotal;
    }
}

function finalizarPedido () {
    let nome = prompt("Qual o seu nome?");
    let endereco = prompt("Qual o seu endereço?");
    let total = document.querySelector(".preco-total").innerHTML.replace(".", ",");
    irParaWA(nome, endereco, total);
}

function cancelar () {
    document.querySelector(".background-cinza").classList.add("escondido");
}

function irParaWA (nome, endereco, total) {
    let mensagem = "Olá, gostaria de fazer o pedido:\n";
    mensagem += `- Prato: ${pegouPrato}\n`;
    mensagem += `- Bebida: ${pegouBebida}\n`;
    mensagem += `- Sobremesa: ${pegouSobremesa}\n`;
    mensagem += `Total: R$ ${total}\n\n`;
    mensagem += `Nome: ${nome}\n`;
    mensagem += `Endereço: ${endereco}`;
    window.location.href = "https://wa.me/?text=" + encodeURIComponent(mensagem);
}

