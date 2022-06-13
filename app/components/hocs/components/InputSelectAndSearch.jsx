import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {
    createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useField, useFormikContext } from 'formik';
// import Search from '@material-ui/icons/Search';
const filterArray = createFilterOptions();
const filterArrayAuto = createFilterOptions({
    matchFrom: 'any',
    stringify: option => option.code + option.display,
});
const useStyles = makeStyles({
    textField: {
        '& .MuiOutlinedInput-input': {
            background: '#F4F4F4',
            fontSize: '1rem',
            fontWeight: '400',
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
            fontSize: '1rem',
            fontWeight: 400,
        },
    },
    textField1: {
        '& .MuiFormControl-marginDense': {
            margin: 0,
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
});
const InputSelectAndSearch = ({
    label,
    options,
    display,
    ...otherProps
}) => {
    const classes = useStyles();

    const configSelect = {
        ...otherProps,
        freeSolo: true,
        size: "small",
        openOnFocus: true,
        disableClearable: true,
        selectOnFocus: true,
        clearOnBlur: true,
        handleHomeEndKeys: true,
        options: options ? options : [],
        getOptionLabel: option => {
            if (typeof option === 'string') {
                return option;
            }
            if (option.inputValue) {
                return option.inputValue;
            }
            return option.display ? option.display : '';
        },
        filterOptions: (optionsArray, params) => {
            const filtered = filterArrayAuto(optionsArray, params);
            // Suggest the creation of a new value
            if (params.inputValue !== '') {
                filtered.push({
                    inputValue: params.inputValue,
                    display: `Add "${params.inputValue}"`,
                });
            }

            return filtered;
        },
        className: classes.textField1,
        renderOption: option => display === "display" ? option.display : '',

    };
    return <Autocomplete {...configSelect} />;
};
export default InputSelectAndSearch;