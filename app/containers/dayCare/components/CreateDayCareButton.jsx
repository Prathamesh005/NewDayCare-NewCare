import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core'
import CreateDayCare from './CreateDayCare';

const useStyles = makeStyles((theme) => ({

    extendedIcon: {
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: '1px solid #707070',
        borderRadius: '1.56em',
        width: '11.75em',
        height: '3.125em',
        position: 'fixed',
        bottom: '11vh',
        right: '10.61vh'
        // right: '80px',
        // bottom: '85px'
    },
    icon: {
        height: '0.875em',
        width: '0.875em'
    }
}));


const CreateDayCareButton = () => {
    const classes = useStyles()
    const patientdata = [{ title: 'xyz' }, { title: 'abc' }]
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [checked1, setChecked1] = React.useState(false);
    const [checked2, setChecked2] = React.useState(false);
    const [checked3, setChecked3] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);


    const handleChaked1 = (event) => {
        setChecked1(event.target.checked);
    };

    const handleChaked2 = (event) => {
        setChecked2(event.target.checked);
    };

    const handleChaked3 = (event) => {
        setChecked3(event.target.checked);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date)

    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>

            <CreateDayCare
                handleChaked1={handleChaked1}
                handleChaked2={handleChaked2}
                handleChaked3={handleChaked3}
                handleClose={handleClose}
                handleDateChange={handleDateChange}
                patientdata={patientdata}
                anchorEl={anchorEl}
                selectedDate={selectedDate}
                checked1={checked1}
                checked2={checked2}
                checked3={checked3} />

            <Fab variant="extended" className={classes.extendedIcon} onClick={handleClick}>
                <AddIcon className={classes.icon} />
                Book Daycare
            </Fab>
        </>
    )
}

export default CreateDayCareButton;