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
import { size } from 'lodash';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '29vw',
        height: '122vh',
        // background: '#FFFFFF',
        // fontWeight: 'blod',
        // position: 'absolute !important',
    },
    dialogprops: {
        height: '2em',
        width: '9em',
        textAlign: 'left',
        font: ' normal normal normal 1rem/1rem Yantramanav',
        letterSpacing: '0px',
        color: '#373737',
        fontSize: '1rem',
        alignItems: 'center',
        background: '#F4F4F4',
        alignText: 'center'
    },
    dialogtimeprops: {
        height: '2em',
        width: '4em',
        textAlign: 'center',
        font: ' normal normal normal 1rem/1rem Yantramanav',
        letterSpacing: '0px',
        color: '#373737',
        fontSize: '1rem',
        alignItems: 'center',
        background: '#F4F4F4',
        marginTop: '6px',
        // marginLeft: '1px',
    },
    text: {
        height: '15vh',
        width: '19em',
        border: '0px solid',
        // justifyContent: "center",
        // padding: '1px',
        textAlign: 'center',
        // color: "black",
        // variant: "outlined",
    },

    typography: {
        padding: theme.spacing(0),
    },
    cardheader: {
        // background: '#FFFFFF',
        display: 'inline-block',
        font: 'normal normal normal 1rem/1rem Yantramanav',
        fontsize: '5px',
        margin: '1px',
        height: '1.5em',
        // marginTop: '15px',
        // fontWeight: 'bold',
        //  maxWidth:'200',
        // variant: "h6",
    },
    textField: {
        width: "340px",
        height: '110px',
        '& .MuiOutlinedInput-input': {
            background: '#F4F4F4',
            fontSize: '0.9rem',
            fontWeight: 'bold',
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
            fontSize: '0.9rem',
            fontWeight: 'bold',
        },
    },
    noBorder: {
        border: 'none',
    },
    cardcontent: {
        height: '16.5em',
        width: '25.75em',
        paddingTop: '1px'
    },
    autocomplete: {
        width: "295px",
        '& .MuiOutlinedInput-input': {
            // background: "#F4F4F4",
            fontSize: '1rem',
            fontWeight: 380,
            // padding: '0px'
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
            fontSize: '1rem',
            fontWeight: 10,
            // padding: '1px'
        },
        '& .MuiFormControl-marginDense': {
            margin: '1px',
        },
        // width: 300,
        // height: 60,
        // margin: '1px'
    },
    button: {
        display: 'inline-block',
        width: '1px',
        height: '1px',
        marginLeft: '6.5px',
        // background: '#FFFFFF 0% 0% no-repeat padding-box',
        // boxShadow: '0em 0em 1em #00000029',
        // borderRadius: '0.125em',
    },
    cards: {
        margin: '1em',
        width: '20em',
        height: '8.9em',
        marginTop: '7.5px'
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'left',
        // margin: '1px',
    },
    typo: {
        // dispaly: 'inline-block',
        // fontsize: '1em',
        font: 'normal normal normal 1rem/1rem Yantramanav',
        fontsize: '2rem',
        display: 'inline-block',
        margin: '5px',
    },
    location: {
        height: '1.25em',
        width: '0.675em',
        marginRight: '0.2125em'
    },
    typo1: {
        font: 'normal normal normal 1rem/1rem Yantramanav',
        fontsize: '1rem',
        display: 'inline-block',
        // justifyContent: 'space-around',
    },
    typo2: {
        font: 'normal normal normal 1rem/1rem Yantramanav',
        fontSize: '1rem',
        margin: '7px',
        fontWeight: 430,
        // variant: 'h3',
    },
    autocomplete1: {
        width: "340px",
        '& .MuiOutlinedInput-input': {
            // background: "#F4F4F4",
            fontSize: '1rem',
            fontWeight: 380,
            // paddingTop: '0px'
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
            fontSize: '1rem',
            fontWeight: 10,
        },
        '& .MuiFormControl-marginDense': {
            margin: '1px',
        },

        // width: 300,
        // height: 50,
        // margin: '7px'
    },
    keyboard: {
        margin: '6px',
        height: '1vh',
        width: '1vw',
        // marginLeft: '5px',
    },
    grid1: {
        // margin: '2px',
        width: '20.5vw',
        height: '10vh',
        marginTop: '2px',
        // justifyContent: 'space-around',
    },
    inline: {
        display: 'inline-block',
        // marginLeft: '15px',
        // marginTop: '-20px',
    },
    grid2: {
        width: '20vw'
    },
    search: {
        padding: '0px',
        // paddingTop: '0px'
        marginTop: '7px',
    },
    // hoverDisabled: {
    //   pointer_events: 'none',
    // },
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

}))
// const {
//   Option,   
//   SET_DIAGNOSIS_INITIAL_STATE,
//   Id,
//   SET_IMPRESSION_VISIT_INITIAL_STATE,
// } = props;

