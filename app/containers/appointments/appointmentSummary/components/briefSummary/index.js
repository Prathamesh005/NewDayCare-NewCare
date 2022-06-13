import React from 'react';
import { Grid } from '@material-ui/core';
import Advice from '../sections/Advice';
import Diagnosis from '../sections/Diagnosis';
import FollowUp from '../sections/FollowUp';
import Footer from '../sections/Footer';
import GeneralInstruction from '../sections/GeneralInstruction';
import Header from '../sections/Header';
import PatientInfo from '../sections/PatientInfo';
import Prescription from '../sections/Prescription';
import VisitNotesAndPrevRes from '../sections/VisitNotesAndPrevRes';
import TreatmentPlan from '../sections/TreatmentPlan';
import ImpressionForVisit from '../sections/ImpressionForVisit';
import ReferredTo from '../sections/ReferredTo';
import ReasonForVisit from '../sections/ReasonForVisit';
import Discussion from '../sections/Discussion';
import AdditionalNote from '../sections/AdditionalNote';

const BriefSummary = React.forwardRef((props, ref) => {
  const referredToDetails =
    props.loadReferredToPrevDataSuccess &&
    props.loadReferredToPrevDataSuccess[0] &&
    `${props.loadReferredToPrevDataSuccess[0]['note']}${props
      .loadReferredToPrevDataSuccess[0]['code'] &&
      ` - ${props.loadReferredToPrevDataSuccess[0]['code']['display']}`}`;
  const additionalNoteShow =
    props.loadAdditionalNoteDataSuccess &&
    props.loadAdditionalNoteDataSuccess.description;
  const discussionShow = props.DiscussionData && props.DiscussionData.note;
  const cancerClinicalImpressions = props.impressionForVisitData;
  return (
    <Grid
      container
      spacing={4}
      ref={ref}
      style={{ backgroundColor: '#ffffff', padding: '1rem' }}
    >
      <Grid item xs={12}>
        <Header
          userDetailsForHeader={props.userDetailsForHeader}
          headerToggle={props.headerToggle}
        />
      </Grid>
      <Grid item xs={12}>
        <PatientInfo
          patientDetails={props.patientDetails && props.patientDetails}
          appointmentSummaryDate={
            props.appointmentSummaryDate && props.appointmentSummaryDate
          }
        />
      </Grid>
      {props &&
        props.VisitNotesResult &&
        props.VisitNotesResult &&
        props.VisitNotesResult.length > 0 && (
          <Grid item xs={12}>
            <ReasonForVisit
              VisitNotesResult={
                props.VisitNotesResult && props.VisitNotesResult
              }
            />
          </Grid>
        )}
      {props && props.diagnosisData && props.diagnosisData.diagnosisCondition && (
        <Grid item xs={12}>
          <Diagnosis
            diagnosisData={props.diagnosisData && props.diagnosisData}
            VisitNotesResult={props.VisitNotesResult}
          />
        </Grid>
      )}
      {cancerClinicalImpressions &&
        Array.isArray(cancerClinicalImpressions) &&
        cancerClinicalImpressions.length > 0 && (
          <Grid item xs={12}>
            <ImpressionForVisit VisitNotesResult={cancerClinicalImpressions} />
          </Grid>
        )}
      {props &&
        props.prevTestResult &&
        props.prevTestResult &&
        props.prevTestResult.length > 0 && (
          <Grid item xs={12}>
            <VisitNotesAndPrevRes
              prevTestResult={props.prevTestResult && props.prevTestResult}
              PrevTumorTestResult={
                props.PrevTumorTestResult && props.PrevTumorTestResult
              }
              PrevBiospyResult={
                props.PrevBiospyResult && props.PrevBiospyResult
              }
            />
          </Grid>
        )}
      {props &&
        props.adviceAndPrescriptionData &&
        props.adviceAndPrescriptionData.length > 0 && (
          <Grid item xs={12}>
            <Advice
              adviceAndPrescriptionData={props.adviceAndPrescriptionData}
            />
          </Grid>
        )}
      {props &&
        props.TreatmentData &&
        props.TreatmentData.treatmentPlans &&
        props.TreatmentData.treatmentPlans.length > 0 && (
          <Grid item xs={12}>
            <TreatmentPlan
              TreatmentData={props.TreatmentData}
              treatmentProtocolData={props.treatmentProtocolData}
            />
          </Grid>
        )}
      {props && props.prescriptionData && props.prescriptionData.length > 0 && (
        <Grid item xs={12}>
          <Prescription adviceAndPrescriptionData={props.prescriptionData} />
        </Grid>
      )}

      {discussionShow && (
        <Grid item xs={12}>
          <Discussion DiscussionData={props.DiscussionData} />
        </Grid>
      )}
      {additionalNoteShow && (
        <Grid item xs={12}>
          <AdditionalNote
            loadAdditionalNoteDataSuccess={props.loadAdditionalNoteDataSuccess}
          />
        </Grid>
      )}
      {props && props.loadReferredToPrevDataSuccess && referredToDetails && (
        <Grid item xs={12}>
          <ReferredTo referredToDetails={referredToDetails} />
        </Grid>
      )}
      {props && props.scheduleFollowUp && props.scheduleFollowUp.startDateTime && (
        <Grid item xs={12}>
          <FollowUp scheduleFollowUp={props.scheduleFollowUp} />
        </Grid>
      )}
      {/* <Grid item xs={12}>
                <GeneralInstruction/>
            </Grid> */}
      <Grid item xs={12}>
        {props.appointmentSummaryDate && (
          <Footer
            userDetailsForHeader={props.userDetailsForHeader}
            appointmentSummaryDate={props.appointmentSummaryDate}
            headerToggle={props.headerToggle}
          />
        )}
      </Grid>
    </Grid>
  );
});

export default BriefSummary;
