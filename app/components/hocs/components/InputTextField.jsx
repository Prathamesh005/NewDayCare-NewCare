import { makeStyles, TextField } from '@material-ui/core';
import { useField } from 'formik';
import React from 'react';


const useStyles = makeStyles(theme => ({
    noBorder: {
        border: 'none',
    },
    textField: {
        '& .MuiOutlinedInput-input': {
            fontSize: '1rem',
            fontWeight: '400',
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
            fontSize: '1rem',
            fontWeight: 400,
        },
        '& .MuiFormControl-marginDense': {
            marginTop: '4px',
        },
        '& .MuiOutlinedInput-inputMarginDense': {
            padding: '0.1px 0.5px',
        },
        margin: theme.spacing(0.5),
    },
    textFieldNormal: {
        '& .MuiOutlinedInput-input': {
            background: '#F4F4F4',
            fontSize: '1rem',
            fontWeight: '400',
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
            fontSize: '1rem',
            fontWeight: 400,
        },
        '& .MuiFormControl-marginDense': {
            marginTop: '4px',
        },
        margin: theme.spacing(0.5),
    },
    input3: {
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

const InputTextField = ({ name, endAdornment, classStyle, ...otherProps }) => {
    const [field, meta] = useField(name);
    const classes = useStyles();

    const configTextfield = {
        ...field,
        ...otherProps,
        size: 'small',
        autoComplete: 'off',
    };

    if (meta && meta.touched && meta.error) {
        configTextfield.error = true;
        configTextfield.helperText = meta.error;
    }

    const InputProps = {
        classes: { notchedOutline: classes.noBorder },
        className: classes.input3,
        endAdornment: endAdornment,
    };

    return (
        <TextField
            {...configTextfield}
            className={classes[`${classStyle}`]}
            InputProps={InputProps}
        />
    );
};

export default InputTextField;