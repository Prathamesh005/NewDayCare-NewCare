import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles";
import { useField, useFormikContext } from 'formik';
const useStyles = makeStyles({
    textField: {
        "& .MuiOutlinedInput-input": {
            background: "#F4F4F4",
            fontSize: "0.9rem",
            fontWeight: "bold"
        },
    },
    noBorder: {
        border: "none",
    },
    input1: {
        background: "#F4F4F4",
        borderBottom: "1px solid transparent !important",
        outline: 'none !important',
        '&:focus': {
            background: "#F4F4F4 !important",
        },
        '&:active': {
            background: "#F4F4F4 !important",
        },
        '&:hover': {
            background: "#F4F4F4 !important",
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

const AutoCompleteSearch = (props) => {
    const classes = useStyles();
    const { setFieldValue } = useFormikContext();
    return (
        <Autocomplete
            id={props.name}
            size="small"
            name={props.name}
            className={classes.textField}
            options={props.data}
            getOptionLabel={(option) => option[props.display]}
            onChange={(e, value) => setFieldValue(props.name, { code: value[props.code], display: value[props.display] })}
            renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" InputProps={{
                ...params.InputProps,
                className: classes.input1,
                classes: { notchedOutline: classes.noBorder }
            }} />}
        />
    );
}

export default AutoCompleteSearch;