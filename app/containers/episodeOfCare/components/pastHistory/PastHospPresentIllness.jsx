import React, { useEffect, useState } from 'react';
import TextDateText from '../../../../components/hocs/wrappers/TextDateText';
import UserContext from '../../MyStateContext';
import { v4 as uuidv4 } from 'uuid';

function PastHospPresentIllness(props) {
  const [storedData, setStoredData] = useState([]);
  const user = React.useContext(UserContext);
  useEffect(() => {
    setStoredData(props.prevData);
  }, [props.prevData]);

  const handleUpdateStoredData = data => {
    setStoredData(data);
    user.setPertainingIllnessData(data);
  };
  const handleSaveEach = (reasonInput, dateOfHospzn, inputNote) => {
    setStoredData([
      ...storedData,
      {
        note: inputNote !== '' ? inputNote : null,
        description: reasonInput,
        effectiveDateTime: dateOfHospzn || null,
        resourceId: uuidv4(),
      },
    ]);
    user.setCheckPertainingIllness(true);
  };
  const handleSaveEdit = (
    reasonInput,
    dateOfHospzn,
    inputNote,
    id,
    editIndex,
  ) => {
    const filteredStoredData = [...storedData];
    filteredStoredData[editIndex] = {
      note: inputNote !== '' ? inputNote : null,
      description: reasonInput,
      effectiveDateTime: dateOfHospzn || null,
      resourceId: id,
    };
    setStoredData([...filteredStoredData]);
    user.setCheckPertainingIllness(true);
  };
  return (
    <>
      <TextDateText
        size="small"
        type="pastHospitalPresentIllness"
        placeholderOne="Reason For Hospitalization"
        placeholderTwo="Enter Note"
        display="display"
        data={storedData}
        updateStoredData={handleUpdateStoredData}
        checkAnyUpdate={() => user.setCheckPertainingIllness(true)}
        deleteData={data => user.setDelsetPertainingIllnessData(data)}
        saveData={handleSaveEach}
        saveEditData={handleSaveEdit}
      />
    </>
  );
}

export default PastHospPresentIllness;
