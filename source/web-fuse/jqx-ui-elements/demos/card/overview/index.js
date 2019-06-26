window.onload = function () {
    if (JQX.EnableShadowDOM) {
        document.querySelector('jqx-card').importStyle(window.location.href.replace('index.htm', 'styles.css'));
    }
}