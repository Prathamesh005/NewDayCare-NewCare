/*eslint-disable*/
import moment from 'moment';
import React from 'react';
import ViewTable from '../../../components/table/ViewTable';
import { EPISODE_DATE_FORMAT, NO_RECORD } from '../../../utils/constants';

export default function ClinicalComplaintTable(props) {
  let rows = props.Data || [];
  const defaultHeadCells = [
    {
      id: 'effectiveDateTime',
      label: 'Date',
      minWidth: 120,
      render: ({ value }) => {
        return value && moment(value).format('YYYY') !== '0001' ? (
          <span style={{ fontSize: '1rem' }}>
            {moment(value)
              .utc()
              .format(EPISODE_DATE_FORMAT)}
          </span>
        ) : (
          '-'
        );
      },
    },
    {
      id: 'clinicalComplains',
      label: 'Reason For Visit',
      minWidth: 120,
      render: ({ value }) => {
        return value[0];
      },
    },
  ];

  return rows && rows.length > 0 ? (
    <ViewTable
      rows={rows}
      headCells={defaultHeadCells}
      headBackground={'#F8F8F8'}
    />
  ) : (
    NO_RECORD
  );
}
