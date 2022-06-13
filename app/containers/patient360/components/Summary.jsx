import { Card, CardHeader } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({
  card: {
    borderRadius: '5px',
    maxHeight: 400,
    height: 400,
    background: theme.palette.card.main,
    boxShadow: '0px 2px 4px #00000029',
  },
  card1: {
    borderRadius: '5px',
    maxHeight: 650,
    height: 650,
    background: theme.palette.card.main,
    boxShadow: '0px 2px 4px #00000029',
  },
  headerCard: {
    padding: '0px !important',
    height: 40,
    background: 'white',
    borderBottom: '3px solid #eeeeee',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 15,
  },
  cardAction: {
    margin: '0px 0px !important',
  },

  List: {
    width: '100%',

    padding: 0,
    margin: '0 !important',
    // marginBottom:20
  },
  listIem1: {
    padding: 0,
    marginBottom: 20,
    backgroundColor: theme.palette.card.main,
    maxHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    // overflow:"hidden"
  },
  listIem12: {
    padding: 0,
    marginBottom: 20,
    backgroundColor: theme.palette.card.main,
    maxHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    // overflow:"hidden"
  },
  listIem2: {
    padding: 0,
    marginBottom: 20,
    backgroundColor: theme.palette.card.main,
    maxHeight: 150,
    display: 'flex',
    flexDirection: 'column',
    // overflow:"hidden"
  },
  listItemTextPrimary: {
    fontSize: 16,
    color: theme.palette.primary.common,
    fontWeight: 400,
    [theme.breakpoints.down('md')]: {
      fontSize: 15,
    },
    '& span': {
      fontSize: '0.9rem',
      marginLeft: '5px',
      color: theme.palette.primary.common,
      opacity: 0.6,

      [theme.breakpoints.down('md')]: {
        fontSize: '0.75rem',
      },
    },
  },
  listItemTextSecondary12: {
    fontSize: 14,
    color: theme.palette.primary.common,
    opacity: 1,
    fontWeight: 400,
    maxHeight: 250,
    overflowY: 'auto',
  },
  listItemTextSecondary1: {
    fontSize: 14,
    color: theme.palette.primary.common,
    opacity: 1,
    fontWeight: 400,
    maxHeight: 100,
    overflowY: 'auto',
  },
  listItemTextSecondary21: {
    fontSize: 14,
    color: theme.palette.primary.common,
    opacity: 1,
    fontWeight: 400,
    maxHeight: 200,
    overflowY: 'auto',
  },
  listItemTextSecondary2: {
    fontSize: 14,
    color: theme.palette.primary.common,
    opacity: 1,
    fontWeight: 400,
    maxHeight: 100,
    overflowY: 'auto',
  },
}));

export default function Recommendation(props) {
  // console.log(props)
  // debugger
  const [listShow, setList] = React.useState(true);

  const toggleList = () => {
    setList(!listShow);
  };

  const classes = useStyles();
  const modalData = () => {
    return <div>Summary Data</div>;
  };
  return (
    <>
      <Card
        className={props && props.sidebarShow ? classes.card1 : classes.card}
        elevation={0}
      >
        <CardHeader
          title="Summary"
          className={classes.headerCard}
          classes={{
            title: classes.cardTitle,
            action: classes.cardAction,
          }}
        />

        <CardContent>
          {listShow ? (
            <List className={classes.List}>
              <ListItem
                alignItems="flex-start"
                className={
                  props && props.sidebarShow
                    ? classes.listIem12
                    : classes.listIem1
                }
              >
                <div className={classes.listItemTextPrimary}>
                  {'Case Summary'}
                  <span>
                    {props.CaseSummary != null && props.CaseSummary.date
                      ? ` (${props.CaseSummary.date})`
                      : ''}
                  </span>
                </div>
                <div
                  className={
                    props && props.sidebarShow
                      ? classes.listItemTextSecondary12
                      : classes.listItemTextSecondary1
                  }
                >
                  {props.CaseSummary != null && props.CaseSummary.description
                    ? props.CaseSummary.description
                    : NO_RECORD}
                </div>
              </ListItem>

              <ListItem alignItems="flex-start" className={classes.listIem2}>
                <div className={classes.listItemTextPrimary}>
                  {'Treatment Summary'}
                  <span>
                    {props.TreatmentSummary != null &&
                    props.TreatmentSummary.date
                      ? ` (${props.TreatmentSummary.date})`
                      : ''}
                  </span>
                </div>
                <div
                  className={
                    props && props.sidebarShow
                      ? classes.listItemTextSecondary21
                      : classes.listItemTextSecondary2
                  }
                >
                  {props.TreatmentSummary != null &&
                  props.TreatmentSummary.description
                    ? props.TreatmentSummary.description
                    : NO_RECORD}
                </div>
              </ListItem>
            </List>
          ) : null}
        </CardContent>
      </Card>
    </>
  );
}
