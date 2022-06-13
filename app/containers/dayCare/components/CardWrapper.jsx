import { Card, CardContent, CardHeader, Grid, makeStyles, Typography, CardActionArea, FormControl, NativeSelect, Button, ListItemText, Menu, MenuItem, withStyles } from '@material-ui/core';
import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));


const useStyles = makeStyles((theme) => ({
    root: {
        width: '37.13vh',
        height: '121.48vh',
        background: '#F8F8F8',
        borderRadius: '0.3125em'
    },
    root1: {
        width: '16.25em',
        height: '7.625em',
        marginBottom: '0.625em'
    },
    btn: {
        padding: '0em',
        minWidth: '2.5em',
        background: '#F7F6F4',
        float: 'right'
    },
    cardheader: {
        background: '#FFFFFF',
        height: '3.2em',
        paddingLeft: '1.25em',
        paddingTop: '0.96em',
        font: 'normal normal normal 21px/28px Yantramanav',
        fontSize: '1.3125em'
    },
    age: {
        display: 'inline-block',
        marginLeft: '0.8125em'
    },
    cardactionarea: {
        // backgroundColor: 'white',
        // '&:focus': {

        //     backgroundColor: 'white'
        // },
        // '&:hover': {
        //     boxShadow: 'none',
        //     backgroundColor: 'white'
        // },
        // '&:active': {
        //     boxShadow: 'none',
        // }
    }
}))

const CardWrapper = (props) => {
    const classes = useStyles()
    const matches = useMediaQuery('(min-width:1430px)')
    const matches1 = useMediaQuery('(min-width:1416px)')
    const matches2 = useMediaQuery('(min-width:1280px)')
    const matches3 = useMediaQuery('(min-width:1200px)')
    const matches4 = useMediaQuery('(min-width:1144px)')
    const matches5 = useMediaQuery('(min-width:958px)')
    const { data, handleClose, handleclick, anchorEl, openIndex } = props




    return (
        <><Grid container spacing={2}>
            {data.map((ele, index) => {
                return <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                    <Card className={classes.root} style={{ width: `${matches ? '330px' : matches1 ? '300px' : matches2 ? '290px' : matches3 ? '270px' : matches4 ? '250px' : matches5 ? '240px' : '370px'}` }} disableRipple>
                        <Typography className={classes.cardheader}>{ele.title}</Typography>
                        <CardActionArea className={classes.cardactionarea} disableRipple>
                            <CardContent >
                                {ele.data.map((innerele, index1) => {
                                    return <Card className={classes.root1} style={{ width: `${matches ? '300px' : matches1 ? '270px' : matches2 ? '260px' : matches3 ? '240px' : matches4 ? '220px' : matches5 ? '210px' : '340px'}` }} key={index1}>
                                        <CardActionArea className={classes.cardactionarea} disableRipple>

                                            <CardContent >
                                                <Typography variant="h3" component="h4">
                                                    {innerele.time}
                                                </Typography>
                                                <Button aria-controls="customized-menu"
                                                    aria-haspopup="true"
                                                    variant="contained"
                                                    className={classes.btn}
                                                    onClick={handleclick(innerele.id)} disableRipple>
                                                    <MoreHorizIcon />
                                                </Button>
                                                <StyledMenu
                                                    id="customized-menu"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={(Boolean(anchorEl) && innerele.id === openIndex)}
                                                    onClose={handleClose}
                                                >
                                                    {/*  innerhtml need to pass on onclick and compare  menuitem string to find on which menu we have clicked */}
                                                    {innerele.menuItem.map((ele1, ind) => { return <ListItemText key={ind} onClick={() => { handleClose(event) }} style={{ width: 140, height: 23, textAlign: 'left' }} >{ele1}</ListItemText> })}

                                                </StyledMenu>

                                                <Typography variant="h3" component="h4">
                                                    {innerele.label}
                                                    <Typography className={classes.age} variant="h4" color="textSecondary" component="p">
                                                        36/M
                                                    </Typography>
                                                </Typography>
                                                <Typography variant="h4" color="textSecondary" component="p">
                                                    Referred By - {innerele.dr_name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>


                                })}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            })}
        </Grid>
        </>
    )
}

export default CardWrapper;
