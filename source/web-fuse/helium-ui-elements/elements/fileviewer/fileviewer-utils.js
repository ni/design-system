class FileViewerUtils {
    getExtension (name) {
        if (!name) {
            return '';
        }
        let index = name.lastIndexOf('.');
        if (index === -1) {
            return '';
        }
        return name.substr(index + 1);
    }
}

export let fileViewerUtils = new FileViewerUtils();
