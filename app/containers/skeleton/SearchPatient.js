import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';


function SearchPatientSkeletone(props) {

  return (
    <Grid container direction="row" spacing={2}>

      {[...Array(12)].map((item, index) => (
        <Grid item sm={3} xs={12} key={(index + 1).toString()} >
          <Box key={index} width={'100%'} style={{ margin: '0px 10px 0px 10px' }}>
            <Skeleton variant="rect" width={'100%'} height={118} />
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          </Box>
        </Grid >
      ))}

    </Grid>
  );
}

export default function SearchPatient() {
  return (
    <Box overflow="hidden">
      <SearchPatientSkeletone />
    </Box>
  );
}
