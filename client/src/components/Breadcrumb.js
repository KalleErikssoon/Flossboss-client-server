import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

function Breadcrumbs({ clinic, date, timeslot, handleCalendar }) {
    const selectedClinic = clinic;
    const formattedDate = date ? date.toLocaleDateString() : '';

    return (
        <Breadcrumb>
            <Breadcrumb.Item href='/'>{selectedClinic}</Breadcrumb.Item>
            {date && (
                <Breadcrumb.Item onClick={() => handleCalendar()}>
                    {formattedDate}
                </Breadcrumb.Item>
            )}
            {timeslot && <Breadcrumb.Item active>{timeslot}</Breadcrumb.Item>}
        </Breadcrumb>
    );
}

export default Breadcrumbs;