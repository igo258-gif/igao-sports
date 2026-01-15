async function atualizar() {
    const container = document.getElementById('jogos-container') || document.body;
    container.innerHTML = '<p style="color: white; text-align: center;">Carregando placares em tempo real...</p>';

    try {
        // Buscando dados de um feed de esportes público (sem necessidade de chave)
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.theguardian.com/football/matches/rss');
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            container.innerHTML = '';
            data.items.slice(0, 10).forEach(item => {
                const jogoDiv = document.createElement('div');
                jogoDiv.style.cssText = "background: #1a1a1a; margin: 10px; padding: 15px; border-radius: 8px; border-left: 5px solid #00ff00; color: white; font-family: sans-serif;";
                
                jogoDiv.innerHTML = `
                    <div style="font-weight: bold; font-size: 16px;">${item.title}</div>
                    <div style="font-size: 12px; color: #aaa; margin-top: 5px;">Fonte: ${item.author || 'Futebol Internacional'}</div>
                    <a href="${item.link}" target="_blank" style="color: #00ff00; font-size: 11px; text-decoration: none;">Ver detalhes do jogo</a>
                `;
                container.appendChild(jogoDiv);
            });
        } else {
            container.innerHTML = '<p style="color: white; text-align: center;">Nenhum jogo encontrado no momento.</p>';
        }
    } catch (error) {
        container.innerHTML = '<p style="color: red; text-align: center;">Ocorreu um erro ao buscar os dados públicos.</p>';
    }
}
       
