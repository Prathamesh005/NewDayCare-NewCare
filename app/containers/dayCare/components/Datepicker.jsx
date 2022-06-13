import React, { useEffect, useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles, createTheme, Fab, TextField, ThemeProvider } from "@material-ui/core";
import {
    APT_FORM_DATE
} from '../../../utils/constants';
import moment from 'moment';

const MuiTheme = createTheme({
    overrides: {

        MuiPickersDay: {
            day: {
                color: 'black',

            },
            daySelected: {
                backgroundColor: '#ec1f8d',
                '&:hover': { backgroundColor: '#ec1f8d' },
            },

            dayDisabled: {
                color: '#ccc',
            },
            current: {
                color: '#ec1f8d',
            },
        },

    },
});



const useStyles = makeStyles(theme => ({
    dialogprops: {
        height: '3.5em',
        width: '9.5em',
        textAlign: 'left',
        font: ' normal normal normal 21px/28px Yantramanav',
        letterSpacing: '0em',
        color: '#373737',
        fontSize: '1.3125em',
        alignItems: 'center',
        background: 'white'

    },
    keyboard: {
        margin: '0em',
        height: '2.5em',
        width: '12.5em'
    },

    cursorInner: {
        fontSize: '1.25em',
    },
    cursor: {
        borderRadius: '0px',
        margin: '0px 15px',
        padding: '10px',
        boxShadow: 'none',
        border: 'none',
        height: '2.5em',
        color: '#727272',
        background: theme.palette.backgroundColor.primary,
        '&:focus': {
            background: theme.palette.button.primary.color,
            color: 'black',
        },
        '&:hover': {
            background: theme.palette.button.primary.color,
            color: 'black',
        },
        '&:active': {
            boxShadow: 'none',
        },
    },
}))





const DatePicker = (props) => {
    const { timelineprop } = props
    const classes = useStyles()
    const [data, setData] = useState(moment().format(APT_FORM_DATE) + 'T' + '00:00')


    const handleLeft = () => {
        const myDate = moment(data).subtract(1, 'day');
        setData(moment(myDate).format(APT_FORM_DATE));
        timelineprop(moment(myDate).format(APT_FORM_DATE))
    };
    const handleRight = () => {
        const myDate = moment(data).add(1, 'day');
        setData(moment(myDate).format(APT_FORM_DATE));
        timelineprop(moment(myDate).format(APT_FORM_DATE))
    };

    const handleDateChange = date => {
        const myDate = moment(date)
        setData(moment(myDate).format(APT_FORM_DATE));
        timelineprop(moment(myDate).format(APT_FORM_DATE))
    };


    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Fab aria-label="add" className={classes.cursor} onClick={() => handleLeft()}>
                    <ArrowBackIosIcon className={classes.cursorInner} />
                </Fab>
                <ThemeProvider theme={MuiTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}  >

                        <KeyboardDatePicker className={classes.keyboard}
                            disableToolbar
                            variant="inline"
                            margin="normal"
                            id="date-picker-inline"
                            format="dd-MM-yyyy"
                            value={moment(data)
                                .local()
                                .format('YYYY-MM-DD')}
                            onChange={handleDateChange}
                            InputProps={{ className: `${classes.dialogprops}`, disableUnderline: true }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                    </MuiPickersUtilsProvider>
                </ThemeProvider>
                <Fab aria-label="add" className={classes.cursor} onClick={() => handleRight()}>
                    <ArrowForwardIosIcon className={classes.cursorInner} />
                </Fab>

            </div>
        </>

    )
}

export default DatePicker;