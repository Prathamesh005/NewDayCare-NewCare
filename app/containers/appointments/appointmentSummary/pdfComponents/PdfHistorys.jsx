import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontStyle: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
    paddingBottom: 15,
  },
  rowHead: {
    flexDirection: 'row',
    fontWeight: 500,
    fontSize: 10,
    marginHorizontal: 22,
    marginBottom: 4,
  },
  leftContainer: {
    width: '100%',
    marginRight: 5,
  },
  rightContainer: {
    width: '50%',
    marginLeft: 5,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionHead: {
    width: '100%',
    textAlign: 'left',
    fontSize: 9,
    fontWeight: '700',
    // color: "#494949",
    borderBottom: '1 solid #eaeaea',
  },
  row: {
    flexDirection: 'row',
    // height: 15,
    marginTop: 5,
    fontStyle: 'bold',
    paddingLeft: 17,
    paddingRight: 17,
    fontSize: 10,
  },
  description: {
    width: '35%',
    textAlign: 'left',
    paddingLeft: 6,
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
  values: {
    width: '65%',
    textAlign: 'left',
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
  colm: {
    width: '65%',
    flexDirection: 'column',
    alignItems: 'left',
    textAlign: 'left',
    fontSize: 9,
    // marginTop: 5,
  },
  colmInside: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'left',
    textAlign: 'left',
    fontSize: 9,
    // height: 15,
  },
  colmDescription: {
    width: '100%',
    textAlign: 'left',
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
  rowNew: {
    flexDirection: 'row',
    // alignItems: 'center',
    marginTop: 1,
    fontStyle: 'bold',
    paddingLeft: 17,
    paddingRight: 17,
    fontSize: 10,
  },
});

function PdfHistory(props) {
  const comorbidArray =
    (props && props.comorbidDataResult.length != 0) ||
    props.comorbidDataResult.length !== null ||
    props.comorbidDataResult.length !== undefined
      ? props.comorbidDataResult.map((item, index) => {
          return {
            nameOfCondition:
              item && item.code && item.code.display
                ? item.code.display
                : 'Nil',
            note: item && item.note ? item.note : '',
          };
        })
      : [];

  const familyResultArray =
    props && props.familyResult && props.familyResult
      ? props.familyResult.length != 0 ||
        props.familyResult.length !== null ||
        props.familyResult.length !== undefined
        ? props.familyResult.map((item, index) => {
            return {
              relation:
                item && item.relationship && item.relationship.display
                  ? item.relationship.display
                  : 'Nil',
              disease:
                item &&
                item.condition &&
                item.condition.length != 0 &&
                item.condition.length !== null &&
                item.condition.length !== undefined
                  ? item.condition[0]['code'] &&
                    item.condition[0]['code']['display']
                  : 'Nil',
              age:
                item &&
                item.condition &&
                item.condition.length != 0 &&
                item.condition.length !== null &&
                item.condition.length !== undefined
                  ? item.condition[0]['onSetAge']
                    ? item.condition[0]['onSetAge']
                    : 'Nil'
                  : 'Nil',
              status:
                item &&
                item.condition &&
                item.condition.length != 0 &&
                item.condition.length !== null &&
                item.condition.length !== undefined
                  ? item.condition[0]['outcome']
                    ? item.condition[0]['outcome']['display']
                      ? item.condition[0]['outcome']['display']
                      : ''
                    : ''
                  : '',
            };
          })
        : []
      : [];

  const lifeStyleArray = [];
  if (
    props &&
    props.LifestyleResult &&
    props.LifestyleResult &&
    props.LifestyleResult.length > 0
  ) {
    let Smoking = props.LifestyleResult.find(
      item => item.resourceType === 'Smoking',
    );
    let Drinking = props.LifestyleResult.find(
      item => item.resourceType === 'Drinking',
    );
    let Drug = props.LifestyleResult.find(item => item.resourceType === 'Drug');
    if (Smoking && Smoking.use === 'active') {
      lifeStyleArray.push(
        `${Smoking.resourceType}-${
          Smoking.valueCodeableConcept && Smoking.valueCodeableConcept.text
            ? Smoking.valueCodeableConcept.text
            : ''
        }-${
          Smoking.valueCodeableConcept && Smoking.valueCodeableConcept.display
            ? Smoking.valueCodeableConcept.display
            : ''
        }`,
      );
    }
    if (Drinking && Drinking.use === 'active') {
      lifeStyleArray.push(
        `${Drinking.resourceType}-${
          Drinking.valueCodeableConcept && Drinking.valueCodeableConcept.text
            ? Drinking.valueCodeableConcept.text
            : ''
        }`,
      );
    }
    if (Drug && Drug.use === 'active') {
      lifeStyleArray.push(
        `${Drug.resourceType}-${
          Drug.valueCodeableConcept && Drug.valueCodeableConcept.text
            ? Drug.valueCodeableConcept.text
            : ''
        }`,
      );
    }
  }
  const loadAllergy = [];
  if (
    props &&
    props.loadAllergyDataSuccess &&
    props.loadAllergyDataSuccess.length > 0
  ) {
    props.loadAllergyDataSuccess.map(item => {
      let testName =
        item.reaction &&
        item.reaction[0] &&
        item.reaction[0]['substance'] &&
        item.reaction[0]['substance']['display'];
      let note = item.note ? item.note : '';
      let str = '';
      if (!note) str = testName;
      else str = `${testName}${note ? ` - ${note}` : ''}`;
      if (str) loadAllergy.push(str);
    });
  }

  return (
    <View style={styles.titleContainer} wrap={false}>
      <View style={styles.rowHead}>
        <Text style={styles.descriptionHead}>Histories &amp; Condition</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {(props.summaryType === 'Detailed' ||
            (props.selectedState && props.selectedState.comorbidity)) && (
            <View style={styles.rowNew}>
              <Text style={styles.description}>Comorbid History: </Text>
              {comorbidArray.length > 0 ? (
                <View style={styles.colm}>
                  {comorbidArray.map((item, index) => {
                    return (
                      <View style={styles.colmInside}>
                        <Text
                          style={styles.colmDescription}
                          key={index.toString()}
                        >{`${item.nameOfCondition}${
                          item.note ? ` - ${item.note}` : ''
                        }`}</Text>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <Text style={styles.values}>{'Nil'}</Text>
              )}
            </View>
          )}
          {(props.summaryType === 'Detailed' ||
            (props.selectedState && props.selectedState.familyHistory)) && (
            <View style={styles.rowNew}>
              <Text style={styles.description}>Family History: </Text>
              {familyResultArray.length > 0 ? (
                <View style={styles.colm}>
                  {familyResultArray.map((item, index) => {
                    return (
                      <View style={styles.colmInside}>
                        <Text style={styles.colmDescription}>
                          {item.relation} - {item.disease} - {item.age} -{' '}
                          {item.status}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              ) : (
                <Text style={styles.values}>{'Nil'}</Text>
              )}
            </View>
          )}
          {(props.summaryType === 'Detailed' ||
            (props.selectedState &&
              props.selectedState.lifeStyleIndicators)) && (
            <View style={styles.rowNew}>
              <Text style={styles.description}>Lifestyle Indicators: </Text>
              <Text style={styles.values}>
                {lifeStyleArray.length > 0 ? lifeStyleArray.join(', ') : 'Nil'}
              </Text>
            </View>
          )}
          {(props.summaryType === 'Detailed' ||
            (props.selectedState && props.selectedState.allergy)) && (
            <View style={styles.rowNew}>
              <Text style={styles.description}>Allergy: </Text>
              <Text style={styles.values}>
                {loadAllergy.length > 0 ? loadAllergy.join(', ') : 'Nil'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
export default PdfHistory;
