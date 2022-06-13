import React from 'react'
import Typography from '@material-ui/core/Typography'
import HoverPopover from 'material-ui-popup-state/HoverPopover'
import Button from '@material-ui/core/Button'
import {
    usePopupState,
    bindHover,
    bindPopover,
    bindPopper
} from 'material-ui-popup-state/hooks'
import { Divider, Grid, makeStyles, Paper, Popper } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        zIndex: 2,

    },
    container: {
        // border: "1px solid red",
        // paddingRight: "1.5rem"

    },
    itemsContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        // border: "1px solid red",
        backgroundColor: "red"
    },
    paper: {
        padding: "0.2rem",

    }
})
)

const SharingPopUp = ({ popupState, content, handleAction, height, width }) => {
    const classes = useStyles()
    return (
        <div className={classes.mainContainer}>

            <Popper {...bindPopper(popupState)} transition disablePortal>
                {/* {...bindPopover(popupState)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            > */}
                {/* <Typography style={{ margin: 10 }}>
                    {content.map(item => <div onClick={() => handleAction(item.type)}>{item.content}</div>)}
                </Typography> */}
                <Paper className={classes.paper}>
                    <Grid container className={classes.container}>

                        <Grid item xs={12} style={{ padding: "0.5rem 0.8rem" }}>
                            <Grid container>
                                <Grid items xs={9}>
                                    <Typography variant="h4">Share</Typography>
                                </Grid>
                                <Grid items xs={3}>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} style={{ padding: "0.8rem" }}>
                            <Grid container spacing={2}>
                                {content.map((item, event) =>
                                    <Grid item onClick={() => handleAction(item.type)} style={{ cursor: "pointer", textAlign: "center" }}>
                                        <img src={item.content} alt={item.type} height={height} width={width} />
                                        <Typography variant="h5">{item.type}</Typography>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

            </Popper>
        </div>
    )
}

export default SharingPopUp