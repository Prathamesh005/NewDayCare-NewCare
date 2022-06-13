import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { filter } from 'lodash';
import React, { Fragment, useEffect } from 'react';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import AlergicHistory from './medicalHistory/AlergicHistory';
import ChiefCompaint from './medicalHistory/ChiefCompaint';
import ComorbidCondition from './medicalHistory/ComorbidCondition';
import OnFollowUpVisitCard from './onFollowUpVisit/OnFollowUpVisitCard';

const useStyles = makeStyles(theme => ({
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
}));

function MedicalHistoryForm(props) {
  // console.log("MedicalHistoryForm",props)
  const { Option } = props;
  const classes = useStyles();
  const [expand1, setExpand1] = React.useState(true);
  const [OnLoadData, setOnLoadData] = React.useState([]);

  const { OnLoadcomrbidata, OnLoadallergydata, OnLoadComplainses } = props;

  useEffect(() => {
    let comrbidata =
      OnLoadcomrbidata && OnLoadcomrbidata.length > 0
        ? OnLoadcomrbidata.flatMap(i => i.code.display)
        : [];
    let allergydata =
      OnLoadallergydata && OnLoadallergydata.length > 0
        ? OnLoadallergydata.flatMap(
            i => i.reaction[0].substance && i.reaction[0].substance.display,
          )
        : [];
    let Complainses =
      OnLoadComplainses && OnLoadComplainses.length > 0
        ? OnLoadComplainses.flatMap(i => i.clinicalComplains)
        : [];

    // debugger;

    let res = [
      {
        title: 'Comorbidity',
        subtitle: comrbidata,
        status: OnLoadcomrbidata && OnLoadcomrbidata.length > 0,
        type: 'isSubArray',
      },
      {
        title: 'Allergy',
        subtitle: allergydata,
        status: OnLoadallergydata && OnLoadallergydata.length > 0,
        type: 'isSubArray',
      },
      {
        title: 'Chief Complaint',
        subtitle: Complainses,
        status:
          OnLoadComplainses &&
          OnLoadComplainses.length > 0 &&
          OnLoadComplainses[0].clinicalComplains != null &&
          OnLoadComplainses[0].clinicalComplains.length > 0,
        type: 'isSubArray',
      },
    ];
    // debugger;
    setOnLoadData(filter(res, { status: true }));
  }, [OnLoadcomrbidata, OnLoadallergydata, OnLoadComplainses]);

  const onExpand = () => {
    setExpand1(!expand1);
  };

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
                Medical History
              </Typography>
            </Grid>
            <Grid item xs={12} md={10} className={classes.centerGrid}>
              {!expand1 && <OnFollowUpVisitCard OnLoadData={OnLoadData} />}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <ComorbidCondition />
            <AlergicHistory />

            <ChiefCompaint />
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}

export default MedicalHistoryForm;
