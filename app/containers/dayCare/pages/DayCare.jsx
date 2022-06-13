import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import DatePicker from '../components/Datepicker';
import CardWrapper from '../components/CardWrapper';
import ToggleButton from '../components/Togglebutton'
import Timeline from '../components/Timeline';
import axios from 'axios';
import CreateDayCareButton from '../components/CreateDayCareButton';
import DetailDayCare from '../components/DetailDayCare';



const useStyles = makeStyles({
    paper1: { background: '#6c64643d' },
    paper2: { marginTop: 33, background: '#F4F4F4' },
    grid: { marginTop: 5 },
    grid1: { marginTop: 33 },
    header: { fontWeight: 'bold' }
});

const DayCare = () => {
    const classes = useStyles()
    const today = new Date();
    const patientdata = [{ title: 'xyz' }, { title: 'abc' }]
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [checked3, setChecked3] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [day, setDay] = useState(new Date().getDay())
    const [yourdate, setYourdate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9))
    const [toggle, setToggle] = useState(false)
    const [spanbg1, setSpanbg1] = useState('#FF5CAD')
    const [spanbg2, setSpanbg2] = useState('white')
    const [spanclr1, setSpanclr1] = useState('white')
    const [spanclr2, setSpanclr2] = useState('black')
    const [carddata, setCarddata] = useState([])
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const [openIndex, setOpenIndex] = useState(-1);

    useEffect(() => {
        axios('http://demo8234427.mockable.io/carddata')
            .then(response => setCarddata(response.data))
    }, [])


    const handleToggleChange = () => {

        if (!toggle) {
            setSpanbg1('white')
            setSpanbg2('#FF5CAD')
            setSpanclr1('black')
            setSpanclr2('white')
        }
        if (toggle) {

            setSpanbg1('#FF5CAD')
            setSpanbg2('white')
            setSpanclr1('white')
            setSpanclr2('black')
        }
        setToggle(!toggle)
    }


    useEffect(() => {
        handleNavigate(new Date())

    }, [toggle])

    const handleNavigate = (date) => {
        setYourdate(date)
    }



    const handleChaked3 = (event) => {
        setChecked3(event.target.checked);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date)
        setDay(date.getDay())

    };

    const handleClick = (e, id) => {
        setAnchorEl(e);
        console.log(id, 'id')
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleMenuClick = (ind) => (event) => {
        setAnchorEl1(event.currentTarget);
        setOpenIndex(ind)


    };

    const handleMenuClose = (e) => {
        setAnchorEl1(null);
        console.log(e.target.innerHTML)
    }

    const data = [
        {
            x: '1',
            y: ['9:15', '11:30'],
            date: new Date(2022, 4, 15),
            name: 'Aditya Kapoor'
        },
        {
            x: '2',
            y: ['9:00', '12:15'],
            date: new Date(2022, 4, 15),
            name: 'Riya Kapoor'
        },
        {
            x: '3',
            y: ['13:00', '17:00'],
            date: new Date(2022, 4, 15),
            name: 'Anchal Kapoor'
        },
        {
            x: '4',
            y: ['14:15', '16:00'],
            date: new Date(2022, 4, 15),
            name: 'Ravi Kapoor'
        },
        {
            x: '5',
            y: ['15:00', '17:00'],
            date: new Date(2022, 4, 15),
            name: 'Anjali Kapoor'
        },
        {
            x: '6',
            y: ['14:00', '16:00'],
            date: new Date(2022, 4, 15),
            name: 'Rushi Kapoor'
        },
        {
            x: '7',
            y: ['15:00', '17:00'],
            date: new Date(2022, 4, 15),
            name: 'Aditi Kapoor'
        },
        {
            x: '8',
            y: ['14:00', '17:00'],
            date: new Date(2022, 4, 15),
            name: 'Kunal Kapoor'
        },
        {
            x: '9',
            y: ['14:00', '17:00'],
            date: new Date(2022, 4, 15),
            name: 'Shivam Kapoor'
        },
        {
            x: '10',
            y: ['14:00', ' 17:00'],
            date: new Date(2022, 4, 15),
            name: 'Rahi Kapoor'
        },
        {
            x: '11',
            y: ['14:00', ' 18:00'],
            date: new Date(2022, 4, 15),
            name: 'Rinku Kapoor'
        },
        {
            x: '12',
            y: ['15:30', '21:00'],
            date: new Date(2022, 4, 15),
            name: 'Mahesh Kapoor'
        },
        {
            x: '13',
            y: ['18:00', '19:00'],
            date: new Date(2022, 3, 22),
            name: 'Sonam Kapoor'
        },
        {
            x: '14',
            y: ['14:30', '20:30'],
            date: new Date(2022, 3, 22),
            name: 'Sonam Kapoor'
        },
        {
            x: '15',
            y: ['9:00', '12:30'],
            date: new Date(2022, 3, 22),
            name: 'Sonam Kapoor'
        },
        {
            x: '16',
            y: ['13:30', '20:10'],
            date: new Date(2022, 3, 22),
            name: 'Sonam Kapoor'
        }

    ]


    return (
        <>

            <DetailDayCare
                handleChaked3={handleChaked3}
                day={day}
                handleClose={handleClose}
                handleDateChange={handleDateChange}
                patientdata={patientdata}
                anchorEl={anchorEl}
                selectedDate={selectedDate}
                checked3={checked3} />


            <Grid container spacing={4}>
                <Grid item xs={12} sm={8} md={4} lg={4} className={classes.grid}>
                    {toggle ?
                        <h2 className={classes.header}>Daycare Procedure</h2>
                        :
                        <h2 className={classes.header}>Today's Daycare Schedule</h2>
                    }
                </Grid>
                <Grid item xs={12} sm={6} md={5} lg={5} className={classes.grid}>
                    {toggle ?
                        <DatePicker timelineprop={handleNavigate} />
                        :
                        ''
                    }
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3} className={classes.grid}>
                    <ToggleButton handleToggleChange={handleToggleChange} spanbg1={spanbg1} spanbg2={spanbg2} spanclr1={spanclr1} spanclr2={spanclr2} />
                </Grid>
            </Grid>

            {toggle ?
                <Paper className={classes.paper2}>
                    <Timeline data={data} handleClick={handleClick} yourdate={yourdate} />
                </Paper>
                :
                <Grid container className={classes.grid1}>
                    <CardWrapper data={carddata} handleClose={handleMenuClose} handleclick={handleMenuClick} anchorEl={anchorEl1} openIndex={openIndex} />
                </Grid>
            }
            {toggle ?
                ''
                :
                <CreateDayCareButton />
            }
        </>
    )
}
export default DayCare