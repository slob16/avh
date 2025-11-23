jQuery(document).ready(function($) {
  "use strict";
  
  // TESTIMONIALS CAROUSEL INITIALIZATION
  var $carousel = $('#testimonials-carousel');
  
  if ($carousel.length) {
    $carousel.owlCarousel({
      loop: true,
      center: true,
      items: 3,
      margin: 0,
      autoplay: true,
      dots: true,
      autoplayTimeout: 8500,
      smartSpeed: 450,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1170: {
          items: 3
        }
      }
    });
    console.log('✓ Owl Carousel testimonial slider initialized successfully');
  }
});
