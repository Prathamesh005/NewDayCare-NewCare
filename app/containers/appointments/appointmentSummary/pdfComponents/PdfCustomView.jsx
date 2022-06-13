import React from 'react';
import {
  View,
  Text,
  Page,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';
import PdfHOPI from './PdfHOPIs';
import PdfHistory from './PdfHistorys';
import PdfExam from './PdfExams';
import PdfDiagnosis from './PdfDiagnosiss';
import PdfAdvice from './PdfAdvices';
import PdfPrescription from './PdfPrescriptions';
import PdfFollowUp from './PdfFollowUps';
import PdfInstructions from './PdfInstructionss';
import PdfFooter from './PdfFooters';
import PdfSignature from './PdfSignature';
import PdfHeaders from './PdfHeaders';
import PdfPatientInfos from './PdfPatientInfos';
import PdfReasonForVisits from './PdfReasonForVisits';
import PdfPrevTest from './PdfPrevTests';
import PdfTreatmentPlan from './PdfTreatmentPlan';
import PdfDiscussion from './PdfDiscussion';
import PdfAdditionalNote from './PdfAdditionalNote';
import PdfImpressionForVisit from './PdfImpressionForVisit';
import PdfReferredTo from './PdfReferredTo';

const PdfCustomView = props => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      paddingTop: 80,
      paddingBottom: 70,
      marginHorizontal: 10,
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: 18,
      textAlign: 'center',
      marginTop: 40,
      marginBottom: 10,
    },
    rightContainer: {
      width: '50%',
      alignItems: 'right',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    invoiceNum: {
      textAlign: 'left',
      color: '#494949',
      fontSize: 9,
      flexBasis: '100%',
    },
    leftContainer: {
      width: '50%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'left',
    },
    invoiceDate: {
      textAlign: 'right',
      color: '#494949',
      fontSize: 9,
      flexBasis: '100%',
    },

    invoiceDetails: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 15,
      fontStyle: 'bold',
      paddingLeft: 20,
      paddingRight: 20,
      fontSize: 10,
      backgroundColor: '#F7F6F4',
      paddingTop: 15,
      paddingBottom: 15,
      borderBottom: '1 solid #eaeaea',
    },
  });
  const {
    selectedState,
    userDetailsForHeader,
    patientInfo,
    loadAllergyDataSuccess,
    comorbidDataResult,
    familyResult,
    LifestyleResult,
    prevTestResult,
    VisitNotesResult,
    fetchHOPIDataSuccess,
    GenAndSysResult,
    ScoresDataResult,
    vitalDataSuccess,
    diagnosisData,
    impressionForVisitData,
    adviceAndPrescriptionData,
    PrevTumorTestResult,
    PrevBiospyResult,
    TreatmentData,
    treatmentProtocolData,
    DiscussionData,
    loadAdditionalNoteDataSuccess,
    scheduleFollowUp,
    loadReferredToPrevDataSuccess,
    prescriptionData,
    appointmentSummaryDate,
    headerToggle,
  } = props;
  // console.log(selectedState)
  const additionalNoteShow =
    loadAdditionalNoteDataSuccess && loadAdditionalNoteDataSuccess.description;
  const discussionShow = DiscussionData && DiscussionData.note;
  const cancerClinicalImpressions = props.impressionForVisitData;
  const referredToDetails =
    props.loadReferredToPrevDataSuccess &&
    props.loadReferredToPrevDataSuccess[0] &&
    props.loadReferredToPrevDataSuccess[0]['note'] &&
    `${props.loadReferredToPrevDataSuccess[0]['note']}${props
      .loadReferredToPrevDataSuccess[0]['code'] &&
      ` - ${props.loadReferredToPrevDataSuccess[0]['code']['display']}`}`;
  return (
    <Document onContextMenu={e => e.preventDefault()}>
      <Page size="A4" style={styles.page}>
        {!headerToggle && <PdfHeaders propsData={userDetailsForHeader} />}
        {/* <Text style={styles.title}>Appointment Summary</Text> */}
        <PdfPatientInfos
          propsData={patientInfo}
          appointmentSummaryDate={
            appointmentSummaryDate && appointmentSummaryDate
          }
        />
        {selectedState['reasonForVisit'] &&
          VisitNotesResult &&
          VisitNotesResult &&
          VisitNotesResult.length > 0 && (
            <PdfReasonForVisits
              VisitNotesResult={VisitNotesResult && VisitNotesResult}
            />
          )}
        {selectedState['historyOfPresentIllness'] && (
          <PdfHOPI
            fetchHOPIDataSuccess={fetchHOPIDataSuccess && fetchHOPIDataSuccess}
          />
        )}
        {(selectedState['comorbidity'] ||
          selectedState['familyHistory'] ||
          selectedState['lifeStyleIndicators'] ||
          selectedState['allergy']) && (
          <PdfHistory
            comorbidDataResult={comorbidDataResult && comorbidDataResult}
            familyResult={familyResult}
            LifestyleResult={LifestyleResult}
            loadAllergyDataSuccess={loadAllergyDataSuccess}
            selectedState={selectedState}
            summaryType="Custom"
          />
        )}
        {selectedState['generalAndSystemicExam'] && (
          <PdfExam
            ScoresDataResult={ScoresDataResult}
            GenAndSysResult={GenAndSysResult}
            vitalDataSuccess={vitalDataSuccess}
          />
        )}
        <PdfDiagnosis
          diagnosisData={diagnosisData}
          VisitNotesResult={VisitNotesResult}
        />
        {selectedState['impressionForVisit'] &&
          cancerClinicalImpressions &&
          Array.isArray(cancerClinicalImpressions) &&
          cancerClinicalImpressions.length > 0 && (
            <PdfImpressionForVisit
              VisitNotesResult={cancerClinicalImpressions}
            />
          )}

        {selectedState['previousTestResults'] &&
          prevTestResult &&
          prevTestResult.length > 0 && (
            <PdfPrevTest
              prevTestResult={prevTestResult}
              PrevTumorTestResult={PrevTumorTestResult}
              PrevBiospyResult={PrevBiospyResult}
            />
          )}
        {adviceAndPrescriptionData && adviceAndPrescriptionData.length > 0 && (
          <PdfAdvice adviceAndPrescriptionData={adviceAndPrescriptionData} />
        )}
        {selectedState['treatmentPlan'] &&
          TreatmentData &&
          TreatmentData.treatmentPlans &&
          TreatmentData.treatmentPlans.length > 0 && (
            <PdfTreatmentPlan
              TreatmentData={TreatmentData}
              treatmentProtocolData={treatmentProtocolData}
            />
          )}
        {prescriptionData && prescriptionData.length > 0 && (
          <PdfPrescription adviceAndPrescriptionData={prescriptionData} />
        )}
        {selectedState['discussion'] && discussionShow && (
          <PdfDiscussion DiscussionData={DiscussionData} />
        )}
        {selectedState['additionalNote'] && additionalNoteShow && (
          <PdfAdditionalNote
            loadAdditionalNoteDataSuccess={loadAdditionalNoteDataSuccess}
          />
        )}
        {selectedState['referredTo'] &&
          loadReferredToPrevDataSuccess &&
          referredToDetails && (
            <PdfReferredTo referredToDetails={referredToDetails} />
          )}
        {scheduleFollowUp && scheduleFollowUp.startDateTime && (
          <PdfFollowUp scheduleFollowUp={scheduleFollowUp} />
        )}
        {/* <PdfInstructions /> */}
        <PdfSignature userDetailsForHeader={props.userDetailsForHeader} />
        {!headerToggle && (
          <PdfFooter appointmentSummaryDate={appointmentSummaryDate} />
        )}
      </Page>
    </Document>
  );
};

export default PdfCustomView;
