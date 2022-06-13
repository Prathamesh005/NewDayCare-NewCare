import React from 'react';
import {
    FormControl,
    FormControlLabel,
    makeStyles,
    FormHelperText,
    Typography,
    Checkbox,
    FormGroup,
} from '@material-ui/core';
import { useField } from 'formik';


const useStyles = makeStyles(theme => ({

    formControl: {
        paddingTop: 3,
    },
    vip: {
        marginBottom: 0,
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: theme.palette.button.paginated.color,
        },
    },
}));

function RadioButton(props) {
    const { row, name, label, reasonValue, options, setFieldValue, onChange, ...rest } = props;
    const [field, meta] = useField(name);
    const classes = useStyles();


    return (
        <FormControl
            component="fieldset"
            className={classes.formControl}
            error={Boolean(meta.touched && meta.error)}
        >

            <FormGroup>
                {options.map((option, index) => (

                    <FormControlLabel key={index}
                        className={classes.vip}

                        control={
                            <Checkbox
                                row={row}
                                // name={option.key}
                                name={name}
                                onChange={() => onChange(event, reasonValue, setFieldValue)}
                                value={option.key}
                            />
                        }
                        label={
                            <Typography
                                variant="h4"
                                style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '500',
                                    color: '#727272',
                                }}
                            >
                                {option.key}
                            </Typography>
                        }
                    />
                ))}
            </FormGroup>



            <FormHelperText>{meta.touched ? meta.error : ''}</FormHelperText>

        </FormControl>
    );
}

export default RadioButton;
