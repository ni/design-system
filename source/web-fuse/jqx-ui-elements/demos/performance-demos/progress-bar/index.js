let progressBarList = [];

// appends 100 progress bars on the page
function appendSliders() {
    const progressBarsContainer = document.createElement('div'),
        containerFragment = document.createDocumentFragment();

    for (let i = 0; i < 100; i++) {
        const newProgressBar = document.createElement('jqx-progress-bar');
        newProgressBar.setAttribute('max', 1000);
        newProgressBar.classList.add('testProgressBar');
        progressBarList.push(newProgressBar);

        containerFragment.appendChild(newProgressBar);
    }

    progressBarsContainer.appendChild(containerFragment);
    document.body.appendChild(progressBarsContainer);
}

// executes value updates for all progress bars in a 10ms loop
function runTest() {
    setInterval(function () {
        for (let i = 0; i < 100; i++) {
            progressBarList[i].value = Math.random() * 999 + 1;
        }
    }, 10);
}

window.onload = function () {
    appendSliders();

    runTest();
};