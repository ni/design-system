class SizeUtils {
    format (size) {
        let i = size > 0 ? Math.floor(Math.log(size) / Math.log(1024)) : 0;
        return {
            value: (size / Math.pow(1024, i)).toFixed(2) * 1,
            unit: ['B', 'kB', 'MB', 'GB'][i]
        };
    }
}

export let sizeUtils = new SizeUtils();
