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

      const swiper1 = new Swiper('.tourSlider .swiper', {
        loop: true,
        speed: 1500,   
        slidesPerView: 3,       
        spaceBetween: 24,  
        slideToClickedSlide: true,
        
      });



      /* MAP */
      // initMap();

      // async function initMap() {
      //     // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
      //     await ymaps3.ready;

      //     const {YMap, YMapDefaultSchemeLayer} = ymaps3;

      //     // Создание экземпляра карты.
      //     const map = new ymaps3.YMap(document.getElementById('map'), {
      //       location: {
      //         center: [37.64, 55.76],
      //         zoom: 10
      //       }
      //     });
      //     // Добавляем слой для отображения схематической карты
      //     map.addChild(new YMapDefaultSchemeLayer());
      // }

      $(function() {
        setTimeout(function(){
          var myMap = new ymaps.Map('map_index', {
              center: [56.495171, 31.643686],
              zoom: 13
            }, {
              searchControlProvider: 'yandex#search'
            }),
            objectManager = new ymaps.ObjectManager({
              clusterize: true,// Чтобы метки начали кластеризоваться, выставляем опцию.
              gridSize: 32,
              clusterDisableClickZoom: true,
              iconColor: '#000'
            });
        
          objectManager.objects.options.set('preset', 'islands#blueHomeCircleIcon');
          objectManager.clusters.options.set('preset', 'islands#invertedBlueClusterIcons');
          myMap.geoObjects.add(objectManager);
          
          //Строим точки на карте
          var point = {
            "type": "FeatureCollection",
            "features": [
              
                {
                  "type": "Feature", 
                  "id": 0, 
                  "geometry": {
                    "type": "Point", 
                    "coordinates": [ 56.494332, 31.646192 ]
                  }, 
                  "properties": {
                    "balloonContentHeader": "<a href='https://gorizont-sk.ru/company/projects/stroitelstvo-domov/stroitelstvo-karkasnogo-doma-120-kv-m-v-poselke-tikhie-zori-ur/' target='_blank'><img src='https://gorizont-sk.ru/upload/resize_cache/iblock/30b/360_180_2/30bcab368e4cf6c1eeccb7cd6968dcd2.jpg' alt='Строительство каркасного дома 120 кв.м. в поселке &quot;Тихие зори&quot;, УР'></a>", 
                    "balloonContentBody": "<div class='mapBullet'><div class='mapBulletTitle h6'>Собор Корсунской иконы Божией Матери</div></div>", 
                    "balloonContentFooter": "<div class='mapBulletText'><p>На границах древнего были построенные сторожевые башни, на которых  держали караул дозорные. Образ этих башен прочно связан с историей Торопца и украшает герб города</p></div>", 
                    //"clusterCaption": "<strong><s>Еще</s> одна</strong> метка",
                    //"hintContent": "<strong>Текст  <s>подсказки</s></strong>"
                  }
                },
				
                {
                  "type": "Feature", 
                  "id": 1, 
                  "geometry": {
                    "type": "Point", 
                    "coordinates": [56.497437, 31.629964]
                  }, 
                  "properties": {
                    "balloonContentHeader": "<a href='https://gorizont-sk.ru/company/projects/stroitelstvo-domov/stroitelstvo-doma-v-derevne-bakhtiyary-ur/' target='_blank'><img src='https://gorizont-sk.ru/upload/resize_cache/iblock/f8d/360_180_2/f8db9af588fee3e1b48149272340bb5f.jpg' alt='Дом в деревне Бахтияры'></a>", 
                    "balloonContentBody": "<div class='mapBullet'><div class='mapBulletTitle h6'>Дом в деревне Бахтияры</div></div>", 
                    //"balloonContentFooter": "<div class='mapBulletPrice'>от 3 129 000 ₽</div>", 
                    //"clusterCaption": "<strong><s>Еще</s> одна</strong> метка",
                    //"hintContent": "<strong>Текст  <s>подсказки</s></strong>"
                  }
                },
							]
          }
		      objectManager.add(point);
	}, 2000);






});

/*
var myMap;
var placemarkCollections = {};
var placemarkList = {};

// Список городов и магазинов в них
var shopList = [
    {
        'cityName': 'Москва',
        'shops': [
            {'coordinates': [55.72532368326033, 37.748675112058876], 'name': 'Рязанский проспект, 6Ас21'},
            {'coordinates': [55.701677873469, 37.57358050756649], 'name': 'Ленинский проспект, 47с2'}
        ]
    },
    {
        'cityName': 'Санкт-Петербург',
        'shops': [
            {'coordinates': [59.863210042666125, 30.37903938671841], 'name': 'Будапештская улица, 36к2'},
            {'coordinates': [59.99486277158917, 30.406505207030918], 'name': 'проспект Непокорённых'}
        ]
    }
];

ymaps.ready(init);

function init() {

    // Создаем карту
    myMap = new ymaps.Map("map", {
        center: [56, 37],
        zoom: 8,
        controls: [
            'zoomControl'
        ],
        zoomMargin: [20]
    });

    for (var i = 0; i < shopList.length; i++) {

        // Добавляем название города в выпадающий список
        $('select#cities').append('<option value="' + i + '">' + shopList[i].cityName + '</option>');

        // Создаём коллекцию меток для города
        var cityCollection = new ymaps.GeoObjectCollection();

        for (var c = 0; c < shopList[i].shops.length; c++) {
            var shopInfo = shopList[i].shops[c];

            var shopPlacemark = new ymaps.Placemark(
                shopInfo.coordinates,
                {
                    hintContent: shopInfo.name,
                    balloonContent: shopInfo.name
                    
                }
            );

            if (!placemarkList[i]) placemarkList[i] = {};
            placemarkList[i][c] = shopPlacemark;

            // Добавляем метку в коллекцию
            cityCollection.add(shopPlacemark);

        }

        placemarkCollections[i] = cityCollection;

        // Добавляем коллекцию на карту
        myMap.geoObjects.add(cityCollection);

    }

    $('select#cities').trigger('change');
}


// Переключение города
$(document).on('change', $('select#city'), function () {
    var cityId = $('select#cities').val();

    // Масштабируем и выравниваем карту так, чтобы были видны метки для выбранного города
    myMap.setBounds(placemarkCollections[cityId].getBounds(), {checkZoomRange:true}).then(function(){
        if(myMap.getZoom() > 15) myMap.setZoom(15); // Если значение zoom превышает 15, то устанавливаем 15.
    });

    $('#shops').html('');
    for (var c = 0; c < shopList[cityId].shops.length; c++) {
        $('#shops').append('<li value="' + c + '">' + shopList[cityId].shops[c].name + '</li>');
    }

});

// Клик на адрес
$(document).on('click', '#shops li', function () {

    var cityId = $('select#cities').val();
    var shopId = $(this).val();

    placemarkList[cityId][shopId].events.fire('click');
});

*/
      
}

document.addEventListener('DOMContentLoaded', ready);


