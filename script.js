async function atualizar() {
    const container = document.getElementById('jogos-container');
    // Se o seu HTML não tiver o ID 'jogos-container', ele tentará no corpo do site
    const alvo = container || document.body;
    
    alvo.innerHTML = '<p style="color: white;">Buscando jogos da rodada...</p>';

    const minhaChave = "81ad2ebcc9b0458ba08a0bb03bb550f5"; 

    // Esta API exige o cabeçalho 'X-Auth-Token'
    const options = {
        method: 'GET',
        headers: {
            'X-Auth-Token': minhaChave
        }
    };

    try {
        // Busca partidas agendadas e em andamento
        const response = await fetch('https://api.football-data.org/v4/matches', options);
        const data = await response.json();

        if (data.matches && data.matches.length > 0) {
            alvo.innerHTML = '';
            data.matches.slice(0, 10).forEach(jogo => {
                const placar = document.createElement('div');
                placar.style.cssText = "background: #1a1a1a; margin: 10px; padding: 15px; border-radius: 8px; border-left: 5px solid #007bff; color: white;";
                placar.innerHTML = `
                    <div style="display: flex; justify-content: space-between; font-weight: bold;">
                        <span>${jogo.homeTeam.name}</span>
                        <span>${jogo.score.fullTime.home ?? 0} x ${jogo.score.fullTime.away ?? 0}</span>
                        <span>${jogo.awayTeam.name}</span>
                    </div>
                    <div style="font-size: 12px; color: #aaa; margin-top: 5px;">
                        ${jogo.competition.name} - Status: ${jogo.status}
                    </div>
                `;
                alvo.appendChild(placar);
            });
        } else {
            alvo.innerHTML = '<p style="color: white;">Nenhum jogo encontrado para hoje nesta liga.</p>';
        }
    } catch (error) {
        console.error(error);
        alvo.innerHTML = '<p style="color: red;">Erro ao carregar dados. Verifique a conexão.</p>';
    }
}
          

