$(document).ready(function () {
    const x = document.getElementById('x'),
        y = document.getElementById('y');

    const source =
    {
        localdata: [{ title: 'Sales Representative', country: 'USA' }, { title: 'Vice President, Sales', country: 'USA' }, { title: 'Sales Manager', country: 'Bulgaria' }, { title: 'Sales Manager', country: 'USA' }],
        datatype: "array"
    };
    const dataAdapter = new $.jqx.dataAdapter(source);

    $("#jqxgrid").jqxGrid(
    {
        width: 600,
        autoheight: true,
        source: dataAdapter,
        rowsheight: 70,
        selectionmode: 'singlecell',
        columns: [
          {
              text: 'Numerics', datafield: 'numericTextBoxes', width: 100,
              createwidget: function (row, column, value, htmlElement) {
                  const numericTextBox = document.createElement('jqx-numeric-text-box');
                  numericTextBox.setAttribute('spin-buttons', '');
                  $(htmlElement).append(numericTextBox);
              },
              initwidget: function () {
              }
          },
          {
              text: 'Sliders', datafield: 'sliders', width: 200,
              createwidget: function (row, column, value, htmlElement) {
                  const slider = document.createElement('jqx-slider');
                  $(htmlElement).append(slider);
              },
              initwidget: function () {
              }
          },
          { text: 'Title', datafield: 'title', width: 200 },
          { text: 'Country', datafield: 'country' }
        ]
    });

    $("#jqxgrid").on('cellclick', function (event) {
        x.innerHTML = event.args.originalEvent.pageX;
        y.innerHTML = event.args.originalEvent.pageY;
    });

    $("#jqxgrid").on('click', function (event) {
        if (event.pageX) {
            x.innerHTML = event.pageX;
            y.innerHTML = event.pageY;
        }
        else {
            // a jqx-numeric-text-box inc/dec button (jqx-repeat-button) is clicked
            x.innerHTML = event.detail.pageX;
            y.innerHTML = event.detail.pageY;
        }
    });
});