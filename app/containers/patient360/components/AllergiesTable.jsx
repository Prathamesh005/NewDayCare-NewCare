/*eslint-disable*/
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ViewTable from '../../../components/table/ViewTable';
import { NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({}));

export default function AllergiesTable(props) {
  const classes = useStyles();
  let rows = props.Data || [];

  const defaultHeadCells = [
    {
      id: 'reaction',
      label: 'Symptom',
      minWidth: 100,
      render: ({ value }) => {
        return (
          <span style={{ fontWeight: 500 }}>
            {value[0].manifestation[0].display}
          </span>
        );
      },
    },
    {
      id: 'reaction',
      label: 'Trigger Factor',
      minWidth: 75,
      render: ({ value }) => {
        return value[0].substance && value[0].substance.display
          ? value[0].substance.display
          : '-';
      },
    },
  ];

  return (
    <>
      {rows && rows.length > 0 ? (
        <ViewTable
          rows={rows}
          headCells={defaultHeadCells}
          headBackground={'#F4F4F4'}
        />
      ) : (
        NO_RECORD
      )}
    </>
  );
}
