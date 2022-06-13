import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import { useField, useFormikContext } from 'formik';
import Search from '@material-ui/icons/Search';
const useStyles = makeStyles({
    textField: {
        "& .MuiOutlinedInput-input": {
            background: "#ffffff",
            fontSize: "1rem",
            fontWeight: "bold"
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-marginDense": {
            fontSize: "0.9rem",
            fontWeight: 500
        },

    },
    textField1: {
        "& .MuiFormControl-marginDense": {
            margin: 0
        }
    },
    noBorder: {
        border: "none",
    },
    input1: {
        background: "#ffffff",
        borderBottom: "1px solid transparent !important",
        outline: 'none !important',
        paddingRight: 18,
        '&:focus': {
            background: "#ffffff !important",
        },
        '&:active': {
            background: "#ffffff !important",
        },
        '&:hover': {
            background: "#ffffff !important",
        },
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        },
        disableUnderline: true,
    },
});
const AutoCompleteTextSearchAdmin = ({ name, label, options, code, value, display, ...otherProps }) => {
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const configSelect = {
        ...field,
        ...otherProps,
        autoSelect: true,
        freeSolo: true,
        fullWidth: true,
        disableClearable: true,
        options: options ? options : [],
        // getOptionLabel: (option) => {
        //     if (typeof option === 'string') {
        //         return option;
        //     }
        //     return option[display] || ""
        // },
        // onInputChange: (e, val) => {
        //     if(e === null){
        //         setFieldValue(name, { [code]: value[code], [display]: value[display] })
        //     }else{
        //         setFieldValue(name, { [code]: parseInt(''), [display]: val })
        //     }

        // debugger
        // },
        value: value ? value : "",
        // filterOptions: (x, s) => {
        //     const matchingValueArr = []

        //     x && x.length > 0 && x.forEach(ele => {
        //         if (ele[display] && ele[display].toLocaleLowerCase().includes(value[display].toLocaleLowerCase())) matchingValueArr.push(ele)
        //     })

        //     // debugger

        //     return matchingValueArr
        // },
        blurOnSelect: true,
        // hiddenlabel: true,
        className: classes.textField1,

        // renderInput: (params) => <TextField
        //     {...params}
        //     className={classes.textField}
        //     margin="dense"
        //     variant="outlined"
        //     InputLabelProps={{ shrink: false }}
        //     error={Boolean(meta && meta.touched && meta.error && meta.error[display])}
        //     helperText={meta && meta.touched && meta.error && meta.error[display]}
        //     InputProps={{
        //         ...params.InputProps,
        //         type: "search",
        //         placeholder: label,
        //         className: classes.input1,
        //         classes: { notchedOutline: classes.noBorder }
        //     }}
        // />
    };
    // console.log({ ...field })
    // console.log(meta)
    // console.log("val", val)
    return (
        <Autocomplete {...configSelect} />
    );
}
export default AutoCompleteTextSearchAdmin