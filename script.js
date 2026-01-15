async function atualizar() {
    const container = document.getElementById('jogos-container');
    container.innerHTML = '<p>Buscando jogos reais...</p>';

    // COLOQUE SUA CHAVE AQUI QUANDO SAIR DA ANÁLISE:
    const minhaChave = "SUA_CHAVE_AQUI"; 

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': minhaChave,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        // Busca jogos de hoje (Estaduais e outros)
        const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all', options);
        const data = await response.json();

        if (data.response && data.response.length > 0) {
            container.innerHTML = '';
            data.response.forEach(jogo => {
                const placar = document.createElement('div');
                placar.className = 'jogo-item';
                placar.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #333;">
                        <span><img src="${jogo.teams.home.logo}" width="20"> ${jogo.teams.home.name}</span>
                        <strong>${jogo.goals.home} x ${jogo.goals.away}</strong>
                        <span>${jogo.teams.away.name} <img src="${jogo.teams.away.logo}" width="20"></span>
                    </div>
                    <small style="color: #00ff00;">${jogo.fixture.status.elapsed}' - ${jogo.league.name}</small>
                `;
                container.appendChild(placar);
            });
        } else {
            container.innerHTML = '<p>Nenhum jogo ao vivo no momento. Verifique mais tarde!</p>';
        }
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Erro ao carregar dados. Verifique sua chave da API.</p>';
    }
}
