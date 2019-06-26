window.onload = function () {
    document.querySelector('jqx-button').addEventListener('click', function () {
        const progressBars = document.getElementsByClassName('animated');
        for (let i = 0; i < progressBars.length; i++) {
            progressBars[i].indeterminate = !progressBars[i].indeterminate;
        }
    });
}