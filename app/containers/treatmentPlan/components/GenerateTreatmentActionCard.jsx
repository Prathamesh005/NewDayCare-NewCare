import React, { memo, useEffect, useState, useRef } from 'react';
import { useInjectReducer } from '../../../utils/injectReducer';
import { useInjectSaga } from '../../../utils/injectSaga';
import { EPISODE_DATE_FORMAT } from '../../../utils/constants';

import reducer from '../reducer';
import saga from '../saga';
import * as actions from '../actions';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Typography, Button, Box } from '@material-ui/core';
import { OutlinedButton } from '../../../components/button';
import { useHistory } from 'react-router-dom';
import { ROUTES_CONSTANTS } from '../../app/routeConstants';
import AddIcon from '@material-ui/icons/Add';
import { BoldText, SemiBoldText } from '../../../components';
import {
  makeSelectorGetProtocolLoading,
  makeSelectorGetProtocolError,
  makeSelectorGetProtocolSuccess,
} from '../selectors';
import { ListSkeleton } from '../../../components/skeleton';
import moment from 'moment';

function GenerateTreatmentActionCard(props) {
  const key = 'TreatmentPlan';
  useInjectReducer({
    key,
    reducer,
  });
  useInjectSaga({ key, saga });

  const { disable, patientID = '', saveProtocolData } = props;
  const history = useHistory();

  const handleOnClick = e => {
    e.preventDefault();
    if (patientID) {
      history.push({
        pathname: ROUTES_CONSTANTS.TREATMENT_PLAN_CREATE,
        search: `?patientID=${patientID}`,
      });
    }
  };

  const handleViewTreatment = (e, resourceId) => {
    e.preventDefault();
    if (patientID && resourceId) {
      history.push({
        pathname: ROUTES_CONSTANTS.TREATMENT_PLAN_CREATE,
        search: `?patientID=${patientID}&resourceId=${resourceId}&type=view`,
      });
    }
  };

  useEffect(() => {
    if (patientID) {
      const dataObj = {
        patientId: patientID,
      };
      new Promise((resolve, reject) => {
        props.getProtocol(dataObj, resolve, reject);
      });
    }
  }, [patientID]);

  return (
    <Box
      width={1}
      height={1}
      display="flex"
      justifyContent="center"
      pt={{ xs: 6, md: 8 }}
    >
      <Box height={1} width={{ xs: 1, md: '90%', lg: '80%' }}>
        <BoldText>Previously Generated Chemotherapy Orders</BoldText>
        {saveProtocolData && saveProtocolData.length <= 0 && (
          <Box width={1} mt={3} my={4}>
            <Typography variant="h4">
              You don't have any previously generated chemotherapy orders, To
              generate new order please click below button
            </Typography>
          </Box>
        )}

        <Box width={1} py={4}>
          <OutlinedButton
            variant="outlined"
            fullWidth={true}
            disabled={disable}
            onClick={handleOnClick}
            endIcon={<AddIcon fontSize="small" />}
            style={{ justifyContent: 'space-between', color: '#FF3399' }}
          >
            Generate New Chemotherapy Order
          </OutlinedButton>
        </Box>

        {/* list previously chemotherapy orders  */}
        {/* !props.saveProtocolLoad */}
        {props.saveProtocolLoad ? (
          <ListSkeleton />
        ) : (
          saveProtocolData &&
          saveProtocolData.length > 0 && (
            <>
              <SemiBoldText align="center">Or</SemiBoldText>
              <Box
                width={1}
                mt={3}
                my={4}
                maxHeight="260px"
                style={{
                  height: '260px',
                  overflowY: 'auto',
                }}
              >
                {saveProtocolData.map((obj, index) => {
                  return (
                    <Box width={1} my={2} key={index}>
                      <OutlinedButton
                        variant="outlined"
                        fullWidth={true}
                        disabled={disable}
                        onClick={e => handleViewTreatment(e, obj.resourceId)}
                        endIcon={<KeyboardArrowRightIcon />}
                        style={{
                          justifyContent: 'space-between',
                          color: '#373737',
                          border: '1px solid #373737',
                        }}
                      >
                        <Box
                          width={1}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <Box>
                            <span
                              style={{ fontWeight: '400', marginRight: '8px' }}
                            >{`${
                              obj.treatmentIntent && obj.treatmentIntent.text
                                ? obj.treatmentIntent.text
                                : ''
                            }`}</span>
                            {`${obj.protocol || ''}`}
                          </Box>
                          <Box>
                            {/* date */}

                            {obj.dateAdministration
                              ? moment(obj.dateAdministration)
                                  .utc()
                                  .format(EPISODE_DATE_FORMAT)
                              : '-'}
                          </Box>
                        </Box>
                      </OutlinedButton>
                    </Box>
                  );
                })}
              </Box>
            </>
          )
        )}
      </Box>
    </Box>
  );
}

const mapStateToProps = createStructuredSelector({
  saveProtocolLoad: makeSelectorGetProtocolLoading(),
  saveProtocolError: makeSelectorGetProtocolError(),
  saveProtocolData: makeSelectorGetProtocolSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getProtocol: (data, resolve, reject) =>
      dispatch(actions.getProtocol(data, resolve, reject)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GenerateTreatmentActionCard);
