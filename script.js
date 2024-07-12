document.addEventListener('DOMContentLoaded', () => {
    function setupSpanClicks(spanSelector, activeClass) {
      const spans = document.querySelectorAll(spanSelector);
  
      spans.forEach(span => {
        span.addEventListener('click', function() {
          if (this.classList.contains(activeClass)) {
            this.classList.remove(activeClass);
          } else {
            spans.forEach(s => s.classList.remove(activeClass));
            this.classList.add(activeClass);
          }
        });
      });
    }
 
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
      alert('Por favor, selecione uma ODD para gerar seu bilhete.');
      return;
    }

    let totalBet = 1;

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
      betDiv.textContent = `${h4Text}: ${selection}`;
      container.appendChild(betDiv);
    });

    // Exibe o total das apostas
    totalBetElement.textContent = `ODD Total: ${totalBet.toFixed(2)}`;
  });
});