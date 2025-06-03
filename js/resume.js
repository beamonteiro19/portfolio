document.getElementById('download-btn').addEventListener('click', function() {
    const link = document.createElement('a'); 
    link.href = 'pdfresume/curriculo.pdf';
    link.download = 'curriculo.pdf';  
    link.click(); 
  });