const Daycare = (props) => {
    const classes = useStyles()
    const { handleChaked1, handleChaked2, handleChaked3, handleClose, handleDateChange, patientdata, anchorEl, selectedDate, checked1, checked2, checked3 } = props
    const open = Boolean(anchorEl);
    const time = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00']
    const [timeChange, setTimeChange] = useState('09:00')
    const [timeChange1, setTimeChange1] = useState('14:00')
    const handleTimeChange = (e) => {
        setTimeChange(e.target.value)

    }
    const handleTimeChange1 = (e) => {
        setTimeChange1(e.target.value)
    }
    const handleSaveComment = e => {
        setComment(e.target.value);
    }
    // useEffect(() => {
    //   if (Option.values.checkFollowUp && Option.values.checkFollowUp > 1) {
    //     setExpand1(false);
    //   } else {
    //     setExpand1(true);
    //   }
    // }, [Option.values.checkFollowUp]);

    // const onExpand = () => {
    //   setExpand1(!expand1);
    // };

    // const handleClick = toggle => event => {
    //   setOpen(toggle);
    // };

    // const checkBoxData = () => (
    //   <>
    //     <div>
    //       <CheckBoxField
    //         name="impressionForVisitCheck"
    //         label="Impression For Visit"
    //       />
    //     </div>
    //   </>
    // );


    return (
        <>

            <Popper
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                placement='left'
                modifiers={{
                    offset: {
                        enabled: true,
                        offset: '-16vh, -1vw'
                    },
                    preventOverflow: {
                        enabled: true,
                        boundariesElement: "scrollParent"
                    }
                }}
                // PaperProps={{
                //   style: { width: '50%' },
                // }}
                // anchorOrigin={{
                //   vertical: 'bottom',
                //   horizontal: 'left',
                // }}
                // transformOrigin={{
                //   vertical: 'top',
                //   horizontal: 'left',
                // }}
                disableRipple>

                <Card className={classes.root} disableRipple >
                    {/* <CardHeader className={classes.cardheader} title="Create Daycare" titleTypographyProps={{ variant: 'title' }} /> */}
                    <Typography className={classes.cardheader} style={{ fontWeight: 'bold', marginTop: '15px', marginLeft: '15px' }} >Create Daycare</Typography>
                    {/* <Typography style={{ marginTop: '5px', marginLeft: '-5px' }} >
            Create Daycare
          </Typography> */}
                    <Grid style={{ float: 'right' }}>
                        <Button disableRipple>Save</Button>
                        <Button endIcon={<CloseIcon />} onClick={() => handleClose()} disableRipple />
                    </Grid>

                    <CardActionArea disableRipple>
                        <CardContent className={classes.cardcontent} >
                            <Grid style={{ display: 'flex', alignItems: 'center' }}>
                                <Autocomplete
                                    options={patientdata}
                                    getOptionLabel={(option) => option.title}
                                    className={classes.autocomplete}
                                    // style={{ width: 290 }}
                                    renderInput={(params) => <TextField className={classes.search}{...params} placeholder='Search Patient' variant="outlined" size="small" />}
                                />
                                <Button className={classes.button} style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px', marginLeft: '15px', marginTop: '8px' }} ><PersonAddOutlinedIcon style={{ width: '20px', height: '20px' }} /></Button>
                            </Grid>


                            {/* <Fragment>
                {open && (
                  <PopperComponent
                    open={open}
                    handleClick={handleClick}
                    checkBoxData={checkBoxData()}
                  />
                )}
                <Accordion expanded={expand1} onChange={onExpand} elevation={0}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  ></AccordionSummary>
                  {Option.values.impressionForVisitCheck && (
                    <Grid item container xs={12} md={12}>
                      <Grid item xs={12} md={1} className={classes.lebels}>
                        Impression For Visit
                      </Grid>
                      <Grid item xs={12} md={11}>
                        <TextArea
                          name="impressionForVisit"
                          placeholder="Enter Value Here"
                          multiline
                          rows={2}
                        // value={value}
                        />
                      </Grid>
                    </Grid>
                  )} */}

                            <Card className={classes.cards}>
                                <CardActionArea disableRipple>
                                    <CardContent >
                                        <Grid className={classes.grid} >
                                            <Typography variant="body2" color="textSecondary" component="p" className={classes.typo}>
                                                BD504
                                            </Typography>
                                            <Typography style={{ fontWeight: "bold" }} className={classes.typo}>
                                                Prathmesh Vishvakarma
                                            </Typography>
                                            <Typography style={{ fontWeight: "bold", marginLeft: '9.5px' }} className={classes.typo}  >
                                                26/M
                                            </Typography>
                                        </Grid>
                                        <Grid>
                                            <Grid className={classes.grid2}>
                                                <LocationOnOutlinedIcon className={classes.location} />
                                                <Typography className={classes.typo1}>Thane, Maharashtra</Typography>
                                            </Grid>
                                            <Grid className={classes.grid2}>
                                                <LocationOnOutlinedIcon className={classes.location} />
                                                <Typography className={classes.typo1}>+91 9874563210</Typography>
                                            </Grid>
                                            <Grid className={classes.grid2}>
                                                <LocationOnOutlinedIcon className={classes.location} />
                                                <Typography className={classes.typo1}>Patient@nuqare.com</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <hr style={{ marginTop: '3px' }} />
                            <Typography className={classes.typo2} >Appoinment Details</Typography>
                            <Autocomplete
                                options={patientdata}
                                getOptionLabel={(option) => option.title}
                                className={classes.autocomplete1}
                                renderInput={(params) => <TextField {...params} placeholder='Select Oncologist' variant="outlined" size="small" />}
                            />
                            <Typography className={classes.typo1}>Select Slot</Typography>
                            <Grid container spacing={0}>
                                <Grid item lg={5}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}  >
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
                                            }} />
                                    </MuiPickersUtilsProvider>
                                </Grid>

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
                                </Grid>

                                <Grid item lg={3}>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            value={timeChange1}
                                            onChange={handleTimeChange1}
                                            className={classes.dialogtimeprops}
                                            disableUnderline
                                        >
                                            {time.map((ele) => { return <MenuItem value={ele}>{ele}</MenuItem> })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <hr style={{ margin: '8px' }} />
                            <TextField
                                className={classes.textField}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                size="small"
                                onBlur={e => {
                                    handleSaveComment(e);
                                }}
                                InputProps={{
                                    placeholder: 'Patient Comments',
                                    className: classes.input1,
                                    classes: { notchedOutline: classes.noBorder },
                                }}
                            />
                            {/* <TextField 
                InputProps={{ placeholder: 'Patient Comments' }}></TextField> */}
                            {/* <textarea >Patient Comments</textarea> */}
                            {/* <textarea
                className="form-control"
                rows="3"
                placeholder="Patient Comments"
                style={{ width: '350px', size: 'small' }}
              >
              </textarea> */}
                            {/* <TextareaAutosize aria-label="minimum height" minRows={3} placeholder="Minimum 3 rows" /> */}
                            <Grid className={classes.grid1}>
                                <Grid style={{ float: 'right', marginTop: '10px' }} >
                                    <Typography variant="h6" component="h4" className={classes.typo1}>Patient Instructions</Typography>
                                    <Grid style={{ marginLeft: '140px', marginTop: '-32.5px' }}>
                                        <Checkbox
                                            checked={checked1}
                                            onChange={handleChaked1}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                            style={{ marginTop: '1px' }}
                                        />
                                        <Typography style={{ marginRight: '-50px', marginTop: '-35px', marginLeft: '37px' }}>Eat Healthy Food</Typography>
                                    </Grid>
                                    <Grid style={{ marginLeft: '140px', marginTop: '-19.5px' }} >
                                        <Checkbox
                                            checked={checked2}
                                            onChange={handleChaked2}
                                            color="primary"
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                            style={{ marginTop: '25px' }}
                                        />
                                        <Typography style={{ marginRight: '-50px', marginTop: '-35px', marginLeft: '37px' }}>Rest Body</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr style={{ clear: 'both', marginTop: '1px' }} />
                            <Grid style={{ margin: '1px' }}>
                                <Checkbox
                                    checked={checked3}
                                    onChange={handleChaked3}
                                    style={{ color: '#ec1f8d' }}
                                    // color='primary'
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                                <Typography className={classes.inline} >VIP Patient</Typography>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Popper>

        </>
    )
}

export default Daycare;

{/* 
                </Accordion>
              </Fragment> */}