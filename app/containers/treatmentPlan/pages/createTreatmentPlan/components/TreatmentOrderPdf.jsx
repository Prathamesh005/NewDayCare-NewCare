import React, { useEffect } from 'react';
import { View, Text, Page, Document, StyleSheet } from '@react-pdf/renderer';
import PdfTable from '../../../../../components/pdf/PdfTable';
import {
  chemotherapyOrdersHeadCells,
  dischargeInstructionHeadCells,
  premedicationsHeadCells,
  supportiveCareHeadCells,
} from './PdfHeadCells';
import {
  PdfHeaders,
  PdfFooter,
  PdfValueLabel,
  ReportTitle,
} from '../../../../../components/pdf';
import { Fragment } from 'react';

import moment from 'moment';
import {
  getDateDayFirst,
  getTodayDate,
} from '../../../../../utils/formatHelper';
import PatientPractitionerDetails from './PatientPractitionerDetails';
import {
  getFromLocalStorage,
  getOrganizationDetails,
  getPractitionerData,
} from '../../../../../utils/localStorageUtils';
import PdfSignature from '../../../../../components/pdf/PdfSignature';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 20,
    paddingBottom: 150,
    paddingHorizontal: 20,
  },
  dayLabel: {
    marginTop: 30,
  },
  labelBox: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  notes: {
    marginTop: 30,
  },
  detailsBox: {},
  // invoice header
  invoiceDate: {
    textAlign: 'right',
    color: '#494949',
    fontSize: 9,
    flexBasis: '100%',
  },
  rightContainer: {
    width: '50%',
    alignItems: 'right',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  leftContainer: {
    width: '50%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'left',
  },
  invoiceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 15,
    fontStyle: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 10,
    backgroundColor: '#F7F6F4',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottom: '1 solid #eaeaea',
  },

  //
  leftRibbonContainer: {
    width: '33.3%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'left',
  },
  middleRibbonContainer: {
    width: '33.3%',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
  },
  rightRibbonContainer: {
    width: '33.3%',
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
  email: {
    textAlign: 'center',
    color: '#494949',
    fontSize: 9,
    flexBasis: '100%',
    alignSelf: 'center',
  },
  invoiceDateNew: {
    textAlign: 'right',
    color: '#494949',
    fontSize: 9,
    flexBasis: '100%',
    alignSelf: 'right',
  },
});

