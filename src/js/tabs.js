let instances = [];

function init() {
    const tabs = Array.from(document.querySelectorAll('.js-tabs'));

    tabs.forEach(element => {
        const tabsNav = Array.from(element.querySelectorAll('.js-tabs-nav'));
        const tabItems = Array.from(element.querySelectorAll('.js-tabs-item'));

        function setActiveTab(index, event) {
            if (event) event.preventDefault();
            tabsNav.forEach(btn => btn.classList.remove('active'));
            tabItems.forEach(item => item.classList.remove('active'));
            tabsNav[index].classList.add('active');
            tabItems[index].classList.add('active');
        }

        tabsNav.forEach((btn, btnIndex) => {

            const handler = setActiveTab.bind(btn, btnIndex);
            btn.addEventListener('click', handler);

            const instance = {
                btn,
                handler
            }

            instances.push(instance);
        });

        setActiveTab(0);
    });
}

function destroy() {
    instances.forEach(instance => {
        instance.btn.removeEventListener('click', instance.handler);
    });
    instances = [];
}

export default {
    init,
    destroy
}
