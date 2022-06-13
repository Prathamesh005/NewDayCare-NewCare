import { Box, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import {
  actionsConfig,
  useAdministrationSlice,
} from '../../../../../apis/administrationApis/administrationSlice';
import {
  BoldText,
  OuterBox,
  PageTitleText,
  PinkAddCircleButton,
  SearchInput,
  SquareIconButton,
  WhiteCloseIconButton,
  ViewTable,
  SaveActionButton,
  MessageComponent,
} from '../../../../../components';

import CloseIcon from '@material-ui/icons/Close';
import Skeleton from '../../../../skeleton/tableSkeletone';
import NoRecord from '../../../../../components/noData';

const useStyles = makeStyles(theme => ({
  textFieldGrid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },
  main: {
    flexGrow: 1,
  },
  iconClass: {
    color: '#727272',
    cursor: 'pointer',
  },
}));

function FileUploadConfirm(props) {
  useAdministrationSlice();
  const classes = useStyles();
  const history = useHistory();
  const [localLoader, setLocalLoader] = useState(true);
  const defaultHeadCells = [
    {
      id: 'code',
      label: 'Code',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'labName',
      label: 'Name',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'dates',
      label: 'Date',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'providerMrp',
      label: 'Provider MRP',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'providerNQCost',
      label: 'Provider_nQ_Cost',
      render: ({ value, row }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'nqPriceList',
      label: 'nQ_List_Price',
      render: ({ value, row }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'nqOfferList',
      label: 'nQ_Offer_Price',
      render: ({ value, row }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
  ];

  const OuterBoxTopComponent = () => {
    return (
      <>
        <Box display="flex">
          <Box flexGrow="1" display="flex" alignItems="center">
            <BoldText variant="h3" component="span">
              {props.fileName}
            </BoldText>
          </Box>
          <Box>
            <SaveActionButton
              onClick={() => {
                console.log('confirm');
              }}
              style={{
                fontSize: '0.9rem',
                marginRight: '1rem',
              }}
            >
              Confirm
            </SaveActionButton>
            <WhiteCloseIconButton onClick={() => history.goBack()} />
          </Box>
        </Box>
      </>
    );
  };

  const OuterBoxBottomComponent = () => {
    return (
      <>
        <ViewTable
          rows={props.data || []}
          headCells={defaultHeadCells}
          headBackground={'#f0f0f0'}
          pagination={false}
        />
      </>
    );
  };
  useEffect(() => {
    setLocalLoader(false);
  }, []);
  return (
    <Fragment>
      <div className={classes.main}>
        <Grid container>
          {/* <Grid container style={{ marginBottom: 25 }}>
                        <Grid item xs sm={4}>
                            <PageTitleText>Hospitals / Clinics</PageTitleText>
                        </Grid>
                    </Grid> */}
          <Grid item xs={12}>
            {!localLoader && props.data ? (
              props.data.length > 0 ? (
                <OuterBox
                  topComponent={OuterBoxTopComponent()}
                  bottomComponent={OuterBoxBottomComponent()}
                  bottomHeight="74vh"
                />
              ) : (
                <div style={{ height: '80vh', width: '100%' }}>
                  <NoRecord />
                </div>
              )
            ) : (
              <Skeleton />
            )}
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    // getStaffList: payload => dispatch(getStaffList(payload))

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  MessageComponent,
)(FileUploadConfirm);
