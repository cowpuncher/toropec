const ready = () => {
    var swiperOptions = {
        loop: true,
        freeMode: true,
        spaceBetween: 6,
        grabCursor: false,
        slidesPerView: 3,
        allowTouchMove: false,
        noSwiping: true,
        noSwipingClass: 'swiper-slide',
        loop: true,
        autoplay: {
          delay: 1,
          disableOnInteraction: true
        },
        freeMode: true,
        speed: 3000,
        freeModeMomentum: false
      };
      
      var swiper = new Swiper(".slider .swiper", swiperOptions);



      /* MAP */
      initMap();

      async function initMap() {
          // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
          await ymaps3.ready;

          const {YMap, YMapDefaultSchemeLayer} = ymaps3;

          // Создание экземпляра карты.
          const map = new ymaps3.YMap(document.getElementById('map'), {
            location: {
              center: [37.64, 55.76],
              zoom: 10
            }
          });
          // Добавляем слой для отображения схематической карты
          map.addChild(new YMapDefaultSchemeLayer());
      }
      
}

document.addEventListener('DOMContentLoaded', ready);