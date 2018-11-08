function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

import React from 'react';
import addYears from 'date-fns/add_years';
import addMonths from 'date-fns/add_months';
import addWeeks from 'date-fns/add_weeks';
import addDays from 'date-fns/add_days';
import format from 'date-fns/format';
import isSameDay from 'date-fns/is_same_day';
import isBefore from 'date-fns/is_before';
import isWithinRange from 'date-fns/is_within_range';
import Calendar from './Calendar';
import './index.css';
var CalendarType = {
  DatePicker: 'DatePicker',
  DateRangePicker: 'DateRangePicker'
};

var CalendarController =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CalendarController, _React$PureComponent);

  function CalendarController(props) {
    var _this;

    _classCallCheck(this, CalendarController);

    _this = _possibleConstructorReturn(this, (CalendarController.__proto__ || Object.getPrototypeOf(CalendarController)).call(this)); // Init to current month/year or provided date.

    var initialDate = props.date || new Date();
    var month = initialDate.getMonth() + 1;
    var year = initialDate.getFullYear();
    _this.state = {
      month: month,
      year: year
    }; // Bind all functions to this.

    _this.handleKeyPress = _this.handleKeyPress.bind(_assertThisInitialized(_this));
    _this.onDateHovered = _this.onDateHovered.bind(_assertThisInitialized(_this));
    _this.onDateSelected = _this.onDateSelected.bind(_assertThisInitialized(_this));
    _this.onDateFocused = _this.onDateFocused.bind(_assertThisInitialized(_this));
    _this.isDateHovered = _this.isDateHovered.bind(_assertThisInitialized(_this));
    _this.isDateFocused = _this.isDateFocused.bind(_assertThisInitialized(_this));
    _this.isDateSelected = _this.isDateSelected.bind(_assertThisInitialized(_this));
    _this.isDateInRange = _this.isDateInRange.bind(_assertThisInitialized(_this));
    _this.isDateEnabled = _this.isDateEnabled.bind(_assertThisInitialized(_this));
    _this.isDateHighlighted = _this.isDateHighlighted.bind(_assertThisInitialized(_this));
    _this.onChangeMonth = _this.onChangeMonth.bind(_assertThisInitialized(_this));
    _this.onChangeYear = _this.onChangeYear.bind(_assertThisInitialized(_this));
    _this.createDateButtonRef = _this.createDateButtonRef.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CalendarController, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(event) {
      // Ignore key press if this component isn't focused.
      var componentHasFocus = this.calendar.contains(document.activeElement);
      if (!componentHasFocus) return; // Otherwise prevent default.

      event.preventDefault();
      var shiftKey = event.shiftKey,
          keyCode = event.keyCode;
      var enter = keyCode === 13;
      var pageUp = keyCode === 33;
      var pageDown = keyCode === 34;
      var leftArrow = keyCode === 37;
      var upArrow = keyCode === 38;
      var rightArrow = keyCode === 39;
      var downArrow = keyCode === 40;
      var isDateEnabled = this.props.isDateEnabled;
      var focused = this.state.focused; // Enter key selects a day.

      if (enter) {
        if (isDateEnabled(focused)) {
          this.onDateSelected(focused);
        }

        return;
      } // Shift key + pageUp moves backward 1yr.


      if (shiftKey && pageUp) {
        var nextDate = addYears(focused, -1);

        if (isDateEnabled(nextDate)) {
          this.onDateFocused(nextDate);
        }

        return;
      } // Shift key + pageDown moves forward 1yr.


      if (shiftKey && pageDown) {
        var _nextDate = addYears(focused, 1);

        if (isDateEnabled(_nextDate)) {
          this.onDateFocused(_nextDate);
        }

        return;
      } // pageUp moves backward 1mo.


      if (pageUp) {
        var _nextDate2 = addMonths(focused, -1);

        if (isDateEnabled(_nextDate2)) {
          this.onDateFocused(_nextDate2);
        }

        return;
      } // pageDown moves forward 1mo.


      if (pageDown) {
        var _nextDate3 = addMonths(focused, 1);

        if (isDateEnabled(_nextDate3)) {
          this.onDateFocused(_nextDate3);
        }

        return;
      } // Up Arrow moves backward 1wk.


      if (upArrow) {
        var _nextDate4 = addWeeks(focused, -1);

        if (isDateEnabled(_nextDate4)) {
          this.onDateFocused(_nextDate4);
        }

        return;
      } // Down Arrow moves forward 1wk.


      if (downArrow) {
        var _nextDate5 = addWeeks(focused, 1);

        if (isDateEnabled(_nextDate5)) {
          this.onDateFocused(_nextDate5);
        }

        return;
      } // Left Arrow moves backward 1day.


      if (leftArrow) {
        var _nextDate6 = addDays(focused, -1);

        if (isDateEnabled(_nextDate6)) {
          this.onDateFocused(_nextDate6);
        }

        return;
      } // Right Arrow moves forward 1wk.


      if (rightArrow) {
        var _nextDate7 = addDays(focused, 1);

        if (isDateEnabled(_nextDate7)) {
          this.onDateFocused(_nextDate7);
        }

        return;
      }
    }
  }, {
    key: "onChangeYear",
    value: function onChangeYear(event) {
      event.preventDefault(); // Set year to value as Integer (or fall back to undefined if NaN)

      this.setState({
        year: parseInt(event.target.value) || undefined
      });
    }
  }, {
    key: "onChangeMonth",
    value: function onChangeMonth(delta) {
      var _this2 = this;

      var _state = this.state,
          month = _state.month,
          _state$year = _state.year,
          year = _state$year === void 0 ? 0 : _state$year;
      var nextMonth = month + delta;
      var nextYear = year; // Change current month by the given delta.
      // But if next month is not between 1 & 12, adjust year too.
      // TODO: handle case where delta >12mo.

      if (nextMonth < 1) {
        nextMonth = 12 + nextMonth;
        nextYear -= 1;
      }

      if (nextMonth > 12) {
        nextMonth = nextMonth - 12;
        nextYear += 1;
      }

      return function () {
        _this2.setState({
          month: nextMonth,
          year: nextYear
        });
      };
    }
  }, {
    key: "onDateSelected",
    value: function onDateSelected(date) {
      var _props = this.props,
          type = _props.type,
          onDateSelected = _props.onDateSelected,
          onStartDateSelected = _props.onStartDateSelected,
          onEndDateSelected = _props.onEndDateSelected; // DatePicker -> one date selected.

      if (type === CalendarType.DatePicker) {
        if (onDateSelected) onDateSelected(date);
      } // DateRangePicker -> either first or second date selected.
      else if (type === CalendarType.DateRangePicker) {
          var noStartDate = !this.props.startDate;
          var allSelected = this.props.startDate && this.props.endDate;
          var dateIsPriorToStart = this.props.startDate && this.props.startDate > date;
          var needStartDate = noStartDate || allSelected || dateIsPriorToStart; // No start date, make this the start date.

          if (needStartDate) {
            if (onStartDateSelected) onStartDateSelected(date);
            if (onEndDateSelected) onEndDateSelected(null);
          } // Has start date, make this the end date.
          else {
              if (onEndDateSelected) onEndDateSelected(date);
            }
        }
    }
  }, {
    key: "onDateHovered",
    value: function onDateHovered(date) {
      var onDateHovered = this.props.onDateHovered; // Update date hovered in state.

      this.setState({
        hovered: date
      }, function () {
        // If we have a prop hover handler, run it.
        if (onDateHovered) onDateHovered(date);
      });
    }
  }, {
    key: "onDateFocused",
    value: function onDateFocused(date) {
      var _this3 = this;

      var onDateFocused = this.props.onDateFocused;
      var month = date.getMonth() + 1;
      var year = date.getFullYear(); // Update date focused in state.

      this.setState({
        focused: date,
        month: month,
        year: year
      }, function () {
        // Focus the DOM element only if it wasn't focused by the user.
        var dayDOM = _this3[format(date, 'YYYYMMDD')];

        if (document.activeElement !== dayDOM) {
          dayDOM.focus();
        } // If we have a prop focus handler, run it.


        if (onDateFocused) onDateFocused(date);
      });
    }
  }, {
    key: "isDateEnabled",
    value: function isDateEnabled(date) {
      // Check with prop function whether date is enabled.
      var isDateEnabled = this.props.isDateEnabled;
      return isDateEnabled(date);
    }
  }, {
    key: "isDateHighlighted",
    value: function isDateHighlighted(date) {
      // Check with prop function whether date is highlighted.
      var isDateHighlighted = this.props.isDateHighlighted;
      return isDateHighlighted(date);
    }
  }, {
    key: "isDateFocused",
    value: function isDateFocused(date) {
      // Is this date currently focused?
      return isSameDay(date, this.state.focused);
    }
  }, {
    key: "isDateHovered",
    value: function isDateHovered(date) {
      // Is this date currently hovered?
      return isSameDay(date, this.state.hovered);
    }
  }, {
    key: "isDateSelected",
    value: function isDateSelected(date) {
      // DatePicker/DateRangePicker have different dates.
      var selectedDays = this.props.type === CalendarType.DatePicker ? [this.props.date] : [this.props.startDate, this.props.endDate]; // Is this date selected?

      return selectedDays.some(function (selected) {
        return selected ? isSameDay(selected, date) : false;
      });
    }
  }, {
    key: "isDateInRange",
    value: function isDateInRange(date) {
      // Only DateRangePicker can have a range.
      if (this.props.type === CalendarType.DatePicker) return false; // We can only have a range if there's a start date and either and endDate or a hovered/focusedDate.

      var _props2 = this.props,
          startRange = _props2.startDate,
          endDate = _props2.endDate;
      var _state2 = this.state,
          focused = _state2.focused,
          hovered = _state2.hovered;
      var endRange = endDate || (startRange && focused && !isSameDay(startRange, focused) ? focused : hovered);
      if (!startRange || !endRange || isBefore(endRange, startRange)) return false; // Check if date is within the range of start/end.

      return isWithinRange(date, startRange, endRange);
    }
  }, {
    key: "createDateButtonRef",
    value: function createDateButtonRef(date) {
      var _this4 = this;

      // Generates a function ref to a button representing a date.
      return function (ref) {
        _this4[format(date, 'YYYYMMDD')] = ref;
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(Calendar, {
        calendarRef: function calendarRef(ref) {
          return _this5.calendar = ref;
        },
        createDateButtonRef: this.createDateButtonRef,
        rerender: {
          focused: this.state.focused,
          hovered: this.state.hovered,
          date: this.props.date,
          startDate: this.props.startDate,
          endDate: this.props.endDate
        },
        month: this.state.month,
        year: this.state.year,
        isDateHovered: this.isDateHovered,
        isDateFocused: this.isDateFocused,
        isDateSelected: this.isDateSelected,
        isDateInRange: this.isDateInRange,
        isDateHighlighted: this.isDateHighlighted,
        isDateEnabled: this.isDateEnabled,
        onDateSelected: this.onDateSelected,
        onDateHovered: this.onDateHovered,
        onDateFocused: this.onDateFocused,
        onChangeMonth: this.onChangeMonth,
        onChangeYear: this.onChangeYear,
        locale: this.props.locale,
        disabled: this.props.disabled
      });
    }
  }]);

  return CalendarController;
}(React.PureComponent);

CalendarController.defaultProps = {
  type: CalendarType.DatePicker,
  locale: 'en-US',
  isDateHighlighted: function isDateHighlighted(date) {
    return false;
  },
  isDateEnabled: function isDateEnabled(date) {
    return true;
  },
  disabled: false
};
export var DatePicker = function DatePicker(props) {
  return React.createElement(CalendarController, _extends({
    type: CalendarType.DatePicker
  }, props));
};
export var DateRangePicker = function DateRangePicker(props) {
  return React.createElement(CalendarController, _extends({
    type: CalendarType.DateRangePicker
  }, props));
};