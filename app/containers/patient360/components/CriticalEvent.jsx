/*eslint-disable*/
import { useMediaQuery } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { WhiteIconButton } from '../../../components/button';
import addIcon from '../../../images/assets/addIcon.png';
import { DATE_FORMAT, NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // padding:15,
    minHeight: 500,
    display: 'flex',
    flexDirection: 'column',
    background: '#f7f6f4',
    borderRadius: '5px',
    boxShadow: '0px 2px 4px #00000029',
  },
  headerCard: {
    padding: '0px !important',
    background: '#ffffff',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 15,
  },
  cardAction: {
    margin: '0px 0px !important',
  },
  icon: {
    color: '#FF3399',
    minWidth: '0 !important',
    marginRight: 15,
  },
  icon1: {
    height: 20,
    width: 20,
  },
  listItemTextPrimary: {
    fontSize: 15,
    fontWeight: 500,
  },
  listItemTextSecondary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF5CAD',
  },
  commentListDiv: {
    padding: '0px 45px',
    marginTop: -15,
  },
  commentItem: {
    background: '#F0F0F0',
    borderRadius: 5,
  },
  comment: {
    fontSize: 14,
    fontWeight: '500',
  },

  headerTitle: {
    fontWeight: 'bold',
  },
}));

export default function CriticalEventCard(props) {
  // console.log(props)

  const [critical, setCritical] = useState(null);

  useEffect(() => {
    setCritical(
      props.criticalEventsData != null
        ? props.criticalEventsData.filter((val, index) => {
            if (index <= 2) {
              return val;
            }
          })
        : [],
    );
  }, [props.criticalEventsData]);

  const classes = useStyles();
  const [resourceId, setResourceId] = React.useState(props && props.Id);
  const [failMessage, setFailure] = useState('');
  //   // const{age, gender, first, last, city, state, phone} =props&&props.profile;

  const [listopen, setlistOpen] = React.useState(false);
  const handleClick = () => {
    setlistOpen(!listopen);
  };

  return (
    <>
      <Card className={classes.root} elevation={0}>
        <CardHeader
          action={
            <WhiteIconButton>
              <img src={addIcon} alt="Not Found !" height="13px" />
            </WhiteIconButton>
          }
          title="Critical Events"
          className={classes.headerCard}
          classes={{
            title: classes.cardTitle,
            action: classes.cardAction,
          }}
        />
        <Divider />
        <CardContent>
          {props.criticalEventsData != null ? (
            <List className={classes.List}>
              {critical != null && critical != []
                ? critical.map(val => {
                    return (
                      <ListItem
                        button
                        alignItems="flex-start"
                        className={classes.listIem1}
                        key={val.description}
                      >
                        <ListItemIcon className={classes.icon}>
                          <FiberManualRecordIcon className={classes.icon1} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <div className={classes.listItemTextPrimary}>
                              {val.description}
                              <span style={{ display: 'block' }}>
                                ({moment(val.date).format(DATE_FORMAT)})
                              </span>
                            </div>
                          }
                          // secondary={
                          //   <div onClick={handleClick} className={classes.listItemTextSecondary}>
                          //     See Comment {listopen ? <ExpandLess /> : <ExpandMore />}
                          //   </div>
                          // }
                        />
                      </ListItem>
                    );
                  })
                : ''}
            </List>
          ) : (
            NO_RECORD
          )}
        </CardContent>
      </Card>
    </>
  );
}
