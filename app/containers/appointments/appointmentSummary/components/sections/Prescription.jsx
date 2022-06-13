import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  sectionWidth: {
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
  },
  tableRoot: {
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    width: '100%',
    '& th, td': {
      border: '1px solid #F4F4F4',
      textAlign: 'left',
      padding: '8px',
    },
    '& th:nth-child(1), td:nth-child(1)': {
      textAlign: 'center',
    },
    '& th': {
      backgroundColor: '#F4F4F4',
    },
  },
}));
function Prescription(props) {
  const classes = useStyles();
  // console.log("prescription", props.adviceAndPrescriptionData && props.adviceAndPrescriptionData.cancerMedicationRequests)
  const durationData = [
    { key: 'D', value: 'days' },
    { key: 'Wk', value: 'weeks' },
    { key: 'Mo', value: 'months' },
    { key: 'A', value: 'annual' },
    { key: 'S', value: 'sec' },
    { key: 'Min', value: 'min' },
    { key: 'H', value: 'hour' },
  ];
  const convertUnit = valString => {
    const obj = durationData.find(item => item.key === valString);
    return obj.value;
  };

  const arrayOfPrescriptions =
    props && props.adviceAndPrescriptionData
      ? props.adviceAndPrescriptionData
        ? props.adviceAndPrescriptionData.map((item, index) => {
            return {
              srNo: (index + 1).toString(),
              medicineForm:
                item && item.medicationCodeableConcept.text
                  ? item.medicationCodeableConcept.text.split('|')[0]
                  : '',
              medicineName:
                item && item.medicationCodeableConcept.display
                  ? item.medicationCodeableConcept.display
                  : '',
              medicineComposititon:
                item && item.medicationCodeableConcept.text
                  ? item.medicationCodeableConcept.text.split('|')[1]
                  : '',
              medicineTiming:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].when &&
                    item.dosageInstruction[0].when.length != 0
                    ? item.dosageInstruction[0].when[0]
                    : ''
                  : '',
              medicineDose:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].code &&
                    item.dosageInstruction[0].code.display
                    ? item.dosageInstruction[0].code.display
                    : ''
                  : '',
              medicineFreq: '',
              medicineSpecialInstruction:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].text
                    ? item.dosageInstruction[0].text
                    : ''
                  : '',
              medicineDuration:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].duration
                    ? item.dosageInstruction[0].duration
                    : ''
                  : '',
              medicineDurationUnit:
                item &&
                item.dosageInstruction &&
                item.dosageInstruction.length != 0
                  ? item.dosageInstruction[0].durationUnit
                    ? convertUnit(item.dosageInstruction[0].durationUnit)
                    : ''
                  : '',
              // medicineQty: ""
            };
          })
        : []
      : [];

  return (
    <Grid container spacing={2} className={classes.sectionWidth}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle2"
          style={{ fontWeight: 500, color: '#373737' }}
        >
          Prescription
        </Typography>
        <Divider style={{ fontWeight: 500, color: '#373737' }} />
      </Grid>
      <Grid item xs={12}>
        <table className={classes.tableRoot}>
          <col style={{ width: '5%' }} />
          <col style={{ width: '8%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '12%' }} />
          <col style={{ width: '20%' }} />
          {arrayOfPrescriptions !== null &&
            arrayOfPrescriptions !== undefined &&
            arrayOfPrescriptions != 0 && (
              <tr>
                <th>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 800, color: '#373737' }}
                  >
                    Rx
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 800, color: '#373737' }}
                  >
                    Form
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 800, color: '#373737' }}
                  >
                    Drug Name
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 800, color: '#373737' }}
                  >
                    Freq
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 800, color: '#373737' }}
                  >
                    Instruction
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 800, color: '#373737' }}
                  >
                    Duration
                  </Typography>
                </th>
                <th>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 800, color: '#373737' }}
                  >
                    Notes
                  </Typography>
                </th>
              </tr>
            )}
          {arrayOfPrescriptions !== null &&
            arrayOfPrescriptions !== undefined &&
            arrayOfPrescriptions != 0 &&
            arrayOfPrescriptions.map(item => (
              <tr key={item.srNo}>
                <td>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {item.srNo}
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {item.medicineForm}
                  </Typography>
                </td>
                <td>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography
                        variant="h4"
                        style={{ fontWeight: 700, color: '#373737' }}
                      >
                        {item.medicineName}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="caption"
                        style={{ fontWeight: 500, color: '#373737' }}
                      >
                        Composition: {item.medicineComposititon}
                      </Typography>
                    </Grid>
                    {/* <Grid item xs={12}>
                                    <Typography variant="caption" style={{ fontWeight: 500, color: "#373737" }}>Timing: 1 TAB - After Breakfast</Typography>
                                </Grid> */}
                  </Grid>
                </td>
                <td>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {item.medicineDose}
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {item.medicineTiming}
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {item.medicineDuration + ' ' + item.medicineDurationUnit}
                  </Typography>
                </td>
                <td>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {item.medicineSpecialInstruction}
                  </Typography>
                </td>
              </tr>
            ))}
        </table>
      </Grid>
    </Grid>
  );
}

export default Prescription;
