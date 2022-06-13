import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import {
  PrimaryPinkButton,
  SemiBoldText,
  WhitePaper,
} from '../../../../../components';
import { useHistory } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../../../app/routeConstants';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function License() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Fragment>
      <WhitePaper className={classes.paper}>
        <SemiBoldText variant="h3" style={{ fontSize: '1.1rem' }}>
          {'License Not Found'}
        </SemiBoldText>
        <Typography variant="h3" style={{ opacity: 0.8 }}>
          {'No License is assigned to this clinic/Hospital'}
        </Typography>

        <PrimaryPinkButton
          variant="contained"
          style={{ marginTop: 25 }}
          onClick={() => {
            history.push(ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_LICENSE);
          }}
        >
          {'Assign a License'}
        </PrimaryPinkButton>
      </WhitePaper>
    </Fragment>
  );
}
