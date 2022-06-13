/*eslint-disable*/
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import ViewTable from '../../../components/table/ViewTable';

const useStyles = makeStyles({
  Title: {
    margin: '20px 0px',
    fontWeight: 'bold',
  },
});

export default function Tabledata(props) {
  const classes = useStyles();

  const [generalExam, setgeneralExam] = useState([
    { display: 'Icterus', value: '', genstatus: '' },
    { display: 'Cyanosis', value: '', genstatus: '' },
    { display: 'Pallor', value: '', genstatus: '' },
    { display: 'OEDEMA', value: '', genstatus: '' },
    { display: 'Clubbing', value: '', genstatus: '' },
    { display: 'Lymphadenopathy', value: '', genstatus: '' },
  ]);
  const [systemicExam, setsystemicExam] = useState([
    { display: 'CNS', value: '' },
    { display: 'CVS', value: '' },
    { display: 'Respiratory', value: '' },
    { display: 'Per Abdomen', value: '' },
  ]);
  const [localExam, setlocalExam] = useState([
    { display: 'Inspection', value: '' },
    { display: 'Palpation', value: '' },
  ]);

  React.useEffect(() => {
    // console.log("props",props)

    const {
      systemicExaminations,
      generalExaminations,
      inspection,
      palpation,
    } = props.Data;

    let icterus = '';
    let cyanosis = '';
    let pallor = '';
    let oedema = '';
    let clubbing = '';
    let lymphadenopathy = '';

    let Inspection = '';
    let Palpation = '';

    let cns = '';
    let cvs = '';
    let respiratory = '';
    let perAbdomen = '';

    if (inspection != null) {
      Inspection = inspection.valueString;
    }
    if (palpation != null) {
      Palpation = palpation.valueString;
    }

    if (systemicExaminations.length > 0) {
      cns =
        systemicExaminations.find(val => val.resourceName === 'CNS') !=
        undefined
          ? systemicExaminations.find(val => val.resourceName === 'CNS')
              .valueString
          : '';
      cvs =
        systemicExaminations.find(val => val.resourceName === 'CVS') !=
        undefined
          ? systemicExaminations.find(val => val.resourceName === 'CVS')
              .valueString
          : '';
      respiratory =
        systemicExaminations.find(val => val.resourceName === 'Respiratory') !=
        undefined
          ? systemicExaminations.find(val => val.resourceName === 'Respiratory')
              .valueString
          : '';
      perAbdomen =
        systemicExaminations.find(val => val.resourceName === 'PerAbdomen') !=
        undefined
          ? systemicExaminations.find(val => val.resourceName === 'PerAbdomen')
              .valueString
          : '';
    }

    if (generalExaminations.length > 0) {
      if (
        generalExaminations.find(
          val => val.valueCodeableConcept.code === 'icterus',
        ) != undefined
      ) {
        icterus = generalExaminations.find(
          val => val.valueCodeableConcept.code === 'icterus',
        ).description;
      }
      if (
        generalExaminations.find(
          val => val.valueCodeableConcept.code === 'cyanosis',
        ) != undefined
      ) {
        cyanosis = generalExaminations.find(
          val => val.valueCodeableConcept.code === 'cyanosis',
        ).description;
      }
      if (
        generalExaminations.find(
          val => val.valueCodeableConcept.code === 'pallor',
        ) != undefined
      ) {
        pallor = generalExaminations.find(
          val => val.valueCodeableConcept.code === 'pallor',
        ).description;
      }
      if (
        generalExaminations.find(
          val => val.valueCodeableConcept.code === 'oedema',
        ) != undefined
      ) {
        oedema = generalExaminations.find(
          val => val.valueCodeableConcept.code === 'oedema',
        ).description;
      }
      if (
        generalExaminations.find(
          val => val.valueCodeableConcept.code === 'clubbing',
        ) != undefined
      ) {
        clubbing = generalExaminations.find(
          val => val.valueCodeableConcept.code === 'clubbing',
        ).description;
      }
      if (
        generalExaminations.find(
          val => val.valueCodeableConcept.code === 'lymphadenopathy',
        ) != undefined
      ) {
        lymphadenopathy = generalExaminations.find(
          val => val.valueCodeableConcept.code === 'lymphadenopathy',
        ).description;
      }
    }

    setgeneralExam([
      {
        display: 'Icterus',
        value: icterus !== null && icterus !== '' ? icterus : '-',
        genstatus: icterus !== '' ? 'Yes' : 'No',
      },
      {
        display: 'Cyanosis',
        value: cyanosis !== null && cyanosis !== '' ? cyanosis : '-',
        genstatus: cyanosis !== '' ? 'Yes' : 'No',
      },
      {
        display: 'Pallor',
        value: pallor !== null && pallor !== '' ? pallor : '-',
        genstatus: pallor !== '' ? 'Yes' : 'No',
      },
      {
        display: 'OEDEMA',
        value: oedema !== null && oedema !== '' ? oedema : '-',
        genstatus: oedema !== '' ? 'Yes' : 'No',
      },
      {
        display: 'Clubbing',
        value: clubbing !== null && clubbing !== '' ? clubbing : '-',
        genstatus: clubbing !== '' ? 'Yes' : 'No',
      },
      {
        display: 'Lymphadenopathy',
        value:
          lymphadenopathy !== null && lymphadenopathy !== ''
            ? lymphadenopathy
            : '-',
        genstatus: lymphadenopathy !== '' ? 'Yes' : 'No',
      },
    ]);

    setsystemicExam([
      { display: 'CNS', value: cns !== '' && cns !== null ? cns : '-' },
      { display: 'CVS', value: cvs !== '' && cvs !== null ? cvs : '-' },
      {
        display: 'Respiratory',
        value: respiratory !== '' && respiratory !== null ? respiratory : '-',
      },
      {
        display: 'Per Abdomen',
        value: perAbdomen !== '' && perAbdomen !== null ? perAbdomen : '-',
      },
    ]);

    setlocalExam([
      {
        display: 'Inspection',
        value: Inspection !== '' && Inspection !== null ? Inspection : '-',
      },
      {
        display: 'Palpation',
        value: Palpation !== '' && Palpation !== null ? Palpation : '-',
      },
    ]);
  }, [props.Data]);

  let generalRows = generalExam || [];
  const generalExamHeadCells = [
    {
      id: 'display',
      label: '',
      width: 200,
      render: ({ value }) => {
        return <span style={{ fontWeight: 600 }}>{value}</span>;
      },
    },
    {
      id: 'genstatus',
      label: '',
      render: ({ value }) => {
        return value;
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

  let systemicRows = systemicExam || [];
  const systemicExamHeadCells = [
    {
      id: 'display',
      label: '',
      width: 200,
      render: ({ value }) => {
        return <span style={{ fontWeight: 600 }}>{value}</span>;
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

  let localRows = localExam || [];
  const localExamHeadCells = [
    {
      id: 'display',
      label: '',
      width: 200,
      render: ({ value }) => {
        return <span style={{ fontWeight: 600 }}>{value}</span>;
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
    <div className={classes.root}>
      <Typography className={classes.Title} gutterBottom>
        General Examination
      </Typography>

      {generalRows && generalRows.length > 0 && (
        <ViewTable
          rows={generalRows}
          headCells={generalExamHeadCells}
          pagination={false}
          withoutHeader={true}
        />
      )}
      <Typography className={classes.Title} gutterBottom>
        Systemic Examination
      </Typography>

      {systemicRows && systemicRows.length > 0 && (
        <ViewTable
          rows={systemicRows}
          headCells={systemicExamHeadCells}
          pagination={false}
          withoutHeader={true}
        />
      )}

      <Typography className={classes.Title} gutterBottom>
        Local Examination
      </Typography>

      {localRows && localRows.length > 0 && (
        <ViewTable
          rows={localRows}
          headCells={localExamHeadCells}
          pagination={false}
          withoutHeader={true}
        />
      )}
    </div>
  );
}
