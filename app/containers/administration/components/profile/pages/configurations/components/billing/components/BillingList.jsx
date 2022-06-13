import { Box, InputAdornment, Typography } from '@material-ui/core';
import { Check, Clear, Edit } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  EditableTableWithCrud,
  OutlinedAutoCompleteInput,
  PinkAddCircleButton,
  SquareIconButton,
  GrayTextInput,
  FreeSoloAutoComplete,
} from '../../../../../../../../../components';
import { ListSkeleton } from '../../../../../../../../../components/skeleton';

function BillingList() {
  const history = useHistory();
  const [LocalLoader, setLocalLoader] = useState(false);
  const [resourceId, setResourceId] = useState(uuidv4());
  const [addInputRowShow, setAddInputRowShow] = useState(false);
  const [saveToggle, setSaveToggle] = useState(false);
  const [billingList, setBillingList] = useState([
    {
      resourceId: 'bf48fa22-6c38-47c6-9b15-b2ac2321d22f',
      feeType: 'Fee 1',
      fee: '4500',
    },
    {
      resourceId: '688b21a3-b523-48fc-8b58-d7ee771db6a9',
      feeType: 'Fee 2',
      fee: '5000',
    },
  ]);
  console.log('billingList', billingList);
  const [updatedBillingList, setUpdatedBillingList] = useState([]);
  // console.log('updatedBillingList',updatedBillingList);

  const [updatedListWhenAdd, setUpdatedListWhenAdd] = useState([]);
  const [newObjWhenAdd, setNewObjWhenAdd] = useState({
    feeType: '',
    fee: '',
    resourceId: uuidv4(),
  });
  const [editedRowIndex, setEditedRowIndex] = useState(null);

  const [feeTypeValueSet, setFeeTypeValueSet] = useState([
    {
      code: 'Fee1',
      display: 'Fee 1',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'Jupiter Hospitals',
      display: 'Fee 2',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'SanjivaniHospital',
      display: 'Fee 3',
      __typename: 'ValueSetConceptRefComponent',
    },
  ]);

  useEffect(() => {
    if (saveToggle) {
      //add rest api call here
      setBillingList(addInputRowShow ? updatedListWhenAdd : updatedBillingList);
      setSaveToggle(false);
      setNewObjWhenAdd({
        feeType: '',
        fee: '',
        resourceId: uuidv4(),
      });
      setAddInputRowShow(false);
      setEditedRowIndex(null);
    } else {
    }
  }, [saveToggle]);

  const getAddNewTableObject = (getObj = {}, key, subkey) => {
    if (key === 'dischargeInstructions') {
      let test = _.set(newObjWhenAdd, subkey, getObj);
      return test;
    }
  };

  const handleAddClick = (key, id, value, subkey) => {
    console.log('handleAddClick');

    if (key) {
      if (key === 'dischargeInstructions') {
        const updateList = [
          ...billingList,
          getAddNewTableObject(value, key, subkey),
        ];
        setUpdatedListWhenAdd(updateList);
      }
    }
  };

  const handleFeeTypeChange = (e, value, key, id, subkey) => {
    console.log('handleFeeTypeChange');
    handleAddClick(key, id, value, subkey);
  };

  const handleFeeChange = (e, value, key, id, subkey) => {
    console.log('handleFeeChange');
    handleAddClick(key, id, value, subkey);
  };

  // delete
  const handleDeleteRow = (index, id, key) => {
    console.log('handleDeleteRow');
    if (key) {
      if (key === 'dischargeInstructions') {
        const updatedList = billingList.filter((obj, ind) => ind !== index);
        setBillingList(updatedList);
        setUpdatedBillingList(updatedList);
      }
    }
  };
  const handleEditRow = (index, row) => {
    console.log('handleEditRow');
    setEditedRowIndex(index);
    setUpdatedBillingList(billingList);
  };

  const handleDischargeAutocomplete = (
    e,
    newValueString,
    index,
    row,
    headCellId,
    subKey,
  ) => {
    console.log('handleDischargeAutocomplete');
    const updatedList = billingList.map((obj, objKey) => {
      if (index === objKey) {
        const rowObj = { ...row };

        if (headCellId === 'duration') {
          return {
            ...rowObj,
            duration: { ...rowObj.duration, [`${subKey}`]: newValueString },
          };
        } else {
          //row,id,value gives object with replace value
          return _.set(rowObj, headCellId, newValueString);
        }
      } else {
        return obj;
      }
    });

    setUpdatedBillingList(updatedList);
  };

  const saveBtn = () => {
    return (
      <>
        <SquareIconButton
          onClick={() => {
            setSaveToggle(true);
          }}
          style={{ padding: 4 }}
        >
          <Check style={{ fontSize: '1.2rem', color: 'green' }} />
        </SquareIconButton>
      </>
    );
  };

  const cancleBtn = editedRowIndex => {
    return (
      <>
        <SquareIconButton
          onClick={() => {
            setEditedRowIndex(editedRowIndex);
            setUpdatedListWhenAdd(billingList);
            setNewObjWhenAdd({
              feeType: '',
              fee: '',
              resourceId: uuidv4(),
            });
            setUpdatedBillingList(billingList);
          }}
          style={{ padding: 4 }}
        >
          <Clear style={{ fontSize: '1.2rem', color: '#FF3399' }} />
        </SquareIconButton>
      </>
    );
  };

  const dischargeInstructionHeadCells = [
    {
      id: 'feeType',
      label: 'Fee Type',
      //   width: '350px',
      render: ({ value, row, index, headCellId }) => {
        return (
          <>
            {editedRowIndex === index ? (
              <FreeSoloAutoComplete
                style={{
                  width: 300,
                }}
                options={feeTypeValueSet}
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
                onChange={(e, value) => {
                  if (typeof value === 'string') {
                    handleDischargeAutocomplete(
                      e,
                      value,
                      index,
                      row,
                      headCellId,
                    );
                  } else if (value && value.inputValue) {
                    // Create a new value from the user input
                    handleDischargeAutocomplete(
                      e,
                      value.inputValue,
                      index,
                      row,
                      headCellId,
                    );
                  } else {
                    handleDischargeAutocomplete(
                      e,
                      value.display,
                      index,
                      row,
                      headCellId,
                    );
                  }
                }}
                value={
                  feeTypeValueSet &&
                  feeTypeValueSet.find(obj => {
                    return obj.display === value;
                  })
                    ? feeTypeValueSet.find(obj => {
                        return obj.display === value;
                      })
                    : value
                    ? { code: value, display: value }
                    : {
                        code: '',
                        display: '',
                      }
                }
              />
            ) : (
              <span>{value}</span>
            )}
          </>
        );
      },
    },
    {
      id: 'fee',
      label: 'Fee',
      maxWidth: '250px',
      width: '250px',
      render: ({ value, row, index, headCellId }) => {
        return (
          <>
            {editedRowIndex === index ? (
              <GrayTextInput
                style={{
                  width: 200,
                }}
                name="fee"
                type="text"
                placeholder="Enter Fee"
                value={value}
                onChange={(e, newValue) =>
                  handleDischargeAutocomplete(
                    e,
                    e.target.value,
                    index,
                    row,
                    headCellId,
                  )
                }
                startAdornment={
                  <InputAdornment position="start" style={{ color: '#000000' }}>
                    <Typography variant="h4">₹</Typography>
                  </InputAdornment>
                }
              />
            ) : (
              <span> &#8377; {`${value}`}</span>
            )}
          </>
        );
      },
    },

    {
      id: 'delete',
      label: '',
      maxWidth: '50px',
      width: '50px',
      render: ({ value, row, index }) => {
        return (
          <>
            {editedRowIndex !== index ? (
              <SquareIconButton
                onClick={() =>
                  handleDeleteRow(index, '', 'dischargeInstructions')
                }
                style={{ padding: 4 }}
              >
                <DeleteIcon style={{ fontSize: '1.2rem' }} />
              </SquareIconButton>
            ) : (
              saveBtn()
            )}
          </>
        );
      },
    },
    {
      id: 'edit',
      label: '',
      maxWidth: '50px',
      width: '50px',
      render: ({ value, row, index }) => {
        return (
          <>
            {editedRowIndex !== index ? (
              <SquareIconButton
                onClick={() => {
                  handleEditRow(index, row);
                }}
                style={{ padding: 4 }}
              >
                <Edit style={{ fontSize: '1.2rem' }} />
              </SquareIconButton>
            ) : (
              cancleBtn(null)
            )}
          </>
        );
      },
    },
  ];
  let subKey = '';
  let keyTable = '';
  return (
    <Fragment>
      {!LocalLoader ? (
        <>
          <EditableTableWithCrud
            rows={
              editedRowIndex !== null
                ? updatedBillingList && updatedBillingList.length > 0
                  ? updatedBillingList
                  : billingList
                : billingList
            }
            headCells={dischargeInstructionHeadCells}
            headBackground={'#f0f0f0'}
            pagination={false}
            showAddInputRow={addInputRowShow} //addInputRowShow
            addInput={
              editedRowIndex === null && (
                <Box display={'flex'} justifyContent="space-between">
                  <Box
                    display="flex"
                    justifyContent={'space-between'}
                    style={{ width: '100%' }}
                  >
                    <FreeSoloAutoComplete
                      style={{
                        width: 300,
                      }}
                      placeholder="Enter Fee Type"
                      options={feeTypeValueSet}
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
                      onChange={(e, value) => {
                        if (typeof value === 'string') {
                          handleFeeTypeChange(
                            e,
                            value.display,
                            (keyTable = 'dischargeInstructions'),
                            resourceId,
                            (subKey = 'feeType'),
                          );
                        } else if (value && value.inputValue) {
                          // Create a new value from the user input
                          handleFeeTypeChange(
                            e,
                            value.display,
                            (keyTable = 'dischargeInstructions'),
                            resourceId,
                            (subKey = 'feeType'),
                          );
                        } else {
                          handleFeeTypeChange(
                            e,
                            value.display,
                            (keyTable = 'dischargeInstructions'),
                            resourceId,
                            (subKey = 'feeType'),
                          );
                        }
                      }}
                      value={
                        feeTypeValueSet &&
                        feeTypeValueSet.find(obj => {
                          return obj.display === newObjWhenAdd.feeType;
                        })
                          ? feeTypeValueSet.find(obj => {
                              return obj.display === newObjWhenAdd.feeType;
                            })
                          : newObjWhenAdd.feeType
                          ? {
                              code: newObjWhenAdd.feeType,
                              display: newObjWhenAdd.feeType,
                            }
                          : {
                              code: '',
                              display: '',
                            }
                      }
                    />

                    <GrayTextInput
                      style={{
                        width: 200,
                        marginRight: 55,
                      }}
                      name="fee"
                      type="number"
                      placeholder="Enter Fee"
                      value={newObjWhenAdd.fee}
                      onChange={(e, newValue) =>
                        handleFeeChange(
                          e,
                          e.target.value,
                          (keyTable = 'dischargeInstructions'),
                          resourceId,
                          (subKey = 'fee'),
                        )
                      }
                      startAdornment={
                        <InputAdornment
                          position="start"
                          style={{ color: '#000000' }}
                        >
                          <Typography variant="h4">₹</Typography>
                        </InputAdornment>
                      }
                    />
                  </Box>
                  <Box
                    style={{ width: '80px' }}
                    display={'flex'}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    {saveBtn()}
                    {cancleBtn(
                      billingList &&
                        billingList.length > 0 &&
                        billingList.length + 1,
                    )}
                  </Box>
                </Box>
              )
            }
          />

          <PinkAddCircleButton
            title={'Add Fee'}
            onClick={() => {
              setAddInputRowShow(true);
              setEditedRowIndex(null);
            }}
            size="small"
            style={{
              width: 120,
              borderRadius: 50,
              position: 'fixed',
              bottom: 40,
              right: 40,
            }}
          />
        </>
      ) : (
        <ListSkeleton count={10} />
      )}
    </Fragment>
  );
}

export default BillingList;
