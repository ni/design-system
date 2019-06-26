JQX('#grid', class {
    get properties() {
        return {
            dataSource: new JQX.DataAdapter(
			{
			    dataSource: generateData(100),
			    groupBy: ['firstName', 'lastName'],
			    dataFields:
                    [
                        'id: number',
                        'firstName: string',
                        'lastName: string',
                        'productName: string',
                        'quantity: number',
                        'price: number',
                        'total: number'
                    ]
			}),
            grouping: {
                enabled: true,
				groupIndent: 0
            },
            columns: [
				{
				    label: '#', width: 200, dataField: 'id'
				},
				{
				    label: 'First Name', dataField: 'firstName'
				},

                { label: 'Last Name', dataField: 'lastName' },
                { label: 'Product', dataField: 'productName' },
                { label: 'Quantity', dataField: 'quantity', align: 'right', cellsAlign: 'right', },
                { label: 'Unit Price', dataField: 'price', align: 'right', cellsAlign: 'right', cellsFormat: 'c2' },
                {
                    label: 'Total', dataField: 'total', align: 'right', cellsAlign: 'right', cellsFormat: 'c2'
                }
            ]
        }
    }
});
window.onload = function () {

}