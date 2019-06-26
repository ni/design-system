window.onload = function () {
    const layout = document.querySelector('jqx-docking-layout'),
        urlString = 'https://picsum.photos/1000/500/?image=',
        gauge1 = document.createElement('jqx-gauge'),
        gauge2 = document.createElement('jqx-gauge'),
        carousel = document.createElement('jqx-carousel'),
        multiLineTextBox = document.createElement('jqx-multiline-text-box'),
        tank = document.createElement('jqx-tank'),
        progressBar1 = document.createElement('jqx-progress-bar'),
        progressBar2 = document.createElement('jqx-progress-bar');
    let state, currentState, data = [];

    function loadData() {
        if (layout.items.length > 0) {
            const tabItem10 = document.getElementById('tabItem10'),
                tabItem7 = document.getElementById('tabItem7'),
                tabItem8 = document.getElementById('tabItem8'),
                tabItem6 = document.getElementById('tabItem6'),
                tabItem2 = document.getElementById('tabItem2'),
                tabItem1 = document.getElementById('tabItem1');

            if (tabItem10) {
                tabItem10.appendChild(progressBar1);
                tabItem10.appendChild(progressBar2);
            }

            if (tabItem7) {
                tabItem7.appendChild(gauge1);
            }

            if (tabItem8) {
                tabItem8.appendChild(gauge2);
            }

            if (tabItem6) {
                tabItem6.appendChild(carousel);
            }

            if (tabItem2) {
                tabItem2.appendChild(multiLineTextBox);
            }

            if (tabItem1) {
                tabItem1.appendChild(tank);
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        const item = {
            image: urlString + (100 + i)
        };

        data.push(item);
    }


    gauge2.analogDisplayType = 'fill';
    gauge2.startAngle = 0;
    gauge2.endAngle = 180;
    gauge2.digitalDisplay = true;
    gauge2.digitalDisplayPosition = 'center';

    carousel.dataSource = data;
    carousel.swipe = true;
    carousel.slideShow = true;
    carousel.loop = true;
    carousel.indicators = true;
    carousel.keyboard = true;

    multiLineTextBox.value = 'What is Lorem Ipsum? \n\n' +
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a' + 'galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially' + ' unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker' + 'including versions of Lorem Ipsum.';

    tank.max = 50;
    tank.value = 25;

    progressBar1.showProgressValue = true;
    progressBar2.showProgressValue = true;

    document.getElementById('state').innerHTML = JSON.stringify(layout.getJSONStructure(), null, 4);

    document.getElementById('createLayout').addEventListener('click', function () {
        layout.layout = [
            {
                type: "LayoutGroup",
                items: [
                    {
                        type: "LayoutGroup",
                        items: [
                            {
                                type: "LayoutGroup",
                                items: [
                                    {
                                        type: "LayoutPanel",
                                        label: "Tab 10",
                                        items: [
                                            {
                                                id: "tabItem10",
                                                type: "LayoutPanelItem",
                                                label: "Tab 10",
                                                selected: true
                                            }
                                        ],
                                        size: 153
                                    },
                                    {
                                        type: "LayoutPanel",
                                        label: "Tabs 1",
                                        items: [
                                            {
                                                id: "tabItem1",
                                                type: "LayoutPanelItem",
                                                label: "Tab 1",
                                                selected: true
                                            }
                                        ],
                                        size: 218
                                    }
                                ],
                                orientation: "horizontal",
                                size: 203
                            },
                            {
                                type: "LayoutPanel",
                                label: "Tab 6",
                                tabPosition: "hidden",
                                items: [
                                    {
                                        id: "tabItem6",
                                        type: "LayoutPanelItem",
                                        label: "Tab 6",
                                        selected: true
                                    }
                                ],
                                size: 739
                            }
                        ],
                        orientation: "vertical",
                        size: 381
                    },
                    {
                        type: "LayoutGroup",
                        items: [
                            {
                                type: "LayoutPanel",
                                label: "Tabs 2",
                                items: [
                                    {
                                        id: "tabItem2",
                                        type: "LayoutPanelItem",
                                        label: "Tab 2",
                                        selected: true
                                    }
                                ],
                                size: 604
                            },
                            {
                                type: "LayoutPanel",
                                label: "Tabs 3",
                                items: [
                                    {
                                        id: "tabItem7",
                                        type: "LayoutPanelItem",
                                        label: "Tab 7",
                                        selected: true
                                    },
                                    {
                                        id: "tabItem8",
                                        type: "LayoutPanelItem",
                                        label: "Tab 8"
                                    }
                                ],
                                size: 338,
                                resizeMode: 'both'
                            }
                        ],
                        orientation: "vertical",
                        size: 334
                    }
                ],
                orientation: "horizontal"
            }
        ];

        //Set Content
        loadData();

        document.getElementById('state').innerHTML = JSON.stringify(layout.getJSONStructure(), null, 4);
    });

    //Set Content
    loadData();

    gauge1.addEventListener('change', function (event) {
        progressBar1.value = event.detail.value;
    });

    gauge2.addEventListener('change', function (event) {
        progressBar2.value = event.detail.value;
    });

    document.getElementById('saveState').addEventListener('click', function () {
        layout.saveState();
    });

    document.getElementById('saveCurrentState').addEventListener('click', function () {
        currentState = layout.getState();
    });

    document.getElementById('loadState').addEventListener('click', function () {
        layout.loadState(currentState);
    });

    document.getElementById('clearState').addEventListener('click', function () {
        layout.clearState();
    });

    document.getElementById('layout').addEventListener('stateChange', function (event) {
        console.log('stateChange');
        state = layout.getJSONStructure();
        document.getElementById('state').innerHTML = JSON.stringify(state, null, 4);
    });
}