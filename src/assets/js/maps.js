ymaps.ready(init);
function init() {
    var mainMap = document.querySelector('.js-main-offices-map');
    if (!mainMap) return;
    var mainMapInstance = new ymaps.Map(mainMap, {
        center: [55.796554, 49.104752],
        zoom: 12,
        controls: []
    });

    mainMapInstance.controls.add('zoomControl');

    if (window.matchMedia("(min-width: 769px)").matches) {
        mainMapInstance.controls.add('searchControl');
    }
    

    var mapPinImages = {
        office: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/office.svg',
            iconImageSize: window.matchMedia("(min-width: 769px)").matches ? [50, 74] : [25, 37],
            iconImageOffset: window.matchMedia("(min-width: 769px)").matches ? [-12.5, -37] : [-25, -74]
           
        },
        bankomat: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/bankomat.svg',
            iconImageSize: window.matchMedia("(min-width: 769px)").matches ? [50, 74] : [25, 37],
            iconImageOffset: window.matchMedia("(min-width: 769px)").matches ? [-12.5, -37] : [-25, -74]
        },
        bankomatPartners: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/bankomat-partner.svg',
            iconImageSize: window.matchMedia("(min-width: 769px)").matches ? [50, 74] : [25, 37],
            iconImageOffset: window.matchMedia("(min-width: 769px)").matches ? [-12.5, -37] : [-25, -74]
        },
        terminal: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/terminal.svg',
            iconImageSize: window.matchMedia("(min-width: 769px)").matches ? [50, 74] : [25, 37],
            iconImageOffset: window.matchMedia("(min-width: 769px)").matches ? [-12.5, -37] : [-25, -74]
        }
    };

    var mainMapData = [
        {
            type: 'office',
            coords: [55.831082, 49.079644]
        },
        {
            type: 'office',
            coords: [55.815159, 49.101276]
        },
        {
            type: 'office',
            coords: [55.812957, 49.183735]
        },
        {
            type: 'office',
            coords: [55.79474, 49.114071]
        },
        {
            type: 'bankomat',
            coords: [55.833308, 49.132141]
        },
        {
            type: 'bankomat',
            coords: [55.776266, 49.140724]
        },
        {
            type: 'bankomat-partner',
            coords: [55.748973, 49.104675]
        },
        {
            type: 'terminal',
            coords: [55.744519, 49.218315]
        }
    ];

    var allCheckbox = document.querySelector('#all-offices');
    var officesCheckbox = document.querySelector('#offices');
    var bankomatsCheckbox = document.querySelector('#bankomats');
    var bankomatsPartnersCheckbox = document.querySelector('#partners-bankomats');
    var terminalsCheckbox = document.querySelector('#terminals');

    var checkboxes = [allCheckbox, officesCheckbox, bankomatsCheckbox, bankomatsPartnersCheckbox, terminalsCheckbox];

    var placemarksGeoQuery = null;

    function setMarkers() {
        if (placemarksGeoQuery) placemarksGeoQuery.removeFromMap(mainMapInstance);
        placemarksGeoQuery = null;
        var placemarks = [];
        var filteredObjects = [];

        filteredObjects = mainMapData.filter(function(item) {
            if (allCheckbox.checked) return true;

            if (item.type === 'office' && officesCheckbox.checked) {
                return true;
            } else if (item.type === 'bankomat' && bankomatsCheckbox.checked) {
                return true;
            } else if (item.type === 'bankomat-partner' && bankomatsPartnersCheckbox.checked) {
                return true;
            } else if (item.type === 'terminal' && terminalsCheckbox.checked) {
                return true;
            } else {
                return false;
            }
        });

        console.log('Filtered map objects', filteredObjects);

        filteredObjects.forEach(item => {
            var pinOptions = null;
            if (item.type === 'office') {
                pinOptions = mapPinImages.office;
            } else if (item.type === 'bankomat') {
                pinOptions = mapPinImages.bankomat;
            } else if (item.type === 'bankomat-partner') {
                pinOptions = mapPinImages.bankomatPartners;
            } else if (item.type === 'terminal') {
                pinOptions = mapPinImages.terminal;
            }
            var placemark = new ymaps.Placemark(item.coords, {}, pinOptions);
            placemarks.push(placemark);

            mainMapInstance.geoObjects.add(placemark);
        });

        placemarksGeoQuery = ymaps.geoQuery(placemarks);
    }

    setMarkers();

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', setMarkers);
    });

    var innerMaps = Array.prototype.slice.call(document.querySelectorAll('.js-offices-inner-map'));

    innerMaps.forEach(function(mapElement) {
        var lat = mapElement.getAttribute('data-lat');
        var lng = mapElement.getAttribute('data-lng');
        var type = mapElement.getAttribute('data-type');
        var innerMapInstance = new ymaps.Map(mapElement, {
            center: [lat, lng],
            zoom: 12,
            controls: []
        });

        innerMapInstance.controls.add('zoomControl');
      

        var pinOptions = null;
        if (type === 'office') {
            pinOptions = mapPinImages.office;
        } else if (type === 'bankomat') {
            pinOptions = mapPinImages.bankomat;
        } else if (type === 'bankomat-partner') {
            pinOptions = mapPinImages.bankomatPartners;
        } else if (type === 'terminal') {
            pinOptions = mapPinImages.terminal;
        }
        var placemark = new ymaps.Placemark([lat, lng], {}, pinOptions);

        innerMapInstance.geoObjects.add(placemark);
    });
}
