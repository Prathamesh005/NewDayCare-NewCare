import { Box } from '@material-ui/core';
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
} from '../../../../../../../../../components';
import { ListSkeleton } from '../../../../../../../../../components/skeleton';

function OrganizationsList() {
  const history = useHistory();
  const [LocalLoader, setLocalLoader] = useState(false);
  const [resourceId, setResourceId] = useState(uuidv4());
  const [addInputRowShow, setAddInputRowShow] = useState(false);
  const [saveToggle, setSaveToggle] = useState(false);
  const [hospitalList, setHospitalList] = useState([
    {
      resourceId: 'bf48fa22-6c38-47c6-9b15-b2ac2321d22f',
      hospitalClinicName: 'Oncowin Cancer Clinic',
      location: 'Thane',
      status: 'Active',
    },
    {
      resourceId: '688b21a3-b523-48fc-8b58-d7ee771db6a9',
      hospitalClinicName: 'Sanjivani Hospital',
      location: '',
      status: 'Inactive',
    },
  ]);
  //   console.log('hospitalList', hospitalList);
  const [updatedHospitalList, setUpdatedHospitalList] = useState([]);
  // console.log('updatedHospitalList',updatedHospitalList);

  const [updatedListWhenAdd, setUpdatedListWhenAdd] = useState([]);
  const [newObjWhenAdd, setNewObjWhenAdd] = useState({
    hospitalClinicName: '',
    location: '',
    status: '',
    resourceId: uuidv4(),
  });
  const [editedRowIndex, setEditedRowIndex] = useState(null);

  const [hospitalListValueSet, setHospitalListValueSet] = useState([
    {
      code: 'OncowinCancerClinic',
      display: 'Oncowin Cancer Clinic',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'Jupiter Hospitals',
      display: 'Jupiter Hospitals',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'SanjivaniHospital',
      display: 'Sanjivani Hospital',
      __typename: 'ValueSetConceptRefComponent',
    },
  ]);
  const [locationListValueSet, setLocationListValueSet] = useState([
    {
      code: 'THANE',
      display: 'Thane',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'MUMBAI',
      display: 'Mumbai',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'PUNE',
      display: 'Pune',
      __typename: 'ValueSetConceptRefComponent',
    },
  ]);
  const [statusListValueSet, setStatusListValueSet] = useState([
    {
      code: 'ACTIVE',
      display: 'Active',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'SUSPENDED',
      display: 'Suspended',
      __typename: 'ValueSetConceptRefComponent',
    },
    {
      code: 'INACTIVE',
      display: 'Inactive',
      __typename: 'ValueSetConceptRefComponent',
    },
  ]);

  useEffect(() => {
    if (saveToggle) {
      //add rest api call here
      setHospitalList(
        addInputRowShow ? updatedListWhenAdd : updatedHospitalList,
      );
      setSaveToggle(false);
      setNewObjWhenAdd({
        hospitalClinicName: '',
        location: '',
        status: '',
        resourceId: uuidv4(),
      });
      setAddInputRowShow(false);
      setEditedRowIndex(null);
    } else {
    }
  }, [saveToggle]);

  const getAddNewTableObject = (getObj = {}, key, subkey) => {
    if (key === 'dischargeInstructions') {
      let test = _.set(newObjWhenAdd, subkey, getObj.display);
      return test;
    }
  };

  const handleAddClick = (key, id, value, subkey) => {
    console.log('handleAddClick');

    if (key) {
      if (key === 'dischargeInstructions') {
        const updateList = [
          ...hospitalList,
          getAddNewTableObject(value, key, subkey),
        ];
        setUpdatedListWhenAdd(updateList);
      }
    }
  };

  const handleHopitalChange = (e, value, key, id, subkey) => {
    console.log('handleHopitalChange');
    handleAddClick(key, id, value, subkey);
  };

  const handleLocationChange = (e, value, key, id, subkey) => {
    console.log('handleLocationChange');
    handleAddClick(key, id, value, subkey);
  };

  const handleStatusChange = (e, value, key, id, subkey) => {
    console.log('handleStatusChange');
    handleAddClick(key, id, value, subkey);
  };

  // delete
  const handleDeleteRow = (index, id, key) => {
    console.log('handleDeleteRow');
    if (key) {
      if (key === 'dischargeInstructions') {
        const updatedList = hospitalList.filter((obj, ind) => ind !== index);
        setHospitalList(updatedList);
        setUpdatedHospitalList(updatedList);
      }
    }
  };
  const handleEditRow = (index, row) => {
    console.log('handleEditRow');
    setEditedRowIndex(index);
    setUpdatedHospitalList(hospitalList);
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

    const updatedList = hospitalList.map((obj, objKey) => {
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

    setUpdatedHospitalList(updatedList);
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
            setUpdatedListWhenAdd(hospitalList);
            setNewObjWhenAdd({
              hospitalClinicName: '',
              location: '',
              status: '',
              resourceId: uuidv4(),
            });
            setUpdatedHospitalList(hospitalList);
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
      id: 'hospitalClinicName',
      label: 'Hospital/Clinic Name',
      // inputType: 'autocomplete',
      width: '350px',
      render: ({ value, row, index, headCellId }) => {
        return (
          <>
            {editedRowIndex === index ? (
              <OutlinedAutoCompleteInput
                style={{ width: 300 }}
                placeholder="Search Hospital/Clinic"
                onChange={(e, newValue) =>
                  handleDischargeAutocomplete(
                    e,
                    newValue.display,
                    index,
                    row,
                    headCellId,
                  )
                }
                options={hospitalListValueSet}
                getOptionLabel={option => option.display || ''}
                value={
                  (hospitalListValueSet &&
                    hospitalListValueSet.find(obj => {
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
      id: 'location',
      label: 'Location',
      width: '300px',
      // inputType: 'autocomplete',
      render: ({ value, row, index, headCellId }) => {
        return (
          <>
            {editedRowIndex === index ? (
              <OutlinedAutoCompleteInput
                style={{ width: 250 }}
                placeholder="Search By Location"
                onChange={(e, newValue) =>
                  handleDischargeAutocomplete(
                    e,
                    newValue.display,
                    index,
                    row,
                    headCellId,
                  )
                }
                options={locationListValueSet}
                getOptionLabel={option => option.display || ''}
                value={
                  (locationListValueSet &&
                    locationListValueSet.find(obj => {
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
      id: 'status',
      label: 'Status',
      render: ({ value, row, index, headCellId }) => {
        return (
          <>
            {editedRowIndex === index ? (
              <OutlinedAutoCompleteInput
                style={{ width: 200 }}
                placeholder="Search Status"
                onChange={(e, newValue) =>
                  handleDischargeAutocomplete(
                    e,
                    newValue.display,
                    index,
                    row,
                    headCellId,
                  )
                }
                options={statusListValueSet}
                getOptionLabel={option => option.display || ''}
                value={
                  (statusListValueSet &&
                    statusListValueSet.find(obj => {
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
                ? updatedHospitalList && updatedHospitalList.length > 0
                  ? updatedHospitalList
                  : hospitalList
                : hospitalList
            }
            headCells={dischargeInstructionHeadCells}
            headBackground={'#f0f0f0'}
            pagination={false}
            showAddInputRow={addInputRowShow} //addInputRowShow
            addInput={
              editedRowIndex === null && (
                <Box display={'flex'} justifyContent="space-between">
                  <Box display="flex">
                    <OutlinedAutoCompleteInput
                      placeholder="Search Hospital/Clinic"
                      onChange={(e, newValue) =>
                        handleHopitalChange(
                          e,
                          newValue,
                          (keyTable = 'dischargeInstructions'),
                          resourceId,
                          (subKey = 'hospitalClinicName'),
                        )
                      }
                      options={hospitalListValueSet}
                      getOptionLabel={option => option.display || ''}
                      value={
                        (hospitalListValueSet &&
                          hospitalListValueSet.find(obj => {
                            return (
                              obj.display === newObjWhenAdd.hospitalClinicName
                            );
                          })) || {
                          code: '',
                          display: '',
                        }
                      }
                      style={{ width: 300 }}
                    />

                    <OutlinedAutoCompleteInput
                      placeholder="Search By Location"
                      onChange={(e, newValue) =>
                        handleLocationChange(
                          e,
                          newValue,
                          (keyTable = 'dischargeInstructions'),
                          resourceId,
                          (subKey = 'location'),
                        )
                      }
                      options={locationListValueSet}
                      getOptionLabel={option => option.display || ''}
                      value={
                        (locationListValueSet &&
                          locationListValueSet.find(obj => {
                            return obj.display === newObjWhenAdd.location;
                          })) || {
                          code: '',
                          display: '',
                        }
                      }
                      style={{ width: 250, marginLeft: 50 }}
                    />

                    <OutlinedAutoCompleteInput
                      placeholder="Search Status"
                      onChange={(e, newValue) =>
                        handleStatusChange(
                          e,
                          newValue,
                          (keyTable = 'dischargeInstructions'),
                          resourceId,
                          (subKey = 'status'),
                        )
                      }
                      options={statusListValueSet}
                      getOptionLabel={option => option.display || ''}
                      value={
                        (statusListValueSet &&
                          statusListValueSet.find(obj => {
                            return obj.display === newObjWhenAdd.status;
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
                      hospitalList &&
                        hospitalList.length > 0 &&
                        hospitalList.length + 1,
                    )}
                  </Box>
                </Box>
              )
            }
          />

          <PinkAddCircleButton
            title={'Add Hosp/Clinic'}
            onClick={() => {
              setAddInputRowShow(true);
              setEditedRowIndex(null);
            }}
            size="small"
            style={{
              width: 160,
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

export default OrganizationsList;
