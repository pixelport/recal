function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

import React from 'react';
import { getClassName } from './Utils';

var CalendarDay = function CalendarDay(_ref) {
  var date = _ref.date,
      dateButtonRef = _ref.dateButtonRef,
      dateLabel = _ref.dateLabel,
      style = _ref.style,
      onSelect = _ref.onSelect,
      onHover = _ref.onHover,
      onFocus = _ref.onFocus,
      props = _objectWithoutProperties(_ref, ["date", "dateButtonRef", "dateLabel", "style", "onSelect", "onHover", "onFocus"]);

  return React.createElement("button", {
    ref: dateButtonRef,
    role: "gridcell",
    title: dateLabel,
    "aria-label": dateLabel,
    "aria-selected": props.isSelected ? 'true' : 'false',
    tabIndex: props.isSelected ? '0' : '-1',
    className: "CalendarDay ".concat(getClassName(props)),
    style: style,
    onClick: !props.isDisabled ? function () {
      return onSelect(date);
    } : undefined,
    onMouseEnter: !props.isDisabled ? function () {
      return onHover(date);
    } : undefined,
    onMouseLeave: !props.isDisabled ? function () {
      return onHover(null);
    } : undefined,
    onFocus: !props.isDisabled ? function () {
      return onFocus(date);
    } : undefined
  }, date.getDate());
};

export default CalendarDay;