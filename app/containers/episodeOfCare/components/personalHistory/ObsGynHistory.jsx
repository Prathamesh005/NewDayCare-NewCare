import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import RadioButton from '../forms/RadioButton';
import Textfield from '../forms/TextField';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
  },
}));

function ObyGynHistory(props) {
  const { Option } = props;

  const classes = useStyles();
  const choices = [{ key: 'Yes', value: 'Yes' }, { key: 'No', value: 'No' }];

  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item xs md={1} className={classes.lebels}>
          Obs Gyn History
        </Grid>
        <Grid item xs md={1} className={classes.lebels}>
          Age At Menarche
        </Grid>

        <Grid item xs md={2}>
          <Textfield name="ageAtMenarche" placeholder="Enter Age" />
        </Grid>
        <Grid item xs md={1} />

        <Grid item xs={12} md={1} className={classes.lebels}>
          Having Periods?
        </Grid>
        <Grid item xs={12} md={2}>
          <RadioButton
            row={true}
            name="periodsValue"
            value={Option.values.periodsValue}
            options={choices}
            onChange={Option.handleChange}
          />
        </Grid>

        {Option.values.periodsValue === 'No' ? (
          <>
            <Grid item xs={12} md={1} className={classes.lebels}>
              Age At Menopause
            </Grid>
            <Grid item xs={12} md={2}>
              <Textfield name="ageAtMenopause" placeholder="Enter Age" />
            </Grid>
          </>
        ) : Option.values.periodsValue === 'Yes' ? (
          <>
            <Grid item xs={12} md={1} className={classes.lebels}>
              LMP
            </Grid>
            <Grid item xs={12} md={2}>
              <Textfield name="lmp" placeholder="Enter Value" />
            </Grid>
          </>
        ) : (
          ''
        )}
      </Grid>
    </Fragment>
  );
}

export default ObyGynHistory;
