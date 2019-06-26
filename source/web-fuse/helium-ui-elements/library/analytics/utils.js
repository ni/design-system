export class Utils {
    isTest () {
        if (typeof window.jasmine !== 'undefined') {
            document.cookie = 'endToEnd=true';
            return true;
        } else if (window.document.documentElement.getAttribute('webdriver')) {
            document.cookie = 'endToEnd=true';
            return true;
        } else if (navigator.webdriver === true) {
            document.cookie = 'endToEnd=true';
            return true;
        } else {
            return false;
        }
    }
}

export let utils = new Utils();
