function ConverterMoeda() {
    // Obtém o valor digitado pelo usuário
    const valor = parseFloat(document.getElementById("valor").value);

    // Obtém as moedas selecionadas
    const moedaOrigem = document.getElementById("converte-de").value;
    const moedaDestino = document.getElementById("converte-para").value;

    // Taxas de câmbio fixas
    const taxasCambio = {
        BRL: { USD: 0.17, EUR: 0.16, BRL: 1 },
        USD: { BRL: 5.79, EUR: 0.94, USD: 1 },
        EUR: { BRL: 6.10, USD: 1.06, EUR: 1 }
    };

    // Valida o valor digitado
    if (isNaN(valor) || valor <= 0) {
        document.getElementById("resultado").textContent = "Por favor, insira um valor válido.";
        return;
    }

    // Verifica se a conversão é possível
    if (!taxasCambio[moedaOrigem] || !taxasCambio[moedaOrigem][moedaDestino]) {
        document.getElementById("resultado").textContent = "Conversão não disponível.";
        return;
    }

    // Realiza a conversão
    const valorConvertido = valor * taxasCambio[moedaOrigem][moedaDestino];

    // Atualiza os elementos na página
    document.getElementById("moeda-de").textContent = moedaOrigem;
    document.getElementById("valor-converter").textContent = valor.toFixed(2);
    document.getElementById("moeda-para").textContent = moedaDestino;
    document.getElementById("resultado").textContent = valorConvertido.toFixed(2);
}
