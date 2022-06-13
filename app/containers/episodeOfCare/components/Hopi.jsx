import { CircularProgress, useMediaQuery } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { filter } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { generateHOPIviaAI } from '../../../apis/episodeOfCareApis/serviceCalls';
import {
  doGenerateHOPIviaAI,
  loadHOPI,
} from '../../../apis/globalApis/globalSlice';
import { MessageComponent } from '../../../components';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import TextArea from './forms/TextArea';
import OnFollowUpVisitCard from './onFollowUpVisit/OnFollowUpVisitCard';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    borderRadius: '18px',
    padding: '0.3rem 0.7rem',
    marginLeft: '15px',
    border: '1px solid #cacaca',
    backgroundColor: '#F0F0F0',
    color: '#373737',
  },
  accordationDiv: {
    width: '100%',
  },
  headlabels: {
    fontSize: '0.98rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  secondarylabels: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    position: 'absolute',
    top: '50%',
    left: '100%',
    marginTop: -12,
    marginLeft: 12,
  },
}));

function Hopi(props) {
  const { Option, SET_HOPI_INITIAL_STATE, HOPIData } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [expand1, setExpand1] = React.useState(true);
  const [ShowHopi, setShowHopi] = React.useState(true);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(null);
  const [OnLoadData, setOnLoadData] = React.useState([]);
  const [LoadingSave, setLoadingSave] = useState(false)
  const showText = useMediaQuery(theme.breakpoints.down('md'));

  const callLoadHOPI = async field => {
    const { payload } = await props.loadHOPI(field);
    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  useEffect(() => {
    if (props.Id !== '') {
      const field = {
        id: props.Id,
      };
      callLoadHOPI(field);
    }
  }, [props.Id]);

  useEffect(() => {
    let description = '';
    let descriptionId = '';
    let encounter = null;
    setStatus(null);
    if (HOPIData) {
      description = HOPIData.description;
      descriptionId = HOPIData.resourceId;
      encounter = HOPIData.encounter;
      setStatus(HOPIData.docStatus);
    }

    const INITIAL_FORM_STATE = {
      hopi: description ? description : '',
      hopiId: descriptionId ? descriptionId : uuidv4(),
      encounter: encounter,
    };

    SET_HOPI_INITIAL_STATE(INITIAL_FORM_STATE);
  }, [HOPIData]);

  const handleGenerateHOPI = async e => {
    e.stopPropagation();
    if (status === 'Final') {
      props.handleGenerateSuccessMessage(
        { message: 'HOPI already generated' },
        'error',
      );
    } else {
      if (expand1 === false) {
        setExpand1(true);
      }
      if (
        props.ChiefComplaintData.length > 0 ||
        props.PrevTestResultData.length > 0 ||
        props.PertainingIllnessData.length > 0
      ) {
        let PrevTestResultData =
          props.PrevTestResultData &&
          props.PrevTestResultData.map(item => {
            const { newEntry, ...rest } = item;
            return rest;
          });

        let field = {
          appointmentId: props.appointmentId,
          loginDetail: props.loginDetail,
          PrevTestResultData:
            PrevTestResultData.length > 0 ? PrevTestResultData : null,
          PertainingIllnessData:
            props.PertainingIllnessData.length > 0
              ? props.PertainingIllnessData
              : null,
          ChiefComplaintData:
            props.ChiefComplaintData.length > 0
              ? props.ChiefComplaintData
              : null,
          TreatmentHistoryData:
            props.TreatmentHistoryData.length > 0
              ? props.TreatmentHistoryData
              : null,
          ComorbidityData:
            props.ComorbidityData.length > 0 ? props.ComorbidityData : null,
        };
        setLoadingSave(true)
        const { payload } = await props.doGenerateHOPIviaAI(
          generateHOPIviaAI(field),
        );
        setLoadingSave(false)
        if (payload && payload.status === 200) {
          props.handleGenerateSuccessMessage(payload.data, 'success');
          props.Option.setFieldValue('hopi', payload.data.response.description);
        } else if (payload && payload.message) {
          let m =
            payload.response &&
            payload.response.data &&
            payload.response.data.message
              ? payload.response.data
              : payload;

          props.handleGenerateSuccessMessage(m, 'error');
        }
      }
    }
  };

  useEffect(() => {
    if (Option.values.checkFollowUp && Option.values.checkFollowUp > 1) {
      setExpand1(false);
      setShowHopi(false);
    } else {
      setExpand1(true);
      setShowHopi(true);
    }
  }, [Option.values.checkFollowUp]);

  const onExpand = () => {
    setExpand1(!expand1);
  };

  useEffect(() => {
    const { hopi } = Option.values;

    let res = [
      {
        title: '',
        subtitle: hopi && hopi,
        status: hopi && hopi !== '',
        type: 'name',
      },
    ];

    setOnLoadData(filter(res, { status: true }));
  }, [props.Option]);

  // console.log("HOPI", HOPIData)
  // console.log("HOPIstatus", status)
  return (
    <Fragment>
      <Accordion expanded={expand1} onChange={onExpand} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs={12} md={2} className={classes.centerGrid}>
              <Typography className={classes.headlabels}>
                {showText ? 'HOPI' : 'History Of Present Illness'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={10} className={classes.centerGrid}>
              {expand1 && ShowHopi && (
                <div className={classes.wrapper}>
                  <IconButton
                    className={classes.iconBtn}
                    onClick={e => handleGenerateHOPI(e)}
                    disabled={LoadingSave}
                  >
                    <Typography variant="h4">Generate Via AI</Typography>
                  </IconButton>
                  {LoadingSave && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              )}
              {/* {expand1 && ShowHopi && (
                <IconButton
                  className={classes.iconBtn}
                  onClick={e => handleGenerateHOPI(e)}
                >
                  <Typography variant="h4">Generate Via AI</Typography>
                </IconButton>
              )} */}

              {!expand1 && <OnFollowUpVisitCard OnLoadData={OnLoadData} />}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <TextArea
              name="hopi"
              placeholder="Enter Value Here"
              multiline
              rows={4}
              // value={value}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}
const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    doGenerateHOPIviaAI: field => dispatch(doGenerateHOPIviaAI(field)),
    loadHOPI: field => dispatch(loadHOPI(field)),

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
)(Hopi);
