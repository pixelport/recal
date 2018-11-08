function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import getDaysInMonth from 'date-fns/get_days_in_month'; // Constructs a className from a set of prop keys.

export var getClassName = function getClassName(props) {
  return Object.keys(props).filter(function (key) {
    return props[key];
  }).join(' ');
}; // Uses native JS dates to get the names of months of the year in a given locale.

export var monthsOfYear = function monthsOfYear() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en-US';
  // Cache result in window.months.
  window.months = window.months || _toConsumableArray(Array(12)).map(function (_, i) {
    // Get a date object set to the i-th month.
    var baseDate = new Date(2017, i, 1); // Get full name of this month.

    return baseDate.toLocaleDateString(locale, {
      month: 'long'
    });
  });
  return window.months;
}; // Returns number of days in a given month.

export var daysInMonth = function daysInMonth(month, year) {
  return getDaysInMonth(new Date(year, month - 1));
}; // Returns an array of days of the week for a header (and Grid styles for IE compat).

export var getMonthHeaderTemplate = function getMonthHeaderTemplate() {
  var locale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en-US';
  // Cache result in window.days.
  window.days = window.days || _toConsumableArray(Array(7)).map(function (_, i) {
    // Get a date object set to i+[random sunday offset]th day.
    var baseDate = new Date(Date.UTC(2017, 0, i + 2)); // Get full name of this day.

    var dayName = baseDate.toLocaleDateString(locale, {
      weekday: 'long'
    });
    return {
      dayName: dayName,
      style: {
        msGridColumn: i + 1,
        gridColumnStart: i + 1
      }
    };
  });
  return window.days;
}; // Returns an array of days of the month (and Grid styles for IE compat).

export var getMonthTemplate = function getMonthTemplate(month, year) {
  // Number of days in month.
  var numDaysInMonth = daysInMonth(month, year); // Days between Sunday and start of month.

  var offset = new Date(year, month - 1, 1).getDay() + 1; // Fill in array with days of month.

  var monthTemplate = _toConsumableArray(Array(numDaysInMonth)).map(function (_, i) {
    return {
      date: new Date(year, month - 1, i + 1),
      style: {
        msGridRow: Math.ceil((offset + i) / 7),
        msGridColumn: (offset - 1 + i) % 7 + 1,
        gridRowStart: Math.ceil((offset + i) / 7),
        gridColumnStart: (offset - 1 + i) % 7 + 1
      }
    };
  });

  return monthTemplate;
};