import React from 'react';
import TimeSlot from "./TimeSlot";

const TimeSlotPicker = (props) => {
    
    let {onReportSelected, reports, selectedReport, isLoadingReports} = props;

    return (<div className="TimeSlotPicker">
        <div>
            <h1>Report 1</h1>
        </div>
        {isLoadingReports ? 
            <div className="loadingContainer">Loading...</div> :
            reports.map((rep) => <TimeSlot isSelected={rep.id === selectedReport.id} key={rep.id} report={rep} onReportSelected={onReportSelected}/>)}
    </div>);
};

export default TimeSlotPicker;
