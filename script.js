// Loader logic
window.addEventListener("load", () => {
    document.getElementById("loader").style.display = "none";
  });
  
  // Light/Dark Mode Toggle
  document.getElementById("modeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  
  // Image enlarge modal logic
  const modal = document.getElementById('imageModal');
  const modalImg = modal.querySelector('img');
  
  document.querySelectorAll('.enlargeable').forEach(img => {
    img.addEventListener('click', () => {
      modal.classList.add('active');
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
    });
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modalImg.src = '';
    }
  });
  
  // Hero carousel logic
  const carouselImgs = document.querySelectorAll('.carousel-img');
  const indicators = document.querySelectorAll('.indicator');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');
  let currentSlide = 0;
  let carouselInterval;

  function showSlide(idx) {
    carouselImgs.forEach((img, i) => {
      img.classList.toggle('active', i === idx);
    });
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    currentSlide = idx;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % carouselImgs.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + carouselImgs.length) % carouselImgs.length);
  }

  rightArrow && rightArrow.addEventListener('click', () => {
    nextSlide();
    resetCarouselInterval();
  });
  leftArrow && leftArrow.addEventListener('click', () => {
    prevSlide();
    resetCarouselInterval();
  });
  indicators.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      resetCarouselInterval();
    });
  });

  function startCarouselInterval() {
    carouselInterval = setInterval(nextSlide, 4000);
  }
  function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarouselInterval();
  }
  if (carouselImgs.length > 0) {
    startCarouselInterval();
  }
  
  // Nav active link logic
  const navLinks = document.querySelectorAll('.nav-links a');
  function setActiveNavLink() {
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (
        (link.getAttribute('href') === 'index.html' && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html')) ||
        (link.getAttribute('href') !== 'index.html' && window.location.pathname.endsWith(link.getAttribute('href')))
      ) {
        link.classList.add('active');
      }
    });
  }
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  setActiveNavLink();
  
  // Card link active state logic
  const cardLinks = document.querySelectorAll('.card-link');
  function setActiveCardLink() {
    cardLinks.forEach(link => {
      link.classList.remove('active');
      if (window.location.pathname.endsWith(link.getAttribute('href'))) {
        link.classList.add('active');
      }
    });
  }
  cardLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      cardLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
  setActiveCardLink();
  
  // Add to Cart button logic for categories page
  function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = {
        name: this.dataset.name,
        img: this.dataset.img,
        price: parseFloat(this.dataset.price),
        quantity: 1
      };
      let cart = getCart();
      const existing = cart.find(i => i.name === item.name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push(item);
      }
      setCart(cart);
      alert(item.name + ' added to cart!');
    });
  });
  
  // Loader magic fade-out with 5 second delay
  window.addEventListener('load', () => {
    const loaderMagic = document.getElementById('loader-magic');
    if (loaderMagic) {
      setTimeout(() => {
        loaderMagic.classList.add('hide');
        setTimeout(() => loaderMagic.style.display = 'none', 800);
      }, 5000);
    }
  });
  