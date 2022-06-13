/*eslint-disable*/
import React from 'react';
import ViewTable from '../../../components/table/ViewTable';
import { NO_RECORD } from '../../../utils/constants';

export default function LifestyleTable(props) {
  const [pageData, setPageData] = React.useState([
    { display: 'Tobacco', value: '' },
    { display: 'Alcohol', value: '' },
    { display: 'Drug', value: '' },
    { display: 'Diet', value: '' },
  ]);

  React.useEffect(() => {
    // console.log(props.Data)

    if (props.Data.length > 0) {
      let lifeStyleIndicators = props.Data;

      let packsPerDay = '-';
      let alcoholDurationText = '-';
      let drugDurationText = '-';
      let diet = { code: '', display: '-' };

      let SmokingData = lifeStyleIndicators.find(
        val => val.resourceType === 'Smoking',
      );
      if (SmokingData != undefined) {
        packsPerDay =
          SmokingData.valueCodeableConcept &&
          SmokingData.valueCodeableConcept.text;
      }
      let DrinkingData = lifeStyleIndicators.find(
        val => val.resourceType === 'Drinking',
      );
      if (DrinkingData !== undefined) {
        alcoholDurationText =
          DrinkingData.valueCodeableConcept &&
          DrinkingData.valueCodeableConcept.code === 'Yes' &&
          DrinkingData.valueCodeableConcept.text;
      }
      let DrugData = lifeStyleIndicators.find(
        val => val.resourceType === 'Drug',
      );

      if (DrugData !== undefined) {
        // drugUse = DrugData.use
        drugDurationText =
          DrugData.valueCodeableConcept &&
          DrugData.valueCodeableConcept.code === 'Yes' &&
          DrugData.valueCodeableConcept.text;
      }

      let FoodData = lifeStyleIndicators.find(
        val => val.resourceType === 'Food',
      );

      if (FoodData !== undefined) {
        diet =
          FoodData.valueCodeableConcept != null &&
          FoodData.valueCodeableConcept.display != null
            ? {
                code: FoodData.valueCodeableConcept.code,
                display: FoodData.valueCodeableConcept.display,
              }
            : { code: '', display: '' };
      }

      setPageData([
        { display: 'Tobacco', value: packsPerDay },
        {
          display: 'Alcohol',
          value: alcoholDurationText,
        },
        { display: 'Drug', value: drugDurationText },
        { display: 'Diet', value: diet.display },
      ]);
    }
  }, [props.Data]);

  let rows = (props.Data.length > 0 && pageData) || [];
  const defaultHeadCells = [
    {
      id: 'display',
      label: '',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}>{value}</span>;
      },
    },
    {
      id: 'value',
      label: '',
      render: ({ value }) => {
        return value || '-';
      },
    },
  ];

  return (
    <>
      {rows && rows.length > 0 > 0 ? (
        <ViewTable
          rows={rows}
          headCells={defaultHeadCells}
          pagination={false}
          withoutHeader={true}
        />
      ) : (
        NO_RECORD
      )}
    </>
  );
}
