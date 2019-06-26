JQX('#grid', class {
    get properties() {
        return {
			dataSource: new JQX.DataAdapter(
			{
			    dataSource: generateData(3000),
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
			columns: [
                {
                   freeze: true, label: 'First Name', width: 200, dataField: 'firstName'
                },
                { label: 'Last Name', width: '25%', dataField: 'lastName' },
                { label: 'Product', width: '25%',dataField: 'productName' },
                { label: 'Quantity', width: '25%',dataField: 'quantity', align: 'right', cellsAlign: 'right',},
                { label: 'Unit Price', width: '25%',dataField: 'price', align: 'right', cellsAlign: 'right', cellsFormat: 'c2' },
                { label: 'Total', width: '25%', dataField: 'total', align: 'right', cellsAlign: 'right', cellsFormat: 'c2' }
			]
        }
    }
});
window.onload = function () {
 
}