import React from 'react';
import { Grid } from '@material-ui/core';
import Header from '../sections/Header';
import PatientInfo from '../sections/PatientInfo';
import ReasonForVisit from '../sections/ReasonForVisit';
import HistoryOfPresentIllness from '../sections/HistoryOfPresentIllness';
import HistoriesAndCondition from '../sections/HistoriesAndCondition';
import GeneralAndSystemicExam from '../sections/GeneralAndSystemicExam';
import Diagnosis from '../sections/Diagnosis';
import VisitNotesAndPrevRes from '../sections/VisitNotesAndPrevRes';
import Advice from '../sections/Advice';
import Prescription from '../sections/Prescription';
import FollowUp from '../sections/FollowUp';
import GeneralInstruction from '../sections/GeneralInstruction';
import Footer from '../sections/Footer';
import TreatmentPlan from '../sections/TreatmentPlan';
import Discussion from '../sections/Discussion';
import AdditionalNote from '../sections/AdditionalNote';
import ImpressionForVisit from '../sections/ImpressionForVisit';
import ReferredTo from '../sections/ReferredTo';

const CustomizedSummary = React.forwardRef((props, ref) => {
  // console.log(props)
  const additionalNoteShow =
    props.loadAdditionalNoteDataSuccess &&
    props.loadAdditionalNoteDataSuccess.description;
  const discussionShow = props.DiscussionData && props.DiscussionData.note;
  const referredToDetails =
    props.loadReferredToPrevDataSuccess &&
    props.loadReferredToPrevDataSuccess[0] &&
    `${props.loadReferredToPrevDataSuccess[0]['note']}${props
      .loadReferredToPrevDataSuccess[0]['code'] &&
      ` - ${props.loadReferredToPrevDataSuccess[0]['code']['display']}`}`;
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
      {props.selectedState.reasonForVisit &&
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
      {props.selectedState.historyOfPresentIllness && (
        <Grid item xs={12}>
          <HistoryOfPresentIllness
            fetchHOPIDataSuccess={
              props.fetchHOPIDataSuccess && props.fetchHOPIDataSuccess
            }
          />
        </Grid>
      )}
      {(props.selectedState.comorbidity ||
        props.selectedState.familyHistory ||
        props.selectedState.lifeStyleIndicators ||
        props.selectedState.allergy) && (
        <Grid item xs={12}>
          <HistoriesAndCondition
            comorbidDataResult={
              props.comorbidDataResult && props.comorbidDataResult
            }
            familyResult={props.familyResult && props.familyResult}
            LifestyleResult={props.LifestyleResult && props.LifestyleResult}
            loadAllergyDataSuccess={props && props.loadAllergyDataSuccess}
            selectedState={props.selectedState && props.selectedState}
            summaryType={'Custom'}
          />
        </Grid>
      )}
      {props.selectedState.generalAndSystemicExam && (
        <Grid item xs={12}>
          <GeneralAndSystemicExam
            ScoresDataResult={props.ScoresDataResult && props.ScoresDataResult}
            GenAndSysResult={props.GenAndSysResult && props.GenAndSysResult}
            vitalDataSuccess={props.vitalDataSuccess && props.vitalDataSuccess}
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
      {props.selectedState.impressionForVisit &&
        cancerClinicalImpressions &&
        Array.isArray(cancerClinicalImpressions) &&
        cancerClinicalImpressions.length > 0 && (
          <Grid item xs={12}>
            <ImpressionForVisit VisitNotesResult={cancerClinicalImpressions} />
          </Grid>
        )}
      {props.selectedState.previousTestResults &&
        props &&
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
      {props.selectedState.treatmentPlan &&
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
      {props.selectedState.discussion && discussionShow && (
        <Grid item xs={12}>
          <Discussion DiscussionData={props.DiscussionData} />
        </Grid>
      )}
      {props.selectedState.additionalNote && additionalNoteShow && (
        <Grid item xs={12}>
          <AdditionalNote
            loadAdditionalNoteDataSuccess={props.loadAdditionalNoteDataSuccess}
          />
        </Grid>
      )}
      {props.selectedState.referredTo && referredToDetails && (
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
                <GeneralInstruction />
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

export default CustomizedSummary;
