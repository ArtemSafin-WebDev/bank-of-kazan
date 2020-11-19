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
    const balloonContainer = document.querySelector('.js-offices-balloon-container');

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
            coords: [55.831082, 49.079644],
            content: `
                <div class="offices__balloon-inner">
                <button class="offices__balloon-close">
                    <svg width="20" height="20" aria-hidden="true" class="icon-cross">
                        <use xlink:href="#cross" />
                    </svg>
                </button>
                <div class="offices__balloon-inner-row">
                    <h5>Адрес</h5>
                    <p><strong>Казань, улица Декабристов, д.183</strong></p>
                    <p>ДО "Декабристов"</p>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Время работы</h5>
                    <table>
                        <tr>
                            <th><strong>Понедельник - пятница</strong></th>
                            <td>09:00 до 19:00</td>
                        </tr>
                        <tr>
                            <th><strong>Суббота</strong></th>
                            <td>10:00 до 15:00</td>
                        </tr>
                    </table>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Функционал</h5>
                    <div class="offices__balloon-features">
                        <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                    </div>
                </div>
            </div>
            `
        },
        {
            type: 'offices',
            coords: [55.815159, 49.101276],
            content: `
                <div class="offices__balloon-inner">
                <button class="offices__balloon-close">
                    <svg width="20" height="20" aria-hidden="true" class="icon-cross">
                        <use xlink:href="#cross" />
                    </svg>
                </button>
                <div class="offices__balloon-inner-row">
                    <h5>Адрес</h5>
                    <p><strong>Казань, улица Декабристов, д.183</strong></p>
                    <p>ДО "Декабристов"</p>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Время работы</h5>
                    <table>
                        <tr>
                            <th><strong>Понедельник - пятница</strong></th>
                            <td>09:00 до 19:00</td>
                        </tr>
                        <tr>
                            <th><strong>Суббота</strong></th>
                            <td>10:00 до 15:00</td>
                        </tr>
                    </table>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Функционал</h5>
                    <div class="offices__balloon-features">
                        <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                    </div>
                </div>
            </div>
            `
        },
        {
            type: 'offices',
            coords: [55.812957, 49.183735],
            content: `
                <div class="offices__balloon-inner">
                <button class="offices__balloon-close">
                    <svg width="20" height="20" aria-hidden="true" class="icon-cross">
                        <use xlink:href="#cross" />
                    </svg>
                </button>
                <div class="offices__balloon-inner-row">
                    <h5>Адрес</h5>
                    <p><strong>Казань, улица Декабристов, д.183</strong></p>
                    <p>ДО "Декабристов"</p>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Время работы</h5>
                    <table>
                        <tr>
                            <th><strong>Понедельник - пятница</strong></th>
                            <td>09:00 до 19:00</td>
                        </tr>
                        <tr>
                            <th><strong>Суббота</strong></th>
                            <td>10:00 до 15:00</td>
                        </tr>
                    </table>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Функционал</h5>
                    <div class="offices__balloon-features">
                        <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                    </div>
                </div>
            </div>
            `
        },
        {
            type: 'offices',
            coords: [55.79474, 49.114071],
            content: `
                <div class="offices__balloon-inner">
                <button class="offices__balloon-close">
                    <svg width="20" height="20" aria-hidden="true" class="icon-cross">
                        <use xlink:href="#cross" />
                    </svg>
                </button>
                <div class="offices__balloon-inner-row">
                    <h5>Адрес</h5>
                    <p><strong>Казань, улица Декабристов, д.183</strong></p>
                    <p>ДО "Декабристов"</p>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Время работы</h5>
                    <table>
                        <tr>
                            <th><strong>Понедельник - пятница</strong></th>
                            <td>09:00 до 19:00</td>
                        </tr>
                        <tr>
                            <th><strong>Суббота</strong></th>
                            <td>10:00 до 15:00</td>
                        </tr>
                    </table>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Функционал</h5>
                    <div class="offices__balloon-features">
                        <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                    </div>
                </div>
            </div>
            `
        },
        {
            type: 'bankomats',
            coords: [55.833308, 49.132141],
            content: `
                <div class="offices__balloon-inner">
                <button class="offices__balloon-close">
                    <svg width="20" height="20" aria-hidden="true" class="icon-cross">
                        <use xlink:href="#cross" />
                    </svg>
                </button>
                <div class="offices__balloon-inner-row">
                    <h5>Адрес</h5>
                    <p><strong>Казань, улица Декабристов, д.183</strong></p>
                    <p>ДО "Декабристов"</p>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Время работы</h5>
                    <table>
                        <tr>
                            <th><strong>Понедельник - пятница</strong></th>
                            <td>09:00 до 19:00</td>
                        </tr>
                        <tr>
                            <th><strong>Суббота</strong></th>
                            <td>10:00 до 15:00</td>
                        </tr>
                    </table>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Функционал</h5>
                    <div class="offices__balloon-features">
                        <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                    </div>
                </div>
            </div>
            `
        },
        {
            type: 'bankomats',
            coords: [55.776266, 49.140724],
            content: `
            <div class="offices__balloon-inner">
            <button class="offices__balloon-close">
                <svg width="20" height="20" aria-hidden="true" class="icon-cross">
                    <use xlink:href="#cross" />
                </svg>
            </button>
            <div class="offices__balloon-inner-row">
                <h5>Адрес</h5>
                <p><strong>Казань, улица Декабристов, д.183</strong></p>
                <p>ДО "Декабристов"</p>
            </div>
            <div class="offices__balloon-inner-row">
                <h5>Время работы</h5>
                <table>
                    <tr>
                        <th><strong>Понедельник - пятница</strong></th>
                        <td>09:00 до 19:00</td>
                    </tr>
                    <tr>
                        <th><strong>Суббота</strong></th>
                        <td>10:00 до 15:00</td>
                    </tr>
                </table>
            </div>
            <div class="offices__balloon-inner-row">
                <h5>Функционал</h5>
                <div class="offices__balloon-features">
                    <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                    <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                    <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                </div>
            </div>
        </div>
        `
        },
        {
            type: 'partners',
            coords: [55.748973, 49.104675],
            content: `
                <div class="offices__balloon-inner">
                <button class="offices__balloon-close">
                    <svg width="20" height="20" aria-hidden="true" class="icon-cross">
                        <use xlink:href="#cross" />
                    </svg>
                </button>
                <div class="offices__balloon-inner-row">
                    <h5>Адрес</h5>
                    <p><strong>Казань, улица Декабристов, д.183</strong></p>
                    <p>ДО "Декабристов"</p>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Время работы</h5>
                    <table>
                        <tr>
                            <th><strong>Понедельник - пятница</strong></th>
                            <td>09:00 до 19:00</td>
                        </tr>
                        <tr>
                            <th><strong>Суббота</strong></th>
                            <td>10:00 до 15:00</td>
                        </tr>
                    </table>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Функционал</h5>
                    <div class="offices__balloon-features">
                        <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                    </div>
                </div>
            </div>
            `
        },
        {
            type: 'terminals',
            coords: [55.744519, 49.218315],
            content: `
                <div class="offices__balloon-inner">
                <button class="offices__balloon-close">
                    <svg width="20" height="20" aria-hidden="true" class="icon-cross">
                        <use xlink:href="#cross" />
                    </svg>
                </button>
                <div class="offices__balloon-inner-row">
                    <h5>Адрес</h5>
                    <p><strong>Казань, улица Декабристов, д.183</strong></p>
                    <p>ДО "Декабристов"</p>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Время работы</h5>
                    <table>
                        <tr>
                            <th><strong>Понедельник - пятница</strong></th>
                            <td>09:00 до 19:00</td>
                        </tr>
                        <tr>
                            <th><strong>Суббота</strong></th>
                            <td>10:00 до 15:00</td>
                        </tr>
                    </table>
                </div>
                <div class="offices__balloon-inner-row">
                    <h5>Функционал</h5>
                    <div class="offices__balloon-features">
                        <img src="img/features-1.svg" class="offices__balloon-features-icon"/>
                        <img src="img/features-2.svg" class="offices__balloon-features-icon"/>
                    </div>
                </div>
            </div>
            `
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
        clusterHasBalloon: false,
        geoObjectOpenBalloonOnClick: false
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

            // console.log('Active checkboxes for list view', activeCheckboxesNames);
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
                type: item.type,
                balloonContent: item.content
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

    // map.geoObjects.events.add('click', function(e) {
    //     const object = e.get('target');

    // });

    objectManager.objects.events.add(['click'], e => {
        const objectId = e.get('objectId');
        const baloonContent = objectManager.objects.getById(objectId).properties.balloonContent;

        if (baloonContent) {
            // console.log('Baloon content', baloonContent);

            balloonContainer.innerHTML = baloonContent;

            const button = balloonContainer.querySelector('button');

            button.addEventListener('click', event => {
                event.preventDefault();

                balloonContainer.innerHTML = '';
            })
        }
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
