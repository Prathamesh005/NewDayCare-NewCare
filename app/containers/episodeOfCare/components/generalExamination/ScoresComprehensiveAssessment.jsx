import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClearIcon from '@material-ui/icons/Clear';
import clsx from 'clsx';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  cancerGeriatricAssessmentQuestionSet,
  doSaveCancerGeriatricAssessment,
} from '../../../../apis/globalApis/globalSlice';
import { saveCancerGeriatricAssessment } from '../../../../apis/globalApis/serviceCalls';
import { MessageComponent } from '../../../../components';
import UserContext from '../../MyStateContext';

const useStyles = makeStyles(theme => ({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#ff3399',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#ff3399',
    },
  },
  actionIcon: {
    margin: theme.spacing(1),
  },
  actionIconInfo: {
    position: 'absolute',
    left: '0px',
    margin: theme.spacing(0, 1, 0, 4),
  },
  rootContainer: {
    height: '100%',
  },
  headerDiv: {
    height: 48,
    display: 'flex',
    alignItems: 'center',
    padding: '0px 2.5rem',
    position: 'absolute',
    width: '100%',
    zIndex: 999,
  },
  scrollGrid: {
    height: '100%',
    marginTop: '2.5rem',
    padding: '2.5rem',
  },
  contentDiv: {
    padding: '40px 25px 0px 25px',
  },
  photoBtn: {
    marginLeft: 20,
    background: '#ffffff',
    color: '#ff3499',
    borderRadius: 20,
    '&:hover': {
      background: '#f4f4f4',
      opacity: 0.9,
    },
  },
  recalculateScore: {
    marginLeft: 20,
    background: '#ffffff',
    color: '#ff3499',
    '&:hover': {
      background: '#f4f4f4',
      opacity: 0.9,
    },
  },
  headlabels: {
    fontSize: '0.98rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
  lebels1: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    justifyContent: 'space-between',
  },
  contentSection: {
    padding: '1rem 2rem',
  },
  calculateBtn: {
    backgroundColor: '#ffffff',
    padding: '0px 16px',
    marginBottom: 40,
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
  },
  navigationBtn: {
    padding: '5px 10px',
    outline: 'none !important',
    backgroundColor: '#ffffff',
    color: '#373737',
    marginLeft: 10,
    borderRadius: 50,
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  navigationBtn1: {
    padding: '5px',
    outline: 'none !important',
    backgroundColor: '#ffffff',
    color: '#373737',
    marginLeft: 10,
    borderRadius: '50%',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  radioColor: {
    '&.MuiRadio-colorSecondary.Mui-checked': {
      color: '#ff3b9d !important',
    },
  },
  centerDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  errorDisplaycss: {
    color: 'red',
    marginLeft: 10,
    marginTop: 5,
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

function ScoresComprehensiveAssessment(props) {
  // console.log("ScoresComprehensiveAssessment",props)
  const { patientInfo, cancerGeriatricAssResultStore } = props;
  const classes = useStyles();
  const user = React.useContext(UserContext);
  const [questionSet, setQuestionSet] = React.useState(null);

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const { payload } = await props.cancerGeriatricAssessmentQuestionSet({
      url: '',
    });

    setQuestionSet(
      payload && payload.message
        ? []
        : payload.data.cancerQuestionnaire &&
            payload.data.cancerQuestionnaire[0].questionnaire,
    );
  };

  //-----------------API CALLS END---------------

  useEffect(() => {
    callValueSetSearch();
  }, []);

  const [questionData, setQuestionData] = React.useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = React.useState('');

  const [resultData, setResultData] = useState({});

  const handleChange = (event, index, subItemIndex, question) => {
    setSelected(event.target.value);

    setQuestionData({
      ...questionData,
      [questionData.subItems]: questionData.subItems.forEach(v => {
        if (v.code === subItemIndex) {
          v.select = true;
        } else {
          v.select = false;
        }
      }),
    });

    setResultData({
      ...resultData,
      [index]: {
        code: subItemIndex,
        display: event.target.value,
        question: question,
      },
    });
  };

  useEffect(() => {
    if (questionSet != null) {
      let quiz = JSON.parse(JSON.stringify(questionSet));
      // debugger
      quiz.items.forEach(q => {
        q.subItems.forEach(o => (o.select = false));
      });
      // debugger

      if (currentQuestion >= 0 && quiz.items.length >= currentQuestion) {
        let res = quiz.items[currentQuestion];

        setQuestionData(res);
      }
    }
  }, [questionSet, currentQuestion]);

  const [errorDisplay, seterrorDisplay] = useState(false);

  const nextQue = () => {
    if (selected !== '') {
      if (questionSet.items.length > currentQuestion + 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelected('');
        seterrorDisplay(false);
      } else {
        setCurrentQuestion(currentQuestion);
      }
    } else {
      seterrorDisplay(true);
    }
  };
  const prevQue = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const onSave = async () => {
    const field = {
      resourceId: patientInfo.patientId,
      display: patientInfo.patientDisplay,
      praResourceId: patientInfo.practitionerId,
      praDisplay: patientInfo.practitionerDisplay,

      questionnaireId: questionSet.resourceId,
      resultData: Object.values(resultData),
    };

    const { payload } = await props.doSaveCancerGeriatricAssessment(
      saveCancerGeriatricAssessment(field),
    );

    if (payload && payload.status === 200) {
      props.snackbarShowMessage(
        'Comprehensive Geriatric Assessment Saved Successfully',
        'success',
      );

      props.setshowResultPage(true);
      props.handleClose();
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

  user.setGeriatricQuestionnaireId(questionSet && questionSet.resourceId);
  user.setGeriatricResultData(resultData);
  user.setGeriatricFinalScore(cancerGeriatricAssResultStore);

  return (
    <Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Grid
            item
            container
            xs={12}
            md={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h3"
              margin="0px"
              color="textSecondary"
              display="inline"
            >
              Set all parameters to calculate prediction
            </Typography>

            <IconButton
              style={{
                borderRadius: 5,
                padding: 5,
                outline: 'none !important',
                backgroundColor: 'rgb(216 216 216)',
                color: '#373737',
                float: 'right',
              }}
              onClick={props.handleClose}
            >
              <ClearIcon style={{ fontSize: 25 }} />
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            item
            xs={12}
            md={12}
            spacing={6}
            className={classes.contentSection}
          >
            <Grid item xs={12} md={12}>
              <Typography variant="h2" gutterBottom className={classes.lebels}>
                Q {currentQuestion + 1}/
                {questionSet != null ? questionSet.items.length : ''}
              </Typography>

              <Typography variant="h3" gutterBottom className={classes.lebels}>
                {questionData != null ? questionData.display : ''}
              </Typography>

              {questionData != null
                ? questionData.subItems.map((choice, index) => {
                    return (
                      <div key={(index + 1).toString()}>
                        <StyledRadio
                          checked={choice.select}
                          onChange={e =>
                            handleChange(
                              e,
                              currentQuestion,
                              choice.code,
                              questionData.display,
                            )
                          }
                          value={choice.display}
                          name={choice.display}
                          inputProps={{ 'aria-label': 'A' }}
                        />
                        {choice.display}
                      </div>
                    );
                  })
                : ''}

              <div className={classes.errorDisplaycss}>
                {errorDisplay && 'Please select one option '}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ background: '#F8F8F8' }}>
          <Grid container>
            <Grid item xs={12} md={12}>
              <IconButton
                className={classes.navigationBtn1}
                onClick={() => prevQue()}
                disabled={currentQuestion == 0 ? true : false}
              >
                <ChevronLeftIcon style={{ fontSize: 25 }} />
              </IconButton>

              {currentQuestion == 7 ? (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.photoBtn}
                  onClick={onSave}
                >
                  Calculate
                </Button>
              ) : (
                <IconButton
                  className={classes.navigationBtn}
                  onClick={() => nextQue()}
                >
                  Next <ChevronRightIcon style={{ fontSize: 25 }} />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    cancerGeriatricAssessmentQuestionSet: url =>
      dispatch(cancerGeriatricAssessmentQuestionSet(url)),
    doSaveCancerGeriatricAssessment: payload =>
      dispatch(doSaveCancerGeriatricAssessment(payload)),

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
)(ScoresComprehensiveAssessment);
