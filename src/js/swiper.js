//swiper parameters
const params = {

    simulateTouch: true,
    loop: false,
    grabCursor: true,
    keyboard: {
      enabled: true,
      onlyInViewPort: true
    },
    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: "slider__nav-disabled",
    },
    breakpoints: {
      // when window width is >= 375px
      375: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 250,
      },
      576: {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 250,
      },
      1200: {
        slidesPerView: "auto",
        slidesPerGroup: 1,
        spaceBetween: 300,
        centeredSlides: true,
        slidesOffsetAfter: 20
      },
      1440: {
        slidesPerView: 1.1,
        slidesPerGroup: 1,
        spaceBetween: 275,
        centeredSlides: false,
      },
    }
  }
  
  let swiper = new Swiper('.swiper', params);
  
  