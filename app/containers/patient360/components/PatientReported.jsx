import { Card, CardContent, CardHeader } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { WhiteIconButton } from '../../../components/button';
import { MessageComponent } from '../../../components';
import ViewTable from '../../../components/table/ViewTable';
import expandIcon from '../../../images/assets/expandIcon.png';
import { API_DATE_FORMAT, NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({
  // list: {
  //   width: "100vw"
  // },
  // fullList: {
  //   width: "auto",

  // },
  card: {
    borderRadius: '0px',
    minHeight: 500,
    // height:450
    boxShadow: '0px 2px 4px #00000029',
    borderRadius: '5px',
  },
  headerCard: {
    padding: '0px !important',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 15,
  },
  cardAction: {
    margin: '0px 0px !important',
  },

  td: {
    fontSize: 14,
    fontWeight: 500,
  },
  icon1: {
    height: 20,
    width: 20,
  },
  icon2: {
    height: 20,
    width: 20,
  },
  listIem: {
    padding: 0,
    width: 45,
  },
  listItemIcon: {
    minWidth: 0,
  },
  listItemText: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'center',
  },
}));

function PatientReportedTable(props) {
  const classes = useStyles();
  const [state, setState] = React.useState([]);
  const [Data, setOriginalData] = React.useState(null);
  const [TableData, setTableData] = React.useState(null);

  const [localData, setLocalData] = React.useState([
    {
      date: moment(new Date())
        .subtract(6, 'day')
        .format(API_DATE_FORMAT),
    },
    {
      date: moment(new Date())
        .subtract(5, 'day')
        .format(API_DATE_FORMAT),
    },
    {
      date: moment(new Date())
        .subtract(4, 'day')
        .format(API_DATE_FORMAT),
    },
    {
      date: moment(new Date())
        .subtract(3, 'day')
        .format(API_DATE_FORMAT),
    },
    {
      date: moment(new Date())
        .subtract(2, 'day')
        .format(API_DATE_FORMAT),
    },
    {
      date: moment(new Date())
        .subtract(1, 'day')
        .format(API_DATE_FORMAT),
    },
    { date: moment(new Date()).format(API_DATE_FORMAT) },
  ]);

  function getHexaCode(colour) {
    if (colour && colour) {
      return '#' + colour.split(colour[3])[2].toString();
    }
  }
  const findUpdatedSymtoms = (prevSymtoms, symtomsName) => {
    let findValue = prevSymtoms.find(v => v.code === symtomsName);
    if (findValue !== undefined) {
      return getHexaCode(findValue.colourCode);
    } else {
      ('#ECECEC');
    }
  };

  const symtomsFunc = (disease, symtoms) => {
    let colorCode = '#ECECEC';

    for (let i = 0; i < symtoms.length; i++) {
      if (symtoms[i].code === 'Nausea_Severity' && disease === 'Nausea') {
        colorCode = findUpdatedSymtoms(symtoms, 'Nausea_Severity');
      } else if (
        symtoms[i].code === 'Vomiting_Severity' &&
        disease === 'Vomiting'
      ) {
        colorCode = findUpdatedSymtoms(symtoms, 'Vomiting_Severity');
      } else if (
        symtoms[i].code === 'Diarrhea_Frequency' &&
        disease === 'Diarrhea'
      ) {
        colorCode = findUpdatedSymtoms(symtoms, 'Diarrhea_Frequency');
      } else if (
        symtoms[i].code === 'Fever_Temperature' &&
        disease === 'Fever'
      ) {
        colorCode = findUpdatedSymtoms(symtoms, 'Fever_Temperature');
      } else if (symtoms[i].code === 'Pain_Severity' && disease === 'Pain') {
        colorCode = findUpdatedSymtoms(symtoms, 'Pain_Severity');
      } else if (
        symtoms[i].code === 'Mucositis_Severity' &&
        disease === 'Mucositis'
      ) {
        colorCode = findUpdatedSymtoms(symtoms, 'Mucositis_Severity');
      } else if (
        symtoms[i].code === 'Shortness_Of_Breath_Severity' &&
        disease === 'Shortness_Of_Breath'
      ) {
        colorCode = findUpdatedSymtoms(symtoms, 'Shortness_Of_Breath_Severity');
      }
    }
    return colorCode;
  };

  React.useEffect(() => {
    let propsData =
      props &&
      props.patientOutcomesData &&
      props.patientOutcomesData.cancerPatientReportedSymptom &&
      props.patientOutcomesData.cancerPatientReportedSymptom
        ? props.patientOutcomesData.cancerPatientReportedSymptom
        : null;
    let arr = [];

    if (propsData != null) {
      propsData.forEach(val => {
        return localData.map(val1 => {
          let backendDate = moment(val.patientReportedSymptom.date)
            .utc()
            .format(API_DATE_FORMAT);

          if (backendDate === val1.date) {
            arr.push({
              Newdate: backendDate,
              symptoms: val.patientReportedSymptom.reportedSymptom,
            });
          }
        });
      });
    }

    function collateArray(arr) {
      var outputObj = {};
      var result = [];
      for (var counter = 0; counter < arr.length; counter++) {
        var obj = arr[counter];
        var id_0value = obj['Newdate'];
        if (!outputObj[id_0value]) {
          outputObj[id_0value] = [];
        }
        outputObj[id_0value].push(obj);
      }
      const opt = Object.values(outputObj);
      opt.map(item => {
        const arr = [];
        item.map(i => i.symptoms.forEach(it => arr.push(it)));
        result.push({
          Newdate: item[0]['Newdate'],
          symptoms: arr,
        });
      });
      return result;
    }

    let result = collateArray(arr);
    setState(result);
  }, [props && props.patientOutcomesData]);

  React.useEffect(() => {
    let newArr = [];

    if (state && state.length > 0 && state) {
      for (let i = 0; i < localData.length; i++) {
        let j = 0;
        while (j < state.length) {
          if (localData[i]['date'] === state[j]['Newdate']) {
            newArr.push({
              ...localData[i],
              symptoms: {
                Nausea: symtomsFunc('Nausea', state[j]['symptoms']),
                Vomiting: symtomsFunc('Vomiting', state[j]['symptoms']),
                Diarrhea: symtomsFunc('Diarrhea', state[j]['symptoms']),
                Fever: symtomsFunc('Fever', state[j]['symptoms']),
                Pain: symtomsFunc('Pain', state[j]['symptoms']),
                Mucositis: symtomsFunc('Mucositis', state[j]['symptoms']),
                Shortness_Of_Breath: symtomsFunc(
                  'Shortness_Of_Breath',
                  state[j]['symptoms'],
                ),
              },
            });
            break;
          } else if (j === state.length - 1) {
            newArr.push({ ...localData[i], symptoms: null });
            break;
          } else {
            j++;
          }
        }
      }
    }
    setOriginalData(newArr);
  }, [state]);

  React.useEffect(() => {
    const newArr2 = [
      { a: 'Nausea' },
      { a: 'Vomiting' },
      { a: 'Diarrhea' },
      { a: 'Fever' },
      { a: 'Pain' },
      { a: 'Mucositis' },
      { a: 'Shortness of Breath' },
    ];
    if (Data != null && Data) {
      for (let i = 0; i < Data.length; i++) {
        // console.log("Data[i]",Data[i]);

        if (Data[i]['symptoms'] === undefined || Data[i]['symptoms'] === null) {
          newArr2[0] = { ...newArr2[0], ['a' + i]: '#ECECEC' };
          newArr2[1] = { ...newArr2[1], ['a' + i]: '#ECECEC' };
          newArr2[2] = { ...newArr2[2], ['a' + i]: '#ECECEC' };
          newArr2[3] = { ...newArr2[3], ['a' + i]: '#ECECEC' };
          newArr2[4] = { ...newArr2[4], ['a' + i]: '#ECECEC' };
          newArr2[5] = { ...newArr2[5], ['a' + i]: '#ECECEC' };
          newArr2[6] = { ...newArr2[6], ['a' + i]: '#ECECEC' };
        } else {
          newArr2[0] = {
            ...newArr2[0],
            ['a' + i]: Data[i]['symptoms']['Nausea'],
          };
          newArr2[1] = {
            ...newArr2[1],
            ['a' + i]: Data[i]['symptoms']['Vomiting'],
          };
          newArr2[2] = {
            ...newArr2[2],
            ['a' + i]: Data[i]['symptoms']['Diarrhea'],
          };
          newArr2[3] = {
            ...newArr2[3],
            ['a' + i]: Data[i]['symptoms']['Fever'],
          };
          newArr2[4] = {
            ...newArr2[4],
            ['a' + i]: Data[i]['symptoms']['Pain'],
          };
          newArr2[5] = {
            ...newArr2[5],
            ['a' + i]: Data[i]['symptoms']['Mucositis'],
          };
          newArr2[6] = {
            ...newArr2[6],
            ['a' + i]: Data[i]['symptoms']['Shortness_Of_Breath'],
          };
        }
      }
    }
    setTableData(newArr2);
  }, [Data]);

  let rows = TableData || [];
  const defaultHeadCells = [
    {
      id: 'a',
      label: moment(new Date()).format('MMMM'),
      minWidth: 90,
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'a0',
      label: moment(new Date())
        .subtract(6, 'day')
        .format('DD'),

      render: ({ value }) => {
        return (
          <FiberManualRecordIcon
            style={{
              color: `${value ? value : '#ECECEC'}`,
            }}
            className={classes.icon1}
          />
        );
      },
    },
    {
      id: 'a1',
      label: moment(new Date())
        .subtract(5, 'day')
        .format('DD'),

      render: ({ value }) => {
        return (
          <FiberManualRecordIcon
            style={{
              color: `${value ? value : '#ECECEC'}`,
            }}
            className={classes.icon1}
          />
        );
      },
    },
    {
      id: 'a2',
      label: moment(new Date())
        .subtract(4, 'day')
        .format('DD'),

      render: ({ value }) => {
        return (
          <FiberManualRecordIcon
            style={{
              color: `${value ? value : '#ECECEC'}`,
            }}
            className={classes.icon1}
          />
        );
      },
    },
    {
      id: 'a3',
      label: moment(new Date())
        .subtract(3, 'day')
        .format('DD'),

      render: ({ value }) => {
        return (
          <FiberManualRecordIcon
            style={{
              color: `${value ? value : '#ECECEC'}`,
            }}
            className={classes.icon1}
          />
        );
      },
    },
    {
      id: 'a4',
      label: moment(new Date())
        .subtract(2, 'day')
        .format('DD'),

      render: ({ value }) => {
        return (
          <FiberManualRecordIcon
            style={{
              color: `${value ? value : '#ECECEC'}`,
            }}
            className={classes.icon1}
          />
        );
      },
    },
    {
      id: 'a5',
      label: moment(new Date())
        .subtract(1, 'day')
        .format('DD'),

      render: ({ value }) => {
        return (
          <FiberManualRecordIcon
            style={{
              color: `${value ? value : '#ECECEC'}`,
            }}
            className={classes.icon1}
          />
        );
      },
    },
    {
      id: 'a6',
      label: moment(new Date()).format('DD'),

      render: ({ value }) => {
        return (
          <FiberManualRecordIcon
            style={{
              color: `${value ? value : '#ECECEC'}`,
            }}
            className={classes.icon1}
          />
        );
      },
    },
  ];

  return (
    <>
      <Card className={classes.card} elevation={0}>
        <CardHeader
          action={
            <WhiteIconButton>
              <img src={expandIcon} alt="" height="13px" />
            </WhiteIconButton>
          }
          title="Patient's Reported Outcomes"
          // subheader="September 14, 2016"
          className={classes.headerCard}
          classes={{
            title: classes.cardTitle,
            action: classes.cardAction,
            subheader: classes.cardSubheader,
          }}
        />
        <Divider />
        {rows && rows.length > 0 ? (
          <CardContent>
            <ViewTable
              rows={rows}
              headCells={defaultHeadCells}
              pagination={false}
              headBackground={'#ffffff'}
              footer={
                <List style={{ display: 'flex', paddingTop: 10 }}>
                  {[
                    { name: 'NA', color: '#ECECEC' },
                    { name: '02', color: '#75C378' },
                    { name: '04', color: '#EDEA65' },
                    { name: '06', color: '#ECB036' },
                    { name: '08', color: '#E47125' },
                    { name: '10', color: '#E04B3E' },
                  ].map(value => {
                    return (
                      <ListItem key={value.name} className={classes.listIem}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <FiberManualRecordIcon
                            className={classes.icon2}
                            style={{ color: `${value.color}` }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          className={classes.listItemText}
                          primary={
                            <div
                              style={{
                                fontWeight: 400,
                                fontSize: '0.8rem',
                                color: '#373737',
                              }}
                            >
                              {value.name}
                            </div>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              }
            />
          </CardContent>
        ) : (
          NO_RECORD
        )}
      </Card>
    </>
  );
}

const mapStateToProps = state => state.patient360;

const withConnect = connect(mapStateToProps);
export default compose(
  withConnect,
  MessageComponent,
)(PatientReportedTable);
