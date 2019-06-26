$(document).ready(function () {
    function getMaxLength() {
        const max = lengths.reduce(function (a, b) {
            return Math.max(a, b);
        });

        return Math.max(100, max);
    }

    const source =
    {
        localdata: [{ title: 'Sales Representative', country: 'USA' }, { title: 'Vice President, Sales', country: 'USA' }, { title: 'Sales Manager', country: 'Bulgaria' }, { title: 'Sales Manager', country: 'USA' }],
        datatype: "array"
    };
    const dataAdapter = new $.jqx.dataAdapter(source);

    const lengths = [];

    $("#jqxgrid").jqxGrid(
    {
        width: 600,
        autoheight: true,
        source: dataAdapter,
        selectionmode: 'singlecell',
        columns: [
          {
              text: 'TextBoxes', datafield: 'TextBoxes', width: 100,
              createwidget: function (row, column, value, htmlElement) {
                  const textBox = document.createElement('jqx-text-box');

                  textBox.row = row.boundindex;
                  $(htmlElement).append(textBox);

                  textBox.addEventListener('change', function () {
                      const dummy = document.createElement('span');

                      dummy.style.boxSizing = 'border-box';
                      dummy.style.padding = '8px';
                      dummy.style.visibility = 'hidden';

                      dummy.innerHTML = this.value;

                      textBox.$.content.appendChild(dummy);

                      lengths[this.row] = dummy.offsetWidth + 10;

                      textBox.$.content.removeChild(dummy);

                      $('#jqxgrid').jqxGrid('setcolumnproperty', 'TextBoxes', 'width', getMaxLength());
                  });
              },
              initwidget: function () {
              }
          },
          { text: 'Title', datafield: 'title', width: 200 },
          { text: 'Country', datafield: 'country', width: 300 }
        ]
    });
});