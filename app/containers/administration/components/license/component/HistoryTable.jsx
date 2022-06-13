import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { ViewTable } from '../../../../../components';
import {
  SquareIconButton,
  OutlinedChipsWithStatus,
} from '../../../../../components';
import InfoIcon from '@material-ui/icons/Info';
import { ROUTES_CONSTANTS } from '../../../../app/routeConstants';

const HistoryTable = () => {
  const [selectedLicense, setSelectedLicense] = useState('');
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    {
      location.state && setSelectedLicense(location.state.licenseData);
    }
  }, [location.state]);

  const handleInfo = row => {
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE_MANAGE,
      // search: `?licenseID=${query.licenseID}`,
      state: { licenseData: row },
    });
  };

  const Data = [
    {
      licenseName: '7 Days Free Trial',
      startDate: '12/05/2022',
      endDate: '19/05/2022',
      status: 'Active',
      id: '1',
      title: '7 Day free Trial',
      subheader:
        'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        {
          parameter: 'Parameter One',
          price: 100,
          parameterValidation: 'parameterOne',
        },
        {
          parameter: 'Parameter Two',
          price: 300,
          parameterValidation: 'parameterTwo',
        },
        {
          parameter: 'Parameter Three',
          price: 100,
          parameterValidation: 'parameterThree',
        },
        {
          parameter: 'Parameter Four',
          price: 100,
          parameterValidation: 'parameterFour',
        },
        {
          parameter: 'Parameter FIve',
          price: 400,
          parameterValidation: 'parameterFive',
        },
      ],
    },
    {
      licenseName: 'License Pack Title',
      startDate: '12/05/2022',
      endDate: '19/05/2022',
      status: 'Expired',
      id: '2',
      title: 'License Pack Title',
      subheader:
        'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        {
          parameter: 'Parameter One',
          price: 100,
          parameterValidation: 'parameterOne',
        },
        {
          parameter: 'Parameter Two',
          price: 300,
          parameterValidation: 'parameterTwo',
        },
        {
          parameter: 'Parameter Three',
          price: 100,
          parameterValidation: 'parameterThree',
        },
        {
          parameter: 'Parameter Four',
          price: 100,
          parameterValidation: 'parameterFour',
        },
        {
          parameter: 'Parameter FIve',
          price: 400,
          parameterValidation: 'parameterFive',
        },
      ],
    },
    {
      licenseName: 'License Pack Title 1',
      startDate: '12/05/2022',
      endDate: '19/05/2022',
      status: 'Suspend',
      id: '3',
      title: 'License Pack Title 1',
      subheader:
        'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        {
          parameter: 'Parameter One',
          price: 100,
          parameterValidation: 'parameterOne',
        },
        {
          parameter: 'Parameter Two',
          price: 300,
          parameterValidation: 'parameterTwo',
        },
        {
          parameter: 'Parameter Three',
          price: 100,
          parameterValidation: 'parameterThree',
        },
        {
          parameter: 'Parameter Four',
          price: 100,
          parameterValidation: 'parameterFour',
        },
        {
          parameter: 'Parameter FIve',
          price: 400,
          parameterValidation: 'parameterFive',
        },
      ],
    },
    {
      licenseName: 'License Pack Title 2',
      startDate: '12/05/2022',
      endDate: '19/05/2022',
      status: 'Active',
      id: '4',
      title: 'License Pack Title 2',
      subheader:
        'Exercitation ea culpa mollit irure est minim minim tempor dolore magna voluptate irure et esse ididunt ex dolor',
      price: '00.00',
      parameters: [
        {
          parameter: 'Parameter One',
          price: 100,
          parameterValidation: 'parameterOne',
        },
        {
          parameter: 'Parameter Two',
          price: 300,
          parameterValidation: 'parameterTwo',
        },
        {
          parameter: 'Parameter Three',
          price: 100,
          parameterValidation: 'parameterThree',
        },
        {
          parameter: 'Parameter Four',
          price: 100,
          parameterValidation: 'parameterFour',
        },
        {
          parameter: 'Parameter FIve',
          price: 400,
          parameterValidation: 'parameterFive',
        },
      ],
    },
  ];

  const defaultHeadCells = [
    {
      id: 'licenseName',
      label: 'License',
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'startDate',
      label: 'Start Date',
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'endDate',
      label: 'End Date',
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'status',
      label: 'Status',
      render: ({ value }) => {
        if (value === 'Active') {
          return (
            <OutlinedChipsWithStatus status={'warning'} statusText={value} />
          );
        } else {
          return (
            <OutlinedChipsWithStatus status={'default'} statusText={value} />
          );
        }
      },
    },
    {
      id: 'status',
      label: '',
      maxWidth: '50px',
      width: '50px',

      render: ({ value, row }) => {
        console.log(value);
        return (
          <SquareIconButton
            style={{ padding: 4 }}
            onClick={() => {
              value === 'Active' ? handleInfo(row) : '';
            }}
          >
            <InfoIcon style={{ fontSize: '1.2rem' }} />
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
    </>
  );
};

export default HistoryTable;
