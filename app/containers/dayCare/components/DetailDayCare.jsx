import React, { useState } from 'react'
import {
    Card, CardContent, Checkbox, Typography, TextField, CardHeader, makeStyles, CardActionArea, Button, Grid, Popper, FormControl, MenuItem
    , Select
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
// import LocationOnIcon from '@material-ui/icons/LocationOn';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import CloseIcon from '@material-ui/icons/Close';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import { useMediaQuery } from '@material-ui/core';
import { createTheme, ThemeProvider } from "@material-ui/core";
import { Call } from '@material-ui/icons';

const MuiTheme = createTheme({
    overrides: {

        MuiPickersDay: {
            day: {
                color: 'black',

            },
            daySelected: {
                // backgroundColor: '#ec1f8d',
                // '&:hover': { backgroundColor: '#ec1f8d' },
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


const useStyles = makeStyles((theme) => ({
    root: {
        width: '5vw',
        height: '100vh',
        // background: '#FFFFFF',
        position: 'fixed',
        top: '8.95vh',
        right: '0vh'

    },
    dialogprops: {
        height: '2em',
        width: '9em',
        textAlign: 'left',
        font: ' normal normal normal 1rem/1rem Yantramanav',
        letterSpacing: '0px',
        // color: '#373737',
        fontSize: '1.125em',
        alignItems: 'center',
        // background: '#F4F4F4',
        alignText: 'center'
    },
    dialogtimeprops: {
        height: '1em',
        width: '4em',
        textAlign: 'center',
        font: ' normal normal normal 1rem/1rem Yantramanav',
        letterSpacing: '0px',
        // color: '#373737',
        fontSize: '1em',
        alignItems: 'center',
        // background: '#F4F4F4',
        marginTop: '0m',

    },

    typography: {
        padding: theme.spacing(1),
    },
    cardheader: {
        // background: '#FFFFFF',
        display: 'inline-block',
        font: 'normal normal normal 1rem/1rem Yantramanav',
        fontsize: '1rem',
        margin: '1px',
        height: '1.5em'
    },
    cardarea: {
        // '&:hover': { backgroundColor: "#FFF" },
        borderTop: 'solid gray 0.1px'
    },
    cardarea2: {
        // '&:hover': { backgroundColor: "#FFF" }
    },
    cardcontent: {
        height: '16.5em',
        width: '25.75em',
        paddingTop: '1px'

    },
    autocomplete: {
        width: 700,
        height: 40,
        margin: '1px'
    },
    button: {
        display: 'inline-block',
        width: '3.0em',
        height: '3.0em',
        marginLeft: '1.8375em',
        // background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0em 0em 1em #00000029',
        borderRadius: '0.3125em'
    },
    cards: {
        margin: '1em',
        width: '20.25em',
        height: '9.9em',
        marginTop: '0px',
    },
    grid0: {
        display: 'flex',
        alignItems: 'center',
        height: '2em'
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    typo: {
        dispaly: 'inline-block',
        fontSize: '1rem'
    },
    location: {
        height: '1.25em',
        width: '0.675em',
        marginRight: '0.3125em'
    },
    typo1: {
        font: 'normal normal normal 1rem/1rem Yantramanav',
        fontSize: '1rem',
        display: 'inline-block'
    },
    typo2: {
        font: 'normal normal normal 1rem/1rem Yantramanav',
        fontSize: '1rem',
        margin: '7px',
        // marginTop: '5px',
    },
    autocomplete1: {
        width: 300,
        height: 50,
        margin: '7px'
    },
    keyboard: {
        margin: '1px',
        height: '1vh',
        width: '0.5vw',
    },
    keyboard1: {
        margin: '1px',
        height: '1em',
        paddingTop: '0.35em',
        paddingLeft: '0.625em',
        // background: ' #F4F4F4 0% 0% no-repeat padding-box',
        display: 'inline-block',
        // background: '#F4F4F4'
    },
    grid1: {
        margin: '5px',
        width: '10vw'
    },
    inline: {
        display: 'inline-block'
    },
    grid2: {
        width: '20vw'
    },
    muipicker: {
        width: '10.1em',
        background: ' #F4F4F4 0% 0% no-repeat padding-box',
        height: '1vh'
    },
    icon: { width: '1em', height: '1em' },
    savebtn: { background: '#646464', width: '1em', height: '1em', color: 'white', '&:hover': { background: '#646464' } },
    closebtn: {
        height: '1em', width: '1em', background: '#F0F0F0 0% 0% no-repeat padding-box',
        borderRadius: '0.3125em', color: '#707070', margin: '5px', '&:hover': { background: '#F0F0F0' }
    }


}))


const Detaildaycare = (props) => {
    const classes = useStyles()
    const { handleChaked3, handleClose, handleDateChange, patientdata, anchorEl, selectedDate, checked3, day } = props
    const open = Boolean(anchorEl);
    const time = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const matches = useMediaQuery('(min-width:450px)');
    const [timeChange, setTimeChange] = useState('09:00')
    const [timeChange1, setTimeChange1] = useState('14:00')
    const [flag, setFlag] = useState(false)

    const handleTimeChange = (e) => {
        setTimeChange(e.target.value)

    }

    const handleTimeChange1 = (e) => {
        setTimeChange1(e.target.value)

    }


    return (
        <>


            <Popper
                open={open}
                //anchorEl={anchorEl}
                onClose={handleClose}
                disablePortal={false}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                style={{ zIndex: 2 }}
                disableRipple  >

                <Card className={classes.root} style={{ width: `${matches ? '68vh' : '300px'}` }}>
                    <Typography className={classes.cardheader} >Daycare Details</Typography>
                    {/* <hr style={{ marginTop: '1px' }} /> */}
                    <Grid style={{ float: 'right' }}>
                        {flag ?
                            <Button className={classes.savebtn} onClick={() => { setFlag(!flag) }} disableRipple>Save</Button>
                            : <Button className={classes.closebtn} endIcon={<EditOutlinedIcon className={classes.icon} />} onClick={() => { setFlag(!flag) }} disableRipple />
                        }
                        <Button className={classes.closebtn} endIcon={<DeleteOutlineIcon className={classes.icon} />} disableRipple />
                        <Button endIcon={<CloseIcon className={classes.icon} />} className={classes.closebtn} onClick={() => handleClose()} disableRipple />
                    </Grid>

                    {/* <CardActionArea className={classes.cardarea} disableRipple> */}
                    {/* <CardContent className={classes.cardcontent} > */}
                    <Typography className={classes.typo2} style={{ marginLeft: '10px', fontWeight: 'bold' }} >Patient Details</Typography>
                    <Grid className={classes.grid0}>
                        {/* <Autocomplete
                  options={patientdata}
                  getOptionLabel={(option) => option.title}
                  className={classes.autocomplete}
                  renderInput={(params) => <TextField {...params} placeholder='search patient' variant="outlined" />}
                  style={{ width: `${matches ? '40.25em' : '300px'}` }}
                />  */}
                        {/* <Button className={classes.button} style={{ marginLeft: `${matches ? '0.99375em' : '2px'}` }} disableRipple>
            <PersonAddOutlinedIcon className={classes.icon} />
          </Button> */}
                    </Grid>

                    <Card className={classes.cards} style={{ width: `${matches ? '22.525em' : '90px'}` }}>
                        <CardActionArea className={classes.cardarea2} disableRipple>
                            <CardContent >
                                <Grid className={classes.grid} >
                                    <Typography variant="body2" color="textSecondary" component="p" className={classes.typo}>
                                        BD504
                                    </Typography>
                                    <Typography style={{ fontWeight: "bold" }} className={classes.typo} >
                                        Prathmesh Vishvakarma
                                    </Typography>
                                    <Typography style={{ fontWeight: "bold" }} className={classes.typo}  >
                                        26/M
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Grid className={classes.grid2}>
                                        <LocationOnOutlinedIcon className={classes.location} />
                                        <Typography className={classes.typo1}>Thane, Maharashtra</Typography>
                                    </Grid>
                                    <Grid className={classes.grid2}>
                                        <CallOutlinedIcon className={classes.location} />
                                        <Typography className={classes.typo1}>+91 9874563210</Typography>
                                    </Grid>
                                    <Grid className={classes.grid2}>
                                        <MailOutlineIcon className={classes.location} />
                                        <Typography className={classes.typo1}>Patient@nuqare.com</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <hr style={{ marginTop: '2px' }} />
                    <Typography variant="h6" component="h4" className={classes.typo2} >Appoinment Details</Typography>
                    {/* <Autocomplete
            options={patientdata}
            getOptionLabel={(option) => option.title}
            className={classes.autocomplete1}
            style={{ width: `${matches ? '20.25em' : '300px'}` }}
            renderInput={(params) => <TextField {...params} placeholder='Select Oncologist' variant="outlined" />}
          /> */}
                    <Typography variant="h6" component="h4" className={classes.typo2} style={{ marginLeft: '10px', marginTop: '10px' }}> Dr. Rahul Kulkarni</Typography>
                    <hr style={{ marginTop: '2px' }} />
                    <Typography variant="h6" component="h4" className={classes.typo2} style={{ marginLeft: '10px', marginTop: '15px' }}>Select Slot</Typography>
                    <ThemeProvider theme={MuiTheme}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.muipicker} >
                            {/* <Typography className={classes.keyboard1}>{weekdays[day]} -</Typography>
              <KeyboardDatePicker className={classes.keyboard}
                disableToolbar
                variant="inline"
                margin="normal"
                id="date-picker-inline"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                InputProps={{ className: `${classes.dialogprops}`, disableUnderline: true }}

                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }} /> */}

                        </MuiPickersUtilsProvider>
                    </ThemeProvider>
                    <Typography variant="h6" component="h4" className={classes.typo2} >Monday - 24/02/2022 | 9 AM TO 12 PM (3 Hrs)</Typography>
                    {/* <Grid container spacing={3}>
            <Grid item lg={3}>
              <FormControl className={classes.formControl}>
                <Select
                  value={timeChange}
                  onChange={handleTimeChange}
                  className={classes.dialogtimeprops}
                  disableUnderline
                >
                  {time.map((ele) => { return <MenuItem value={ele}>{ele}</MenuItem> })}
                </Select>
              </FormControl>
            </Grid> */}

                    {/* <Grid item lg={3}>
            <FormControl className={classes.formControl}>
              <Select
                value={timeChange1}
                onChange={handleTimeChange1}
                displayEmpty
                className={classes.dialogtimeprops}
                disableUnderline
              >
                {time.map((ele) => { return <MenuItem value={ele}>{ele}</MenuItem> })}
              </Select>
            </FormControl>
          </Grid> */}
                    {/* </Grid> */}





                    <hr style={{ clear: 'both', marginTop: '2px' }} />
                    <Grid style={{ margin: '2px' }}>
                        <Checkbox
                            checked={checked3}
                            onChange={handleChaked3}
                            style={{ color: '#ec1f8d' }}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <Typography className={classes.inline} >VIP Patient</Typography>
                    </Grid>



                    {/* </CardContent>
          </CardActionArea> */}
                </Card>
            </Popper>

        </>
    )
}

export default Detaildaycare;