/*eslint-disable*/
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ViewTable from '../../../components/table/ViewTable';
import { EPISODE_DATE_FORMAT } from '../../../utils/constants';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';

const useStyles = makeStyles({
  td: {
    // border:'2px solid',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
      color: 'blue',
    },
  },
});

export default function Tabledata(props) {
  const classes = useStyles();

  let history = useHistory();
  const gotoAppointmentSummary = row => {
    let appointmentID = row.appointment[0].resourceId;
    let patientID =
      row.cancerPatientResourceReference &&
      row.cancerPatientResourceReference.resourceId;

    // debugger

    history.push({
      pathname: `${
        ROUTES_CONSTANTS.APPOINTMENT_SUMMARY
      }/${patientID}/${appointmentID}`,
      state: {
        type: 'detailed',
      },
    });
  };

  let rows = props.Data || [];
  const defaultHeadCells = [
    {
      id: 'startDate',
      label: 'Date',
      format: ({ value }) => {
        return value
          ? moment(value)
              .utc()
              .format(EPISODE_DATE_FORMAT)
          : '-';
      },
    },
    {
      id: 'resourceId',
      label: 'Appointment Summary',
      render: ({ value, row }) => {
        return (
          <span
            onClick={() => gotoAppointmentSummary(row)}
            className={classes.td}
          >
            Go To Summary{' '}
          </span>
        );
      },
    },
  ];

  return (
    <>
      {rows && rows.length > 0 ? (
        <ViewTable
          rows={rows}
          headCells={defaultHeadCells}
          headBackground={'#F8F8F8'}
        />
      ) : (
        NO_RECORD
      )}
    </>
  );
}
