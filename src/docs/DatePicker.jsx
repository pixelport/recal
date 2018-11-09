import React from 'react';
import isSameDay from 'date-fns/is_same_day';
import isBefore from 'date-fns/is_before';
import addDays from 'date-fns/add_days';

import { DatePicker } from '../lib/index.jsx';

class MyDatePicker extends React.PureComponent {
	constructor() {
		super();
		
		this.state = {
			selectedDate: addDays(new Date(), 1),
			reports: [{id: 245, text: "12:43"}, {id: 2453, text: "11:43"}, {id: 2499, text: "10:45"}],
			selectedReport: {id: 245, text: "12:43"},
			isLoadingReports: false
		};
		
		this.isDateEnabled = this.isDateEnabled.bind(this);
		this.onDateSelected = this.onDateSelected.bind(this);
		this.onReportSelect = this.onReportSelect.bind(this);
	}
	
	isDateHighlighted(date) {
		const specialDays = [
			new Date(2018, 3, 20),
			new Date(2018, 4, 13),
			new Date(2018, 5, 21),
			new Date(2018, 6, 4)
		];
		
		return specialDays.some((special) => isSameDay(date, special));
	}
	isDateEnabled(date) {
		const now = new Date();
		const todayDay = now.getDate();
		const todayMonth = now.getMonth();
		const todayYear = now.getFullYear();
		const today = new Date(todayYear, todayMonth, todayDay);

		return !isBefore(date, today);
	}
	onDateSelected(date) {
		this.setState({
            isLoadingReports: true
		});
		setTimeout(() => {
            this.setState({
                selectedDate: date,
                isLoadingReports: false
            });	
		}, 1000);
	}
	
	onReportSelect(report){
		console.log(report, this.setState);
        let newReport = Object.assign({}, report);
		console.log("new Report", newReport);
		this.setState({selectedReport: newReport});
	}
	
	render() {
		const { selectedDate } = this.state;
		const locale = 'en-US';
		
		return (
			<div id="DatePickerExample">
				<b>Date Picker Example</b>
				<DatePicker
					date={ selectedDate }
					isDateHighlighted={ this.isDateHighlighted }
					isDateEnabled={ this.isDateEnabled }
					onDateSelected={ this.onDateSelected }
					onDateHovered={ this.onDateHovered }
					locale={ locale } 
					
					reports={this.state.reports} 
					selectedReport={this.state.selectedReport} 
					onReportSelected={this.onReportSelect} 
					isLoadingReports={this.state.isLoadingReports}
				/>
			</div>
		);
	}
}

export default MyDatePicker;