class TagViewerUtils {
    validateValues (tagsWithValues, value, validationErrors) {
        for (let tagWithValue of tagsWithValues) {
            let error = this.validateValue(tagWithValue.tag, value, validationErrors);
            if (error) {
                return error;
            }
        }
    }

    validateValue (tag, value, validationErrors) {
        switch (tag.type) {
        case 'INT': {
            if (isNaN(value)) {
                return validationErrors.mustBeInteger;
            }
            break;
        }
        case 'U_INT64': {
            if (isNaN(value) || value < 0) {
                return validationErrors.mustBePositiveInteger;
            }
            break;
        }
        case 'DOUBLE': {
            if (isNaN(value)) {
                return validationErrors.mustBeDouble;
            }
            break;
        }
        case 'DATE_TIME': {
            let date = new Date(value);
            if (!(date instanceof Date) || isNaN(date)) {
                return validationErrors.mustBeTimestamp;
            }
            break;
        }
        case 'BOOLEAN': {
            if (value !== 'true' && value !== 'false') {
                return validationErrors.mustBeBoolean;
            }
            break;
        }
        }
    }
}

export let tagViewerUtils = new TagViewerUtils();
