import React from 'react';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';

import CalendarHeader from './CalendarHeader';
import CalendarDay from './CalendarDay';
import {
  getMonthHeaderTemplate,
  getMonthTemplate
} from './Utils';
import TimeSlotPicker from "./TimeSlotPicker";

const Calendar = (props) => {
	const {
		month,
		year,

		isDateHovered,
		isDateFocused,
		isDateSelected,
		isDateInRange,
		isDateHighlighted,
		isDateEnabled,

		onDateFocused,
		onDateHovered,
		onDateSelected,
		onChangeMonth,
		onChangeYear,

		calendarRef,
		createDateButtonRef,
		disabled,
		locale,
        onReportSelected,
		reports,
        selectedReport
	} = props
	
	// Template for month header (days of week info).
	const headerTemplate = getMonthHeaderTemplate(locale);
	// Template for month grid (days of month info).
	const monthTemplate = getMonthTemplate(month, year || 0);

	return (
		<div className="OuterCalendarContainer">
			<div className="CalendarContainer">
				<CalendarHeader
					month={ month }
					year={ year }
					onBack={ onChangeMonth(-1) }
					onForward={ onChangeMonth(1) }
					onChangeYear={ onChangeYear }
					locale={ locale }
					disabled={ disabled } />
				<div className="Calendar" role="grid" ref={ calendarRef }>
					<div className="head" role="row">
						{ headerTemplate.map(({ dayName, style }, i) => (
							<div key={ dayName } className="dayHeading" style={ style } role="columnheader" aria-label={ dayName }>
								<abbr>{ dayName.slice(0, 3) }</abbr>
							</div>
						)) }
					</div>
					<div className="body" role="row">
						{ monthTemplate.map(({ date, style }, i) => (
							<CalendarDay
								key={ date }
								date={ date }
								dateButtonRef={ createDateButtonRef(date) }
								dateLabel={ format(date, 'dddd, MMMM D, YYYY') }
								style={ style }
								isToday={ isToday(date) }
								isHovered={ isDateHovered(date) }
								isFocused={ isDateFocused(date) }
								isSelected={ isDateSelected(date) }
								isInRange={ isDateInRange(date) }
								isHighlighted={ isDateHighlighted(date) }
								isDisabled={ disabled || !isDateEnabled(date) }
								onSelect={ onDateSelected }
								onHover={ onDateHovered }
								onFocus={ onDateFocused } />
						)) }
					</div>
				</div>
			</div>
			<div className="TimeSelectorContainer">
				<TimeSlotPicker reports={reports} selectedReport={selectedReport} onReportSelected={onReportSelected}/>
			</div>
		</div>
	);
};

export default Calendar;
