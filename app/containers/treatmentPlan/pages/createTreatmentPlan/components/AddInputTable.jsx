import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { FreeSoloAutoComplete } from '../../../../../components';

export const AddInputTable = props => {
  const [value, setValue] = useState({
    brand_Name: {
      raw: '',
    },
    generic_Name: {
      raw: '',
    },
  });

  const { handleChangeInput, handleDrugChange, id, keyTable } = props;
  return (
    <Box width={'250px'}>
      <FreeSoloAutoComplete
        value={value}
        placeholder="Drug Name"
        objectToPushInOptions={value => {
          return {
            brand_Name: {
              raw: `Add "${value}"`,
            },
          };
        }}
        inputProps={{
          onChange: e => {
            handleChangeInput(e.target.value);
          },
        }}
        //
        getOptionLabel={option => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option['brand_Name']['raw'];
          }
          return (
            (option &&
              (option['brand_Name']['raw'] || option['generic_Name']['raw'])) ||
            ''
          );
        }}
        //
        onChange={(e, value) => {
          handleDrugChange(e, value, keyTable, id);
          setValue({
            brand_Name: {
              raw: '',
            },
            generic_Name: {
              raw: '',
            },
          });
        }}
        {...props}
      />
    </Box>
  );
};
