window.onload = function () {
    if (JQX.EnableShadowDOM) {
        const floatingButtons = document.querySelectorAll('jqx-button.floating');

        for (let b = 0; b < floatingButtons.length; b++) {
            floatingButtons[b].importStyle(window.location.origin + '/styles/common.css');
        }
    }
}
}