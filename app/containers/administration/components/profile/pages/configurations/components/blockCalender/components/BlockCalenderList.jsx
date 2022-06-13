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

const Data = [
  {
    reason: 'Family Time',
    start: '03 March - 15:00',
    end: '05 March - 11:30',
    duration: '3 Days',
  },
  {
    reason: 'Meeting',
    start: '8 March',
    end: '8 March',
    duration: 'All Day',
  },
  {
    reason: 'Family Time',
    start: '03 March - 15:00',
    end: '05 March - 11:30',
    duration: '3 Days',
  },
  {
    reason: 'Meeting',
    start: '8 March',
    end: '8 March',
    duration: 'All Day',
  },
];
const useStyle = makeStyles(theme => ({
  cellStyle: {
    fontWeight: 500,
    fontSize: '1rem',
  },
}));

function BlockCalenderList() {
  const classes = useStyle();
  const history = useHistory();
  const defaultHeadCells = [
    {
      id: 'reason',
      label: 'Reason',
      maxWidth: '35%',
      width: '35%',
      render: ({ value }) => {
        return <span className={classes.cellStyle}> {value}</span>;
      },
    },
    {
      id: 'start',
      label: 'Start',
      render: ({ value }) => {
        return <span className={classes.cellStyle}> {value}</span>;
      },
    },
    {
      id: 'end',
      label: 'End',
      render: ({ value }) => {
        return <span className={classes.cellStyle}> {value}</span>;
      },
    },
    {
      id: 'duration',
      label: 'Duration',
      render: ({ value }) => {
        return <span className={classes.cellStyle}> {value}</span>;
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
      render: ({ value, row, index }) => {
        return (
          <SquareIconButton
            onClick={() => {
              history.push({
                pathname:
                  ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE_EDIT_BLOCK_CALENDER,
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
        title={'Add New Entry'}
        onClick={() =>
          history.push(
            ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE_ADD_BLOCK_CALENDER,
          )
        }
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

export default BlockCalenderList;
