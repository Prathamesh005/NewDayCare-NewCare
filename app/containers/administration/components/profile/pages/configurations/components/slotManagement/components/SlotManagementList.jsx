import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  EditIconSquareButton,
  PinkAddCircleButton,
  SquareIconButton,
  ViewTable,
} from '../../../../../../../../../components';
import { makeStyles } from '@material-ui/core';
import { ROUTES_CONSTANTS } from '../../../../../../../../app/routeConstants';
import { useHistory } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
// import { find, findKey } from 'lodash';

const daysObject = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday',
};
const Data = [
  {
    type: 'Oncowin Cancer Clinic, Aundh',
    days: [daysObject.Tue, daysObject.Thu, daysObject.Sat],
    timing: '10:30 - 13:30',
  },
  {
    type: 'Video Consultation',
    days: [daysObject.Sat, daysObject.Sun],
    timing: '10:30 - 13:30',
  },
  {
    type: 'Oncowin Cancer Clinic, Kothrud',
    days: [daysObject.Mon, daysObject.Tue, daysObject.Wed, daysObject.Thu],
    timing: '10:30 - 13:30',
  },
  {
    type: 'Video Consultation',
    days: [
      daysObject.Mon,
      daysObject.Tue,
      daysObject.Wed,
      daysObject.Thu,
      daysObject.Fri,
      daysObject.Sat,
      daysObject.Sun,
    ],
    timing: '10:30 - 13:30',
  },
];

const useStyles = makeStyles(theme => ({
  pinkText: {
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
    paddingRight: '0.8rem',
  },
  normalText: {
    fontWeight: 500,
    color: theme.palette.button.ghost.backgroundColor,
    paddingRight: '0.8rem',
  },
}));

function SlotManagementList() {
  const classes = useStyles();
  const history = useHistory();
  const defaultHeadCells = [
    {
      id: 'type',
      label: 'Hospital/Type of Appointment',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'days',
      label: 'Days',
      render: ({ value }) => {
        const isPresent = item => {
          const check = value.find(it => {
            return it === daysObject[item];
          });
          return check;
        };
        const str =
          Object.keys(daysObject) &&
          Object.keys(daysObject).map(item => {
            if (isPresent(item)) {
              return <span className={classes.pinkText}>{item}</span>;
            } else {
              return <span className={classes.normalText}>{item}</span>;
            }
          });
        return str;
      },
    },
    {
      id: 'timing',
      label: 'Timing',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'delete',
      label: '',
      maxWidth: '50px',
      width: '50px',

      render: ({ value, row }) => {
        return (
          <SquareIconButton
            // onClick={() =>{}}
            style={{ padding: 4 }}
          >
            <DeleteIcon style={{ fontSize: '1.2rem' }} />
          </SquareIconButton>
        );
      },
    },
    {
      id: 'edit',
      label: '',
      maxWidth: '50px',
      width: '50px',
      render: ({ column, value, row, index }) => {
        return (
          <SquareIconButton
            onClick={() => {
              history.push({
                pathname:
                  ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE_EDIT_SLOT,
                state: { row, index },
              });
            }}
            style={{ padding: 4 }}
          >
            <Edit style={{ fontSize: '1.2rem' }} />
          </SquareIconButton>
        );
      },
    },
  ];
  return (
    <>
      <ViewTable
        rows={Data}
        headCells={defaultHeadCells}
        headBackground={'#f0f0f0'}
        pagination={false}
      />
      <PinkAddCircleButton
        title={'Add New Slot'}
        onClick={() => {
          history.push(
            ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE_ADD_NEW_SLOT,
          );
        }}
        size="small"
        style={{
          width: 160,
          borderRadius: 50,
          position: 'fixed',
          bottom: 40,
          right: 40,
          fontWeight: 'normal',
        }}
      />
    </>
  );
}

export default SlotManagementList;
