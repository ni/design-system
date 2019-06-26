window.onload = function () {
            document.querySelector('jqx-docking-layout').layout = [
                {
                    id: 'item1',
                    label: 'Tabs 1',
                    items: [{
                        label: 'Tab 1',
                        content: 'Content of Tab 1',
                        selected: true
                    },
                    {
                        label: 'Tab 2',
                        content: 'Content of Tab 2'
                    }],
                    dropPosition: ['top', 'bottom', 'left', 'layout-left', 'layout-top']
                },
                {
                    id: 'item2',
                    label: 'Tabs 2',
                    items: [{
                        label: 'Tab 3',
                        content: 'Content of Tab 3'
                    }, {
                        label: 'Tab 4',
                        content: 'Content of Tab 4'
                    },
                    {
                        label: 'Tab 5',
                        content: 'Content of Tab 5'
                    },
                    {
                        label: 'Tab 6',
                        content: 'Content of Tab 6'
                    }]
                },
                {
                    id: 'item3',
                    label: 'Tabs 3',
                    items: [{
                        label: 'Tab 3',
                        content: 'Content of Tab 9'
                    }, {
                        label: 'Tab 4',
                        content: 'Content of Tab 10'
                    },
                    {
                        label: 'Tab 7',
                        content: 'Content of Tab 7'
                    },
                    {
                        label: 'Tab 8',
                        content: 'Content of Tab 8'
                    }]
                }
            ];

            const radioButtons = document.getElementsByTagName('jqx-radio-button');

            for (let i = 0; i < radioButtons.length; i++) {
                radioButtons[i].addEventListener('click', function (event) {
                    document.querySelector('jqx-docking-layout').snapMode = this.innerHTML.toLowerCase();
                });
            }
        }