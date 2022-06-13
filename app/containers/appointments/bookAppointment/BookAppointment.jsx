import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';
import AppointmentForm from '../components/forms/AppointmentForm';

function BookAppointment() {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  if (open) {
    return (
      <AppointmentForm
        page="Appointment"
        open={open}
        handleClose={handleClose}
      />
    );
  } else {
    return <Redirect push to={ROUTES_CONSTANTS.ALL_APPOINTMENTS} />;
  }
}

export default BookAppointment;
