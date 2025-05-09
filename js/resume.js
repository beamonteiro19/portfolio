document.getElementById('download-btn').addEventListener('click', function() {
    const link = document.createElement('a');  // Cria um novo link
    link.href = '/pdfresume/curriculo.pdf';  // Caminho absoluto para o arquivo PDF
    link.download = 'curriculo.pdf';   // Nome do arquivo que será baixado
    link.click();  // Simula o clique no link para iniciar o download
  });
  