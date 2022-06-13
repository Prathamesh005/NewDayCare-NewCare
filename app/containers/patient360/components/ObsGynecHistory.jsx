/*eslint-disable*/
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ViewTable } from '../../../components';
import { NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles({
  root: {
    width: '100%',
    // marginBottom: '90px',
  },
  tablecontainer: {
    overflowY: 'auto',
    // height: "500px",
    // maxHeight:"500px"
    height: 'auto',
  },
  timeline: {
    transform: 'rotate(-90deg)',
    marginLeft: 50,
  },
  timelineConnector: {
    height: '20px',
  },
  timelineContentContainer: {
    textAlign: 'left',
  },
  timelineContent: {
    display: 'inline-block',
    transform: 'rotate(90deg)',
    textAlign: 'center',
    minWidth: 50,
  },
  timelineIcon: {
    transform: 'rotate(-90deg)',
  },
});

export default function Tabledata(props) {
  const classes = useStyles();

  const [pageData, setPageData] = React.useState([
    { display: 'Age at menopause', value: '' },
    { display: 'Age of 1st Menstrual Cycle', value: '' },
    { display: 'Age of 1st live Birth', value: '' },
    { display: 'Number of live Births', value: '' },
    { display: 'Number of Pregnacies', value: '' },
    { display: 'Breastfeed', value: '' },
  ]);

  React.useEffect(() => {
    let newoBGYNObservation = [props.Data];

    if (
      newoBGYNObservation.length > 0 &&
      newoBGYNObservation[0] !== null &&
      newoBGYNObservation[0].component !== undefined
    ) {
      let periodsValue = '-';
      let lmp = '-';
      let ageAtMenopause = '-';
      let firstMenstrual = '-';
      let firstBirth = '-';
      let numOfBirth = '-';
      let numOfPregnancies = '-';
      let breastfeedValue = '-';
      let breastfeedHowLong = '-';

      let searchoBGY = newoBGYNObservation[0].component;

      let periodsValueSample = searchoBGY.find(
        val => val.code.display === 'having periods',
      );
      let lmpSample = searchoBGY.find(
        val => val.code.display === 'last menstrual period',
      );
      let ageAtMenopauseSample = searchoBGY.find(
        val => val.code.display === 'age at menopause',
      );
      let firstMenstrualSample = searchoBGY.find(
        val => val.code.display === 'age of first menstrual cycle',
      );
      let firstBirthSample = searchoBGY.find(
        val => val.code.display === 'age of first live birth',
      );
      let numOfBirthSample = searchoBGY.find(
        val => val.code.display === 'number of live births',
      );
      let numOfPregnanciesSample = searchoBGY.find(
        val => val.code.display === 'number of pregnancies',
      );
      let breastfeedValueSample = searchoBGY.find(
        val => val.code.display === 'did you Breastfeed?',
      );
      let breastfeedHowLongSample = searchoBGY.find(
        val => val.code.display === 'how long Breastfeed',
      );

      if (
        periodsValueSample != undefined &&
        periodsValueSample.valueCodeableConcept !== null
      ) {
        periodsValue = periodsValueSample.valueCodeableConcept[0].display;
      }
      if (lmpSample != undefined && lmpSample.valueCodeableConcept !== null) {
        lmp = lmpSample.valueCodeableConcept[0].display;
      }
      if (
        ageAtMenopauseSample != undefined &&
        ageAtMenopauseSample.valueQuantity !== null
      ) {
        ageAtMenopause = ageAtMenopauseSample.valueQuantity.value;
      }
      if (
        firstMenstrualSample != undefined &&
        firstMenstrualSample.valueQuantity !== null
      ) {
        firstMenstrual = firstMenstrualSample.valueQuantity.value;
      }
      if (
        firstBirthSample != undefined &&
        firstBirthSample.valueQuantity !== null
      ) {
        firstBirth = firstBirthSample.valueQuantity.value;
      }
      if (
        numOfBirthSample != undefined &&
        numOfBirthSample.valueQuantity !== null
      ) {
        numOfBirth = numOfBirthSample.valueQuantity.value;
      }
      if (
        numOfPregnanciesSample != undefined &&
        numOfPregnanciesSample.valueQuantity !== null
      ) {
        numOfPregnancies = numOfPregnanciesSample.valueQuantity.value;
      }
      if (
        breastfeedValueSample != undefined &&
        breastfeedValueSample.valueCodeableConcept !== null
      ) {
        breastfeedValue = breastfeedValueSample.valueCodeableConcept[0].display;
      }
      if (
        breastfeedHowLongSample != undefined &&
        breastfeedHowLongSample.valueQuantity !== null
      ) {
        breastfeedHowLong = breastfeedHowLongSample.valueQuantity.value;
      }

      setPageData([
        {
          display: periodsValue === 'Yes' ? 'Lmp' : 'Age at menopause',
          value: periodsValue === 'Yes' ? lmp : ageAtMenopause,
        },
        { display: 'Age of 1st Menstrual Cycle', value: firstMenstrual },
        { display: 'Age of 1st live Birth', value: firstBirth },
        { display: 'Number of live Births', value: numOfBirth },
        { display: 'Number of Pregnacies', value: numOfPregnancies },
        {
          display: 'Breastfeed',
          value:
            breastfeedValue === 'Yes'
              ? `Yes- for ${breastfeedHowLong} Years`
              : '-',
        },
      ]);
    }
  }, [props.Data]);

  let rows =
    (props.Data &&
      props.Data.component &&
      props.Data.component.length > 0 &&
      pageData) ||
    [];

  const defaultHeadCells = [
    {
      id: 'display',
      label: '',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}>{value}</span>;
      },
    },
    {
      id: 'value',
      label: '',
      render: ({ value }) => {
        return value;
      },
    },
  ];

  return (
    <>
      {rows && rows.length > 0 > 0 ? (
        <ViewTable
          rows={rows}
          headCells={defaultHeadCells}
          pagination={false}
          withoutHeader={true}
        />
      ) : (
        NO_RECORD
      )}
    </>
  );
}
