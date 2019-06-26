window.onload = function () {
    if (JQX.EnableShadowDOM) {
        document.querySelector('jqx-list-box').importStyle(window.location.origin + '/styles/common.css');
    }
}