import React, { useState, Fragment } from 'react';
import {
  Card,
  Box,
  CardHeader,
  Grid,
  Divider,
  CardContent,
  makeStyles,
  Avatar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import {
  AddIconButton,
  SquareIconButton,
  EditIconSquareButton,
  OuterBox,
  BoldText,
  SemiBoldText,
  SecondaryText,
} from '../../../../../../../../components';
import RefLink from '../../../../../../../../../app/images/assets/refernce-link-icon.svg';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { ROUTES_CONSTANTS } from '../../../../../../../app/routeConstants';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  typo: {
    fontSize: '1rem',
    fontWeight: 400,
  },
  typo1: {
    fontSize: '1rem',
    opacity: 0.8,
  },

  headerCard: {
    height: '3vh',
  },
  AddIconBtn: {
    boxShadow: '0px 0px 16px #00000029',
    padding: 4,
  },
  btnprops: {
    background: '#ECECEC',
    margin: 3,
    marginLeft: '0rem',
  },
  btnprops1: {
    background: '#ECECEC',
    margin: 3,
  },

  top: {
    padding: '0.5rem',
  },
}));
const RefrenceCard = props => {
  const classes = useStyles();
  const { linkdata, handleModelClick } = props;
  const history = useHistory();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const handleAddRefLink = () => {
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_ADD_REFERENCE_LINK,
      state: {
        path: history.location.pathname,
      },
    });
  };

  const handleEditRefLink = () => {
    history.push({
      pathname: ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_EDIT_REFERENCE_LINK,
      state: {
        path: history.location.pathname,
      },
    });
  };

  const OuterBoxTopComponent = () => {
    return (
      <Box display="flex">
        <Box flexGrow="1" display="flex" alignItems="center">
          <BoldText variant="h3" component="span">
            {' Reference Links'}
          </BoldText>
        </Box>
        <Box>
          <AddIconButton
            className={classes.AddIconBtn}
            onClick={() => handleAddRefLink()}
          />
        </Box>
      </Box>
    );
  };

  const OuterBoxBottomComponent = () => {
    return (
      <>
        {linkdata.map((ele, index) => {
          return (
            <Box key={index.toString()}>
              <Grid container style={{ marginTop: '0.8rem' }}>
                <Grid item lg={2} md={2} xs={2}>
                  <Avatar alt="Remy Sharp" src={RefLink} />
                </Grid>

                <Grid item lg={8} md={8} xs={8}>
                  <Typography
                    varient="h3"
                    component="span"
                    className={classes.typo}
                  >
                    {ele.header}
                  </Typography>

                  <SquareIconButton
                    style={{ background: '#f0f0f0', marginLeft: 5, padding: 0 }}
                  >
                    <OpenInNewIcon style={{ fontSize: '1rem' }} />
                  </SquareIconButton>

                  <SecondaryText variant="h4" className={classes.typo1}>
                    {ele.subheader}
                  </SecondaryText>
                </Grid>

                <Grid item lg={2} md={2} xs={2} style={{ textAlign: 'end' }}>
                  <SquareIconButton
                    onClick={handleModelClick}
                    className={classes.btnprops}
                  >
                    <DeleteOutlineIcon style={{ fontSize: '1.2rem' }} />
                  </SquareIconButton>

                  <EditIconSquareButton
                    onClick={() => handleEditRefLink()}
                    className={classes.btnprops1}
                    iconProps={{ style: { fontSize: '1.2rem' } }}
                  />
                </Grid>
              </Grid>
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <Fragment>
      <OuterBox
        topCss={classes.top}
        topComponent={OuterBoxTopComponent()}
        bottomComponent={OuterBoxBottomComponent()}
        bottomHeight={mdDown ? '62vh' : '64vh'}
      />
    </Fragment>
  );
};

export default RefrenceCard;
