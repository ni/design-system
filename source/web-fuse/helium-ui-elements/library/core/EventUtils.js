class EventUtils {
    debounce (delay, fun) {
        let timer;
        return function (...args) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fun(...args);
                timer = undefined;
            }, delay);
        };
    }
}

export let eventUtils = new EventUtils();
