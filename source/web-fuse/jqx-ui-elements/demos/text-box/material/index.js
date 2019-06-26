window.onload = function () {
    const validateMaterialDark = document.getElementById('validateMaterialDark'),
        validateMaterial = document.getElementById('validateMaterial'),
        validateMaterialMultiline = document.getElementById('validateMaterialMultiline'),
        validateMaterialMultilineDark = document.getElementById('validateMaterialMultilineDark'),
        validateMaterialPassword = document.getElementById('validateMaterialPassword'),
        validateMaterialDarkPassword = document.getElementById('validateMaterialDarkPassword'),
        password = document.getElementById('password');

    validateMaterial.hint = helper;
    validateMaterialDark.hint = helper;
    validateMaterialMultiline.hint = helper;
    validateMaterialMultilineDark.hint = helper;
    validateMaterialPassword.hint = helper;
    validateMaterialDarkPassword.hint = helper;

    function helper(value, container) {
        if (value.length === 0) {
            container.innerHTML = 'Error message';
            return true;
        }

        container.innerHTML = '';
    };

    function helperMasked(value, container) {
        if (!this.maskFull) {
            container.innerHTML = 'Error message';
            return true;
        }

        container.innerHTML = '';
    };
}