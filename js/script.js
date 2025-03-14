// Função para obter as taxas de câmbio da API
async function obterTaxasCambio() {
    const url = "https://api.exchangerate-api.com/v4/latest/BRL"; // Substitua por outra API se necessário
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        return dados.rates; // Retorna as taxas de câmbio
    } catch (erro) {
        console.error("Erro ao obter as cotações:", erro);
        return null; // Retorna null em caso de erro
    }
}

// Função para atualizar a data da cotação no HTML
async function atualizarDataCotacao() {
    const url = "https://api.exchangerate-api.com/v4/latest/BRL"; // API URL
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        document.querySelector(".cotação").innerHTML = `
            <p>Data cotação utilizada: ${dados.date}</p>
        `;
    } catch (erro) {
        console.error("Erro ao atualizar a data da cotação:", erro);
    }
}

// Função principal para converter moeda
async function ConverterMoeda() {
    // Obtém o valor digitado
    const valor = parseFloat(document.getElementById("valor").value);
    const moedaOrigem = document.getElementById("converte-de").value;
    const moedaDestino = document.getElementById("converte-para").value;

    if (isNaN(valor) || valor <= 0) {
        document.getElementById("resultado").textContent = "Por favor, insira um valor válido.";
        return;
    }

    // Obtém as taxas de câmbio atualizadas
    const taxasCambio = await obterTaxasCambio();

    if (!taxasCambio || !taxasCambio[moedaDestino]) {
        document.getElementById("resultado").textContent = "Erro ao obter as taxas de câmbio.";
        return;
    }

    // Realiza a conversão
    const valorConvertido = valor * (taxasCambio[moedaDestino] / taxasCambio[moedaOrigem]);

    // Atualiza os elementos na página
    document.getElementById("moeda-de").textContent = moedaOrigem;
    document.getElementById("valor-converter").textContent = valor.toFixed(2);
    document.getElementById("moeda-para").textContent = moedaDestino;
    document.getElementById("resultado").textContent = valorConvertido.toFixed(2);
}

// Atualiza a data da cotação ao carregar a página
window.onload = atualizarDataCotacao;