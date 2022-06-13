import React, { useEffect, useState, useRef } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@material-ui/core';
import EventSharpIcon from '@material-ui/icons/EventSharp';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';
import { PrimaryPinkButton } from '../../components/button';

const useStyles = makeStyles(theme => ({
  formControl: {
    // margin: theme.spacing(1),
    // marginBottom: theme.spacing(3),
    minWidth: 250,
    '& .MuiFilledInput-input': {
      padding: '10px 10px',
    },
    '& .MuiFilledInput-root': {
      borderRadius: '3px',
      backgroundColor: '#f4f4f4',
    },
    '& .MuiSvgIcon-root': {
      height: '0.8em',
      width: '0.8em',
    },
  },
  iconOpen: {
    transform: 'none',
    fontSize: '0.9rem',
  },
  menuFont: {
    fontSize: '0.9rem',
    fontWeight: '400',
  },
  mainContainer: {
    minWidth: '230px',
    maxWidth: 'fit-content',
    padding: '0rem 0.8rem',
  },
  topArrow: {
    padding: '1rem 0rem',
  },
  dateField: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
  },
  toFrom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    paddingLeft: '6px',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  bottomBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.7rem 0rem',
  },
  btnSize: {
    minWidth: '50px',
    padding: '0px',
    fontSize: '0.8rem',
    minHeight: '26px',
  },
  noBorder: {
    border: 'none',
  },
  textField2: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
  },
}));

