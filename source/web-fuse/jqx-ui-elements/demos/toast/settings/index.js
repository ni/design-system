window.onload = function () {
    const toast = document.querySelectorAll('jqx-toast')[0],
        openButton = document.getElementById('openButton'),
        closeLastButton = document.getElementById('closeLastButton'),
        toastTopLeft = document.getElementById('toastTopLeft'),
        toastTopRight = document.getElementById('toastTopRight'),
        toastBottomLeft = document.getElementById('toastBottomLeft'),
        toastBottomRight = document.getElementById('toastBottomRight'),
        type = document.getElementById('type'),
        closeAllButton = document.getElementById('closeAllButton'),
        modal = document.getElementById('modal'),
        autoClose = document.getElementById('autoClose'),
        animation = document.getElementById('animation'),
        blink = document.getElementById('blink');



    openButton.addEventListener('click', function () {
        toast.open();
        toast.value = type.selectedValues[0];
    });
    closeLastButton.addEventListener('click', function () {
        toast.closeLast();
    });
    closeAllButton.addEventListener('click', function () {
        toast.closeAll();
    });


    toastTopLeft.addEventListener('change', function () {
        toast.position = 'top-left';
    });
    toastTopRight.addEventListener('change', function () {
        toast.position = 'top-right';
    });
    toastBottomLeft.addEventListener('change', function () {
        toast.position = 'bottom-left';
    });
    toastBottomRight.addEventListener('change', function () {
        toast.position = 'bottom-right';
    });


    type.addEventListener('change', function () {
        toast.type = type.selectedValues[0] === 'null' ? null : type.selectedValues[0];
    });

    modal.addEventListener('change', function () {
        toast.modal = modal.checked;
    });
    autoClose.addEventListener('change', function () {
        toast.autoClose = autoClose.checked;
    });
    animation.addEventListener('change', function () {
        toast.animation = animation.checked ? 'advanced' : 'none';
    });
    blink.addEventListener('change', function () {
        blink.checked ? toast.classList.add('blink') : toast.classList.remove('blink');
    });
}