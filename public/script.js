async function atualizar() {
    console.log("Botão clicado!"); // Aparece no F12
    const display = document.getElementById("lista-jogos");
    
    if (display) {
        display.innerHTML = "<h3>Buscando dados no servidor...</h3>";
    }

    try {
        // Busca a rota que criamos no seu server.js
        const resposta = await fetch('http://localhost:3000/jogos');
        const dados = await resposta.json();

        if (display) {
            // Se o servidor retornar erro da API externa
            if (dados.erro) {
                display.innerHTML = <p style="color: red;">Erro: ${dados.erro}</p>;
            } else {
                // Mostra os dados na tela
                display.innerHTML = <pre style="background: #222; color: #0f0; padding: 10px;">${JSON.stringify(dados, null, 2)}</pre>;
            }
        }
    } catch (erro) {
        console.error("Erro ao clicar:", erro);
        alert("O servidor parou! Verifique o terminal.");
    }
}