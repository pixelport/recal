import React from 'react';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import { getMonthHeaderTemplate, getMonthTemplate } from './Utils';

var Calendar = function Calendar(props) {
  var month = props.month,
      year = props.year,
      isDateHovered = props.isDateHovered,
      isDateFocused = props.isDateFocused,
      isDateSelected = props.isDateSelected,
      isDateInRange = props.isDateInRange,
      isDateHighlighted = props.isDateHighlighted,
      isDateEnabled = props.isDateEnabled,
      onDateFocused = props.onDateFocused,
      onDateHovered = props.onDateHovered,
      onDateSelected = props.onDateSelected,
      onChangeMonth = props.onChangeMonth,
      onChangeYear = props.onChangeYear,
      calendarRef = props.calendarRef,
      createDateButtonRef = props.createDateButtonRef,
      disabled = props.disabled,
      locale = props.locale; // Template for month header (days of week info).

  var headerTemplate = getMonthHeaderTemplate(locale); // Template for month grid (days of month info).

  var monthTemplate = getMonthTemplate(month, year || 0);
  return React.createElement("div", {
    className: "CalendarContainer"
  }, React.createElement(CalendarHeader, {
    month: month,
    year: year,
    onBack: onChangeMonth(-1),
    onForward: onChangeMonth(1),
    onChangeYear: onChangeYear,
    locale: locale,
    disabled: disabled
  }), React.createElement("div", {
    className: "Calendar",
    role: "grid",
    ref: calendarRef
  }, React.createElement("div", {
    className: "head",
    role: "row"
  }, headerTemplate.map(function (_ref, i) {
    var dayName = _ref.dayName,
        style = _ref.style;
    return React.createElement("div", {
      key: dayName,
      className: "dayHeading",
      style: style,
      role: "columnheader",
      "aria-label": dayName
    }, React.createElement("abbr", null, dayName.slice(0, 3)));
  })), React.createElement("div", {
    className: "body",
    role: "row"
  }, monthTemplate.map(function (_ref2, i) {
    var date = _ref2.date,
        style = _ref2.style;
    return React.createElement(CalendarDay, {
      key: date,
      date: date,
      dateButtonRef: createDateButtonRef(date),
      dateLabel: format(date, 'dddd, MMMM D, YYYY'),
      style: style,
      isToday: isToday(date),
      isHovered: isDateHovered(date),
      isFocused: isDateFocused(date),
      isSelected: isDateSelected(date),
      isInRange: isDateInRange(date),
      isHighlighted: isDateHighlighted(date),
      isDisabled: disabled || !isDateEnabled(date),
      onSelect: onDateSelected,
      onHover: onDateHovered,
      onFocus: onDateFocused
    });
  }))), React.createElement("div", null, React.createElement("p", null, "Select time slot")));
};

export default Calendar;