function TreatmentOrderPdf(props) {
  const {
    treatmentDaysList,
    dischargeInstructionList = [],
    headerInfo = {},
    bmiInfo = {},
    patientDetails = {},
    title = '',
  } = props;

  const signature =
    props &&
    props.fetchPractitionerDataSuccess &&
    props.fetchPractitionerDataSuccess.cancerPractitioner
      ? props.fetchPractitionerDataSuccess.cancerPractitioner.length > 0
        ? props.fetchPractitionerDataSuccess.cancerPractitioner[0].practitioner
          ? props.fetchPractitionerDataSuccess.cancerPractitioner[0]
              .practitioner.signatureImage
            ? props.fetchPractitionerDataSuccess.cancerPractitioner[0]
                .practitioner.signatureImage
            : ''
          : ''
        : ''
      : '';
  const signatureContentType =
    props &&
    props.fetchPractitionerDataSuccess &&
    props.fetchPractitionerDataSuccess.cancerPractitioner
      ? props.fetchPractitionerDataSuccess.cancerPractitioner.length > 0
        ? props.fetchPractitionerDataSuccess.cancerPractitioner[0].practitioner
          ? props.fetchPractitionerDataSuccess.cancerPractitioner[0]
              .practitioner.signatureContentType
            ? props.fetchPractitionerDataSuccess.cancerPractitioner[0]
                .practitioner.signatureContentType
            : ''
          : ''
        : ''
      : '';

  const {
    bsa = {},
    bmi = {},
    weightUnit,
    weight,
    heightUnit,
    height,
    idealBodyWeight = {},
  } = bmiInfo;

  const {
    dateAdministration = '',
    intent = '',
    protocol = '',
    cycleNumber = '',
    note = '',
  } = headerInfo;

  const {
    orgName,
    orgLogo,
    gstn,
    locName,
    endpoint,
    phone,
    email,
  } = getOrganizationDetails();

  const practitionerData = getPractitionerData();

  const practitionerObj = {
    name: practitionerData.display.split('/')[0] || '',
    mciNum: '',
  };

  return (
    <Document title={title || ''}>
      <Page size="A4" style={styles.page} wrap>
        {/* ReportTitle */}
        <ReportTitle
          logo={orgLogo}
          subTitle={`${orgName}, ${locName}`}
          title={practitionerObj.name}
        />
        <View style={styles.invoiceDetails}>
          <View style={styles.leftRibbonContainer}>
            <Text style={styles.invoiceNum}>Mob: +91 {phone} </Text>
          </View>
          <View style={styles.middleRibbonContainer}>
            <Text style={styles.email}>Email: {email}</Text>
          </View>
          <View style={styles.rightRibbonContainer}>
            <Text style={styles.invoiceDateNew}>Website: {endpoint}</Text>
          </View>
        </View>
        <View style={styles.labelBox}>
          {props.patientDetails && props.patientDetails.name && (
            <PdfValueLabel
              value={props.patientDetails.name}
              label="Patient Name"
            />
          )}
          {practitionerObj && (
            <PdfValueLabel
              value={practitionerObj.name}
              label="Physician Name"
            />
          )}
        </View>
        {/* <Text style={styles.description}>Patient Name: </Text>
          <Text style={styles.values}>
            {props.patientDetails && props.patientDetails.name}
          </Text> */}
        {/* <View style={styles.row}>
          <Text style={styles.description}>Physician Name :</Text>
          <Text style={styles.values}>{props.practitionerDetails.name}</Text>
        </View> */}
        {/* patient and practitioner Details */}
        {/* <View>
          <PatientPractitionerDetails
            patientDetails={patientDetails}
            practitionerDetails={practitionerObj}
          />
        </View> */}
        {/* details */}
        <View style={styles.labelBox}>
          {intent && (
            <PdfValueLabel value={intent} label="Intent of Treatment" />
          )}
          {protocol && (
            <PdfValueLabel value={protocol} label="Chemotherapy Protocol" />
          )}
          {dateAdministration && (
            <PdfValueLabel
              value={getDateDayFirst(dateAdministration)}
              label="Suggested Date of Administration"
            />
          )}
          {cycleNumber && (
            <PdfValueLabel value={cycleNumber} label="Cycle Number" />
          )}
        </View>
        {/* bmi info */}
        <View style={styles.labelBox}>
          <PdfValueLabel
            value={height ? `${height || ''}  / ${heightUnit || ''}` : '-'}
            label="Height:"
          />
          <PdfValueLabel
            value={weight ? `${weight || ''}  / ${weightUnit || ''}` : '-'}
            label="Weight:"
          />
          <PdfValueLabel
            label="BMI:"
            value={bmi.value ? `${bmi.value || ''} ${bmi.unit || ''}` : '-'}
          />
          <PdfValueLabel
            label="BSA:"
            value={bsa.value ? `${bsa.value || ''} ${bsa.unit || ''}` : '-'}
          />
          <PdfValueLabel
            label="Ideal Body Weight:"
            value={
              idealBodyWeight.value
                ? `${idealBodyWeight.value || ''} ${idealBodyWeight.unit || ''}`
                : '-'
            }
          />
        </View>
        {/* table */}
        {treatmentDaysList &&
          treatmentDaysList.map((dayData, index) => {
            const {
              day,
              date,
              therapyOrders = [],
              supportiveProtocols = [],
              preMedicationProtocols = [],
            } = dayData;

            return (
              <Fragment key={index}>
                <View style={styles.dayLabel}>
                  <Text
                    style={[
                      {
                        width: '20%',
                        textAlign: 'left',
                        fontSize: 10,
                        display: 'flex',
                      },
                    ]}
                  >
                    {`Day ${day} :  ${getDateDayFirst(date)}`}
                  </Text>
                </View>
                {preMedicationProtocols &&
                  preMedicationProtocols.length > 0 && (
                    <PdfTable
                      headCells={premedicationsHeadCells}
                      rows={preMedicationProtocols}
                      tableTitle="Premedication"
                    />
                  )}
                {therapyOrders && therapyOrders.length > 0 && (
                  <PdfTable
                    headCells={chemotherapyOrdersHeadCells}
                    rows={therapyOrders}
                    tableTitle="Chemotherapy Orders"
                  />
                )}
                {supportiveProtocols && supportiveProtocols.length > 0 && (
                  <PdfTable
                    headCells={supportiveCareHeadCells}
                    rows={supportiveProtocols}
                    tableTitle="Hydration / Supportive care"
                  />
                )}
                {/* break point */}
                <Text break />
              </Fragment>
            );
          })}
        {/* dischargeInstructionList */}
        {dischargeInstructionList.length > 0 && (
          <PdfTable
            headCells={dischargeInstructionHeadCells}
            rows={dischargeInstructionList}
            tableTitle="On Discharge Instructions"
          />
        )}
        {/* note */}
        <View style={styles.notes}>
          <PdfValueLabel
            label="Additional Note:"
            value={note ? `${note || ''} ` : '-'}
          />
        </View>
        {/* <View style={styles.notes}> */}
        <PdfSignature
          signature={signature || ''}
          signatureContentType={signatureContentType || ''}
          userName={practitionerObj.name || ''}
        />
        {/* </View> */}
        {/* footer */}
        <PdfFooter
          hideFooterMsg={true}
          rightText={`${getTodayDate('DD MMM YYYY')}`}
        />
      </Page>
    </Document>
  );
}

export default TreatmentOrderPdf;
