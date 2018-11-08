import React from 'react';
import { monthsOfYear } from './Utils';

var CalendarHeader = function CalendarHeader(_ref) {
  var month = _ref.month,
      _ref$year = _ref.year,
      year = _ref$year === void 0 ? '' : _ref$year,
      onBack = _ref.onBack,
      onForward = _ref.onForward,
      onChangeYear = _ref.onChangeYear,
      locale = _ref.locale,
      disabled = _ref.disabled;
  return React.createElement("div", {
    className: "CalendarHeader"
  }, React.createElement("button", {
    className: "BackButton",
    title: "Previous Month",
    onClick: onBack,
    disabled: disabled || !onBack
  }, "\u276E"), React.createElement("h1", {
    className: "MonthDisplay",
    "aria-live": "assertive"
  }, monthsOfYear(locale)[month - 1], React.createElement("input", {
    title: "Edit Year",
    type: "number",
    value: year,
    onChange: onChangeYear,
    disabled: disabled
  })), React.createElement("button", {
    className: "NextButton",
    title: "Next Month",
    onClick: onForward,
    disabled: disabled || !onForward
  }, "\u276F"));
};

export default CalendarHeader;