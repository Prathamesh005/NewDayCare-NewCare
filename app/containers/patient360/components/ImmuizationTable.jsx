/*eslint-disable*/
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React from 'react';
import ViewTable from '../../../components/table/ViewTable';
import { EPISODE_DATE_FORMAT, NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({}));

export default function ComorbidTable(props) {
  const classes = useStyles();

  let rows = props.Data || [];
  const defaultHeadCells = [
    {
      id: 'vaccineCode',
      label: 'Immunization',
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
      id: 'occurrence',
      label: 'Date',
      maxWidth: 75,
      format: ({ value }) => {
        return value
          ? moment(value)
              .utc()
              .format(EPISODE_DATE_FORMAT)
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
