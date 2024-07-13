document.addEventListener('DOMContentLoaded', () => {
  // Função para adicionar o comportamento de clique em um grupo de spans
  function setupSpanClicks(spanSelector, activeClass) {
    const spans = document.querySelectorAll(spanSelector);

    spans.forEach(span => {
      span.addEventListener('click', function() {
        // Se o span já tem a classe 'color-change', remove a classe
        if (this.classList.contains(activeClass)) {
          this.classList.remove(activeClass);
        } else {
          // Remove a classe 'color-change' de todos os spans
          spans.forEach(s => s.classList.remove(activeClass));
          // Adiciona a classe 'color-change' ao span clicado
          this.classList.add(activeClass);
        }
      });
    });
  }

  // Configurar clique para os spans de 'Apostas' e 'ApostasCorreto'
  setupSpanClicks('.Apostas .opção', 'color-change');
  setupSpanClicks('.ApostasTotalGols .opção2', 'color-change');
  setupSpanClicks('.ApostasMVP .opção', 'color-change');
  setupSpanClicks('.Apostas .opção2', 'color-change');

  // Função para salvar as apostas selecionadas
  document.getElementById('save-bets').addEventListener('click', () => {
    const selectedSpans = document.querySelectorAll('.color-change');
    const container = document.getElementById('suasApostasContainer');
    const totalBetElement = document.getElementById('totalBet');
    
    // Limpa o container de apostas anteriores
    container.innerHTML = '';
    totalBetElement.innerHTML = '';

    // Verifica se há spans selecionados
    if (selectedSpans.length === 0) {
      alert('Por favor, selecione uma ODD antes de salvar.');
      return;
    }

    let totalBet = 1;
    let betsText = '';

    // Cria elementos que combinam h4 e span selecionados
    selectedSpans.forEach(span => {
      const parentAposta = span.closest('.Apostas, .ApostasTotalGols, .ApostasMVP');
      const h4Text = parentAposta.querySelector('h4').textContent;
      const spanTextParts = Array.from(span.querySelectorAll('span')).map(s => s.textContent);

      // Extrai os valores dos spans
      const [selection, value] = spanTextParts;

      // Calcula o total multiplicando os valores
      totalBet *= parseFloat(value);

      // Cria um novo elemento div para a aposta
      const betDiv = document.createElement('div');
      betDiv.classList.add('saved-bet');
      betDiv.textContent = `${h4Text}: ${selection} `;
      container.appendChild(betDiv);

      // Adiciona a aposta ao texto das apostas
      betsText += `${h4Text}: ${selection} - ${value}\n`;
    });

    // Exibe o total das apostas
    totalBetElement.textContent = `ODD Total: ${totalBet.toFixed(2)}`;

    // Armazena as apostas no botão de finalizar
    document.getElementById('finalize-bets').dataset.betsText = betsText;
  });

  // Função para finalizar as apostas
  document.getElementById('finalize-bets').addEventListener('click', () => {
    const betsText = document.getElementById('finalize-bets').dataset.betsText;
    
    if (!betsText) {
      alert('Nenhuma aposta selecionada para finalizar.');
      return;
    }

    const encodedBets = encodeURIComponent(betsText);
    const discordChannelURL = `https://discord.com/channels/1260744845161660477/1261102686296608988`;

    // Abre o canal do Discord em uma nova aba
    window.open(discordChannelURL, '_blank');
    
    // Copia as apostas para a área de transferência
    navigator.clipboard.writeText(betsText).then(() => {
      alert('Suas apostas foram copiadas para a área de transferência. Cole-as no canal do Discord.');
    }, () => {
      alert('Erro ao copiar as apostas para a área de transferência. Por favor, copie-as manualmente:\n' + betsText);
    });
  });
});
