async function atualizar() {
    const container = document.getElementById('jogos-container');
    container.innerHTML = '<p>Buscando jogos reais...</p>';

    const minhaChave = "81ad2ebcc9b0458ba08a0bb03bb550f5"; 

    const options = {
        method: 'GET',
        headers: {
            'X-Auth-Token': minhaChave
        }
    };

    try {
        // Busca jogos dos principais campeonatos do mundo
        const response = await fetch('https://api.football-data.org/v2/matches', options);
        const data = await response.json();

        if (data.matches && data.matches.length > 0) {
            container.innerHTML = '';
            data.matches.forEach(jogo => {
                const placar = document.createElement('div');
                placar.className = 'jogo-item';
                placar.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #333;">
                        <span>${jogo.homeTeam.name}</span>
                        <strong>${jogo.score.fullTime.homeTeam ?? 0} x ${jogo.score.fullTime.awayTeam ?? 0}</strong>
                        <span>${jogo.awayTeam.name}</span>
                    </div>
                    <small style="color: #00ff00;">${jogo.status} - ${jogo.competition.name}</small>
                `;
                container.appendChild(placar);
            });
        } else {
            container.innerHTML = '<p>Nenhum jogo encontrado para hoje nesta API.</p>';
        }
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Erro ao carregar dados. Verifique sua chave.</p>';
    }
}

    
      
