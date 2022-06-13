import { InputBase, Paper, TextField } from '@material-ui/core';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import IconSearch from '../../images/assets/Search icon.svg';
import OutlinedAutoCompleteInput from './OutlinedAutoCompleteInput';
import WhiteAutocomplete from './WhiteAutoComplete';

const useStyles = makeStyles(theme => ({
  textFieldTick: {
    // hide arrow
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },

    '& .MuiOutlinedInput-input': {
      //   background: '#FFFFFF',
      fontSize: '0.9rem',
      fontWeight: 400,
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
  },
  noBorder: {
    border: 'none',
  },
  //
  textFieldGray: {
    '& .MuiInputBase-root': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      color: '#000000',
      border: '1px solid #70707033;',
    },
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      color: '#000000',
    },
    //endorments
    '& .MuiOutlinedInput-adornedStart': {
      background: '#F4F4F4',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      background: '#F4F4F4',
    },
    // hide arrow
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
  },
  // Note:  date hide in test
  // textRoot: {
  //   '& input[type="date"]::-webkit-inner-spin-button, & input[type="date"]::-webkit-calendar-picker-indicator': {
  //     display: 'none',
  //     ' -webkit-appearance': 'none',
  //   },
  //   date 2
  //   '& input[type="date"]': {
  //     '& input[type="date"]::-webkit-inner-spin-button, & input[type="date"]::-webkit-calendar-picker-indicator': {
  //       display: 'none',
  //       ' -webkit-appearance': 'none',
  //       position: 'absolute',
  //       right: 0,
  //       opacity: 0,
  //     },
  //     width: '100%',
  //   },
  // },
  inputSearch: {
    marginLeft: theme.spacing(2),
    flex: 1,
    // color: '#00000029',
    fontSize: '1rem',
    fontWeight: '400',
    marginLeft: theme.spacing(3),
  },
  rootSearch: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: '3px',
    border: '1px solid #C2C2C2',
  },

  // date
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
  },
  input1: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
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
}));

export function WhiteInput(props) {
  const classes = useStyles();

  return (
    <TextField
      className={classes.textFieldTick}
      fullWidth
      variant="outlined"
      size="small"
      InputProps={{
        classes: { notchedOutline: classes.noBorder },
      }}
      {...props}
    />
  );
}

export const GrayTextInput = ({
  name,
  startAdornment,
  endAdornment,
  ...otherProps
}) => {
  const classes = useStyles();
  const configTextfield = {
    fullWidth: true,
    variant: 'outlined',
    size: 'small',
    autoComplete: 'new-password',
    ...otherProps,
  };

  return (
    <TextField
      className={classes.textFieldGray}
      InputProps={{
        classes: { notchedOutline: classes.noBorder },
        startAdornment: startAdornment,
        endAdornment: endAdornment,
      }}
      {...configTextfield}
    />
  );
};

export const SearchInput = props => {
  const classes = useStyles();
  const onEnterPress = ev => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
    }
  };
  return (
    <Paper component="form" className={classes.rootSearch} elevation={0}>
      <img
        src={IconSearch}
        height="21px"
        width="18px"
        style={{ marginLeft: 10 }}
      />
      <InputBase
        onKeyPress={onEnterPress}
        className={classes.inputSearch}
        margin="none"
        {...props}
      />
    </Paper>
  );
};

export const DateInput = ({ name, ...otherProps }) => {
  return (
    <GrayTextInput
      id="dateOfBirth"
      name="dateOfBirth"
      margin="dense"
      variant="outlined"
      fullWidth
      size="small"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        type: 'date',
        placeholder: 'dd-mm-yyyy',
        // endAdornment: (
        //   <InputAdornment position="start">
        //     <ImageIconWrapper src={DateIcon} />
        //   </InputAdornment>
        // ),
      }}
      {...otherProps}
    />
  );
};

export const FreeSoloAutoComplete = props => {
  const filter = createFilterOptions();
  const {
    objectToPushInOptions,
    autoCompleteType = 'outlined',
    ...etcProps
  } = props;
  return autoCompleteType === 'outlined' ? (
    <OutlinedAutoCompleteInput
      freeSolo
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            ...objectToPushInOptions(params.inputValue),
          });
        }
        return filtered;
      }}
      {...etcProps}
    />
  ) : (
    <WhiteAutocomplete
      freeSolo
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            ...objectToPushInOptions(params.inputValue),
          });
        }
        return filtered;
      }}
      {...etcProps}
    />
  );
};
