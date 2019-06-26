window.onload = function () {
    const docking = document.querySelector('jqx-docking-layout'),
        menu = document.getElementById('menu');

    docking.layout = [
        {
            type: 'LayoutGroup',
            orientation: 'horizontal',
            items: [
                {
                    type: 'LayoutGroup',
                    items: [
                        {
                            type: 'LayoutPanel',
                            id: 'tabPanel',
                            label: 'Slider',
                            orientation: 'vertical',
                            items: [
                                {
                                    id: 'sliderTab',
                                    label: 'Slider Tab',
                                    content: '<jqx-slider id="slider"></jqx-slider>'
                                }]
                        },
                        {
                            type: 'LayoutPanel',
                            id: 'tankPanel',
                            label: 'Tank',
                            headerButtons: ['settings'],
                            size: '25%',
                            items: [
                                {
                                    id: 'tankTab',
                                    label: 'Tank Tab',
                                    content: '<jqx-tank id="tank"></jqx-tank>'
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Text',
                    headerButtons: ['close'],
                    items: [{
                        label: 'Tab A',
                        content: 'What is Lorem Ipsum?\n' +
                        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of' + 'type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in ' + 'the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n' +
                        'Why do we use it?\n' +
                        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal ' + 'distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their' + 'default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on ' + 'purpose (injected humour and the like).'
                    }]
                }]
        }];

    const settingsButton = docking.getElementsByClassName('jqx-settings-button')[0];

    document.getElementById('tankPanel').addEventListener('settings', function (event) {
        const settingsRect = event.detail.button.getBoundingClientRect();

        if (menu.opened) {
            menu.close();
        }
        else {
            menu.open(settingsRect.left, settingsRect.top);
        }
    });

    menu.addEventListener('itemClick', function (event) {
        const tankPanel = document.getElementById('tankPanel');

        switch (event.detail.value) {
            case 'close':
                tankPanel.close();
                break;
            case 'undock':
                docking.undock(tankPanel);
                break;
            case 'autoHide':
                docking.autoHideRight(tankPanel);
                break;
        }
    });

    document.addEventListener('mousedown', function () {
        if (event.target.closest('jqx-button') !== settingsButton && event.target.closest('jqx-menu') !== menu) {
            menu.close();
        }
    });

    const tank = document.getElementById('tank'),
        slider = document.getElementById('slider');

    slider.addEventListener('change', function () {
        tank.value = this.value;
    });

    tank.addEventListener('change', function () {
        slider.value = this.value;
    });
}