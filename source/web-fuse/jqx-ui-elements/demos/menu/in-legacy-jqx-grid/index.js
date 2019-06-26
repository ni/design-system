$(document).ready(function () {
    const source1 =
        {
            localdata: [
                { productName: 'Product A' },
                { productName: 'Product B' },
                { productName: 'Product C' }
            ],
            datatype: 'json'
        };

    let dataAdapter = new $.jqx.dataAdapter(source1);

    $('#jqxGrid1').jqxGrid(
        {
            width: 205,
            autoheight: true,
            source: dataAdapter,
            selectionmode: 'singlecell',
            rowsheight: 40,
            columns: [
                { text: 'Product name', datafield: 'productName', width: 160 },
                {
                    text: 'Menu', datafield: '', width: 45,
                    createwidget: function (row, column, value, htmlElement) {
                        const menu = document.createElement('jqx-menu');

                        menu.className = 'animation';
                        menu.dataSource = [
                            {
                                label: 'Item 1'
                            },
                            {
                                label: 'Item 2',
                                items: [
                                    {
                                        label: 'Item 2.1'
                                    },
                                    {
                                        label: 'Item 2.2'
                                    },
                                    {
                                        label: 'Item 2.3'
                                    }
                                ]
                            },
                            {
                                label: 'Item 3'
                            }
                        ];
                        menu.dropDownAppendTo = 'dropDownContainer1';
                        menu.minimizeWidth = 100;

                        htmlElement.appendChild(menu);
                    },
                    initwidget: function () {
                    }
                }
            ]
        });

    const source2 =
       {
           localdata: [
               { productName: 'Product X' },
               { productName: 'Product Y' },
               { productName: 'Product Z' }
           ],
           datatype: 'json'
       };

    dataAdapter = new $.jqx.dataAdapter(source2);

    $('#jqxGrid2').jqxGrid(
        {
            width: 205,
            autoheight: true,
            source: dataAdapter,
            selectionmode: 'singlecell',
            rowsheight: 40,
            columns: [
                { text: 'Product name', datafield: 'productName', width: 160 },
                {
                    text: 'Menu', datafield: '', width: 45,
                    createwidget: function (row, column, value, htmlElement) {
                        const menu = document.createElement('jqx-menu');

                        menu.className = 'animation';
                        menu.dataSource = [
                            {
                                label: 'Item 1'
                            },
                            {
                                label: 'Item 2',
                                items: [
                                    {
                                        label: 'Item 2.1'
                                    },
                                    {
                                        label: 'Item 2.2'
                                    },
                                    {
                                        label: 'Item 2.3'
                                    }
                                ]
                            },
                            {
                                label: 'Item 3'
                            }
                        ];
                        menu.dropDownAppendTo = 'dropDownContainer2';
                        menu.minimizeWidth = 100;

                        htmlElement.appendChild(menu);
                    },
                    initwidget: function () {
                    }
                }
            ]
        });
});