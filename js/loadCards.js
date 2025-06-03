let allCardsData = [];
let currentPage = 1;
const cardsPerPage = 6;

function renderCards(cards) {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const cardsToShow = cards.slice(start, end);

  cardsToShow.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "portfolio-card";
    cardElement.innerHTML = `
      <img src="${card.imagem}" alt="${card.titulo}" class="portfolio-img">
      <div class="portfolio-info">
        <p class="portfolio-title">${card.titulo}</p>
        <p class="portfolio-category">${card.categoria}</p>
      </div>
    `;
    cardElement.onclick = () => showProjectDetail(card);
    container.appendChild(cardElement);
  });

  renderPagination(cards);
}

function renderPagination(cards) {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Anterior";
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    currentPage--;
    renderCards(cards);
  };
  paginationContainer.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    if (i === currentPage) {
      pageBtn.classList.add("active");
    }
    pageBtn.onclick = () => {
      currentPage = i;
      renderCards(cards);
    };
    paginationContainer.appendChild(pageBtn);
  }

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Próximo";
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    currentPage++;
    renderCards(cards);
  };
  paginationContainer.appendChild(nextBtn);
}

function ativarFiltros() {
  const links = document.querySelectorAll(".portfolio-container a");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      e.target.classList.add("active");

      const filtro = e.target.dataset.filter;
      currentPage = 1;

      if (filtro === "Tudo") {
        renderCards(allCardsData);
      } else {
        const filtrados = allCardsData.filter(
          (card) => card.categoria === filtro
        );
        renderCards(filtrados);
      }
    });
  });
}

fetch("json/data.json")
  .then((response) => response.json())
  .then((data) => {
    allCardsData = data;
    renderCards(data);
    ativarFiltros();
  })
  .catch((error) => console.error("Erro ao carregar os cards:", error));

  function showProjectDetail(card) {
    document.getElementById("cards-container").style.display = "none";
    document.getElementById("pagination").style.display = "none";
    document.getElementById("portfolio-filters").style.display = "none";
  
    const detailContainer = document.getElementById("project-detail");
    detailContainer.style.display = "block";
  
    // Imagem principal e miniaturas clicáveis
    const mainImage = card.imagens[0];
    const thumbnailsHTML = card.imagens
      .map(
        (img) => `<img src="${img}" class="thumbnail-img" onclick="changeMainImage('${img}')">`
      )
      .join("");
  
    detailContainer.innerHTML = `
      <a id="backBtn" class="back-btn">Voltar</a>
      <div class="main-image-container">
        <img id="main-detail-img" src="${mainImage}" class="main-detail-img" />
      </div>
      <div class="thumbnail-container">${thumbnailsHTML}</div>
      <h3>${card.titulo}</h3>
      <p><strong>${card.categoria}</strong></p>
      <p class="project-description">${card.descricao}</p>
      ${
        card.github
          ? `<p><a href="${card.github}" target="_blank" style="color:#ffc400;">GitHub</a></p>`
          : ""
      }
      <div class="technologies-container">
        ${card.tecnologias
          .map((tec) => `
            <div class="technology-badge">
              <i class="${getIconClass(tec)}"></i>
              <span>${tec}</span>
            </div>`)
          .join("")}
      </div>
    `;
  
    document.getElementById("backBtn").onclick = () => {
      detailContainer.style.display = "none";
      document.getElementById("cards-container").style.display = "grid";
      document.getElementById("pagination").style.display = "flex";
      document.getElementById("portfolio-filters").style.display = "block";
    };
  }
  
  // Função para trocar imagem principal
  function changeMainImage(src) {
    document.getElementById("main-detail-img").src = src;
  }
  
function getIconClass(tec) {
  const icons = {
    JavaScript: "devicon-javascript-plain colored",
    PHP: "devicon-php-plain colored",
    CSS: "devicon-css3-plain colored",
    HTML: "devicon-html5-plain colored",
    React: "devicon-react-original colored",
    "React Native": "devicon-react-original colored",
    SQL: "devicon-mysql-plain colored",
    TypeScript: "devicon-typescript-plain colored"
  };
  return icons[tec] || "";
}