function SelectDateWrapper(props) {
  const classes = useStyles();
  const [date, setDate] = useState('');
  const [openDateRange, setOpenDateRange] = useState(false);
  const [openSelect, setOpenSelect] = useState(false);
  const [open, setOpen] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const closeRef = useRef();

  const handleChange = event => {
    // debugger;
    if (event === 'apply') {
      if (fromDate && toDate) {
        props.selectedDate(
          moment(fromDate).format('YYYY-MM-DD'),
          moment(toDate).format('YYYY-MM-DD'),
        );
        debugger;
        setOpenDateRange(false);
        setOpenSelect(false);
        setOpen(false);
        setDate('Custom Date Range');
      }
    } else if (event.target.value) {
      setDate(event.target.value);
    }
  };
  useEffect(() => {
    setDate('Current Month');
  }, []);
  useEffect(() => {
    // debugger;
    if (date === 'Custom Date Range') {
      setOpenSelect(false);
      setOpenDateRange(true);
      setOpen(true);
      setFromDate();
      setToDate();
    } else if (date && date !== 'Custom Date Range') {
      setOpen(false);
      setOpenDateRange(false);
      setFromDate();
      setToDate();
      if (date === 'Current Month') {
        props.selectedDate(
          moment()
            .startOf('month')
            .format('YYYY-MM-DD'),
          moment().format('YYYY-MM-DD'),
        );
      } else if (date === 'Today') {
        props.selectedDate(
          moment().format('YYYY-MM-DD'),
          moment().format('YYYY-MM-DD'),
        );
      } else if (date === 'Yesterday') {
        props.selectedDate(
          moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD'),
          moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD'),
        );
      } else if (date === 'Last Week') {
        props.selectedDate(
          moment()
            .subtract(1, 'weeks')
            .startOf('week')
            .format('YYYY-MM-DD'),
          moment()
            .subtract(1, 'weeks')
            .endOf('week')
            .format('YYYY-MM-DD'),
        );
      } else if (date === 'Last Month') {
        props.selectedDate(
          moment()
            .subtract(1, 'months')
            .startOf('month')
            .format('YYYY-MM-DD'),
          moment()
            .subtract(1, 'months')
            .endOf('month')
            .format('YYYY-MM-DD'),
        );
      }
    } else {
      // debugger
    }
  }, [date]);

  // useEffect(() => {
  //   if (date === 'Custom Date Range' && fromDate && toDate) {
  //     props.selectedDate(
  //       moment(fromDate).format('YYYY-MM-DD'),
  //       moment(toDate).format('YYYY-MM-DD'),
  //     );
  //   }
  // }, [date, fromDate, toDate]);

  const dateOptions = [
    { optionType: 'Current Month', code: 'currentMonth' },
    { optionType: 'Today', code: 'today' },
    { optionType: 'Yesterday', code: 'yesterday' },
    { optionType: 'Last Week', code: 'lastWeek' },
    { optionType: 'Last Month', code: 'lastMonth' },
    { optionType: 'Custom Date Range', code: 'custom' },
  ];
  const handleBack = () => {
    setOpenDateRange(false);
    setOpenSelect(true);
    setDate('');
  };
  // console.log("open", open);
  // console.log(moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD'));
  return (
    <>
      <FormControl variant="filled" className={classes.formControl}>
        {/* <InputLabel id="select">Date Created</InputLabel> */}
        <Select
          IconComponent={EventSharpIcon}
          labelId="select"
          id="select"
          open={open}
          onOpen={e => {
            setOpen(true);
            setOpenSelect(true);
            if (date === 'Custom Date Range') {
              setDate('');
            }
          }}
          onChange={handleChange}
          onClose={e => !openDateRange && setOpen(false)}
          value={date}
          renderValue={value => {
            return (
              <Grid
                container
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#373737',
                }}
              >
                {value === 'Custom Date Range' && fromDate && toDate
                  ? `${moment(fromDate).format('DD/MM/YYYY')} - ${moment(
                    toDate,
                  ).format('DD/MM/YYYY')}`
                  : value}
              </Grid>
            );
          }}
          disableUnderline
          classes={{ icon: classes.icon, iconOpen: classes.iconOpen }}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          {openSelect &&
            open &&
            dateOptions.map(dateOption => (
              <MenuItem
                value={dateOption.optionType}
                key={dateOption.code}
                className={classes.menuFont}
              >
                {dateOption.optionType}
              </MenuItem>
            ))}

          {openDateRange && open && (
            // <MenuItem style={{ margin: "10px" }}>
            <Grid container className={classes.mainContainer}>
              <Grid item xs={12} className={classes.topArrow}>
                <ArrowBackIcon
                  style={{ cursor: 'pointer' }}
                  onClick={handleBack}
                />
              </Grid>
              <Grid item xs={12} className={classes.toFrom}>
                From
              </Grid>
              <Grid item xs={12} className={classes.dateField}>
                <TextField
                  className={classes.textField2}
                  style={{
                    margin: '0px 0.2rem',
                    fontSize: '0.4rem',
                    padding: '6px 2px',
                    // width: '170px',
                  }}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  placeholder="Select Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    type: 'date',
                    placeholder: 'Select Date',
                    className: classes.input3,
                    classes: { notchedOutline: classes.noBorder },
                  }}
                  inputProps={{
                    max: toDate
                      ? moment(new Date(toDate)).format('YYYY-MM-DD')
                      : '',
                  }}
                />
              </Grid>
              <Grid item xs={12} className={classes.toFrom}>
                To
              </Grid>
              <Grid item xs={12} className={classes.dateField}>
                <TextField
                  className={classes.textField2}
                  style={{
                    margin: '0px 0.2rem',
                    fontSize: '0.4rem',
                    padding: '6px 2px',
                    // width: '170px',
                  }}
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  placeholder="Select Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    type: 'date',
                    placeholder: 'Select Date',
                    className: classes.input3,
                    classes: { notchedOutline: classes.noBorder },
                  }}
                  inputProps={{
                    min: fromDate
                      ? moment(new Date(fromDate)).format('YYYY-MM-DD')
                      : '',
                  }}
                />
              </Grid>
              <Grid item xs={12} className={classes.bottomBtn}>
                <PrimaryPinkButton
                  size="small"
                  className={classes.btnSize}
                  onClick={() => handleChange('apply')}
                >
                  Apply
                </PrimaryPinkButton>
              </Grid>
            </Grid>
            // </MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
}

export default SelectDateWrapper;
