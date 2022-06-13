import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import SkeletonBilling from '../../containers/billing/components/Skeleton';
import NoRecord from '../elements/NoRecordPage';
import SelectDateWrapper from '../selectDateWrapper';
import { BoxSkeleton } from '../skeleton';
import ViewTable from '../table/ViewTable';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(3),
    minWidth: 150,
  },
  iconOpen: {
    transform: 'none',
  },
  alignment: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: '1rem',
  },
  amount: {
    color: theme.palette.primary.button,
    '& .MuiTypography-root': {
      fontWeight: 'bold',
      fontSize: '18px',
    },
  },
  eachCard: {
    // border: "1px solid #cacaca",
    // padding: "1rem"
  },
  cardName: {
    fontWeight: 'bold',
    color: '#404040',
  },
  cardContent: {
    padding: '1.2rem 1.5rem',
    backgroundColor: theme.palette.secondary.extraLight,
  },

  mainContainer: {
    // border: '2px solid #eaeaea',
    height: '78vh',
    backgroundColor: '#f0f0f0',
  },
  tableGroup: {
    margin: '0.7rem',
    height: '60%',
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: 5,
  },
}));

function ReportWrapper(props) {
  const classes = useStyles();
  const { cardNames, loader, selectedDate, rows, defaultHeadCells } = props;

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={12}>
        <Paper variant="outlined" square className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item container xs={12}>
              <Grid item xs={11}>
                <SelectDateWrapper selectedDate={selectedDate} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {!loader ? (
                <Grid container spacing={3}>
                  {cardNames &&
                    cardNames.map((item, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={index.toString()}
                        className={classes.eachCard}
                      >
                        <Paper variant="outlined">
                          <Grid container className={classes.cardContent}>
                            <Grid item xs={12}>
                              <Typography
                                variant="h4"
                                className={classes.cardName}
                              >
                                {item.card}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item xs className={classes.amount}>
                                  <Typography variant="h3">
                                    {item.amount}{' '}
                                    {item && item.noOfTransac && (
                                      <span
                                        style={{
                                          color: 'black',
                                          fontSize: '0.8rem',
                                          fontWeight: 400,
                                        }}
                                      >{`(${
                                        item.noOfTransac
                                      } Transactions)`}</span>
                                    )}
                                  </Typography>
                                </Grid>
                                {/* <Grid item xs ></Grid> */}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
              ) : (
                <Grid container spacing={3}>
                  {[1, 2, 3, 4].map((item, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={3}
                      key={index.toString()}
                      className={classes.eachCard}
                    >
                      <Paper variant="outlined">
                        <BoxSkeleton height="100px" animation="wave" />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.tableGroup}>
        {!loader ? (
          rows && rows.length > 0 ? (
            <ViewTable
              rows={rows}
              headCells={defaultHeadCells}
              headBackground={'#f0f0f0'}
              pagination={false}
            />
          ) : (
            <NoRecord />
          )
        ) : (
          <SkeletonBilling count={6} />
        )}
      </Grid>
    </Grid>
  );
}

export default ReportWrapper;
