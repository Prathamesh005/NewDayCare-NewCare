import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NO_RECORD } from '../../../../utils/constants';
import CardDemo from '../SearchpatientCard';

const useStyles = makeStyles({
  gridRoot: {
    // width: "100vw",
    margin: '0 auto',
    height: '100%',
    overflowY: 'auto',
  },
});

function RightSidebarRelatedCases(props) {
  const classes = useStyles();
  let Data = props.relatedCasesData && props.relatedCasesData.cancerPatients;

  return (
    <div className={classes.gridRoot}>
      <Grid container spacing={0}>
        {Data && Data
          ? Data.map((x, index) => {
              return (
                <Grid item md={12} key={(index + 1).toString()}>
                  <CardDemo
                    display={x.patient.display}
                    first={x.patient.first}
                    last={x.patient.last}
                    age={x.patient.age}
                    gender={x.patient.gender}
                    resourceId={x.patient.resourceId}
                    address={x.patient.address}
                    image={x.patient.image}
                    // open={data.isDrawerOpen}

                    disease={
                      x.primaryCancerCondition.code != null
                        ? x.primaryCancerCondition.code.display
                        : null
                    }
                  />
                </Grid>
              );
            })
          : NO_RECORD}
      </Grid>
    </div>
  );
}

const mapStateToProps = state => state.patient360;

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(RightSidebarRelatedCases);
