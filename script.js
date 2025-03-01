document.addEventListener('DOMContentLoaded', function() {
  // Menu Tabs
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuCategories = document.querySelectorAll('.menu-category');
  
  menuTabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs and categories
          menuTabs.forEach(t => t.classList.remove('active'));
          menuCategories.forEach(c => c.classList.remove('active', 'fade-in'));
          
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Show corresponding category with fade-in effect
          const category = this.getAttribute('data-category');
          const activeCategory = document.getElementById(category);
          activeCategory.classList.add('active', 'fade-in');
      });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Horizontal scroll with keyboard arrows for menu
  const menuScrolls = document.querySelectorAll('.menu-scroll');
  
  menuScrolls.forEach(scroll => {
      scroll.addEventListener('keydown', function(e) {
          if (e.key === 'ArrowRight') {
              this.scrollLeft += 100;
          } else if (e.key === 'ArrowLeft') {
              this.scrollLeft -= 100;
          }
      });
      
      // Add touch scrolling
      let isDown = false;
      let startX;
      let scrollLeft;
      
      scroll.addEventListener('mousedown', (e) => {
          isDown = true;
          scroll.style.cursor = 'grabbing';
          startX = e.pageX - scroll.offsetLeft;
          scrollLeft = scroll.scrollLeft;
      });
      
      scroll.addEventListener('mouseleave', () => {
          isDown = false;
          scroll.style.cursor = 'grab';
      });
      
      scroll.addEventListener('mouseup', () => {
          isDown = false;
          scroll.style.cursor = 'grab';
      });
      
      scroll.addEventListener('mousemove', (e) => {
          if (!isDown) return;
          e.preventDefault();
          const x = e.pageX - scroll.offsetLeft;
          const walk = (x - startX) * 2; // Scroll speed
          scroll.scrollLeft = scrollLeft - walk;
      });
  });
  
  // Gallery Section
  const galleryImages = document.querySelectorAll('.gallery img');
  galleryImages.forEach(img => {
      img.addEventListener('click', function() {
          const modal = document.createElement('div');
          modal.classList.add('modal');
          modal.innerHTML = `<div class="modal-content"><span class="close">&times;</span><img src="${this.src}" alt="Gallery Image"></div>`;
          document.body.appendChild(modal);
          
          // Close modal
          modal.querySelector('.close').addEventListener('click', function() {
              modal.remove();
          });
      });
  });
});
// Lightbox için script
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', function() {
      document.getElementById('lightbox-img').src = this.src;
      document.getElementById('lightbox').style.display = 'flex';
  });
});

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}
