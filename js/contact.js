function carregarMapa() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
  
    const map = L.map('map').setView([-23.55052, -46.633308], 12);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
  
    L.marker([-23.55052, -46.633308])
      .addTo(map)
      .bindPopup('São Paulo, SP')
      .openPopup();
  }

  document.querySelector('.contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.querySelector('input[placeholder="Nome completo"]').value;
    const email = document.querySelector('input[placeholder="E-mail"]').value;
    const message = document.querySelector('textarea').value;
  
    const res = await fetch('http://localhost:3001/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
  
    if (res.ok) {
      alert('Mensagem enviada com sucesso!');
    } else {
      alert('Erro ao enviar. Tente novamente mais tarde.');
    }
  });
  