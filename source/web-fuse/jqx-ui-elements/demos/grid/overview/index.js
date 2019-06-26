JQX('#grid', class {
	get properties() {
		return {
			columnResizeMode: 'nextColumn',
			appearance: {
				alternationCount: 2,
				allowColumnStickyPosition: true,
				showRowNumber: true,
				showRowHeader: true
			},
			paging: {
				enabled: true
			},
			pager: {
				visible: true
			},
			sorting: {
				enabled: true
			},
			filtering: {
				enabled: true
			},
			columnResizeMode: 'nextColumn',
			dataSource: new JQX.DataAdapter(
			{
				dataSource: generateData(500),
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
				label: 'First Name', dataField: 'firstName', columnGroup: 'name'
			},
			{ label: 'Last Name', dataField: 'lastName', columnGroup: 'name' },
			{ label: 'Product', dataField: 'productName', columnGroup: 'order'},
			{ label: 'Quantity', dataField: 'quantity', columnGroup: 'order'},
			{ label: 'Unit Price', dataField: 'price', cellsFormat: 'c2', columnGroup: 'order', formatFunction(settings) {
				const rowId = settings.row;
				const columnDataField = settings.column;
				const template = settings.template;
				
				settings.value = '$' + new Number(settings.value).toFixed(2);
			}
			},
			{ label: 'Total', dataField: 'total', cellsFormat: 'c2', columnGroup: 'order', formatFunction(settings) {
				const rowId = settings.row;
				const columnDataField = settings.column;
				const template = settings.template;
				
				settings.value = '$' + new Number(settings.value).toFixed(2);
			} }
			],
			columnGroups: [
			  { label: 'Customer Name', align: 'center', name: 'name' },
			  { label: 'Order Detals', align: 'center', name: 'order' }
			]
		}
	}
});