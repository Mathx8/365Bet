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
    setupSpanClicks('.ApostasCorreto .opção', 'color-change');
    setupSpanClicks('.ApostasMVP .opção', 'color-change');
    setupSpanClicks('.Apostas .opção2', 'color-change');
  });