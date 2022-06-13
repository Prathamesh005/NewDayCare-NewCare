import { CircularProgress, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { filter, find } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { saveDiagnosisStage } from '../../../apis/episodeOfCareApis/serviceCalls';
import {
  diagnosisValueSetSearch,
  doSaveDiagnosisStage,
  valueSetSearch,
} from '../../../apis/globalApis/globalSlice';
import { SquareAddIconButton, MessageComponent } from '../../../components';
import TextArea from './forms/TextArea';
import Textfield from './forms/TextField';
import UserContext from '../MyStateContext';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import MolecularTesting from './diagnosis/MolecularTesting';
import AutoCompleteAdd from './forms/AutoCompleteAdd';
import AutoCompleteField from './forms/AutoCompleteField';
import CheckBoxField from './forms/CheckBoxField';
import PopperComponent from './forms/PopperComponent';
import RadioButton from './forms/RadioButton';
import OnFollowUpVisitCard from './onFollowUpVisit/OnFollowUpVisitCard';
import TextFieldOnBlur from './forms/TextFieldOnBlur';

const filterArray = createFilterOptions();
const useStyles = makeStyles(theme => ({
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '1rem',
      fontWeight: '400',
      padding: 12,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  noBorder: {
    border: 'none',
  },
  input1: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    paddingRight: 18,
    '&:focus': {
      background: '#F4F4F4 !important',
    },
    '&:active': {
      background: '#F4F4F4 !important',
    },
    '&:hover': {
      background: '#F4F4F4 !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
  accordationDiv: {
    width: '100%',
  },
  headlabels: {
    fontSize: '1rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  secondarylabels: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lebels: {
    // fontSize: '0.95rem',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 400,
  },
  centerDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  stageDiv: {
    display: 'flex',
    alignItems: 'center',
    // border: '2px solid',
    width: 'fit-content',
    height: 50,
    borderRadius: 5,
    boxShadow: '0px 0px 1px 2px #e3e3e3',
    padding: '0px 15px',
  },
}));

function Diagnosis(props) {
  // console.log('Diagnosis', props.impressionForVisitData);

  const {
    Option,
    SET_DIAGNOSIS_INITIAL_STATE,
    Id,
    SET_IMPRESSION_VISIT_INITIAL_STATE,
    diagnosisData,
    impressionForVisitData,
  } = props;

  const classes = useStyles();
  const [expand1, setExpand1] = React.useState(true);
  const [LoadingSave, setLoadingSave] = React.useState(false);
  const [OnLoadData, setOnLoadData] = React.useState([]);
  const [DiagnosisComment, setDiagnosisComment] = React.useState('');

  const [DiagnosisStage, setDiagnosisStage] = useState('');
  const user = React.useContext(UserContext);

  //for cancer type
  const [localcancerType, setlocalcancerType] = useState('');
  //for cancer code calculation
  const [localcancerTypeCode, setlocalcancerTypeCode] = useState('');

  //for stage calculation for ex: Stage III
  const [localtumor, setlocaltumor] = useState('');
  const [localnode, setlocalnode] = useState('');
  const [localmetastasis, setlocalmetastasis] = useState('');
  const [localgrade, setlocalgrade] = useState('');

  //for node,tumor,metastasis,grade calculation
  const [localtnm, setlocaltnm] = useState('');

  //for psa calculation
  const [localpsa, setlocalpsa] = useState('');

  //for breast cancer ER,PR,HER
  const [localER, setlocalER] = useState('');
  const [localPR, setlocalPR] = useState('');
  const [localHER, setlocalHER] = useState('');

  useEffect(() => {
    user.setStage(DiagnosisStage);
    return () => {};
  }, [DiagnosisStage]);

  useEffect(() => {
    return () => {
      setDiagnosisStage('');
    };
  }, []);

  //sets
  const [BodySiteSet, setBodySiteSet] = useState([]);
  const [CancerCodeSet, setCancerCodeSet] = useState([]);
  const [TumorSet, setTumorSet] = useState([]);
  const [NodeSet, setNodeSet] = useState([]);
  const [MetastasisSet, setMetastasisSet] = useState([]);
  const [HistopathologySet, setHistopathologySet] = useState([]);
  const [GradeSet, setGradeSet] = useState([]);

  const [Laterality, setLateralitySet] = useState([]);
  const [CancerTypeSet, setCancerTypeSet] = useState([]);
  const [StageSetData, setStageSetData] = useState([]);
  const [NatureSet, setNatureSet] = useState([]);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const diagnosisLateralitySet = await props.valueSetSearch({
      url: 'http://hl7.org/fhir/us/mcode/ValueSet/mcode-laterality-vs',
    });
    setLateralitySet(
      diagnosisLateralitySet && diagnosisLateralitySet.payload.message
        ? []
        : diagnosisLateralitySet.payload,
    );

    const diagnosisCancerTypeSet = await props.valueSetSearch({
      url:
        'http://dataquent.com/fhir/us/custom/ValueSet/custom-cancer-type-valueset-vs',
    });
    setCancerTypeSet(
      diagnosisCancerTypeSet && diagnosisCancerTypeSet.payload.message
        ? []
        : diagnosisCancerTypeSet.payload,
    );

    const diagnosisStageSet = await props.valueSetSearch({
      url: 'http://dataquent.com/fhir/us/custom/ValueSet/generic-stage-vs',
    });
    setStageSetData(
      diagnosisStageSet && diagnosisStageSet.payload.message
        ? []
        : diagnosisStageSet.payload,
    );

    const diagnosisNatureSet = await props.valueSetSearch({
      url:
        'http://dataquent.com/fhir/us/custom/ValueSet/condition-ver-status-vs',
    });
    setNatureSet(
      diagnosisNatureSet && diagnosisNatureSet.payload.message
        ? []
        : diagnosisNatureSet.payload,
    );
  };
  const callDiagnosisCancerCodeSet = async url => {
    const diagnosisCancerCodeSet = await props.valueSetSearch({
      url: url,
    });
    setCancerCodeSet(
      diagnosisCancerCodeSet && diagnosisCancerCodeSet.payload.message
        ? []
        : diagnosisCancerCodeSet.payload,
    );
  };
  const calldiagnosisBodySiteSet = async field => {
    const { payload } = await props.diagnosisValueSetSearch(field);
    setBodySiteSet(payload && payload.message ? [] : payload);
  };
  const calldiagnosisHistopathologySet = async field => {
    const { payload } = await props.diagnosisValueSetSearch(field);
    setHistopathologySet(payload && payload.message ? [] : payload);
  };
  const calldiagnosisGradeSet = async field => {
    const { payload } = await props.diagnosisValueSetSearch(field);
    setGradeSet(payload && payload.message ? [] : payload);
  };

  const callDiagnosisTumorSet = async field => {
    const { payload } = await props.diagnosisValueSetSearch(field);
    setTumorSet(payload && payload.message ? [] : payload);
  };
  const callDiagnosisNodeSet = async field => {
    const { payload } = await props.diagnosisValueSetSearch(field);
    setNodeSet(payload && payload.message ? [] : payload);
  };
  const callDiagnosisMetastasisSet = async field => {
    const { payload } = await props.diagnosisValueSetSearch(field);
    setMetastasisSet(payload && payload.message ? [] : payload);
  };
  //-----------------API CALLS END---------------

  useEffect(() => {
    callValueSetSearch();
  }, []);

  useEffect(() => {
    let cancerType = { code: '', display: '' };
    let cancerCode = { code: '', display: '' };
    let bodySite = { code: '', display: '' };
    let laterality = { code: '', display: '' };
    let histopathology = { code: '', display: '' };
    let grade = { code: '', display: '' };
    let stage = { code: '', display: '' };
    let stageforlocal = '';

    let tnm = '';
    let tumor = { code: '', display: '' };
    let node = { code: '', display: '' };
    let metastasis = { code: '', display: '' };

    let ER = false;
    let PR = false;
    let HER = false;

    let ERText = '';
    let PRText = '';
    let HERText = '';

    let psa = '';

    let checkFinalDiagnosis = { code: '', display: '' };

    let primaryCancerConditionId = uuidv4();
    let tnmGroupId = uuidv4();
    let tumorId = uuidv4();
    let nodeId = uuidv4();
    let metastasisId = uuidv4();

    let ERId = uuidv4();
    let PRId = uuidv4();
    let HERId = uuidv4();
    let psaId = uuidv4();

    let diagnosisComment = '';

    if (diagnosisData && diagnosisData) {
      // console.log('diagnosisData', diagnosisData);
      const {
        diagnosisCondition,
        tumorMarkers,
        tNMClinicalStageGroup,
        tNMClinicalPrimaryTumorCategory,
        tNMClinicalRegionalNodesCategory,
        tNMClinicalDistantMetastasesCategory,
        tNMPathologicalStageGroup,
        tNMPathologicalPrimaryTumorCategory,
        tNMPathologicalRegionalNodesCategory,
        tNMPathologicalDistantMetastasesCategory,
        tNMPostTherapyStageGroup,
        tNMPostTherapyPrimaryTumorCategory,
        tNMPostTherapyRegionalNodesCategory,
        tNMPostTherapyDistantMetastasesCategory,
      } = diagnosisData;

      if (diagnosisCondition != null) {
        // debugger
        primaryCancerConditionId = diagnosisCondition.resourceId;
        diagnosisComment = diagnosisCondition.note
          ? diagnosisCondition.note
          : '';

        cancerType = {
          code:
            diagnosisCondition.code && diagnosisCondition.code.codeableSystem,
          display: diagnosisCondition.code && diagnosisCondition.code.display,
        };
        cancerCode = {
          code:
            diagnosisCondition.code && diagnosisCondition.code.code
              ? diagnosisCondition.code.code
              : '',
          display:
            diagnosisCondition.code && diagnosisCondition.code.text
              ? diagnosisCondition.code.text
              : '',
        };

        if (
          diagnosisCondition.bodySideWithLaterality &&
          diagnosisCondition.bodySideWithLaterality[0].bodySite != null
        ) {
          bodySite = {
            code: diagnosisCondition.bodySideWithLaterality[0].bodySite.code,
            display:
              diagnosisCondition.bodySideWithLaterality[0].bodySite.display,
          };
        }

        if (
          diagnosisCondition.bodySideWithLaterality &&
          diagnosisCondition.bodySideWithLaterality[0].laterality != null
        ) {
          laterality = {
            code: diagnosisCondition.bodySideWithLaterality[0].laterality.code,
            display:
              diagnosisCondition.bodySideWithLaterality[0].laterality.display,
          };
        }

        if (diagnosisCondition.histologyMorphologyBehaviour != null) {
          histopathology = {
            code: diagnosisCondition.histologyMorphologyBehaviour.code,
            display: diagnosisCondition.histologyMorphologyBehaviour.display,
          };
        }
        if (diagnosisCondition.grade != null) {
          grade = {
            code: diagnosisCondition.grade.code,
            display: diagnosisCondition.grade.display,
          };
        }

        if (
          diagnosisCondition.stage != null &&
          diagnosisCondition.stage[0].summary != null
        ) {
          stage = {
            code: diagnosisCondition.stage[0].summary.code,
            display: diagnosisCondition.stage[0].summary.display,
          };
          stageforlocal = diagnosisCondition.stage[0].summary.code;
        }

        if (diagnosisCondition.verificationStatus) {
          checkFinalDiagnosis = diagnosisCondition.verificationStatus;
        }
      }

      if (tNMClinicalStageGroup != null) {
        tnm = 'Clinical';
        tnmGroupId = tNMClinicalStageGroup.resourceId;

        if (tNMClinicalPrimaryTumorCategory != null) {
          tumor = {
            code:
              tNMClinicalPrimaryTumorCategory.value &&
              tNMClinicalPrimaryTumorCategory.value.code,
            display:
              tNMClinicalPrimaryTumorCategory.value &&
              tNMClinicalPrimaryTumorCategory.value.display,
          };
          tumorId = tNMClinicalPrimaryTumorCategory.resourceId;
        }
        if (tNMClinicalRegionalNodesCategory != null) {
          node = {
            code:
              tNMClinicalRegionalNodesCategory.value &&
              tNMClinicalRegionalNodesCategory.value.code,
            display:
              tNMClinicalRegionalNodesCategory.value &&
              tNMClinicalRegionalNodesCategory.value.display,
          };
          nodeId = tNMClinicalRegionalNodesCategory.resourceId;
        }
        if (tNMClinicalDistantMetastasesCategory != null) {
          metastasis = {
            code:
              tNMClinicalDistantMetastasesCategory.value &&
              tNMClinicalDistantMetastasesCategory.value.code,
            display:
              tNMClinicalDistantMetastasesCategory.value &&
              tNMClinicalDistantMetastasesCategory.value.text,
          };
          metastasisId = tNMClinicalDistantMetastasesCategory.resourceId;
        }
      }

      if (tNMPathologicalStageGroup != null) {
        tnm = 'Pathological';
        tnmGroupId = tNMPathologicalStageGroup.resourceId;

        if (tNMPathologicalPrimaryTumorCategory != null) {
          tumor = {
            code:
              tNMPathologicalPrimaryTumorCategory.value &&
              tNMPathologicalPrimaryTumorCategory.value.code,
            display:
              tNMPathologicalPrimaryTumorCategory.value &&
              tNMPathologicalPrimaryTumorCategory.value.display,
          };
          tumorId = tNMPathologicalPrimaryTumorCategory.resourceId;
        }
        if (tNMPathologicalRegionalNodesCategory != null) {
          node = {
            code:
              tNMPathologicalRegionalNodesCategory.value &&
              tNMPathologicalRegionalNodesCategory.value.code,
            display:
              tNMPathologicalRegionalNodesCategory.value &&
              tNMPathologicalRegionalNodesCategory.value.display,
          };
          nodeId = tNMPathologicalRegionalNodesCategory.resourceId;
        }
        if (tNMPathologicalDistantMetastasesCategory != null) {
          metastasis = {
            code:
              tNMPathologicalDistantMetastasesCategory.value &&
              tNMPathologicalDistantMetastasesCategory.value.code,
            display:
              tNMPathologicalDistantMetastasesCategory.value &&
              tNMPathologicalDistantMetastasesCategory.value.text,
          };
          metastasisId = tNMPathologicalDistantMetastasesCategory.resourceId;
        }
      }

      if (tNMPostTherapyStageGroup != null) {
        tnm = 'Post Therapy';
        tnmGroupId = tNMPostTherapyStageGroup.resourceId;

        if (tNMPostTherapyPrimaryTumorCategory != null) {
          tumor = {
            code:
              tNMPostTherapyPrimaryTumorCategory.value &&
              tNMPostTherapyPrimaryTumorCategory.value.code,
            display:
              tNMPostTherapyPrimaryTumorCategory.value &&
              tNMPostTherapyPrimaryTumorCategory.value.display,
          };
          tumorId = tNMPostTherapyPrimaryTumorCategory.resourceId;
        }
        if (tNMPostTherapyRegionalNodesCategory != null) {
          node = {
            code:
              tNMPostTherapyRegionalNodesCategory.value &&
              tNMPostTherapyRegionalNodesCategory.value.code,
            display:
              tNMPostTherapyRegionalNodesCategory.value &&
              tNMPostTherapyRegionalNodesCategory.value.display,
          };
          nodeId = tNMPostTherapyRegionalNodesCategory.resourceId;
        }
        if (tNMPostTherapyDistantMetastasesCategory != null) {
          metastasis = {
            code:
              tNMPostTherapyDistantMetastasesCategory.value &&
              tNMPostTherapyDistantMetastasesCategory.value.code,
            display:
              tNMPostTherapyDistantMetastasesCategory.value &&
              tNMPostTherapyDistantMetastasesCategory.value.text,
          };
          metastasisId = tNMPostTherapyDistantMetastasesCategory.resourceId;
        }
      }

      // debugger;

      if (tumorMarkers && tumorMarkers.length > 0) {
        let ERData = tumorMarkers.find(
          v =>
            v.valueCodeableConcept &&
            v.valueCodeableConcept.code === 'positive' &&
            v.code.code === '40556-3',
        );
        let PRData = tumorMarkers.find(
          v =>
            v.valueCodeableConcept &&
            v.valueCodeableConcept.code === 'positive' &&
            v.code.code === '40557-1',
        );
        let HERData = tumorMarkers.find(
          v =>
            v.valueCodeableConcept &&
            v.valueCodeableConcept.code === 'positive' &&
            v.code.code === '48676-1',
        );

        if (ERData !== undefined) {
          ER = true;
          ERId = ERData.resourceId;
          ERText = ERData.note ? ERData.note : '';
        }
        if (PRData !== undefined) {
          PR = true;
          PRId = PRData.resourceId;
          PRText = PRData.note ? PRData.note : '';
        }
        if (HERData !== undefined) {
          HER = true;
          HERId = HERData.resourceId;
          HERText = HERData.note ? HERData.note : '';
        }

        let psaVal = tumorMarkers.find(v => v.code.code === '2857-1');

        if (psaVal !== undefined) {
          psa = psaVal.valueQuantity !== null ? psaVal.valueQuantity.value : '';
          psaId = psaVal.resourceId;
        }

        // console.log('tumorMarkers', tumorMarkers);
        // debugger;
      }

      setDiagnosisStage(stageforlocal);
    }

    setDiagnosisComment(diagnosisComment);

    const INITIAL_FORM_STATE = {
      cancerType: cancerType,
      cancerCode: cancerCode,
      bodySite: bodySite,
      laterality: laterality,
      histopathology: histopathology,
      grade: grade,
      stage: stage,
      tnm: tnm,
      tumor: tumor,
      node: node,
      metastasis: metastasis,
      ER: ER,
      PR: PR,
      HER: HER,
      psa: psa,
      psaUnit: 'ng/ml',
      primaryCancerConditionId: primaryCancerConditionId,

      checkFinalDiagnosis: checkFinalDiagnosis,

      tnmGroupId: tnmGroupId,
      tumorId: tumorId,
      nodeId: nodeId,
      metastasisId: metastasisId,

      ERId: ERId,
      PRId: PRId,
      HERId: HERId,
      psaId: psaId,

      ERText: ERText,
      PRText: PRText,
      HERText: HERText,

      diagnosisComment: diagnosisComment,
    };

    // debugger
    SET_DIAGNOSIS_INITIAL_STATE(INITIAL_FORM_STATE);
  }, [diagnosisData]);

  useEffect(() => {
    setlocalcancerType(
      Option.values.cancerType && Option.values.cancerType.display,
    );
    setlocalcancerTypeCode(
      Option.values.cancerType && Option.values.cancerType.code,
    );
  }, [Option.values.cancerType]);
  useEffect(() => {
    setlocaltnm(Option.values.tnm && Option.values.tnm);
  }, [Option.values.tnm]);
  useEffect(() => {
    setlocaltumor(Option.values.tumor && Option.values.tumor.code);
  }, [Option.values.tumor]);
  useEffect(() => {
    setlocalnode(Option.values.node && Option.values.node.code);
  }, [Option.values.node]);
  useEffect(() => {
    setlocalmetastasis(
      Option.values.metastasis && Option.values.metastasis.code,
    );
  }, [Option.values.metastasis]);
  useEffect(() => {
    setlocalgrade(Option.values.grade && Option.values.grade.code);
  }, [Option.values.grade]);

  useEffect(() => {
    setlocalER(Option.values.ER);
  }, [Option.values.ER]);
  useEffect(() => {
    setlocalPR(Option.values.PR);
  }, [Option.values.PR]);
  useEffect(() => {
    setlocalHER(Option.values.HER);
  }, [Option.values.HER]);
  useEffect(() => {
    setlocalpsa(Option.values.psa);
  }, [Option.values.psa]);

  //for cancer code
  useEffect(() => {
    if (localcancerTypeCode !== '' && localcancerTypeCode !== undefined) {
      callDiagnosisCancerCodeSet(localcancerTypeCode);
    }
  }, [localcancerTypeCode]);

  //for body site,Histomorphology,Grade
  useEffect(() => {
    if (localcancerType !== '' && localcancerType !== undefined) {
      let field = {
        cancerType: localcancerType,
        url: 'BodySite',
      };
      calldiagnosisBodySiteSet(field);

      //Histomorphology
      let field4 = {
        cancerType: localcancerType,
        tnmType: '',
        url: 'Histomorphology',
      };
      calldiagnosisHistopathologySet(field4);

      //Grade
      let field5 = {
        cancerType: localcancerType,
        tnmType: '',
        url: 'Grade',
      };
      calldiagnosisGradeSet(field5);
    }
  }, [localcancerType]);

  //tumor,node,metastatis
  useEffect(() => {
    if (
      localcancerType != '' &&
      localcancerType != undefined &&
      localtnm != '' &&
      localtnm != undefined
    ) {
      //tumor
      let field1 = {
        cancerType: localcancerType,
        tnmType: localtnm,
        url: 'Tumor',
      };
      callDiagnosisTumorSet(field1);

      //node
      let field2 = {
        cancerType: localcancerType,
        tnmType: localtnm,
        url: 'Node',
      };
      callDiagnosisNodeSet(field2);

      //Metastasis
      let field3 = {
        cancerType: localcancerType,
        tnmType: localtnm,
        url: 'Metastasis',
      };
      callDiagnosisMetastasisSet(field3);
    }
  }, [localcancerType, localtnm]);

  const callSaveDiagnosisStage = async field => {
    setLoadingSave(true);
    const { payload } = await props.doSaveDiagnosisStage(
      saveDiagnosisStage(field),
    );
    setLoadingSave(false);

    if (payload && payload.status === 200) {
      setDiagnosisStage(payload.data.stage ? payload.data.stage : '');
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }
  };

  //stage calculation
  useEffect(() => {
    if (
      localcancerType != '' &&
      localtumor != '' &&
      localnode != '' &&
      localmetastasis != '' &&
      localtnm != '' &&
      localcancerType != undefined &&
      localtumor != undefined &&
      localnode != undefined &&
      localmetastasis != undefined &&
      localtnm != undefined
    ) {
      let field = {
        localcancerType: localcancerType,
        localtumor: localtumor,
        localnode: localnode,
        localmetastasis: localmetastasis,
        localtnm: localtnm,
        localgrade: localgrade,
        localpsa: localcancerType === 'Prostate Cancer' ? localpsa : '',
        localER: localcancerType === 'Breast Cancer' ? localER : undefined,
        localPR: localcancerType === 'Breast Cancer' ? localPR : undefined,
        localHER: localcancerType === 'Breast Cancer' ? localHER : undefined,
      };

      callSaveDiagnosisStage(field);
    }
  }, [localtumor, localnode, localmetastasis, localtnm]);

  //stage for breast, prostage
  useEffect(() => {
    if (
      (localcancerType != '' &&
        localcancerType != undefined &&
        localpsa != '' &&
        localpsa != undefined) ||
      (localgrade != '' && localgrade != undefined) ||
      localER ||
      localPR ||
      localHER
    ) {
      let field = {
        localcancerType: localcancerType,
        localtumor: localtumor,
        localnode: localnode,
        localmetastasis: localmetastasis,
        localtnm: localtnm,
        localgrade: localgrade,
        localpsa: localcancerType === 'Prostate Cancer' ? localpsa : '',
        localER: localcancerType === 'Breast Cancer' ? localER : undefined,
        localPR: localcancerType === 'Breast Cancer' ? localPR : undefined,
        localHER: localcancerType === 'Breast Cancer' ? localHER : undefined,
      };

      callSaveDiagnosisStage(field);
    }
  }, [localgrade, localpsa, localER, localPR, localHER]);

  const ResetAllValues = setFieldValue => {
    setFieldValue('tnm', '');
    setFieldValue('cancerCode', { code: '', display: '' });
    setFieldValue('bodySite', { code: '', display: '' });
    setFieldValue('laterality', { code: '', display: '' });
    setFieldValue('histopathology', { code: '', display: '' });
    setFieldValue('tumor', { code: '', display: '' });
    setFieldValue('node', { code: '', display: '' });
    setFieldValue('metastasis', { code: '', display: '' });
    setFieldValue('grade', { code: '', display: '' });
    setFieldValue('stage', { code: '', display: '' });

    setDiagnosisStage('');

    setlocalpsa('');
    setlocalER('');
    setlocalPR('');
    setlocalHER('');

    setLoadValueSet(true);
    setTumorSet(null);
    setNodeSet(null);
    setMetastasisSet(null);
    setHistopathologySet(null);
    setGradeSet(null);
    setBodySiteSet(null);
  };

  const [loadValueSet, setLoadValueSet] = useState(false);

  const choices = [
    { key: 'Clinical', value: 'Clinical' },
    { key: 'Pathological', value: 'Pathological' },
    { key: 'Post Therapy', value: 'Post Therapy' },
  ];

  //Final=>confirmed,Suspected=>unconfirmed,Provisional=>provisional
  // console.log('DiagnosisStage', DiagnosisStage);

  useEffect(() => {
    const {
      cancerType,
      stage,
      cancerCode,
      bodySite,
      laterality,
      tnm,
      tumor,
      node,
      metastasis,
      histopathology,
      grade,
    } = Option.values;

    let res = [
      {
        title: '',
        subtitle: cancerType && cancerType.display,
        status: cancerType && cancerType.display !== '',
        type: 'name',
      },
      {
        title: 'Stage',
        subtitle: stage && stage.display,
        status: stage && stage.display && stage.display !== '',
      },
      {
        title: 'Cancer Code',
        subtitle: cancerCode && cancerCode.display,
        status: cancerCode && cancerCode.display !== '',
      },
      {
        title: 'Body Site',
        subtitle: bodySite && bodySite.display,
        status: bodySite && bodySite.display !== '',
      },
      {
        title: 'Laterality',
        subtitle: laterality && laterality.display,
        status: laterality && laterality.display !== '',
      },

      {
        title: 'Tnm',
        subtitle: tnm && tnm,
        status: tnm && tnm !== '',
      },
      {
        title: 'Tumor',
        subtitle: tumor && tumor.display,
        status: tumor && tumor.display !== '',
      },
      {
        title: 'Node',
        subtitle: node && node.display,
        status: node && node.display !== '',
      },
      {
        title: 'Metastasis',
        subtitle: metastasis && metastasis.display,
        status: metastasis && metastasis.display !== '',
      },

      {
        title: 'Histopathology',
        subtitle: histopathology && histopathology.display,
        status: histopathology && histopathology.display !== '',
      },
      {
        title: 'Grade',
        subtitle: grade && grade.display,
        status: grade && grade.display !== '',
      },
    ];

    setOnLoadData(filter(res, { status: true }));
  }, [Option.values]);

  useEffect(() => {
    if (Option.values.checkFollowUp && Option.values.checkFollowUp > 1) {
      setExpand1(false);
    } else {
      setExpand1(true);
    }
  }, [Option.values.checkFollowUp]);

  const onExpand = () => {
    setExpand1(!expand1);
  };

  const [open, setOpen] = React.useState(false);
  const handleClick = toggle => event => {
    setOpen(toggle);
  };

  const checkBoxData = () => (
    <>
      <div>
        <CheckBoxField
          name="impressionForVisitCheck"
          label="Impression For Visit"
        />
      </div>
    </>
  );

  useEffect(() => {
    let impressionForVisitCheck = false;
    let impressionForVisit = '';
    let impressionForVisitId = uuidv4();

    if (impressionForVisitData && impressionForVisitData.length > 0) {
      if (
        impressionForVisitData &&
        impressionForVisitData.length > 0 &&
        impressionForVisitData[0] &&
        impressionForVisitData[0].description
      ) {
        impressionForVisitCheck = true;
        impressionForVisit = impressionForVisitData[0].description;
        impressionForVisitId = impressionForVisitData[0].resourceId;
      }
    }

    const INITIAL_FORM_STATE = {
      impressionForVisitCheck: impressionForVisitCheck,
      impressionForVisit: impressionForVisit,
      impressionForVisitId: impressionForVisitId,
    };

    SET_IMPRESSION_VISIT_INITIAL_STATE(INITIAL_FORM_STATE);
  }, [impressionForVisitData]);

  return (
    <Fragment>
      {open && (
        <PopperComponent
          open={open}
          handleClick={handleClick}
          checkBoxData={checkBoxData()}
        />
      )}
      <Accordion expanded={expand1} onChange={onExpand} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={12} md={2} className={classes.centerGrid}>
              <Typography className={classes.headlabels}>Diagnosis</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              {!expand1 && <OnFollowUpVisitCard OnLoadData={OnLoadData} />}

              {expand1 && (
                <SquareAddIconButton
                  style={{ float: 'right', padding: 2 }}
                  onMouseEnter={handleClick(true)}
                />
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <Grid item container xs={12} md={12}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                Nature Of diagnosis
              </Grid>
              <Grid item xs={12} md={2}>
                <AutoCompleteAdd
                  id="checkFinalDiagnosis"
                  size="small"
                  options={NatureSet && NatureSet.length !== 0 ? NatureSet : []}
                  val={Option.values.checkFinalDiagnosis}
                  label="Select Value"
                  name="checkFinalDiagnosis"
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} md={12}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                Cancer Type
              </Grid>
              <Grid item xs={12} md={2}>
                <Autocomplete
                  id="cancerType"
                  name="cancerType"
                  size="small"
                  value={
                    Option.values.cancerType ? Option.values.cancerType : ''
                  }
                  options={
                    CancerTypeSet && CancerTypeSet.length !== 0
                      ? CancerTypeSet
                      : []
                  }
                  fullWidth
                  freeSolo
                  autoFocus
                  selectOnFocus
                  // disableClearable: true,
                  // clearOnBlur
                  handleHomeEndKeys
                  renderOption={option => option.display}
                  filterOptions={(optionsArray, params) => {
                    const filtered = filterArray(optionsArray, params);

                    if (params.inputValue !== '') {
                      if (
                        optionsArray.find(item =>
                          item.display
                            .toLowerCase()
                            .includes(params['inputValue'].toLowerCase()),
                        ) === undefined &&
                        optionsArray.find(item =>
                          item.display
                            .toLowerCase()
                            .includes(params['inputValue'].toLowerCase()),
                        ) === undefined
                      ) {
                        filtered.push({
                          inputValue: params.inputValue,
                          display: `Add "${params.inputValue}"`,
                        });
                      }
                    }

                    return filtered;
                  }}
                  getOptionLabel={option => {
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.display;
                  }}
                  onChange={(e, value) => {
                    if (value && value.code) {
                      Option.setFieldValue('cancerType', {
                        code: value['code'],
                        display: value['display'],
                      });
                      ResetAllValues(Option.setFieldValue);
                    } else if (value === null) {
                      Option.setFieldValue('cancerType', {
                        code: '',
                        display: '',
                      });
                      ResetAllValues(Option.setFieldValue);
                    } else if (typeof value === 'string') {
                      Option.setFieldValue('cancerType', {
                        code: value,
                        display: value,
                      });
                      ResetAllValues(Option.setFieldValue);
                    } else if (value && value.inputValue) {
                      Option.setFieldValue('cancerType', {
                        code: value.inputValue,
                        display: value.inputValue,
                      });
                      ResetAllValues(Option.setFieldValue);
                    }
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="Select Cancer"
                      variant="outlined"
                      className={classes.textField}
                      onBlur={e => {
                        if (e.target.value) {
                          let removeDup = find(CancerTypeSet, function(o) {
                            return o.display === e.target.value;
                          });

                          if (removeDup) {
                            Option.setFieldValue('cancerType', {
                              code: removeDup.code,
                              display: removeDup.display,
                            });
                          } else {
                            Option.setFieldValue('cancerType', {
                              code: e.target.value,
                              display: e.target.value,
                            });
                            ResetAllValues(Option.setFieldValue);
                          }
                        }
                      }}
                      error={Boolean(
                        Option.touched.cancerType &&
                          Option.errors.cancerType &&
                          Option.errors.cancerType['display'],
                      )}
                      helperText={
                        Option.touched.cancerType &&
                        Option.errors.cancerType &&
                        Option.errors.cancerType['display']
                      }
                      InputLabelProps={{ shrink: false }}
                      InputProps={{
                        ...params.InputProps,
                        className: classes.input1,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                  )}
                />
              </Grid>
              {/* {console.log('Option.values.bodySite', Option.values.bodySite)} */}
              <Grid item xs={12} md={1} />

              <Grid item xs={12} md={1} className={classes.lebels}>
                Cancer Code
              </Grid>
              <Grid item xs={12} md={6}>
                <AutoCompleteAdd
                  // loading={}
                  id="cancerCode"
                  size="small"
                  options={
                    CancerCodeSet && CancerCodeSet.length !== 0
                      ? CancerCodeSet
                      : []
                  }
                  val={Option.values.cancerCode}
                  label="Select Code"
                  name="cancerCode"
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} md={12}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                Body Site
              </Grid>
              <Grid item xs={12} md={2}>
                <AutoCompleteAdd
                  id="bodySite"
                  size="small"
                  options={
                    BodySiteSet && BodySiteSet.length !== 0 ? BodySiteSet : []
                  }
                  val={Option.values.bodySite}
                  label="Mention Body Site"
                  name="bodySite"
                  code="code"
                  display="display"
                />
              </Grid>
              <Grid item xs={12} md={1} />

              <Grid item xs={12} md={1} className={classes.lebels}>
                Laterality
              </Grid>
              <Grid item xs={12} md={2}>
                <AutoCompleteField
                  id="laterality"
                  size="small"
                  options={
                    Laterality && Laterality.length !== 0 ? Laterality : []
                  }
                  val={Option.values.laterality}
                  label="Select Value"
                  name="laterality"
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} md={12}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                TNM Score
              </Grid>

              <Grid item xs={12} md={11}>
                <RadioButton
                  row={true}
                  name="tnm"
                  value={Option.values.tnm}
                  options={choices}
                  onChange={Option.handleChange}
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} md={12}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                Tumor (T)
              </Grid>
              <Grid item xs={12} md={6}>
                <AutoCompleteField
                  loading={loadValueSet}
                  id="tumor"
                  size="small"
                  options={TumorSet && TumorSet.length !== 0 ? TumorSet : []}
                  val={Option.values.tumor}
                  label="Select Value"
                  name="tumor"
                  code="code"
                  display="display"
                  // renderOption={(option) => {
                  //   let title = option.code
                  //   let subtitle = option.display.split(":")[1]
                  //   // debugger
                  //   return <Grid container style={{ fontSize: "1rem", color:"#373737" }}>
                  //           <Grid item xs={12}>{`${title} - `}</Grid>
                  //           <Grid item xs={12}>{`${subtitle}`}</Grid>
                  //       </Grid>
                  // }}
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} md={12}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                Node (N)
              </Grid>
              <Grid item xs={12} md={6}>
                <AutoCompleteField
                  loading={loadValueSet}
                  id="node"
                  size="small"
                  options={NodeSet && NodeSet.length !== 0 ? NodeSet : []}
                  val={Option.values.node}
                  label="Select Value"
                  name="node"
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12} md={12}>
              <Grid item xs={12} md={1} className={classes.lebels}>
                Metastasis (M)
              </Grid>
              <Grid item xs={12} md={6}>
                <AutoCompleteField
                  loading={loadValueSet}
                  id="metastasis"
                  size="small"
                  options={
                    MetastasisSet && MetastasisSet.length !== 0
                      ? MetastasisSet
                      : []
                  }
                  val={Option.values.metastasis}
                  label="Select Value"
                  name="metastasis"
                  code="code"
                  display="display"
                />
              </Grid>
            </Grid>

            <Grid item container xs={12} md={12}>
              {DiagnosisStage === '' || DiagnosisStage === null ? (
                <>
                  <Grid item xs={12} md={1} className={classes.lebels}>
                    Cancer Stage
                  </Grid>
                  <Grid item xs={12} md={2} className={classes.centerDiv}>
                    <AutoCompleteField
                      // loading={loadValueSet}
                      id="stage"
                      size="small"
                      options={
                        StageSetData && StageSetData.length !== 0
                          ? StageSetData
                          : []
                      }
                      val={Option.values.stage}
                      label="Select Stage"
                      name="stage"
                      code="code"
                      display="display"
                    />
                  </Grid>
                </>
              ) : DiagnosisStage === 'NS' ? (
                <>
                  <Grid item xs={12} md={1} className={classes.lebels}>
                    Cancer Stage
                  </Grid>
                  <Grid item xs={12} md={2} className={classes.centerDiv}>
                    <AutoCompleteField
                      // loading={loadValueSet}
                      id="stage"
                      size="small"
                      options={
                        StageSetData && StageSetData.length !== 0
                          ? StageSetData
                          : []
                      }
                      val={Option.values.stage}
                      label="Select Stage"
                      name="stage"
                      code="code"
                      display="display"
                    />
                  </Grid>
                </>
              ) : (
                <div className={classes.stageDiv}>
                  <Typography variant="h3" style={{ fontWeight: 500 }}>
                    Cancer Stage -
                  </Typography>
                  <Typography
                    variant="h3"
                    style={{
                      marginLeft: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      fontWeight: 500,
                    }}
                  >
                    Stage{' '}
                    {LoadingSave ? (
                      <CircularProgress
                        size={25}
                        style={{ color: '#FF3399', marginLeft: 5 }}
                      />
                    ) : (
                      DiagnosisStage
                    )}
                  </Typography>
                  <Typography variant="h4" style={{ marginLeft: '1.5rem' }} />
                </div>
              )}
            </Grid>

            {Option.values.cancerType &&
            Option.values.cancerType.display === 'Breast Cancer' ? (
              <Grid item container xs={12} md={12}>
                <CheckBoxField name="ER" label="ER" />
                {Option.values.ER !== undefined && Option.values.ER && (
                  <Grid
                    item
                    xs={12}
                    md={2}
                    className={classes.centerDiv}
                    style={{ marginTop: '0.5rem' }}
                  >
                    <Textfield
                      name="ERText"
                      placeholder="Enter Value Here"
                      style={{ width: '80%' }}
                    />
                  </Grid>
                )}
                <CheckBoxField name="PR" label="PR" />

                {Option.values.PR !== undefined && Option.values.PR && (
                  <Grid
                    item
                    xs={12}
                    md={2}
                    className={classes.centerDiv}
                    style={{ marginTop: '0.5rem' }}
                  >
                    <Textfield
                      name="PRText"
                      placeholder="Enter Value Here"
                      style={{ width: '80%' }}
                    />
                  </Grid>
                )}

                <CheckBoxField name="HER" label="HER" />
                {Option.values.HER !== undefined && Option.values.HER && (
                  <Grid
                    item
                    xs={12}
                    md={2}
                    className={classes.centerDiv}
                    style={{ marginTop: '0.5rem' }}
                  >
                    <Textfield
                      name="HERText"
                      placeholder="Enter Value Here"
                      style={{ width: '80%' }}
                    />
                  </Grid>
                )}
              </Grid>
            ) : (
              ''
            )}

            {Option.values.cancerType &&
            Option.values.cancerType.display === 'Prostate Cancer' ? (
              <Grid item container xs={12} md={12}>
                <Grid item xs={12} md={1} className={classes.lebels}>
                  PSA
                </Grid>
                <Grid item xs={12} md={2}>
                  <Textfield
                    name="psa"
                    placeholder="Enter Value Here"
                    style={{ width: '65%' }}
                  />
                  <Textfield
                    name="psaUnit"
                    // disabled
                    style={{ width: '35%' }}
                  />
                </Grid>

                <Grid item xs={12} md={9} />
              </Grid>
            ) : (
              ''
            )}

            <Grid item container xs={12} md={12}>
              <Grid item container xs={12} md={4}>
                <Grid item xs={12} md={4} lg={3} className={classes.lebels}>
                  Histopathology
                </Grid>
                <Grid item xs={12} md={6}>
                  <AutoCompleteAdd
                    loading={loadValueSet}
                    id="histopathology"
                    size="small"
                    options={
                      HistopathologySet && HistopathologySet.length !== 0
                        ? HistopathologySet
                        : []
                    }
                    val={Option.values.histopathology}
                    label="Select Value"
                    name="histopathology"
                    code="code"
                    display="display"
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} md={4}>
                <Grid item xs={12} md={3} className={classes.lebels}>
                  Grade
                </Grid>
                <Grid item xs={12} md={6}>
                  <AutoCompleteAdd
                    loading={loadValueSet}
                    id="grade"
                    size="small"
                    options={GradeSet && GradeSet.length !== 0 ? GradeSet : []}
                    val={Option.values.grade}
                    label="Select Value"
                    name="grade"
                    code="code"
                    display="display"
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} md={4}>
                <Grid item xs={12} md={3} className={classes.lebels}>
                  Comment
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldOnBlur
                    name="diagnosisComment"
                    placeholder="Comment"
                    onChange={e => {
                      setDiagnosisComment(e.target.value);
                    }}
                    value={DiagnosisComment}
                  />
                </Grid>
              </Grid>
            </Grid>

            <MolecularTesting Id={Id} />

            {Option.values.impressionForVisitCheck && (
              <Grid item container xs={12} md={12}>
                <Grid item xs={12} md={1} className={classes.lebels}>
                  Impression For Visit
                </Grid>
                <Grid item xs={12} md={11}>
                  <TextArea
                    name="impressionForVisit"
                    placeholder="Enter Value Here"
                    multiline
                    rows={2}
                    // value={value}
                  />
                </Grid>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    doSaveDiagnosisStage: field => dispatch(doSaveDiagnosisStage(field)),

    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    diagnosisValueSetSearch: payload =>
      dispatch(diagnosisValueSetSearch(payload)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  MessageComponent,
)(Diagnosis);
