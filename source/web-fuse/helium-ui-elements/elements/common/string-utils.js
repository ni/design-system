class StringUtils {
    format (str, obj) {
        return str.replace(/(\{(\w+?)\})/g, function (match, p1, p2, offset, str) {
            return obj[p2];
        });
    }
}

export let stringUtils = new StringUtils();
