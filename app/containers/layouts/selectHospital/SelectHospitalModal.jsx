import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid } from '@material-ui/core';
import MediaCard from './MediaCard';

class SelectHospitalModal extends React.Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value,
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleEntering = () => {
    this.radioGroupRef.focus();
  };

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleOk = () => {
    this.props.onClose(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value, ...other } = this.props;
    // debugger;
    return (
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        maxWidth="xs"
        // onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">
          Select Your Hospital/Clinic
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {['1', '2', '3'].map(item => {
              return (
                <Grid item xs={3} style={{}}>
                  <MediaCard />
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SelectHospitalModal.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

export default SelectHospitalModal;

// const styles = (theme) => ({
//   root: {
//     width: "100%",
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper
//   },
//   paper: {
//     width: "80%",
//     maxHeight: 435
//   }
// });

// class ConfirmationDialog extends React.Component {
//   state = {
//     open: false,
//     value: "Dione"
//   };

//   handleClickListItem = () => {
//     this.setState({ open: true });
//   };

//   handleClose = (value) => {
//     this.setState({ value, open: false });
//   };

//   render() {
//     const { classes } = this.props;
//     return (
//       <div className={classes.root}>
//         <List>
//           <ListItem button divider disabled>
//             <ListItemText primary="Interruptions" />
//           </ListItem>
//           <ListItem
//             button
//             divider
//             aria-haspopup="true"
//             aria-controls="ringtone-menu"
//             aria-label="Phone ringtone"
//             onClick={this.handleClickListItem}
//           >
//             <ListItemText
//               primary="Phone ringtone"
//               secondary={this.state.value}
//             />
//           </ListItem>
//           <ListItem button divider disabled>
//             <ListItemText
//               primary="Default notification ringtone"
//               secondary="Tethys"
//             />
//           </ListItem>
//           <SelectHospitalModal
//             classes={{
//               paper: classes.paper
//             }}
//             open={this.state.open}
//             onClose={this.handleClose}
//             value={this.state.value}
//           />
//         </List>
//       </div>
//     );
//   }
// }

// ConfirmationDialog.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(ConfirmationDialog);
