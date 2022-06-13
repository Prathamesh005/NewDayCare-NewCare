/*eslint-disable*/
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import ViewTable from '../../../components/table/ViewTable';
import { NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({}));

export default function ComorbidTable(props) {
  const classes = useStyles();

  let rows = props.Data || [];
  const defaultHeadCells = [
    {
      id: 'code',
      label: 'Conditions',
      maxWidth: 100,
      render: ({ value }) => {
        return value && value.display ? (
          <span style={{ fontWeight: 500 }}>{value.display}</span>
        ) : (
          '-'
        );
      },
    },
    {
      id: 'note',
      label: 'Value',
      maxWidth: 75,
      render: ({ value }) => {
        return value || '-';
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
