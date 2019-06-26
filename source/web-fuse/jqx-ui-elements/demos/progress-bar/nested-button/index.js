window.onload = function () {
    const button = document.querySelector('jqx-toggle-button'),
    progressBar = document.querySelector('jqx-circular-progress-bar');
    button.addEventListener("change", function () {
        if (button.checked) {
            progressBar.indeterminate = false;
        }
        else {
            progressBar.indeterminate = true;
        }
    });
}