import React, { useState } from 'react'
import {
    Grid, TableCell, TableBody, TableContainer, TableRow,
    TableHead, Paper, makeStyles, Table, Typography
} from '@material-ui/core';
import DoneAllOutlinedIcon from '@material-ui/icons/DoneAllOutlined';
import DoneOutlineOutlinedIcon from '@material-ui/icons/DoneOutlineOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { APT_FORM_DATE } from '../../../utils/constants';
import moment from 'moment';

const useStyles = makeStyles({
    fabstyle: { zIndex: 0, background: '#979797', marginTop: '0em', borderRadius: '0.3125em', height: '5.25em', padding: '0.187em', '&:hover': { background: '#979797' } },
    label: { display: 'block' },
    typo2: { textAlign: 'left', font: 'normal normal normal 21px/28px Yantramanav', letterSpacing: '0em', fontSize: '0.93em', paddingLeft: '1.125em', color: '#FFFFFF', textTransform: 'none' },
    typo3: { textAlign: 'left', font: 'normal normal normal 21px/28px Yantramanav', letterSpacing: '0em', fontSize: '0.93em', paddingLeft: '1.125em', color: '#FFFFFF', textTransform: 'none' },
    icon: { float: 'right', marginRight: '0em', color: '#FFFFFF' },
    grid2: { height: '75vh' },
    head: { background: '#F4F4F4', color: '#F4F4F4', zIndex: 1, padding: '0.312em 0.312em 0.312em 0em' },
    tc: { height: '5.25em', width: '3.125em' },
    tr: { borderBottom: 'solid 1px', height: '3vh' },
    nodata: { textAlign: 'center', marginTop: '1.13em' }
});

