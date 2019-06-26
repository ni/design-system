window.onload = function () {
    document.getElementById('dropDownListMethodsDemo').dataSource = [
        {
            label: "Andrew",
            value: 1,
            group: "A"
        },
        {
            label: "Natalia",
            value: 5,
            group: "B"
        },
        {
            label: "Michael",
            value: 4,
            group: "B"
        },
        {
            label: "Angel",
            value: 2,
            group: "A"
        },
        {
            label: "Hristo",
            value: 6,
            group: "C"
        },
       {
           label: "Peter",
           value: 3,
           group: "A"
       },
       {
           label: "Albert",
           value: 4,
           group: "A"
       },
       {
           label: "Boyko",
           value: 8,
           group: "A"
       },
       {
           label: "Dimitar",
           value: 9,
           group: "B"
       },
       {
           label: "George",
           value: 10,
           group: "C"
       }
    ];

    document.getElementById("unsort").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').sorted = false;
    }
    document.getElementById("sort").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').sorted = true;
    }
    document.getElementById("ungroup").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').grouped = false;
    }
    document.getElementById("group").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').grouped = true;
    }
    document.getElementById("open").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').open();
    }
    document.getElementById("close").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').close();
    }
    document.getElementById("default").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').selectionMode = 'oneOrManyExtended';
    }
    document.getElementById("check").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').selectionMode = 'checkBox';
    }
    document.getElementById("radio").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').selectionMode = 'radioButton';
    }
    document.getElementById("insert").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').insert(0, "New Item");
    }
    document.getElementById("update").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').update(0, "Updated Item");
    }
    document.getElementById("remove").onclick = function () {
        document.getElementById('dropDownListMethodsDemo').remove(0);
    }
    document.getElementById("disabled").onclick = function () {
        const dropDownList = document.getElementById('dropDownListMethodsDemo');

        dropDownList.disabled = !dropDownList.disabled;
    }
}