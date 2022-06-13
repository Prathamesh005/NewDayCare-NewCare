import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { useTheme, withStyles } from '@material-ui/core/styles';

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

export const DenseAccordionSummary = withStyles({
  root: {
    padding: '25px 0px',
    height: 50,
    '&$expanded': {
      minHeight: 50,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

export const DenseAccordionDetails = withStyles(theme => ({
  root: {
    padding: '0px',
  },
}))(MuiAccordionDetails);
