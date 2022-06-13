import { Box } from '@material-ui/core';
import React, { useRef } from 'react';
import { WhiteAutocomplete, WhiteInput } from '../../../../../components';

const typeObj = [
  {
    code: 'IBW',
    display: 'IBW',
  },
  {
    code: '%',
    display: '% Reduction',
  },
];

const getPatientDose = (amount, percent) => {
  const percentageValue = ((percent * amount) / 100).toFixed(2);
  const result = _.ceil(amount - percentageValue);
  return result.toString();
};

export default function DoseReduction(props) {
  const {
    value,
    row,
    index,
    headCellId,
    handleChemotherapyInputChange,
    resourceId,
  } = props;

  const isPercent = value && value.unit === '%' ? true : false;
  const isIBW = (value && value.unit) === 'IBW' ? true : false;
  const newRef = useRef();

  return (
    <Box display="flex" alignItems="center">
      <WhiteAutocomplete
        style={{ width: '130px' }}
        onChange={(e, newValue) => {
          if (newRef.current) {
            newRef.current.focus();
          }
          props.handleChemotherapyInputChange(
            newValue.code,
            index,
            row,
            'doseReduction.unit',
            resourceId,
            'therapyOrders',
            {
              doseReduction: {
                unit: newValue.code,
                value: row.doseReduction
                  ? row.doseReduction.value
                  : row.doseReduction || '',
              },
            },
          );
        }}
        value={
          (typeObj &&
            value &&
            typeObj.find(obj => {
              return obj.code === value.unit;
            })) || {
            code: '',
            display: '',
          }
        }
        getOptionLabel={option => option.display}
        options={typeObj}
      />
      {/*  */}
      <WhiteInput
        inputRef={newRef}
        style={{ width: '70px' }}
        type="number"
        placeholder="Type Here"
        variant="outlined"
        value={value && value.value ? value.value : ''}
        // disabled={value && value.unit ? false : true}
        onChange={e => {
          if (
            (row.doseReduction && !row.doseReduction.unit) ||
            (!row.doseReduction && !row.doseReduction.unit)
          ) {
            return;
          }
          let valueNumber = e.target.value;
          let updatedPatientDoseObj = row.patientDose;
          if (updatedPatientDoseObj) {
            if (!valueNumber) {
              updatedPatientDoseObj = props.getPatientDoseValue(
                row.protocolDose,
                row.patientDose,
              );
            } else if (valueNumber && (valueNumber < 0 || valueNumber > 100)) {
              return;
            } else {
              const patientDoseObj = props.getPatientDoseValue(
                row.protocolDose,
                row.patientDose,
              );

              if (isPercent && patientDoseObj && patientDoseObj.value) {
                updatedPatientDoseObj = {
                  unit: patientDoseObj.unit,
                  value: getPatientDose(
                    patientDoseObj.value,
                    parseFloat(valueNumber),
                  ),
                };
              }
            }
          }
          handleChemotherapyInputChange(
            valueNumber,
            index,
            row,
            'doseReduction.value',
            resourceId,
            'therapyOrders',
            {
              patientDose: updatedPatientDoseObj,
              doseReduction: valueNumber
                ? {
                    value: valueNumber,
                    unit: row.doseReduction ? row.doseReduction.unit : '',
                  }
                : null,
            },
          );
        }}
      />
    </Box>
  );
}
