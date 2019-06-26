window.onload = function () {
    const progressBar = document.getElementById('progress')

    document.getElementById('button').onclick = function () {
        progressBar.value++;
    }
}