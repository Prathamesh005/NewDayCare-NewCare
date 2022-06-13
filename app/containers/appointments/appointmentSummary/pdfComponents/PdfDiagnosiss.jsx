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
    height: 15,
    marginTop: 5,
    fontStyle: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 10,
  },
  description: {
    width: '50%',
    textAlign: 'left',
    paddingLeft: 6,
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
  descriptionNew: {
    width: '100%',
    textAlign: 'left',
    paddingLeft: 6,
    //color: "#494949",
    fontSize: 9,
    opacity: 0.9,
  },
  values: {
    width: '50%',
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
    marginTop: 5,
  },
  colmInside: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'left',
    textAlign: 'left',
    fontSize: 9,
    height: 15,
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
    alignItems: 'center',
    marginTop: 1,
    fontStyle: 'bold',
    paddingLeft: 17,
    paddingRight: 17,
    fontSize: 10,
  },
});

function PdfDiagnosis(props) {
  const verify =
    props &&
    props.diagnosisData &&
    props.diagnosisData.diagnosisCondition &&
    props.diagnosisData.diagnosisCondition.verificationStatus &&
    props.diagnosisData.diagnosisCondition.verificationStatus.display;
  // const status = finalChoices.find(item => item.value === verify)
  const cancerType =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData.diagnosisCondition.code
        ? props.diagnosisData.diagnosisCondition.code.display
        : ''
      : '';
  const cancerCode =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData.diagnosisCondition.code
        ? props.diagnosisData.diagnosisCondition.code.text
        : ''
      : '';
  const bodySideWithLaterality = props &&
    props.diagnosisData &&
    props.diagnosisData.diagnosisCondition &&
    props.diagnosisData.diagnosisCondition.bodySideWithLaterality &&
    props.diagnosisData.diagnosisCondition.bodySideWithLaterality &&
    props.diagnosisData.diagnosisCondition.bodySideWithLaterality.length >
    0 && {
    bodySite:
      props.diagnosisData.diagnosisCondition.bodySideWithLaterality[0]
        .bodySite &&
      props.diagnosisData.diagnosisCondition.bodySideWithLaterality[0]
        .bodySite.display,
    laterality:
      props.diagnosisData.diagnosisCondition.bodySideWithLaterality[0]
        .laterality &&
      props.diagnosisData.diagnosisCondition.bodySideWithLaterality[0]
        .laterality.display,
  };
  const grade =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData.diagnosisCondition.grade
        ? props.diagnosisData.diagnosisCondition.grade.display
        : ''
      : '';
  const tnm =
    props && props.diagnosisData && props.diagnosisData.tNMClinicalStageGroup
      ? 'Clinical'
      : props.diagnosisData.tNMPathologicalStageGroup
        ? 'Pathological'
        : props.diagnosisData.tNMPostTherapyStageGroup
          ? 'Post Therapy'
          : '';
  let tcategory = '';
  let ncategory = '';
  let mcategory = '';
  if (tnm === 'Clinical') {
    (tcategory = 'tNMClinicalPrimaryTumorCategory'),
      (ncategory = 'tNMClinicalRegionalNodesCategory'),
      (mcategory = 'tNMClinicalDistantMetastasesCategory');
  } else if (tnm === 'Pathological') {
    (tcategory = 'tNMPathologicalPrimaryTumorCategory'),
      (ncategory = 'tNMPathologicalRegionalNodesCategory'),
      (mcategory = 'tNMPathologicalDistantMetastasesCategory');
  } else if (tnm === 'Post Therapy') {
    (tcategory = 'tNMPostTherapyPrimaryTumorCategory'),
      (ncategory = 'tNMPostTherapyRegionalNodesCategory'),
      (mcategory = 'tNMPostTherapyDistantMetastasesCategory');
  }
  const tumor =
    props &&
      props.diagnosisData &&
      props.diagnosisData[`${tcategory}`] &&
      props.diagnosisData[`${tcategory}`].value &&
      props.diagnosisData[`${tcategory}`].value.display
      ? props.diagnosisData[`${tcategory}`].value.display.split(':')[0]
      : '';
  const node =
    props &&
      props.diagnosisData &&
      props.diagnosisData[`${ncategory}`] &&
      props.diagnosisData[`${ncategory}`].value &&
      props.diagnosisData[`${ncategory}`].value.display
      ? props.diagnosisData[`${ncategory}`].value.display.split(':')[0]
      : '';
  const metastasis =
    props &&
      props.diagnosisData &&
      props.diagnosisData[`${mcategory}`] &&
      props.diagnosisData[`${mcategory}`].value &&
      props.diagnosisData[`${mcategory}`].value.display
      ? props.diagnosisData[`${mcategory}`].value.display.split(':')[0]
      : '';
  const psa =
    props &&
    props.diagnosisData &&
    props.diagnosisData.tumorMarkers &&
    props.diagnosisData.tumorMarkers.length > 0 &&
    props.diagnosisData.tumorMarkers[0]['valueQuantity'] &&
    props.diagnosisData.tumorMarkers[0]['valueQuantity']['value'] &&
    `${props.diagnosisData.tumorMarkers[0]['valueQuantity']['value']}${props
      .diagnosisData.tumorMarkers[0]['valueQuantity']['unit'] &&
    ` ${props.diagnosisData.tumorMarkers[0]['valueQuantity']['unit']}`}`;
  const staging =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData.diagnosisCondition.stage
        ? props.diagnosisData.diagnosisCondition.stage.length != 0
          ? props.diagnosisData.diagnosisCondition.stage[0].summary
            ? props.diagnosisData.diagnosisCondition.stage[0].summary.display
              ? props.diagnosisData.diagnosisCondition.stage[0].summary.display
              : ''
            : ''
          : ''
        : ''
      : '';
  const histologyMorphologyBehaviour =
    props && props.diagnosisData && props.diagnosisData.diagnosisCondition
      ? props.diagnosisData &&
        props.diagnosisData.diagnosisCondition.histologyMorphologyBehaviour
        ? props.diagnosisData &&
          props.diagnosisData.diagnosisCondition.histologyMorphologyBehaviour
            .display
          ? props.diagnosisData &&
          props.diagnosisData.diagnosisCondition.histologyMorphologyBehaviour
            .display
          : ''
        : ''
      : '';
  const note =
    props &&
    props.diagnosisData &&
    props.diagnosisData.diagnosisCondition &&
    props.diagnosisData.diagnosisCondition.note;
  const molecularTestArray =
    props &&
      props.diagnosisData &&
      props.diagnosisData.molecularTests &&
      Array.isArray(props.diagnosisData.molecularTests) &&
      props.diagnosisData.molecularTests.length > 0
      ? props.diagnosisData.molecularTests.map(
        item =>
          `${item.code.display}${item.conclusion ? ` - ${item.conclusion}` : ''
          }`,
      )
      : null;
  const erPrArray = [];
  if (
    props.diagnosisData.tumorMarkers &&
    props.diagnosisData.tumorMarkers.length > 0
  ) {
    let ERData = props.diagnosisData.tumorMarkers.find(
      v =>
        v.valueCodeableConcept &&
        v.valueCodeableConcept.code === 'positive' &&
        v.code.code === '40556-3',
    );
    let PRData = props.diagnosisData.tumorMarkers.find(
      v =>
        v.valueCodeableConcept &&
        v.valueCodeableConcept.code === 'positive' &&
        v.code.code === '40557-1',
    );
    let HERData = props.diagnosisData.tumorMarkers.find(
      v =>
        v.valueCodeableConcept &&
        v.valueCodeableConcept.code === 'positive' &&
        v.code.code === '48676-1',
    );

    if (ERData !== undefined) {
      // ER = true;
      // ERText = ERData.note ? ERData.note : '';
      erPrArray.push(`ER ${ERData.note ? `-${ERData.note}` : '+'}`);
    } else {
      erPrArray.push(`ER : Negative`);
    }
    if (PRData !== undefined) {
      // PR = true;
      // PRText = PRData.note ? PRData.note : '';
      erPrArray.push(`PR ${PRData.note ? `-${PRData.note}` : '+'}`);
    } else {
      erPrArray.push(`PR : Negative`);
    }
    if (HERData !== undefined) {
      // HER = true;
      // HERText = HERData.note ? HERData.note : '';
      erPrArray.push(`HER ${HERData.note ? `-${HERData.note}` : '+'}`);
    } else {
      erPrArray.push(`HER : Negative`);
    }
  }
  let arrayOfData = [];
  if (cancerCode) {
    arrayOfData.push({ key: 'Cancer Code', value: cancerCode });
  }
  if (bodySideWithLaterality && bodySideWithLaterality.bodySite) {
    arrayOfData.push({
      key: 'Body Site',
      value: bodySideWithLaterality.bodySite,
    });
  }
  // if (bodySideWithLaterality && bodySideWithLaterality.laterality) {
  //     arrayOfData.push({ key: 'Laterality', value: bodySideWithLaterality.laterality })
  // }
  if (histologyMorphologyBehaviour) {
    arrayOfData.push({
      key: 'Histomorphology',
      value: histologyMorphologyBehaviour,
    });
  }
  if (grade) {
    arrayOfData.push({ key: 'Grade', value: grade });
  }
  if (tnm || tumor || node || metastasis) {
    arrayOfData.push({
      key: 'TNM',
      value: `${tnm} - ${tumor}${node}${metastasis}`,
    });
  }
  if (staging) {
    arrayOfData.push({ key: 'Staging', value: staging });
  }
  if (molecularTestArray) {
    arrayOfData.push({ key: 'Molecular Test', value: molecularTestArray });
  }
  if (psa) {
    arrayOfData.push({ key: 'PSA', value: psa });
  }
  if (erPrArray && cancerType === 'Breast Cancer') {
    arrayOfData.push({
      key: 'Hormone Receptors',
      value: erPrArray.map(item => item).join(', '),
    });
  }
  if (note) {
    arrayOfData.push({ key: 'Note', value: note });
  }
  // console.log('arrayOfData', arrayOfData)
  return (
    <View style={styles.titleContainer}>
      <View style={styles.rowHead}>
        <Text style={styles.descriptionHead}>Diagnosis</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {arrayOfData && arrayOfData.length > 0 ? (
            <>
              <View style={styles.rowNew}>
                <Text style={styles.description}>
                  {verify ? `${verify} - ${cancerType}` : cancerType}
                </Text>
                {bodySideWithLaterality &&
                  bodySideWithLaterality.laterality && (
                    <Text style={styles.values}>
                      Laterality : {bodySideWithLaterality.laterality}
                    </Text>
                  )}
              </View>
              {arrayOfData.map((item, index) => {
                if (item.key === 'Histomorphology' && grade) {
                  return (
                    <View style={styles.rowNew} key={index.toString()}>
                      <Text style={styles.description}>{`${item.key}: ${item.value
                        }`}</Text>
                      <Text style={styles.values}>{`Grade : ${grade}`}</Text>
                    </View>
                  );
                } else if (item.key === 'TNM' && staging) {
                  return (
                    <View style={styles.rowNew} key={index.toString()}>
                      <Text style={styles.description}>{`${item.key}: ${item.value
                        }`}</Text>
                      <Text
                        style={styles.values}
                      >{`Staging : ${staging}`}</Text>
                    </View>
                  );
                } else if (
                  item.key === 'Grade' &&
                  !histologyMorphologyBehaviour
                ) {
                  return (
                    <View style={styles.rowNew} key={index.toString()}>
                      <Text style={styles.description}>{item.key}</Text>
                      <Text style={styles.values}>{item.value}</Text>
                    </View>
                  );
                } else if (
                  item.key === 'Staging' &&
                  !(tnm || tumor || node || metastasis)
                ) {
                  return (
                    <View style={styles.rowNew} key={index.toString()}>
                      <Text style={styles.description}>{item.key}</Text>
                      <Text style={styles.values}>{item.value}</Text>
                    </View>
                  );
                } else if (
                  item.key !== 'Grade' &&
                  item.key !== 'Staging' &&
                  item.key !== 'Body Site'
                ) {
                  return (
                    <View style={styles.rowNew} key={index.toString()}>
                      <Text style={styles.descriptionNew}>{`${item.key}: ${item.value
                        }`}</Text>
                    </View>
                  );
                }
              })}
            </>
          ) : (
            <View style={styles.rowNew}>
              <Text style={styles.description}>{'N/a'}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
export default PdfDiagnosis;
