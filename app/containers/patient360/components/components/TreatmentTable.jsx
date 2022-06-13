import { Box } from '@material-ui/core';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import ViewTable from '../../../../components/table/ViewTable';
import { EPISODE_DATE_FORMAT } from '../../../../utils/constants';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';

export default function TreatmentTable(props) {
  const { patientResourceId } = props;
  const defaultHeadCells = [
    {
      id: 'start', //backend data name
      label: 'Date',
      maxWidth: '200px',
      format: ({ value }) => {
        return value
          ? moment(value)
              .utc()
              .format(EPISODE_DATE_FORMAT)
          : '-';
      },
    },
    {
      id: 'regimen',
      label: 'Protocol',
      maxWidth: '200px',
    },
    {
      id: 'cycle',
      label: 'Cycle',
      maxWidth: '200px',
      align: 'right',
    },
    {
      id: 'resourceId',
      label: 'Link',
      align: 'left',
      render: ({ value }) => {
        return (
          value && (
            <Link
              to={`${
                ROUTES_CONSTANTS.TREATMENT_PLAN_CREATE
              }?patientID=${patientResourceId}&resourceId=${value}&type=view`}
              style={{
                cursor: 'pointer',
                color: 'rgba(0, 0, 0, 0.87)',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'blue',
                },
                width: '100%',
              }}
            >
              Go to plan
            </Link>
          )
        );
      },
    },
  ];

  const { rows, headCells = defaultHeadCells } = props;

  return (
    <Box width={1}>
      <ViewTable rows={rows} headCells={headCells} headBackground={'#F8F8F8'} />
    </Box>
  );
}
