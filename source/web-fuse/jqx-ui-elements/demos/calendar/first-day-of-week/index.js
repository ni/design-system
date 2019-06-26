window.onload = function () {
    const dropDownList = document.getElementById('dayOfWeekSelector'),
        calendar = document.querySelector('jqx-calendar');

    dropDownList.dataSource = [
        { value: 0, label: "Sunday" },
        { value: 1, label: "Monday" },
        { value: 2, label: "Tuesday" },
        { value: 3, label: "Wednesday" },
        { value: 4, label: "Thursday" },
        { value: 5, label: "Friday" },
        { value: 6, label: "Saturday" }
    ];

    dropDownList.selectedIndexes = [0];

    dropDownList.addEventListener('change', function (event) {
        calendar.firstDayOfWeek = event.detail.addedItems[0].dataIndex;
        document.getElementById('log').innerHTML = 'First day of week is ' + event.detail.addedItems[0].label;
    });
}