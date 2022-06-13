import React, { useState, useEffect, useRef } from 'react';
import { Box, AccordionSummary, AccordionDetails } from '@material-ui/core';
import {
  DateInput,
  SemiBoldText,
  DenseAccordionSummary,
  DenseAccordionDetails,
  DenseAccordion,
  PinkText,
  WhiteAutocomplete,
  WhiteInput,
  EditableTable,
} from '../../../../../components';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import _ from 'lodash';
import { format, toDate } from 'date-fns';
import moment from 'moment';
import { APT_FORM_DATE } from '../../../../../utils/constants';
import DoseReduction from './DoseReduction';

function TableWrapper(props) {
  const [activeAccordion, setActiveAccordion] = useState(true);

  const handleChange = (event, isExpanded) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveAccordion(isExpanded);
  };

  const {
    resourceId,
    //
    day,
    date,
    isEdit,

    handleInputChange,
    handleChemotherapyInputChange,
    handleDeleteRow,
    //
    handleChangeInput,
    drugListResponse,
    handleDayDateChange,
    //
    handleDrugChange,
    AddInput,
    //
    therapyOrders = [],
    supportiveProtocols = [],
    preMedicationProtocols = [],
    //
    drugUnitsSet = [],
    drugUnitsSetProtocol = [],
  } = props;

  // ------- HEAD CELLS -------
  // day: 0
  // drugFrom: "Injection"
  const premedicationHeadCells = [
    {
      id: 'drugName',
      numeric: true,
      disablePadding: false,
      label: 'Drug Name',
      minWidth: '200px',
      maxWidth: '200px',
    },
    {
      id: 'patientDose',
      label: 'Patient Dose',
      inputType: 'text', //number
      inputProps: {
        placeholder: 'Type Here',
        onChange: (...allParams) => {
          handleInputChange(...allParams, resourceId, 'preMedicationProtocols');
        },
      },
      minWidth: '80px',
      maxWidth: '110px',
    },
    {
      id: 'administrationDetail',
      label: 'Administration Details',
      inputType: 'text',
      inputProps: {
        placeholder: 'Type Here',
        onChange: (...allParams) => {
          handleInputChange(...allParams, resourceId, 'preMedicationProtocols');
        },
      },
      maxWidth: '160px',
    },
    {
      id: 'comment',
      numeric: true,
      disablePadding: false,
      label: 'Comment',
      inputType: 'text',
      inputProps: {
        placeholder: 'Type Here',
        onChange: (...allParams) => {
          handleInputChange(...allParams, resourceId, 'preMedicationProtocols');
        },
      },
      maxWidth: '160px',
    },
  ];

  const chemotherapyOrdersHeadCells = [
    {
      id: 'drugName',
      label: 'Drug Name',
      minWidth: '140px',
      maxWidth: '220px',
    },
    {
      id: 'protocolDose',
      label: 'Protocol Dose',
      minWidth: '120px',
      maxWidth: '190px',

      render: ({ value, row, index, headCellId }) => {
        return (
          <Box display="flex" alignItems="center">
            <WhiteInput
              type="number"
              style={{ width: '60px' }}
              placeholder="Type Here"
              value={value && value.value}
              onChange={e => {
                const protocolDose =
                  e.target.value || e.target.value == 0
                    ? {
                        value: parseFloat(e.target.value),
                        unit: value && value.unit ? value.unit : 'mg/m2',
                      }
                    : null;

                const patientDose = props.getPatientDoseValue(
                  protocolDose,
                  row.patientDose,
                );
                handleChemotherapyInputChange(
                  parseFloat(e.target.value),
                  index,
                  row,
                  'protocolDose.value',
                  resourceId,
                  'therapyOrders',
                  {
                    protocolDose: protocolDose,
                    patientDose: patientDose,
                  },
                );
              }}
            />
            <WhiteAutocomplete
              style={{ width: '80px' }}
              disabled={!(value && value.value)}
              onChange={(e, newValue) => {
                const protocolDose = {
                  ...value,
                  unit: newValue.display,
                };
                const patientDose = props.getPatientDoseValue(
                  protocolDose,
                  row.patientDose,
                );

                handleChemotherapyInputChange(
                  newValue.display,
                  index,
                  row,
                  'protocolDose.unit',
                  resourceId,
                  'therapyOrders',
                  {
                    protocolDose: protocolDose,
                    patientDose: patientDose,
                  },
                );
              }}
              getOptionLabel={option => option.display}
              options={drugUnitsSetProtocol}
              value={
                (drugUnitsSetProtocol &&
                  value &&
                  drugUnitsSetProtocol.find(obj => {
                    return obj.display === value.unit;
                  })) || {
                  code: '',
                  display: '',
                }
              }
            />
          </Box>
        );
      },
      format: ({ value, row }) =>
        `${(value && value.value) || ''} ${(value && value.unit) || ''}`,
    },
    {
      id: 'doseReduction',
      label: 'Dose Modification',
      minWidth: '180px',
      maxWidth: '190px',
      render: ({ value = {}, row, index, headCellId }) => (
        <DoseReduction
          value={value}
          row={row}
          index={index}
          headCellId={headCellId}
          resourceId={resourceId}
          handleChemotherapyInputChange={handleChemotherapyInputChange}
          getPatientDoseValue={props.getPatientDoseValue}
        />
      ),
      format: ({ value }) => {
        const isPercent = value && value.unit === '%' ? true : false;

        return value
          ? ` ${value.value ? value.value : ''} ${value.unit || ''} ${
              isPercent ? 'Reduction' : ''
            } `
          : '';
      },
    },
    {
      id: 'patientDose',
      label: 'Patient Dose',
      align: 'right',
      minWidth: '120px',
      maxWidth: '180px',
      render: ({ value, row, index, headCellId }) => {
        return (
          <Box display="flex" alignItems="center">
            <WhiteInput
              type="number"
              style={{ width: '60px' }}
              placeholder="Type Here"
              value={value && value.value ? value.value : ''}
              onChange={e => {
                const unitValueObj = props.getPatientDoseValue(
                  row.protocolDose,
                  value,
                );
                const obj = e.target.value
                  ? {
                      patientDose: {
                        value: e.target.value,
                        unit: unitValueObj ? unitValueObj.unit : '',
                      },
                    }
                  : { patientDose: null };

                handleChemotherapyInputChange(
                  e.target.value,
                  index,
                  row,
                  'patientDose.value',
                  resourceId,
                  'therapyOrders',
                  obj,
                );
              }}
            />
            <WhiteAutocomplete
              style={{ width: '70px' }}
              disabled={true}
              // onChange={(e, newValue) => {
              //   handleChemotherapyInputChange(
              //     newValue.display,
              //     index,
              //     row,
              //     'patientDose.unit',
              //     resourceId,
              //     'therapyOrders',
              //     {
              //       patientDose: {
              //         ...value,
              //         unit: newValue.display,
              //       },
              //     },
              //   );
              // }}
              getOptionLabel={option => option.display}
              options={drugUnitsSet}
              value={
                (drugUnitsSet &&
                  value &&
                  drugUnitsSet.find(obj => {
                    return obj.display === value.unit;
                  })) || {
                  code: '',
                  display: '',
                }
              }
            />
          </Box>
        );
      },
      format: ({ value }) =>
        value ? `${value.value || ''}  ${value.unit || ''}` : '',
    },
    {
      id: 'administrationDetail',
      label: 'Admin Details',
      minWidth: '100px',
      inputType: 'text',
      inputProps: {
        placeholder: 'Type Here',
        onChange: (...allParams) => {
          handleInputChange(...allParams, resourceId, 'therapyOrders');
        },
      },
    },
    {
      id: 'previousToxicity',
      minWidth: '100px',
      label: 'Previous Toxicity',
      inputType: 'text',
      inputProps: {
        placeholder: 'Type Here',
        onChange: (...allParams) => {
          handleInputChange(...allParams, resourceId, 'therapyOrders');
        },
      },
    },
    {
      id: 'comment',
      label: 'Comment',
      minWidth: '100px',
      inputType: 'text',
      inputProps: {
        placeholder: 'Type Here',
        onChange: (...allParams) => {
          handleInputChange(...allParams, resourceId, 'therapyOrders');
        },
      },
    },
  ];

  const supportiveCareHeadCells = [
    {
      id: 'drugName',
      numeric: true,
      disablePadding: false,
      label: 'Drug Name',
      minWidth: '200px',
      maxWidth: '30%',
    },
    {
      id: 'administrationDetail',
      label: 'Administration Details',
      inputType: 'text',
      inputProps: {
        placeholder: 'Type Here',
        onChange: (...allParams) => {
          handleInputChange(...allParams, resourceId, 'supportiveProtocols');
        },
      },
      minWidth: '200px',
      maxWidth: '30%',
    },
    {
      id: 'comment',
      label: 'Comment',
      inputType: 'text',
      inputProps: {
        placeholder: 'Type Here',
        onChange: (...allParams) => {
          handleInputChange(...allParams, resourceId, 'supportiveProtocols');
        },
      },
      minWidth: '200px',
      maxWidth: '30%',
    },
  ];

  const dateFormat = date ? moment(date).format(APT_FORM_DATE) : '';
  return (
    <Box>
      <DenseAccordion
        elevation={0}
        style={{ marginTop: '10px' }}
        onClick={event => event.stopPropagation()}
        onFocus={event => event.stopPropagation()}
        expanded={activeAccordion}
        onChange={handleChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
          style={{
            backgroundColor: activeAccordion ? '#FFFFFF' : '#F8F8F8',
          }}
        >
          {isEdit && activeAccordion ? (
            <Box display="flex" alignItems="center">
              <SemiBoldText
                style={{ marginRight: '15px' }}
              >{`Day ${day}`}</SemiBoldText>
              <DateInput
                fullWidth={false}
                onChange={e => handleDayDateChange(e, resourceId)}
                onClick={event => event.stopPropagation()}
                onFocus={event => event.stopPropagation()}
                value={dateFormat}
              />
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <SemiBoldText
                style={{ marginRight: '15px' }}
              >{`Day ${day}`}</SemiBoldText>
              {dateFormat && (
                <SemiBoldText>{` ${format(
                  new Date(dateFormat),
                  'MM/dd/yyyy',
                )}`}</SemiBoldText>
              )}
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {/* Open */}
          <Box width={1} py={4}>
            {/* premeditation.length > 0 && */}
            {/* {!hidePremeditation && (
            )} */}
            <DenseAccordion elevation={0} defaultExpanded={true}>
              <DenseAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <PinkText>Premedication</PinkText>
              </DenseAccordionSummary>
              <DenseAccordionDetails>
                <EditableTable
                  rows={preMedicationProtocols}
                  headCells={premedicationHeadCells}
                  showAddInputRow={true}
                  addInput={
                    <AddInput
                      keyTable={'preMedicationProtocols'}
                      options={drugListResponse}
                      handleChangeInput={handleChangeInput}
                      handleDrugChange={handleDrugChange}
                      id={resourceId}
                    />
                  }
                  showDelete={true}
                  handleDelete={index => {
                    handleDeleteRow &&
                      handleDeleteRow(
                        index,
                        resourceId,
                        'preMedicationProtocols',
                      );
                  }}
                  editableMode={isEdit}
                />
              </DenseAccordionDetails>
            </DenseAccordion>
            {/* chemotherapyOrders.length > 0 && */}
            {/* {!hideChemotherapyOrders && (
            )} */}
            <DenseAccordion elevation={0} defaultExpanded={true}>
              <DenseAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <PinkText>Chemotherapy Orders</PinkText>
              </DenseAccordionSummary>
              <DenseAccordionDetails>
                <EditableTable
                  rows={therapyOrders}
                  headCells={chemotherapyOrdersHeadCells}
                  showAddInputRow={true}
                  addInput={
                    <AddInput
                      options={drugListResponse}
                      handleChangeInput={handleChangeInput}
                      keyTable={'therapyOrders'}
                      handleDrugChange={handleDrugChange}
                      id={resourceId}
                    />
                  }
                  showDelete={true}
                  handleDelete={index => {
                    handleDeleteRow &&
                      handleDeleteRow(index, resourceId, 'therapyOrders');
                  }}
                  editableMode={isEdit} //handle this based on flag
                />
              </DenseAccordionDetails>
            </DenseAccordion>
            {/* supportiveCare.length > 0 &&  */}
            {/* {!hideSupportiveCare && (
            )} */}
            <DenseAccordion elevation={0} defaultExpanded={true}>
              <DenseAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <PinkText>Hydration / Supportive care</PinkText>
              </DenseAccordionSummary>
              <DenseAccordionDetails>
                <EditableTable
                  rows={supportiveProtocols}
                  headCells={supportiveCareHeadCells}
                  showAddInputRow={true}
                  addInput={
                    <AddInput
                      options={drugListResponse}
                      handleChangeInput={handleChangeInput}
                      handleDrugChange={handleDrugChange}
                      keyTable={'supportiveProtocols'}
                      id={resourceId}
                    />
                  }
                  showDelete={true}
                  handleDelete={index => {
                    handleDeleteRow &&
                      handleDeleteRow(index, resourceId, 'supportiveProtocols');
                  }}
                  editableMode={isEdit}
                />
              </DenseAccordionDetails>
            </DenseAccordion>
            {/* dischargeInstruction.length > 0 &&  */}
            {/* {!hideDischargeInstruction && (
              <DenseAccordion elevation={0} defaultExpanded={true}>
                <DenseAccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <PinkText>On Discharge Instructions</PinkText>
                </DenseAccordionSummary>
                <DenseAccordionDetails>
                  <EditableTable
                    rows={dischargeInstruction}
                    headCells={dischargeInstructionHeadCells}
                    showAddInputRow={true}
                    addInput={
                      <AddInput
                        options={drugListResponse}
                        handleChangeInput={handleChangeInput}
                        handleDrugChange={handleDrugChange}
                        keyTable={'dischargeInstruction'}
                      />
                    }
                    showDelete={true}
                    handleDelete={index => {
                      handleDeleteRow &&
                        handleDeleteRow(index, id, 'dischargeInstruction');
                    }}
                    editableMode={isEdit} //handle this based on flag
                  />
                </DenseAccordionDetails>
              </DenseAccordion>
            )} */}
          </Box>
        </AccordionDetails>
      </DenseAccordion>
    </Box>
  );
}

export default TableWrapper;
