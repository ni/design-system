JQX('#grid', class {
    get properties() {
        return {
			sorting: {
				enabled: true,
				mode: 'many'
			},
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
                'id',
                {
                    label: 'First Name', dataField: 'firstName', sortOrder: 'asc'
                },
                { label: 'Last Name', dataField: 'lastName', sortOrder: 'desc' },
                { label: 'Product', dataField: 'productName' },
                { label: 'Quantity', dataField: 'quantity', align: 'right', cellsAlign: 'right', },
                { label: 'Unit Price', dataField: 'price', align: 'right', cellsAlign: 'right', cellsFormat: 'c2' },
                { label: 'Total', dataField: 'total', align: 'right', cellsAlign: 'right', cellsFormat: 'c2' }
            ]
        }
    }
});