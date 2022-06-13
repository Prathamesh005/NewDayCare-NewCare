import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import { withStyles } from '@material-ui/core/styles';

export const DenseAccordion = withStyles({
  root: {
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

export const DenseAccordionSummary = withStyles(theme => ({
  root: {
    padding: '20px',
    height: 50,
    background: '#F8F8F8',
    marginBottom: 10,
    '&$expanded': {
      minHeight: 50,
      background: '#ffffff',
    },
    [theme.breakpoints.down('md')]: {
      padding: '10px',
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
}))(MuiAccordionSummary);

export const DenseAccordionDetails = withStyles(theme => ({
  root: {
    padding: '0px 20px 20px',
    [theme.breakpoints.down('md')]: {
      padding: '0px 10px 20px',
    },
  },
}))(MuiAccordionDetails);
