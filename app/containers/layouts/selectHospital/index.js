import { DialogContent, Grid } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { setToLocalStorage } from '../../../utils/localStorageUtils';
import MediaCard from './MediaCard';

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  inner: {
    position: 'relative',
    display: 'flex',
    width: '100% !important',
    height: '85% !important',
    textAlign: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 60,
    color: '#fff',
    letterSpacing: '0px',
    opacity: 1,
    fontWeight: '300px',
    fontFamily: 'normal normal 300 32px/41px Yantramanav !important',
    fontSize: '20px',
  },
};

class SimpleDialog extends React.Component {
  handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      return false;
    }

    if (reason === 'escapeKeyDown') {
      return false;
    }
    if (reason === undefined) {
      this.props.onClose();
    }
  };
  // handleClose = () => {
  //     this.props.onClose(this.props.selectedValue);
  // };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleSelectedHospital = value => {
    this.props.selectedValueFunc(value);
  };
  returnSizing = length => {
    if (length == '1' || length == '2') {
      return 4;
    } else return 2;
  };

  render() {
    const {
      classes,
      onClose,
      selectedValueFunc,
      hospitalArr,
      handleCloseDialog,
      ...other
    } = this.props;
    const orgLocationWiseArr = [];
    hospitalArr.map(item => {
      return item['location'].map(ele => {
        orgLocationWiseArr.push({
          org: item['organization'],
          logo: item['organizationLogo'],
          loc: ele,
        });
      });
    });
    // console.log("getFromLocalStorage", getFromLocalStorage('LOC'))
    // console.log(orgLocationWiseArr)
    // console.log("this",this)
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
        fullWidth
        maxWidth={
          orgLocationWiseArr &&
          (orgLocationWiseArr.length == '1' || orgLocationWiseArr.length == '2')
            ? 'sm'
            : 'md'
        }
      >
        <DialogTitle
          id="simple-dialog-title"
          style={{
            textAlign: 'center',
            paddingTop: '50px',
            paddingBottom: '30px',
          }}
        >
          <Typography variant="h3" align="center" style={{ fontWeight: 500 }}>
            Select Your Hospital/Clinic
          </Typography>
          {/* <Typography variant="h4" align="center">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat</Typography> */}
        </DialogTitle>
        <DialogContent style={{ padding: 0, overflow: 'hidden' }}>
          <Grid
            container
            spacing={4}
            alignContent="center"
            justifyContent="center"
            alignItems="center"
            style={{ marginBottom: '50px' }}
          >
            {orgLocationWiseArr &&
              orgLocationWiseArr.map((ele, index) => {
                return (
                  <Grid
                    key={index.toString()}
                    item
                    xs={this.returnSizing(orgLocationWiseArr.length)}
                    style={{}}
                  >
                    <MediaCard
                      item={ele}
                      handleSelectedHospital={this.handleSelectedHospital}
                      selectedValue={this.props.value}
                      handleCloseDialog={handleCloseDialog}
                    />
                  </Grid>
                );
              })}
          </Grid>
        </DialogContent>
        {/* <DialogActions style={{ color: '#ffffff' }}>Cancel</DialogActions> */}
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.func,
  handleCloseDialog: PropTypes.func,
};

const SimpleDialogWrapped = withRouter(withStyles(styles)(SimpleDialog));

class SimpleDialogDemo extends React.Component {
  constructor(props) {
    super(props);
    this.handleSaveSelectedHospital = this.handleSaveSelectedHospital.bind(
      this,
    );
    this.state = {
      open: false,
      hospitalArr:
        this.props.authData &&
        this.props.authData.userDetails &&
        this.props.authData.userDetails.organizationDetails,
      selectedHospital: {},
      history: this.props.history,
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      open: true,
    });
  }

  handleClose = value => {
    this.setState({ ...this.state, open: false, selectedHospital: value });
    this.props.handleCloseDialog();
  };
  handleSaveSelectedHospital = value => {
    // console.log(this.state);
    var backDated = 'false';
    if (this.props.authData) {
      // debugger;
      const mainData = this.props.authData;
      const settingPreferences =
        mainData &&
        mainData.userDetails &&
        mainData.userDetails.organizationDetails &&
        mainData.userDetails.organizationDetails[0] &&
        mainData.userDetails.organizationDetails[0].settingPreferences;

      backDated =
        settingPreferences && settingPreferences.backDatedAppointment
          ? 'true'
          : 'false';
      // backDated = settingPreferences && settingPreferences.length > 0
      //   && settingPreferences.find(item => item.locationId === value['loc'].split("|")[0])
      //   ? settingPreferences.find(item => item.locationId === value['loc'].split("|")[0]).backDatedAppointment ? "true" : "false" : "false";
    }
    this.setState({ ...this.state, selectedHospital: value });
    setToLocalStorage('HKTWQ', this.props.authData);
    setToLocalStorage('TOKEN', this.props.authData);
    setToLocalStorage('BDA', backDated);
    // debugger;
    setToLocalStorage(
      'FHIRRESORCEID',
      this.props.authData.userDetails.fhirResourceId,
    );
    setToLocalStorage('USERNAME', this.props.authData.userDetails.userName);
    setToLocalStorage('FNAME', this.props.authData.userDetails.first);
    setToLocalStorage('LNAME', this.props.authData.userDetails.last);
    setToLocalStorage('data', this.props.authData);
    setToLocalStorage('PHONE', this.props.authData.userDetails.phone);
    setToLocalStorage('ORG', value['org']);
    setToLocalStorage('LOC', value['loc']);
    setToLocalStorage(
      'SUBSCRIPTION',
      this.props.authData.userDetails.organizationDetails[0]['subscriptions'],
    );
    setToLocalStorage(
      'RWF',
      this.props.authData.userDetails.organizationDetails[0][
        'readWriteFeatures'
      ],
    );
    setToLocalStorage(
      'ROF',
      this.props.authData.userDetails.organizationDetails[0][
        'readOnlyFeatures'
      ],
    );
    this.setState({
      ...this.state,
      open: false,
    });
    this.props.handleCloseDialog();
  };

  render() {
    // console.log('this.props.authData', this.props.authData);
    return (
      <div>
        <SimpleDialogWrapped
          selectedValueFunc={this.handleSaveSelectedHospital}
          open={this.state.open}
          onClose={this.handleClose}
          value={this.state.selectedHospital}
          hospitalArr={this.state.hospitalArr}
        />
      </div>
    );
  }
}
const mapStateToProps = state => state.globalNew;

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  withRouter,
)(SimpleDialogDemo);
