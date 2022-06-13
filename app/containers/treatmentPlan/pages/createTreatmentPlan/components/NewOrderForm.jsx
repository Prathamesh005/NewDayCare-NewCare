import { Box, Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import {
  LabelValueContainer,
  InputLabelWrapper,
  OutlinedAutoCompleteInput,
  PrimaryPinkButton,
  DateInput,
  SaveActionButton,
  ThickHorizontalDivider,
} from '../../../../../components';
import { FreeSoloAutoComplete } from '../../../../../components/input';

export default function NewOrderForm(props) {
  const {
    values = {},
    handleIntentChange,
    handleProtocolChange,
    handleDateChange,
    handleSave,
    protocolArray,
    intentList,
    protocolLoading,
    // calculateFor
    calculateFor,
    handleCalculateFor,
    isProtocolPresent,
  } = props;

  // calculateFor
  const calculateForConfig = [
    {
      code: 'BSA',
    },
    {
      code: 'BMI',
    },
    {
      code: 'IBW',
    },
  ];

  const { date, intent, protocol } = values;

  // pending logic
  const isNewProtocol = !isProtocolPresent && protocol.code;
  const calculateForCheck = isProtocolPresent ? true : isNewProtocol;
  const isSubmitForm =
    date && intent.code && protocol.code && calculateForCheck;

  return (
    <Box width={1}>
      <Grid container spacing={8} direction="column">
        <Grid item xs={12} md={7} lg={5}>
          <InputLabelWrapper
            label="Intent of Treatment"
            labelProps={{ style: { minWidth: '300px' } }}
          >
            {/* only search based? */}
            <FreeSoloAutoComplete
              placeholder="Select Intent"
              options={intentList}
              style={{ width: '240px' }}
              value={intent}
              onChange={handleIntentChange}
              //
              getOptionLabel={option => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.display;
              }}
              objectToPushInOptions={value => {
                return {
                  display: value,
                };
              }}
              //
            />
          </InputLabelWrapper>
        </Grid>
        {/* api based  only */}
        <Grid item>
          <Grid container>
            <Grid item item xs={12} sm={10} md={7} lg={5}>
              <InputLabelWrapper
                label="Chemotherapy Protocol"
                labelProps={{ style: { minWidth: '300px' } }}
              >
                <FreeSoloAutoComplete
                  style={{ width: '240px' }}
                  placeholder="Select Protocol"
                  options={protocolArray}
                  // getOptionLabel={option => option.label || ''}
                  value={protocol}
                  onChange={handleProtocolChange}
                  getOptionLabel={option => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.display;
                  }}
                  objectToPushInOptions={value => {
                    return {
                      display: value,
                    };
                  }}
                />
              </InputLabelWrapper>
            </Grid>

            {/* calculateFor */}
            {isNewProtocol && (
              <Grid item style={{ maxWidth: '160px' }}>
                <OutlinedAutoCompleteInput
                  placeholder="Calculate For"
                  options={calculateForConfig}
                  // getOptionLabel={option => option.label || ''}
                  value={calculateFor}
                  onChange={handleCalculateFor}
                  getOptionLabel={option => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.code;
                  }}
                />
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={7} lg={5}>
          <InputLabelWrapper
            label="Suggested Date of Administration"
            labelProps={{ style: { minWidth: '300px' } }}
          >
            <DateInput
              style={{ width: '240px' }}
              placeholder="DD/MM/YYYY"
              value={date}
              onChange={handleDateChange}
            />
          </InputLabelWrapper>
        </Grid>
      </Grid>

      {/* Divider  */}
      <Box width={1} mt={6} mb={4}>
        <ThickHorizontalDivider />
      </Box>

      <Box width={1} display="flex" justifyContent="center">
        <SaveActionButton
          isLoading={protocolLoading}
          disabled={!isSubmitForm || protocolLoading}
          onClick={handleSave}
        >
          Save
        </SaveActionButton>
      </Box>
    </Box>
  );
}
