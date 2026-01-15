async function atualizar() {
    const container = document.getElementById('jogos-container') || document.body;
    container.innerHTML = '<p style="color: white;">Buscando jogos reais (usando ponte)...</p>';

    const minhaChave = "81ad2ebcc9b0458ba08a0bb03bb550f5"; 
    
    // Usamos um proxy para evitar o erro de CORS que está bloqueando seu site
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.football-data.org/v4/matches";

    const options = {
        method: 'GET',
        headers: {
            'X-Auth-Token': minhaChave
        }
    };

    try {
        const response = await fetch(proxy + url, options);
        
        if (response.status === 403) {
            container.innerHTML = '<p style="color: yellow;">Acesse "cors-anywhere.herokuapp.com/corsdemo" e clique no botão azul para liberar o acesso temporário.</p>';
            return;
        }

        const data = await response.json();

        if (data.matches && data.matches.length > 0) {
            container.innerHTML = '';
            data.matches.slice(0, 10).forEach(jogo => {
                const placar = document.createElement('div');
                placar.style.cssText = "background: #1a1a1a; margin: 10px; padding: 15px; border-radius: 8px; border-left: 5px solid #007bff; color: white; font-family: sans-serif;";
                placar.innerHTML = `
                    <div style="display: flex; justify-content: space-between; font-weight: bold;">
                        <span>${jogo.homeTeam.shortName || jogo.homeTeam.name}</span>
                        <span>${jogo.score.fullTime.home ?? 0} x ${jogo.score.fullTime.away ?? 0}</span>
                        <span>${jogo.awayTeam.shortName || jogo.awayTeam.name}</span>
                    </div>
                    <div style="font-size: 11px; color: #00ff00; margin-top: 5px;">
                        ${jogo.competition.name} - ${jogo.status}
                    </div>
                `;
                container.appendChild(placar);
            });
        } else {
            container.innerHTML = '<p style="color: white;">Nenhum jogo importante hoje nesta lista.</p>';
        }
    } catch (error) {
        console.error(error);
        container.innerHTML = '<p style="color: red;">Erro de conexão. Tente novamente em instantes.</p>';
    }
}
            


