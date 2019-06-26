let treesList = [];

// appends 100 trees on the page
function appendTrees() {
    const treesContainer = document.createElement('div'),
        containerFragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const newTree = document.createElement('jqx-tree');

        newTree.dataSource = [{
            label: 'Cats',
            expanded: true,
            selected: true,
            items: [{
                label: 'Tiger',
                selected: true
            },
                {
                    label: 'Lion'
                },
                {
                    label: 'Jaguar'
                }
            ]
        },
            {
                label: 'Dogs',
                expanded: true,
                items: [{
                    label: 'Gray wolf'
                },
                    {
                        label: 'Arctic fox',
                        selected: true
                    },
                    {
                        label: 'Dingo'
                    }
                ]
            }
        ];

        treesList.push(newTree);

        containerFragment.appendChild(newTree);
    }

    treesContainer.appendChild(containerFragment);
    document.body.appendChild(treesContainer);
}

const paths = ['0', '0.0', '0.1', '0.2', '1', '1.0', '1.1', '1.2'];

// executes selection updates for all trees in a 10ms loop
function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            treesList[i].select(paths[Math.floor(Math.random() * paths.length)]);
        }
    }, 10);
}

window.onload = function () {
    appendTrees();

    runTest();
};