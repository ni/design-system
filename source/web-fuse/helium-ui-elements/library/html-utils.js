const reEscape = /[&<>'"]/g;
const reUnescape = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g;
const oEscape = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
};
const oUnescape = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"'
};
const fnEscape = function (m) {
    return oEscape[m];
};
const fnUnescape = function (m) {
    return oUnescape[m];
};
const replace = String.prototype.replace;

export function escape (str) {
    if (str === undefined || str === null) {
        str = '';
    }
    return replace.call(str, reEscape, fnEscape);
}

export function unescape (str) {
    if (str === undefined || str === null) {
        str = '';
    }
    return replace.call(str, reUnescape, fnUnescape);
}

// Tagged template function
export function html (pieces) {
    let result = pieces[0];
    let substitutions = [].slice.call(arguments, 1);
    for (let i = 0; i < substitutions.length; ++i) {
        result += escape(substitutions[i]) + pieces[i + 1];
    }

    return result;
}
