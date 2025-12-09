document.querySelectorAll('.zoom').forEach(function(img) {
  img.addEventListener('click', function() {
    if (this.classList.contains('zoomed')) {
      // Zoom out - remove backdrop
      this.classList.remove('zoomed');
      const backdrop = document.querySelector('.zoom-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    } else {
      // Zoom in - create backdrop
      const backdrop = document.createElement('div');
      backdrop.className = 'zoom-backdrop';
      document.body.appendChild(backdrop);
      this.classList.add('zoomed');
    }
  });
});



document.querySelectorAll('.zoom').forEach(function(img) {
  img.addEventListener('click', function() {
    // Get the zoom image source from data attribute
    const zoomSrc = this.getAttribute('data-zoom-src');
    
    if (!zoomSrc) {
      console.error('No data-zoom-src attribute found on image');
      return;
    }

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'zoom-backdrop';
    
    // Create zoomed image
    const zoomImg = document.createElement('img');
    zoomImg.className = 'zoom-image';
    zoomImg.src = zoomSrc;
    zoomImg.alt = this.alt;
    
    // Add to page
    document.body.appendChild(backdrop);
    document.body.appendChild(zoomImg);
    
    // Close when clicking backdrop or image
    function closeZoom() {
      backdrop.remove();
      zoomImg.remove();
    }
    
    backdrop.addEventListener('click', closeZoom);
    zoomImg.addEventListener('click', closeZoom);
  });
});