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