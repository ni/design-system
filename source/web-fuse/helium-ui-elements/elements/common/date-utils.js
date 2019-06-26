class DateUtils {
    format (date, locale) {
        if (!date) {
            return '';
        }
        if (!locale) {
            locale = undefined;
        }
        if (typeof date === 'string' || date instanceof String) {
            date = new Date(date);
        }

        let dateString = date.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' });
        let timeString = date.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
        return this._formatDateTime(dateString, timeString, locale);
    }

    _formatDateTime (dateString, timeString, locale) {
        switch (locale) {
        case 'en-US': {
            return dateString + ' at ' + timeString;
        }
        }

        return dateString + ' ' + timeString;
    }
}

export let dateUtils = new DateUtils();
