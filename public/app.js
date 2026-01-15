async function atualizar() {
    const container = document.getElementById("lista-jogos");
    if (container) container.innerHTML = "<p style='color: white; text-align: center;'>Atualizando placares...</p>";

    try {
        const resposta = await fetch('http://localhost:3000/jogos');
        const dados = await resposta.json();

        if (dados && dados.data) {
            // Criamos a estrutura da tabela
            let tabelaHtml = `
                <table style="width: 100%; border-collapse: collapse; color: white; background: #1a1a1a; border-radius: 8px; overflow: hidden;">
                    <tr style="background: #333; height: 40px;">
                        <th style="padding: 10px;">Status</th>
                        <th style="padding: 10px; text-align: right;">Mandante</th>
                        <th style="padding: 10px; text-align: center;">Placar</th>
                        <th style="padding: 10px; text-align: left;">Visitante</th>
                    </tr>
            `;

            // Adicionamos cada jogo na tabela
            dados.data.forEach(jogo => {
                tabelaHtml += `
                    <tr style="border-bottom: 1px solid #444; height: 50px;">
                        <td style="text-align: center; color: #00ff00; font-weight: bold;">${jogo.status_name}</td>
                        <td style="text-align: right; padding-right: 15px;">${jogo.home_team.name}</td>
                        <td style="text-align: center; background: #222; font-size: 1.2em; font-weight: bold;">
                            ${jogo.scores.home_score} - ${jogo.scores.away_score}
                        </td>
                        <td style="text-align: left; padding-left: 15px;">${jogo.away_team.name}</td>
                    </tr>
                `;
            });

            tabelaHtml += `</table>`;
            container.innerHTML = tabelaHtml;
        }
    } catch (erro) {
        console.error("Erro ao carregar tabela:", erro);
        if (container) container.innerHTML = "<p style='color: red;'>Erro ao carregar dados.</p>";
    }
}