const Timeline = (props) => {
    const classes = useStyles()
    const matches = useMediaQuery('(min-width:800px)');
    const { data, yourdate, handleClick } = props
    const [flag, setFlag] = useState(true)
    const array = data.filter(data => { return moment(data.date).format(APT_FORM_DATE) == yourdate })
    const head = ["9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"]
    const head1 = ["9", "9.3", "10", "10:3", "11", "11.3", "12", "12.3", "13", "13.3", "14", "14.3", "15", "15.3", "16", "16.3", "17", "17.3", "18", "18.3", "19", "19.3", "20", "20.3", "21"]
    const head2 = ["9", "9.15", "9.3", "9.45", "10", "10.15", "10:3", "10.45", "11", "11.15", "11.3", "11.45", "12", "12.15", "12.3", "12.45", "13", "13.15", "13.3", "13.45", "14", "14.15", "14.3", "14.45", "15", "15.15", "15.3", "15.45", "16", "16.15", "16.3", "16.45", "17", "17.15", "17.3", "17.45", "18", "18.15", "18.3", "18.45", "19", "19.15", "19.3", "19.45", "20", "20.15", "20.3", "20.45", "21"]


    return (
        <>
            {/* <div className="">
                <Grid container spacing={4} >
                    <Grid item xs={12} sm={4} style={{ marginTop: 5 }}>
                        <h2 style={{ fontWeight: 'bold' }}> DayCare</h2>
                    </Grid>
                </Grid>


             <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {head1.map(ele => { return <TableCell align="Left" style={{ padding: '5px 5px 5px 0px' }}>{ele}</TableCell> })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(data => {
                                return <TableRow >
                                    {console.log(`${(parseFloat(data.y[0].replace(':', '.')))}`)}
                                    style={{ width: `${parseInt(`${(parseInt(data.y[1].replace(':', '.')) - parseInt(data.y[0].replace(':', '.'))).toFixed(2)}`)}` == 2 ? 80 : '' }}
                                    {head1.slice(0, head1.length - ((Math.round(parseFloat(`${(parseFloat(data.y[1].replace(':', '.')) - parseFloat(data.y[0].replace(':', '.'))).toFixed(2)}`) * 2)) - 1)).map(ele => {
                                        return (`${data.date.getFullYear()}` + ',' + `${data.date.getMonth()}` + ',' + `${data.date.getDate()}` == `${yourdate.getFullYear()}` + ',' + `${yourdate.getMonth()}` + ',' + `${yourdate.getDate()}`) && <TableCell
                                            style={{ border: 'solid 1px', height: 84, width: 50, padding: `${parseInt(`${(parseInt(data.y[1].replace(':', '.')) - parseInt(data.y[0].replace(':', '.'))).toFixed(2)}`)}` == 1 ? 0 : 4, }}
                                            align="Left"
                                            colSpan={ele == `${(parseFloat(data.y[0].replace(':', '.')))}` ? Math.round(`${parseFloat(`${(parseFloat(data.y[1].replace(':', '.')) - parseFloat(data.y[0].replace(':', '.'))).toFixed(2)}`)}` * 2) : '1'}>
                                            {(ele == `${(parseFloat(data.y[0].replace(':', '.')))}`) ?
                                                <div className={`${classes.fabstyle} ${classes.label}`} onClick={(e) => handleClick(e.currentTarget, data.x)} style={{ overflowY: `${parseInt(`${(parseInt(data.y[1].replace(':', '.')) - parseInt(data.y[0].replace(':', '.'))).toFixed(2)}`)}` == 1 ? 'scroll' : '' }} disableFocusRipple disableRipple>
                                                    <EditOutlinedIcon className={classes.icon} />
                                                    <Typography className={classes.typo2}>
                                                        {flag ? <DoneAllOutlinedIcon /> : <DoneOutlineOutlinedIcon />}
                                                        {data.name}
                                                    </Typography>
                                                    <Typography className={classes.typo3}>{data.y[0]} to {data.y[1]}</Typography>
                                                </div> : ''}
                                        </TableCell>
                                    })}
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> */}


            <div className="">
                {/* <Grid container spacing={4} >
                    <Grid item xs={12} sm={4} style={{ marginTop: 5 }}>
                        <h2 style={{ fontWeight: 'bold' }}> DayCare</h2>
                    </Grid>
                </Grid> */}


                <TableContainer component={Paper} className={classes.grid2}>
                    <Grid className={classes.grid2}>
                        <Table stickyHeader aria-label="sticky table">
                            {array[0] ? <TableHead >
                                <TableRow className={classes.tr} >
                                    {head2.map((ele, index) => { return <TableCell align="Left" className={classes.head} style={{ color: `${index % 4}` != 0 ? '#F4F4F4' : 'black' }}>{ele}</TableCell> })}
                                </TableRow>
                            </TableHead> : <h3 className={classes.nodata}>No Data Available</h3>}
                            <TableBody  >

                                {data.map(data => {
                                    return <TableRow >
                                        {head2.slice(0, head2.length - ((Math.round(parseFloat(`${(parseFloat(data.y[1].replace(':', '.')) -
                                            parseFloat(data.y[0].replace(':', '.'))).toFixed(2)}`) * 4)) - 1))

                                            .map((ele) => {
                                                return (moment(data.date).format(APT_FORM_DATE) == yourdate)

                                                    && <TableCell
                                                        className={classes.tc}
                                                        style={{ padding: `${parseInt(`${(parseInt(data.y[1].replace(':', '.')) - parseInt(data.y[0].replace(':', '.'))).toFixed(2)}`)}` == 1 ? '0em' : '0.25em' }}
                                                        align="Left"
                                                        colSpan={ele == `${(parseFloat(data.y[0].replace(':', '.')))}` ? Math.round(`${parseFloat(`${(parseFloat(data.y[1].replace(':', '.')) - parseFloat(data.y[0].replace(':', '.'))).toFixed(2)}`)}` * 4) : '1'}>

                                                        {(ele == `${(parseFloat(data.y[0].replace(':', '.')))}`) ?
                                                            <div className={`${classes.fabstyle} ${classes.label}`}
                                                                onClick={(e) => handleClick(e.currentTarget, data.x)}
                                                                style={{ overflowY: `${parseInt(`${(parseInt(data.y[1].replace(':', '.')) - parseInt(data.y[0].replace(':', '.'))).toFixed(2)}`)}` == 1 || matches == false ? 'scroll' : '' }}
                                                                disableFocusRipple disableRipple>
                                                                <EditOutlinedIcon className={classes.icon} />
                                                                <Typography className={classes.typo2}>
                                                                    {flag ? <DoneAllOutlinedIcon /> : <DoneOutlineOutlinedIcon />}
                                                                    {data.name}
                                                                </Typography>

                                                                <Typography className={classes.typo3}>{data.y[0]} to {data.y[1]}</Typography>

                                                            </div> : ''}

                                                    </TableCell>
                                            })}
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </TableContainer>
            </div>

        </>
    )
}

export default Timeline;