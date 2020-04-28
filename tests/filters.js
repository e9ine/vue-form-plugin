import moment from 'moment';
import Vue from 'vue';

Vue.filter('formatDate', (date, format) => {
    if (!format) {
        format = 'DD/MM/YYYY HH:mm';
    }
    return date ? moment(date).format(format) : '';
});

Vue.filter('limitTo', (arr, val) => val.slice(0, val));

Vue.filter('trucateChars', (val, num) => {
    let result = '';
    if (val) {
        result = val.substring(0, num);
        if (val.length > num) {
            result += '...';
        }
    }
    return result;
});

Vue.filter('currency', (value, currency, format) => {
    if (typeof value !== 'number') {
        return value;
    }
    let formatter = new Intl.NumberFormat(format || 'en-UK', {
        style: 'currency',
        currency: currency || 'GBP',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return formatter.format(value);
});

Vue.filter('formatValue', (value, fraction, maximumFraction) => {
    if (typeof value !== 'number') {
        return value;
    }
    let formatter = new Intl.NumberFormat('en-UK', {
        minimumFractionDigits: fraction !== undefined ? fraction : 2,
        maximumFractionDigits: maximumFraction !== undefined ? fraction : 2
    });
    return formatter.format(value);
});

Vue.filter('propercase', value => {
    if (!value || value.length < 2) {
        return value;
    }
    return value[0].toUpperCase() + value.substring(1).toLowerCase();
});

Vue.filter('capitalpacer', value => {
    if (!value || value.length < 2) {
        return value;
    }
    return value.replace(/([A-Z])/g, ' $1').trim();
});

Vue.filter('fromnow', value => {
    if (!value) {
        return '';
    } else {
        const substitute = (stringOrFunction, number, strings) => {
            let string = $.isFunction(stringOrFunction) ? stringOrFunction(number, dateDifference) : stringOrFunction;
            let value = (strings.numbers && strings.numbers[number]) || number;
            return string.replace(/%d/i, value);
        };

        const nowTime = new Date().getTime();
        const date = new Date(value).getTime();
        const allowFuture = true;
        const strings = {
            prefixAgo: null,
            prefixFromNow: null,
            suffixAgo: 'ago',
            suffixFromNow: '', //"from now"
            seconds: 'less than a minute',
            minute: 'a minute',
            minutes: '%d minutes',
            hour: 'an hour',
            hours: '%d hours',
            day: 'a day',
            days: '%d days',
            month: 'a month',
            months: '%d months',
            year: 'a year',
            years: '%d years'
        };

        let dateDifference = nowTime - date,
            words,
            seconds = Math.abs(dateDifference) / 1000,
            minutes = seconds / 60,
            hours = minutes / 60,
            days = hours / 24,
            years = days / 365,
            separator = strings.wordSeparator === undefined ? ' ' : strings.wordSeparator,
            prefix = strings.prefixAgo,
            suffix = strings.suffixAgo;

        if (allowFuture) {
            if (dateDifference < 0) {
                prefix = strings.prefixFromNow;
                suffix = strings.suffixFromNow;
            }
        }

        words =
            (seconds < 45 && substitute(strings.seconds, Math.round(seconds), strings)) ||
            (seconds < 90 && substitute(strings.minute, 1, strings)) ||
            (minutes < 45 && substitute(strings.minutes, Math.round(minutes), strings)) ||
            (minutes < 90 && substitute(strings.hour, 1, strings)) ||
            (hours < 24 && substitute(strings.hours, Math.round(hours), strings)) ||
            (hours < 42 && substitute(strings.day, 1, strings)) ||
            (days < 30 && substitute(strings.days, Math.round(days), strings)) ||
            (days < 45 && substitute(strings.month, 1, strings)) ||
            (days < 365 && substitute(strings.months, Math.round(days / 30), strings)) ||
            (years < 1.5 && substitute(strings.year, 1, strings)) ||
            substitute(strings.years, Math.round(years), strings);

        return $.trim([prefix, words, suffix].join(separator));
    }
});
