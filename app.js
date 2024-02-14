let listaNumerosAnteriores = [];
let limiteLista = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    let mensagemEscolha = `Digite um número entre 1 e ${limiteLista}:`;

    exibirTextoNaTela('h1', 'Jogo do Número Secreto');  
    exibirTextoNaTela('p', mensagemEscolha);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
   
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}`;

        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    } else {
        chute > numeroSecreto ? exibirTextoNaTela('p', 'O número secreto é menor') : exibirTextoNaTela('p', 'O número secreto é maior');
    }

    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteLista + 1);
    let quantidadeNumerosLista = listaNumerosAnteriores.length;

    if (quantidadeNumerosLista === limiteLista) {
        listaNumerosAnteriores = [];
    }

    if (listaNumerosAnteriores.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosAnteriores.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}
