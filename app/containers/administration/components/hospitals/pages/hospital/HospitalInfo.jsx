import { Avatar, Box, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Add, Edit } from '@material-ui/icons';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import {
  SecondaryText,
  SemiBoldText,
  SquareIconButton,
  WhitePaper,
} from '../../../../../../components';
import { ROUTES_CONSTANTS } from '../../../../../app/routeConstants';
import VerticalTune from '../../../../../../images/assets/tune-vertical.svg';

const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
  },
  avatar: {
    width: 55,
    height: 55,
  },
  subHeader: {
    color: '#404040',
  },
  cards: {
    width: 175,
    display: 'flex',
    justifyContent: 'center',
    borderRight: '2px solid #ececec',
  },
}));

export default function HospitalInfo(props) {
  const classes = useStyles();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const imageUrl = null;
  const history = useHistory();
  const totalData = [
    { value: '125', name: 'Total Doctors' },
    { value: '240', name: 'Total Staff' },
    { value: '6', name: 'location' },
  ];
  return (
    <Fragment>
      <WhitePaper className={classes.paper}>
        <Box display="flex" justifyContent="space-between" px={5} py={4}>
          <Box display="flex">
            <Avatar
              src={'data:image/*;base64,' + imageUrl}
              className={classes.avatar}
            />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={'space-between'}
              pl={4}
            >
              <Box flexWrap="wrap">
                <SemiBoldText
                  variant="h3"
                  style={{ fontSize: '1.1rem' }}
                  component="span"
                >
                  {'Dr. L H Hiranandani Hospitals, Powai'}
                </SemiBoldText>
                <SecondaryText
                  variant="h3"
                  component="span"
                  style={{ paddingLeft: 10, fontWeight: 500 }}
                >
                  (Hospital)
                </SecondaryText>
              </Box>

              <Box flexWrap="wrap">
                <Typography
                  variant="h4"
                  component={'span'}
                  className={classes.subHeader}
                >
                  PAN : DTSPM5896D
                </Typography>
                <Typography
                  variant="h4"
                  component={smDown ? 'div' : 'span'}
                  className={classes.subHeader}
                  style={{ paddingLeft: smDown ? 0 : 15 }}
                >
                  TAN : GRDDY5896G
                </Typography>
                <Typography
                  variant="h4"
                  component={smDown ? 'div' : 'span'}
                  className={classes.subHeader}
                  style={{ paddingLeft: smDown ? 0 : 15 }}
                >
                  GSTN : 14GTSFT589A1G
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <SquareIconButton
              onClick={() => {
                history.push(ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE);
              }}
              style={{ padding: 6, marginRight: 10 }}
            >
              <img src={VerticalTune} height="19px" width="19px" />
            </SquareIconButton>

            <SquareIconButton
              onClick={() => {
                history.push(ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_EDIT);
              }}
              style={{ padding: 6 }}
            >
              <Edit style={{ fontSize: '1.2rem' }} />
            </SquareIconButton>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection={'row'}
          px={5}
          py={2}
          style={{ background: '#F8F8F8' }}
        >
          <SemiBoldText variant="h3">Admin Details :</SemiBoldText>

          <SecondaryText variant="h3" style={{ paddingLeft: 15 }}>
            Sidhharth Karmarkar
          </SecondaryText>
          <SecondaryText variant="h3" style={{ paddingLeft: 15 }}>
            +91 9874563210
          </SecondaryText>
        </Box>
        <Box display="flex">
          {totalData.map((ele, i) => {
            return (
              <Box className={classes.cards} py={2} key={i}>
                <Box>
                  <SemiBoldText variant="h2">{ele.value}</SemiBoldText>
                  <SecondaryText variant="h3">{ele.name}</SecondaryText>
                </Box>
              </Box>
            );
          })}
        </Box>
      </WhitePaper>
    </Fragment>
  );
}
