function GetData() {
	const data = new Array();
	const generatekey = function () {
		const S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	};
	
	for (let i = 0; i < 100; i++) {
		const row = {};
		const tasks = ["Shopping", "Housewares", "Kitchen supplies", "Groceries", "Cleaning supplies", "Office supplies", "Remodeling", "Paint bedroom", "Paint wall", "Fitness", "Decorate living room",
			"Fix lights", "Fix front door", "Clean kitchen"];
		const firstNames =
		[
			"Andrew", "Nancy", "Shelley", "Regina", "Yoshi", "Antoni", "Mayumi", "Ian", "Peter", "Lars", "Petra", "Martin", "Sven", "Elio", "Beate", "Cheryl", "Michael", "Guylene"
		];
		const lastNames =
		[
			"Fuller", "Davolio", "Burke", "Murphy", "Nagase", "Saavedra", "Ohno", "Devling", "Wilson", "Peterson", "Winkler", "Bein", "Petersen", "Rossi", "Vileid", "Saylor", "Bjorn", "Nodier"
		];
		const taskindex = Math.floor(Math.random() * tasks.length);
	
		row["id"] = generatekey();
		row["firstname"] = firstNames[Math.floor(Math.random() * firstNames.length)];
		row["lastname"] = lastNames[Math.floor(Math.random() * lastNames.length)];
		row["name"] = row["firstname"] + " " + row["lastname"];
		row["task"] = tasks[taskindex];
		row["duration"] = 1 + Math.floor(Math.random() * 10);
	
		data.push(row);
	}
	return data;
}

JQX('#grid', class {
    get properties() {
        return {
            dataSource: new JQX.DataAdapter(
			{
					virtualDataSourceLength: 7,
				    virtualDataSourceCache: true,
					virtualDataSourceOnExpand: function (resultCallbackFunction, details) {
						setTimeout(function() {	
							const data = GetData().slice(0, 2);
							
							if (details.row.level === 1) {
								for(let i = 0; i < data.length; i++) {
									data[i].leaf = true;
								}
								
								resultCallbackFunction(
									{
										dataSource: data
									}
								);
							}
							else {
								resultCallbackFunction(
									{
										dataSource: data
									}
								);
							}
						}, 300);
 				 },
				 virtualDataSource: function (resultCallbackFunction, details) {
					setTimeout(function() {	
						resultCallbackFunction(
							{
							    dataSource: GetData().slice(details.first, details.last)
							}
						);
					}, 300);
			    },
                id: 'id',
			    dataFields:
                    [
                        'id: string',
                        'name: string',
                        'duration: number',
                        'task: string'
                    ]
            }),
			paging: {
				enabled: true,
				pageSize: 2
			},
			pager: {
				visible: true
			},
            columnResizeMode: 'nextColumn',
            columns: [
				{ label: 'Task', dataField: "task", align: 'center', width: 300 },
				{ label: 'Person Name', dataField: "name", cellsAlign: 'center', align: 'center', width: 300 },
				{
					label: 'Duration', dataField: "duration", cellsAlign: 'center', align: 'center', formatFunction: function (row, column, value) {
						const hour = value > 1 ? " hours" : " hour";
						
						return value + hour;
					}
				}	
            ]
        }
    }
});