import React from 'react'
import { Button, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    btn: {
        width: '14.25em',
        height: '3.5em',
        borderRadius: '1.75em',
        background: 'white',
        padding: '0em',
        "&:hover": {
            backgroundColor: "white"
        }
    },
    span1: {
        width: "7.5em",
        height: "3.5em",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '1.75em',
    },
    span2: {
        width: "7.5em",
        height: "3.5em",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '1.75em',
    }
});



const ToggleButton = (props) => {
    const classes = useStyles(props)
    const { handleToggleChange, spanclr2, spanbg2, spanclr1, spanbg1 } = props

    return (
        <>
            <Button className={classes.btn} onClick={() => handleToggleChange()} disableRipple>

                <span className={classes.span1} style={{ color: `${spanclr1}`, background: `${spanbg1}` }}>Progress</span>
                <span className={classes.span2} style={{ color: `${spanclr2}`, background: `${spanbg2}` }}>Timeline</span>

            </Button>
        </>
    )
}

export default ToggleButton 