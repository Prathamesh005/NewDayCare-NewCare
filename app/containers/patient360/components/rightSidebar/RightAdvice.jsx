import { Divider } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { groupBy } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { EPISODE_DATE_FORMAT, NO_RECORD } from '../../../../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '20px 0px',
    boxShadow: '0px 0px 4px #00000029;',
    color: 'black',
  },
  cardTitle: {
    fontSize: '0.8rem',
    fontWeight: 500,
  },
  subHeader: {
    fontSize: '0.7rem',
    fontWeight: '500',
  },
  cardAction: {
    alignSelf: 'center',
  },

  displayLebels: {
    fontWeight: '500',
    fontSize: '0.8rem',
    // color: "#515151"
  },
  valueLabel: {
    fontSize: '0.8rem',
    fontWeight: '400',
  },
}));

function RightAdvice(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [groupData, setgroupData] = useState([]);

  useEffect(() => {
    if (
      props.patient360Result &&
      props.patient360Result.cancerServiceRequests
    ) {
      const { cancerServiceRequests } = props.patient360Result;

      const groups = groupBy(cancerServiceRequests, 'encounter.resourceId');
      let arr = [];
      // console.log("groups",groups)

      Object.keys(groups).forEach(key => {
        let value = groups[key];
        arr.push(value);
      });

      setgroupData(arr);
    }
    // debugger
    return () => {};
  }, [props.patient360Result]);

  return (
    <>
      {groupData.length > 0
        ? groupData.map((val, i) => {
            // debugger
            return (
              <div style={{ margin: '10px 0px' }} key={i.toString()}>
                <span className={classes.cardTitle}>
                  {moment(val[0].fromDate)
                    .utc()
                    .format(EPISODE_DATE_FORMAT)}
                </span>

                {val.map((value, index) => {
                  return (
                    <Card
                      className={classes.root}
                      key={index.toString()}
                      elevation={0}
                    >
                      <CardHeader
                        action={<IconButton aria-label="settings" />}
                        title={value.code && value.code.display}
                        // subheader={'subheader'}

                        classes={{
                          title: classes.cardTitle,
                          subheader: classes.subHeader,
                          action: classes.cardAction,
                        }}
                      />
                      <Divider />
                    </Card>
                  );
                })}
              </div>
            );
          })
        : NO_RECORD}
    </>
  );
}

const mapStateToProps = state => state.patient360;

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(RightAdvice);
