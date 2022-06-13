import { Card, CardHeader, Grid, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import { EPISODE_DATE_FORMAT } from '../../../utils/constants';
import CardDemo from './CardDemo';

const useStyles = makeStyles(theme => ({
  gridRoot: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    minHeight: 320,

    borderRadius: '0px 0px 5px 5px',
    boxShadow: '0px 2px 4px #00000029',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  ongridRoot: {
    minHeight: 290,
  },
  gridRoot1: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    minHeight: 100,
    // height:378,

    borderRadius: '0px 0px 5px 5px',
    boxShadow: '0px 2px 4px #00000029',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  card: {
    borderRadius: '0',
    height: 80,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '3px solid #eeeeee',
    borderRadius: '5px 5px 0px 0px',
    boxShadow: '0px 2px 4px #00000029',
    [theme.breakpoints.down('sm')]: {
      padding: '15px 0px',
    },
  },
  onOpenCard: {
    height: 110,
  },
  headerCard: {
    // padding: 0,
    padding: '0px 15px',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 500,
  },
  headerSubTitle: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.primary.common,
    opacity: 0.6,
  },
}));

export default function Header(props) {
  // console.log(props)

  const classes = useStyles();

  const [prevData, setprevData] = React.useState({
    cancerTypeTitle: '',
    cancerTypeSubTitle: '',

    stageTitle: '',
    stageSubTitle: '',

    ecogTitle: '',
    ecogSubTitle: '',

    cgaTitle: '',
    cgaSubTitle: '',
  });

  React.useEffect(() => {
    let cancerTypeTitle = '- na -';
    let cancerTypeSubTitle = '-';
    let stageTitle = '- na -';
    let stageSubTitle = '-';
    let ecogTitle = '- na -';
    let ecogSubTitle = '-';
    let cgaTitle = '- na -';
    let cgaSubTitle = '';

    if (props && props.cancerType != null) {
      cancerTypeTitle =
        props.cancerType.code != null
          ? props.cancerType.code.display
          : '- na -';
      cancerTypeSubTitle =
        props.cancerType.histologyMorphologyBehaviour !== null
          ? props.cancerType.histologyMorphologyBehaviour.display
          : '-';
    }

    if (
      props &&
      props.stage &&
      props.stage !== undefined &&
      props.stage !== ''
    ) {
      stageTitle = props.stage ? `Stage ${props.stage}` : '- na -';

      stageSubTitle = moment(props.stageDate)
        .utc()
        .format(EPISODE_DATE_FORMAT);
    }
    // debugger;

    if (props && props.ecogScore != null) {
      ecogTitle =
        props && props.ecogScore && props.ecogScore.valueInteger
          ? `0${props.ecogScore.valueInteger.split('-')[0]}`
          : '- na -';
      ecogSubTitle = moment(props.ecogScore.effectiveDateTime)
        .utc()
        .format(EPISODE_DATE_FORMAT);
    }

    if (props && props.cgaScore != null) {
      cgaTitle =
        props.cgaScore.value !== null ? props.cgaScore.value : '- na -';
      cgaSubTitle = moment(props.cgaScore.effectiveDateTime)
        .utc()
        .format(EPISODE_DATE_FORMAT);
    }

    setprevData({
      cancerTypeTitle: cancerTypeTitle,
      cancerTypeSubTitle: cancerTypeSubTitle,

      stageTitle: stageTitle,
      stageSubTitle: stageSubTitle,

      ecogTitle: ecogTitle,
      ecogSubTitle: ecogSubTitle,

      cgaTitle: cgaTitle,
      cgaSubTitle: cgaSubTitle,
    });

    return () => {
      setprevData({
        cancerTypeTitle: '',
        cancerTypeSubTitle: '',

        stageTitle: '',
        stageSubTitle: '',

        ecogTitle: '',
        ecogSubTitle: '',

        cgaTitle: '',
        cgaSubTitle: '',
      });
    };
  }, [props]);

  return (
    <>
      <Card
        className={clsx(
          classes.card,
          props && !props.sidebarShow && classes.onOpenCard,
        )}
        elevation={0}
      >
        <CardHeader
          title={prevData.cancerTypeTitle}
          subheader={prevData.cancerTypeSubTitle}
          className={classes.headerCard}
          classes={{
            title: classes.headerTitle,
            subheader: classes.headerSubTitle,
          }}
        />
      </Card>
      <Grid
        container
        spacing={0}
        className={clsx(
          props && props.sidebarShow ? classes.gridRoot1 : classes.gridRoot,
          props && !props.sidebarShow && classes.ongridRoot,
        )}
      >
        <Grid item xs={6} md={props && props.sidebarShow ? 4 : 12}>
          <CardDemo
            title="Cancer Stage"
            value={`${prevData.stageTitle}`}
            subTitle={
              prevData.cgaSubTitle !== '' ? `(${prevData.cgaSubTitle})` : ''
            }
          />
        </Grid>
        <Grid item xs={6} md={props && props.sidebarShow ? 4 : 12}>
          <CardDemo
            title="Ecog Score"
            value={prevData.ecogTitle}
            subTitle={
              prevData.cgaSubTitle !== '' ? `(${prevData.cgaSubTitle})` : ''
            }
          />
        </Grid>

        <Grid item xs={6} md={props && props.sidebarShow ? 4 : 12}>
          <CardDemo
            title="CGA Score"
            value={prevData.cgaTitle}
            subTitle={
              prevData.cgaSubTitle !== '' ? `(${prevData.cgaSubTitle})` : ''
            }
          />
        </Grid>
      </Grid>
    </>
  );
}
