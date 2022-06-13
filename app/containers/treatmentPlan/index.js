import React, { memo, useEffect, useState, useRef } from 'react';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import AppointmentForm from '../appointments/components/forms/AppointmentForm';
import GenerateTreatmentActionCard from './components/GenerateTreatmentActionCard';
import reducer from './reducer';
import saga from './saga';

function TreatmentPlan(props) {
  const key = 'TreatmentPlan';
  useInjectReducer({
    key,
    reducer,
  });
  useInjectSaga({ key, saga });

  return (
    <AppointmentForm
      pageTitle={'Treatment Plan'}
      leftComponent={GenerateTreatmentActionCard}
    />
  );
}

export default TreatmentPlan;
