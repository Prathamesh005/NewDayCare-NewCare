import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    smallRadioButton: {
        '& svg': {
            width: '1rem',
            height: '1rem',
        },
        marginBottom: '0px',
    },
    radio: {
        color: theme.palette.button.paginated.color,
        padding: '3px',
        '&$checked': {
            color: theme.palette.button.paginated.color,
        },
    },
    checked: {},
}))

function InputRadioButton({ name, statusArray, disabling, value, ...props }) {
    const classes = useStyles()
    return (
        <>
            <FormControl component="fieldset">
                <RadioGroup
                    aria-label={name}
                    name={name}
                    value={value}
                    {...props}

                >
                    {statusArray &&
                        statusArray.map((item, index) => {
                            return (
                                <FormControlLabel
                                    value={item.code}
                                    control={
                                        <Radio
                                            disabled={Boolean(disabling)}
                                            classes={{
                                                root: classes.radio,
                                                checked: classes.checked,
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography
                                            variant="h4"
                                            style={{
                                                fontWeight: 500,
                                                color: '#444444',
                                                opacity:
                                                    disabling ? 0.5 : 0.9,
                                            }}
                                        >
                                            {item.display}
                                        </Typography>
                                    }
                                    key={index.toString()}
                                    className={classes.smallRadioButton}
                                />
                            );
                        })}
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default InputRadioButton