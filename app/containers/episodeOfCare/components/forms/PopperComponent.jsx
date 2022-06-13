import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import React, { Fragment } from 'react';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    borderRadius: 5,
    padding: 2,
    // margin: "3px 10px 3px 10px",
    outline: 'none !important',
    backgroundColor: '#ffffff',
    color: '#b3b3b3',
  },

  popperDiv: {
    width: 250,
    height: '100%',
    position: 'fixed',
    top: '136px',
    right: '19px',
    zIndex: '1',
  },
}));

export default function PopperComponent(props) {
  // console.log("PopperComponent",props)
  // debugger
  const classes = useStyles();

  const { open, handleClick, checkBoxData } = props;

  // const leaveMouse = () => {
  //   setTimeout(function () {handleClick(false)},1000)
  // }

  return (
    <Fragment>
      <Paper className={classes.popperDiv} onMouseLeave={handleClick(false)}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 15,
          }}
        >
          <Typography variant="h3" className={classes.topTexts}>
            Add On
          </Typography>

          <div>
            <IconButton
              className={classes.iconBtn}
              onClick={handleClick(false)}
            >
              <ClearIcon style={{ fontSize: 25 }} />
            </IconButton>
          </div>
        </div>
        <Divider />
        <div style={{ padding: 15 }}>{checkBoxData}</div>
      </Paper>
    </Fragment>
  );
}
