import { Box } from '@material-ui/core';
import { Check, Clear, Edit } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  EditableTableWithCrud,
  OutlinedAutoCompleteInput,
  PinkAddCircleButton,
  SquareIconButton,
} from '../../../../components';

function AdminList() {
  const history = useHistory();
  const [resourceId, setResourceId] = useState(uuidv4());
  const [addInputRowShow, setAddInputRowShow] = useState(false);
  const [saveToggle, setSaveToggle] = useState(false);

  const listFrequencyValueSet = [
    {
      code: 'BID',
      display: '9766692757',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'TID',
      display: '9993398819',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'QID',
      display: '9766692767',
      __typename: 'ValueSetConceptRefComponent',
    },
  ];
  const listDrugFormValueSet = [
    {
      code: '421026006|Tablet',
      display: 'Aanand Deshmukh',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: '385049006|Capsule',
      display: 'Siddharth Karmarkar',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: '385032004|Syrup',
      display: 'Rashmi Nivsarkar',
      __typename: 'ValueSetConceptRefComponent',
    },
  ];

  const [dischargeInstructionList, setDischargeInstructionList] = useState([
    {
      resourceId: 'bf48fa22-6c38-47c6-9b15-b2ac2321d22f',
      drugFrom: 'Aanand Deshmukh',
      frequency: '9766692757',
      comment: 'For 2 days',
    },
    {
      resourceId: '688b21a3-b523-48fc-8b58-d7ee771db6a9',
      drugFrom: 'Rashmi Nivsarkar',
      frequency: '',
      comment: 'For 4 days then SOS if acidity',
    },
  ]);
  console.log('dischargeInstructionList', dischargeInstructionList);
  const [
    updatedDischargeInstructionList,
    setUpdatedDischargeInstructionList,
  ] = useState([]);
  // console.log(
  //   'updatedDischargeInstructionList',
  //   updatedDischargeInstructionList,
  // );

  const [updatedListWhenAdd, setUpdatedListWhenAdd] = useState([]);
  const [newObjWhenAdd, setNewObjWhenAdd] = useState({
    administrationDetail: '',
    comment: '',
    drugName: '',
    drugFrom: '',
    duration: '',
    frequency: '',
    resourceId: uuidv4(),
  });

  useEffect(() => {
    if (saveToggle) {
      //add api call here
      setDischargeInstructionList(
        addInputRowShow ? updatedListWhenAdd : updatedDischargeInstructionList,
      );
      setSaveToggle(false);
      setNewObjWhenAdd({
        administrationDetail: '',
        comment: '',
        drugName: '',
        drugFrom: '',
        duration: '',
        frequency: '',
        resourceId: uuidv4(),
      });
      setAddInputRowShow(false);
      setEditedRowIndex(null);
    } else {
    }
  }, [saveToggle]);

  const getAddNewTableObject = (drugObj = {}, key, subkey) => {
    if (key === 'dischargeInstructions') {
      let test = _.set(newObjWhenAdd, subkey, drugObj.display);
      return test;
    }
  };

  const handleAddClick = (key, id, value, subkey) => {
    console.log('handleAddClick');

    if (key) {
      if (key === 'dischargeInstructions') {
        const updateList = [
          ...dischargeInstructionList,
          getAddNewTableObject(value, key, subkey),
        ];
        setUpdatedListWhenAdd(updateList);
        // setDischargeInstructionList(updateList);
      }
    }
  };

  const handleDrugChange = (e, value, key, id, subkey) => {
    console.log('handleDrugChange');
    handleAddClick(key, id, value, subkey);
    // setAddInputRowShow(false);
  };

  const handleFrequencyChange = (e, value, key, id, subkey) => {
    console.log('handleFrequencyChange');
    handleAddClick(key, id, value, subkey);
    // setAddInputRowShow(false);
  };

  // delete
  const handleDeleteRow = (index, id, key) => {
    console.log('handleDeleteRow');
    if (key) {
      if (key === 'dischargeInstructions') {
        const updatedList = dischargeInstructionList.filter(
          (obj, ind) => ind !== index,
        );
        setDischargeInstructionList(updatedList);
        setUpdatedDischargeInstructionList(updatedList);
      }
    }
  };
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  const handleEditRow = (index, row) => {
    console.log('handleEditRow');
    setEditedRowIndex(index);
    setUpdatedDischargeInstructionList(dischargeInstructionList);

    // if (key) {
    //   if (key === 'dischargeInstructions') {
    //     const updatedList = dischargeInstructionList.filter(
    //       (obj, ind) => ind !== index,
    //     );
    //     setDischargeInstructionList(updatedList);
    //   }
    // }
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

    const updatedList = dischargeInstructionList.map((obj, objKey) => {
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

    setUpdatedDischargeInstructionList(updatedList);
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
            setUpdatedListWhenAdd(dischargeInstructionList);
            setNewObjWhenAdd({
              administrationDetail: '',
              comment: '',
              drugName: '',
              drugFrom: '',
              duration: '',
              frequency: '',
              resourceId: uuidv4(),
            });
            setUpdatedDischargeInstructionList(dischargeInstructionList);
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
      id: 'drugFrom',
      label: 'Admin Name',
      // inputType: 'autocomplete',
      width: '300px',
      render: ({ value, row, index, headCellId }) => {
        return (
          <>
            {editedRowIndex === index ? (
              <OutlinedAutoCompleteInput
                style={{ width: 200 }}
                onChange={(e, newValue) =>
                  handleDischargeAutocomplete(
                    e,
                    newValue.display,
                    index,
                    row,
                    headCellId,
                  )
                }
                options={listDrugFormValueSet}
                getOptionLabel={option => option.display || ''}
                value={
                  (listDrugFormValueSet &&
                    listDrugFormValueSet.find(obj => {
                      return obj.display === value;
                    })) || {
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
      id: 'frequency',
      label: 'Phone',
      width: '300px',
      // inputType: 'autocomplete',
      render: ({ value, row, index, headCellId }) => {
        return (
          <>
            {editedRowIndex === index ? (
              <OutlinedAutoCompleteInput
                style={{ width: 200 }}
                onChange={(e, newValue) =>
                  handleDischargeAutocomplete(
                    e,
                    newValue.display,
                    index,
                    row,
                    headCellId,
                  )
                }
                options={listFrequencyValueSet}
                getOptionLabel={option => option.display || ''}
                value={
                  (listFrequencyValueSet &&
                    listFrequencyValueSet.find(obj => {
                      return obj.display === value;
                    })) || {
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
      id: 'addedOn',
      label: 'Added On',
      render: ({ value, row, index }) => {
        return '10/04/2022';
      },
    },
    {
      id: 'status',
      label: 'Status',
      render: ({ value, row, index }) => {
        return 'Active';
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
  let keyTable = '';
  let subKey = '';
  return (
    <>
      <EditableTableWithCrud
        rows={
          editedRowIndex !== null
            ? updatedDischargeInstructionList &&
              updatedDischargeInstructionList.length > 0
              ? updatedDischargeInstructionList
              : dischargeInstructionList
            : dischargeInstructionList
        }
        headCells={dischargeInstructionHeadCells}
        headBackground={'#f0f0f0'}
        pagination={false}
        showAddInputRow={addInputRowShow}
        addInput={
          editedRowIndex === null && (
            <Box display={'flex'} justifyContent="space-between">
              <Box display="flex">
                <OutlinedAutoCompleteInput
                  placeholder="Admin Profile"
                  onChange={(e, newValue) =>
                    handleDrugChange(
                      e,
                      newValue,
                      (keyTable = 'dischargeInstructions'),
                      resourceId,
                      (subKey = 'drugFrom'),
                    )
                  }
                  options={listDrugFormValueSet}
                  getOptionLabel={option => option.display || ''}
                  value={
                    (listDrugFormValueSet &&
                      listDrugFormValueSet.find(obj => {
                        return obj.display === newObjWhenAdd.drugFrom;
                      })) || {
                      code: '',
                      display: '',
                    }
                  }
                  style={{ width: '200px' }}
                />

                <OutlinedAutoCompleteInput
                  placeholder="Search By Phone"
                  onChange={(e, newValue) =>
                    handleFrequencyChange(
                      e,
                      newValue,
                      (keyTable = 'dischargeInstructions'),
                      resourceId,
                      (subKey = 'frequency'),
                    )
                  }
                  options={listFrequencyValueSet}
                  getOptionLabel={option => option.display || ''}
                  value={
                    (listFrequencyValueSet &&
                      listFrequencyValueSet.find(obj => {
                        return obj.display === newObjWhenAdd.frequency;
                      })) || {
                      code: '',
                      display: '',
                    }
                  }
                  style={{ width: '200px', marginLeft: 50 }}
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
                  dischargeInstructionList &&
                    dischargeInstructionList.length > 0 &&
                    dischargeInstructionList.length + 1,
                )}
              </Box>
            </Box>
          )
        }
      />

      <PinkAddCircleButton
        title={'Add Admin'}
        onClick={() => {
          setAddInputRowShow(true);
          setEditedRowIndex(null);
        }}
        size="small"
        style={{
          width: 140,
          borderRadius: 50,
          position: 'fixed',
          bottom: 40,
          right: 40,
        }}
      />
    </>
  );
}

export default AdminList;
