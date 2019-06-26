window.onload = function () {
    const jqxDockingLayout = document.querySelector('jqx-docking-layout'),
        data = [],
        urlString = 'https://picsum.photos/1000/500/?image=',
        gauge1 = document.createElement('jqx-gauge'),
        carousel = document.createElement('jqx-carousel'),
        multiLineTextBox = document.createElement('jqx-multiline-text-box'),
        tank = document.createElement('jqx-tank'),
        progressBar1 = document.createElement('jqx-progress-bar');
    let state, currentState;

    function loadData() {
        if (jqxDockingLayout.items.length > 0) {
            document.getElementById('tabItem10').appendChild(progressBar1);
            document.getElementById('tabItem7').appendChild(gauge1);
            document.getElementById('tabItem6').appendChild(carousel);
            document.getElementById('tabItem2').appendChild(multiLineTextBox);
            document.getElementById('tabItem1').appendChild(tank);
        }
    }

    for (let i = 0; i < 5; i++) {
        const item = {
            image: urlString + (100 + i)
        };

        data.push(item);
    }

    carousel.dataSource = data;
    carousel.swipe = true;
    carousel.slideShow = true;
    carousel.loop = true;
    carousel.keyboard = true;

    multiLineTextBox.value = 'What is Lorem Ipsum? \n\n' +
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a' + 'galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially' + ' unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker' + 'including versions of Lorem Ipsum.';

    tank.max = 50;
    tank.value = 25;

    progressBar1.showProgressValue = true;

    if (jqxDockingLayout.items.length === 0) {
        jqxDockingLayout.layout = [
            {
                type: 'LayoutGroup',
                items: [
                    {
                        type: 'LayoutGroup',
                        items: [
                            {
                                type: 'LayoutGroup',
                                items: [
                                    {
                                        type: 'LayoutPanel',
                                        label: 'Tab 10',
                                        items: [
                                            {
                                                id: 'tabItem10',
                                                type: 'LayoutPanelItem',
                                                label: 'Tab 10'
                                            }
                                        ],
                                        size: 153
                                    },
                                    {
                                        type: 'LayoutPanel',
                                        label: 'Tabs 1',
                                        items: [
                                            {
                                                id: 'tabItem1',
                                                type: 'LayoutPanelItem',
                                                label: 'Tab 1'
                                            }
                                        ],
                                        size: 218
                                    }
                                ],
                                orientation: 'horizontal',
                                size: 203
                            },
                            {
                                type: 'LayoutPanel',
                                label: 'Tab 6',
                                tabPosition: 'hidden',
                                items: [
                                    {
                                        id: 'tabItem6',
                                        type: 'LayoutPanelItem',
                                        label: 'Tab 6'
                                    }
                                ],
                                size: 739
                            }
                        ],
                        orientation: 'vertical',
                        size: 381
                    },
                    {
                        type: 'LayoutGroup',
                        items: [
                            {
                                type: 'LayoutPanel',
                                label: 'Tabs 2',
                                items: [
                                    {
                                        id: 'tabItem2',
                                        type: 'LayoutPanelItem',
                                        label: 'Tab 2'
                                    }
                                ],
                                size: 604
                            },
                            {
                                type: 'LayoutPanel',
                                label: 'Tabs 3',
                                items: [
                                    {
                                        id: 'tabItem7',
                                        type: 'LayoutPanelItem',
                                        label: 'Tab 7'
                                    }
                                ],
                                size: 338,
                                resizeMode: 'both'
                            }
                        ],
                        orientation: 'vertical',
                        size: 334
                    }
                ],
                orientation: 'horizontal'
            }
        ];
    }

    //Set Content
    loadData();

    document.getElementById('clearState').addEventListener('click', function () {
        jqxDockingLayout.clearState();
    });

    gauge1.addEventListener('change', function (event) {
        progressBar1.value = event.detail.value;
    });
}