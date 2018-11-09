import React from 'react';


const TimeSlot = (props) => {
    const {report, onReportSelected, isSelected} = props;
    return (<div className={"TimeSlot " + (isSelected ? "selected" : "not-selected")} onClick={() => onReportSelected(report)}>{report.text}</div>)
};

export default TimeSlot;