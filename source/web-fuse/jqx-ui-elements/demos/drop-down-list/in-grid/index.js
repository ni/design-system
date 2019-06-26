$(document).ready(function () {
    const source =
        {
            localdata: [],
            datatype: "array"
        };
    const dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgrid").jqxGrid(
        {
            width: 600,
            autoheight: true,
            source: dataAdapter,
            selectionmode: 'singlecell',
            rowsheight: 30,
            columns: [
                {
                    text: 'Numerics', datafield: 'numericTextBoxes', width: 100,
                    createwidget: function (row, column, value, htmlElement) {
                        const dropDownList = document.createElement('jqx-drop-down-list');

                        dropDownList.selectionMode = 'zeroOrMany';
                        dropDownList.dataSource = ['A', 'B', 'C'];
                        dropDownList.dropDownAppendTo = 'body';
                        dropDownList.dropDownHeight = 'auto';
                        $(htmlElement).append(dropDownList);
                        dropDownList.placeholder = '<i style="align: middle" class="fa fa-cog">';
                    },
                    initwidget: function () {
                    }
                },
                { text: 'Title', datafield: 'title', width: 200 },
                { text: 'Country', datafield: 'country' }
            ]
        });

    document.getElementById('appendButton').addEventListener('click', function () {
        $('#jqxgrid').jqxGrid('addrow', null, { title: 'Sales Representative', country: 'USA' });
    });

    document.getElementById('removeButton').addEventListener('click', function () {
        const datarows = $('#jqxgrid').jqxGrid('getrows');
        const lastRowId = $('#jqxgrid').jqxGrid('getrowid', datarows[datarows.length - 1].uid);

        $('#jqxgrid').jqxGrid('deleterow', lastRowId);
    });
});