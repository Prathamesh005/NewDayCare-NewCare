import React, { useState, useEffect } from 'react';
import {
  EditIconSquareButton,
  PinkSwitch,
  SquareIconButton,
  ViewTable,
} from '../../../../../../../../../components';
import { Grid, Switch, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  SaveActionButton,
  OutlinedButton,
} from '../../../../../../../../../components/button';

const Data = [
  {
    type: 'Permission 1',
    access: true,
  },
  {
    type: 'Permission 2',
    access: false,
  },
  {
    type: 'Permission 3',
    access: false,
  },
  {
    type: 'Permission 4',
    access: true,
  },
];

const useStyles = makeStyles(theme => ({
  reset: {
    color: theme.palette.button.paginated.color,
  },
}));
function PermissionsList() {
  const classes = useStyles();
  const [storeData, setStoreData] = useState([]);
  useEffect(() => {
    setStoreData(Data);
  }, []);
  const handleChange = (event, value, row, index, column) => {
    let newDataArr = [...storeData];
    let newObj = newDataArr[index];
    newDataArr[index] = { ...newObj, access: !value };
    setStoreData(newDataArr);
  };
  const defaultHeadCells = [
    {
      id: 'type',
      label: 'Permission Type',
      maxWidth: '30%',
      width: '30%',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'access',
      label: 'Access',
      render: ({ value, row, index, column }) => {
        return (
          <PinkSwitch
            checked={value}
            onChange={e => handleChange(e, value, row, index, column)}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            size="small"
          />
        );
      },
    },
  ];
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <ViewTable
            rows={storeData && storeData}
            headCells={defaultHeadCells}
            headBackground={'#f0f0f0'}
            pagination={false}
          />
        </Grid>
        <Grid item xs={12}>
          <SaveActionButton
            // isLoading={saveLoader}
            // disabled={saveLoader}
            // onClick={() => props.handleSubmit()}
            style={{
              padding: 0,
              minWidth: '155px',
              fontSize: '0.9rem',
              marginRight: '2rem',
            }}
          >
            Save Changes
          </SaveActionButton>
          <OutlinedButton
            // isLoading={saveLoader}
            // disabled={saveLoader}
            // onClick={() => props.handleSubmit()}
            style={{
              padding: 0,
              minWidth: '155px',
              fontSize: '0.9rem',
            }}
          >
            Discard Changes
          </OutlinedButton>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'end' }}>
          <Typography variant="h4" className={classes.reset}>
            Reset To Default Permissions
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default PermissionsList;
