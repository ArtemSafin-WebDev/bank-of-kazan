ymaps.ready(init);
function init() {
    const mainMap = document.querySelector('.js-main-offices-map');
    if (!mainMap) return;
    const map = new ymaps.Map(mainMap, {
        center: [55.796554, 49.104752],
        zoom: 12,
        controls: []
    });
    const checkboxes = Array.from(document.querySelectorAll('.js-office-categories .offices__checkbox-input'));
    const allCheckbox = checkboxes.find(element => element.name === 'all');
    const innerMapElements = Array.from(document.querySelectorAll('.js-offices-inner-map'));

    const mapPinImages = {
        offices: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/office.svg',
            iconImageSize: window.matchMedia('(min-width: 769px)').matches ? [25, 37] : [25, 37],
            iconImageOffset: window.matchMedia('(min-width: 769px)').matches ? [-12.5, -37] : [-25, -74]
        },
        bankomats: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/bankomat.svg',
            iconImageSize: window.matchMedia('(min-width: 769px)').matches ? [25, 37] : [25, 37],
            iconImageOffset: window.matchMedia('(min-width: 769px)').matches ? [-12.5, -37] : [-25, -74]
        },
        partners: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/bankomat-partner.svg',
            iconImageSize: window.matchMedia('(min-width: 769px)').matches ? [25, 37] : [25, 37],
            iconImageOffset: window.matchMedia('(min-width: 769px)').matches ? [-12.5, -37] : [-25, -74]
        },
        terminals: {
            iconLayout: 'default#image',
            iconImageHref: 'img/map-pins/terminal.svg',
            iconImageSize: window.matchMedia('(min-width: 769px)').matches ? [25, 37] : [25, 37],
            iconImageOffset: window.matchMedia('(min-width: 769px)').matches ? [-12.5, -37] : [-25, -74]
        }
    };

    const mainMapData = [
        {
            type: 'offices',
            coords: [55.831082, 49.079644]
        },
        {
            type: 'offices',
            coords: [55.815159, 49.101276]
        },
        {
            type: 'offices',
            coords: [55.812957, 49.183735]
        },
        {
            type: 'offices',
            coords: [55.79474, 49.114071]
        },
        {
            type: 'bankomats',
            coords: [55.833308, 49.132141]
        },
        {
            type: 'bankomats',
            coords: [55.776266, 49.140724]
        },
        {
            type: 'partners',
            coords: [55.748973, 49.104675]
        },
        {
            type: 'terminals',
            coords: [55.744519, 49.218315]
        }
    ];

    map.controls.add('zoomControl', {
        position: {
            left: 'auto',
            right: 20,
            bottom: 40,
            top: 'auto'
        }
    });

    const objectManager = new ymaps.ObjectManager({
        clusterize: false,
        gridSize: 128,
        clusterIconLayout: 'default#pieChart',
        clusterHasBalloon: false
    });

    map.geoObjects.add(objectManager);

    const filterObjects = () => {
        if (allCheckbox.checked) {
            const filterString = '';
            objectManager.setFilter(filterString);
        } else {
            const activeCheckboxes = [];

            checkboxes.map(checkbox => {
                if (checkbox.checked) {
                    activeCheckboxes.push(`properties.type == "${checkbox.name}"`);
                }
            });

            const filterString = activeCheckboxes.length ? activeCheckboxes.join(' || ') : "properties.type == 'none'";

            objectManager.setFilter(filterString);
        }
    };

    const filterListViewItems = () => {
        const items = Array.from(document.querySelectorAll('.offices__list-view-group'));
        if (allCheckbox.checked) {
            items.forEach(item => item.classList.remove('hidden'));
        } else {
            const activeCheckboxesNames = checkboxes.filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);

            items.forEach(item => {
                const type = item.getAttribute('data-type');

                if (activeCheckboxesNames.includes(type)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            console.log('Active checkboxes for list view', activeCheckboxesNames);
        }
    };

    filterObjects();
    filterListViewItems();

    checkboxes.forEach(element =>
        element.addEventListener('change', () => {
            filterObjects();
            filterListViewItems();
        })
    );

    mainMapData.forEach(item => {
        const objectToAdd = {
            id: item.coords.join('-'),
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: item.coords
            },
            options: {
                ...mapPinImages[item.type]
            },
            properties: {
                type: item.type
            }
        };
        // console.log('Object to add', objectToAdd);

        objectManager.add(objectToAdd);
    });

    innerMapElements.forEach(mapElement => {
        const lat = mapElement.getAttribute('data-lat');
        const lng = mapElement.getAttribute('data-lng');
        const type = mapElement.getAttribute('data-type');

        const innerMapInstance = new ymaps.Map(mapElement, {
            center: [lat, lng],
            zoom: 12,
            controls: []
        });

        var placemark = new ymaps.Placemark(
            [lat, lng],
            {},
            {
                ...mapPinImages[type]
            }
        );

        innerMapInstance.geoObjects.add(placemark);
    });

    const suggestView = new ymaps.SuggestView('suggest', { results: 7 });

    map.geoObjects.events.add('click', function(e) {
        const object = e.get('target');

        // console.log('Кликнутый геообъект', object);
    });

    suggestView.events.add('select', function(e) {
        const suggestion = e.get('item');
        ymaps.geocode(suggestion.value).then(
            function(res) {
                const firstGeoObject = res.geoObjects.get(0);
                const coords = firstGeoObject.geometry.getCoordinates();

                map.setCenter(coords, 12);
            },
            function(err) {
                console.error(err);
            }
        );
    });
}
