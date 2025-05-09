let allCardsData = [];
let currentPage = 1;
const cardsPerPage = 6;

function renderCards(cards) {
  const container = document.getElementById('cards-container');
  container.innerHTML = '';

  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const cardsToShow = cards.slice(start, end);

  cardsToShow.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.className = 'portfolio-card';
    cardElement.innerHTML = `
      <img src="${card.imagem}" alt="${card.titulo}" class="portfolio-img">
      <div class="portfolio-info">
        <p class="portfolio-title">${card.titulo}</p>
        <p class="portfolio-category">${card.categoria}</p>
      </div>
    `;
    container.appendChild(cardElement);
  });

  renderPagination(cards);
}

function renderPagination(cards) {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Anterior';
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    renderCards(cards);
  };
  paginationContainer.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    if (i === currentPage) {
      pageBtn.classList.add('active');
    }
    pageBtn.onclick = () => {
      currentPage = i;
      renderCards(cards);
    };
    paginationContainer.appendChild(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Próximo';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    renderCards(cards);
  };
  paginationContainer.appendChild(nextBtn);
}

function ativarFiltros() {
  const links = document.querySelectorAll('.portfolio-container a');

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      links.forEach(l => l.classList.remove('active'));
      e.target.classList.add('active');

      const filtro = e.target.dataset.filter;
      currentPage = 1;

      if (filtro === 'Tudo') {
        renderCards(allCardsData);
      } else {
        const filtrados = allCardsData.filter(card => card.categoria === filtro);
        renderCards(filtrados);
      }
    });
  });
}

fetch('json/data.json')
  .then(response => response.json())
  .then(data => {
    allCardsData = data;
    renderCards(data);
    ativarFiltros();
  })
  .catch(error => console.error('Erro ao carregar os cards:', error));
