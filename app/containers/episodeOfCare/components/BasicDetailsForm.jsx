import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { filter } from 'lodash';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  providerNameSet,
  valueSetSearch,
} from '../../../apis/globalApis/globalSlice';
import { SquareAddIconButton } from '../../../components/button';
import AutoCompleteForAge from '../../layouts/formTemplate/AutoCompleteForAge';
import DatePickerField from '../../layouts/formTemplate/DateTimePickerField';
import Textfield from '../components/forms/TextField';
import UserContext from '../MyStateContext';
import {
  DenseAccordion as Accordion,
  DenseAccordionDetails as AccordionDetails,
  DenseAccordionSummary as AccordionSummary,
} from './accordions';
import AutoCompleteField from './forms/AutoCompleteField';
import CheckBoxField from './forms/CheckBoxField';
import PopperComponent from './forms/PopperComponent';
import RadioButton from './forms/RadioButton';
import SelectField from './forms/SelectField';
import TextFieldOnBlur from './forms/TextFieldOnBlur';
import OnFollowUpVisitCard from './onFollowUpVisit/OnFollowUpVisitCard';
const useStyles = makeStyles(theme => ({
  centerDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  centerGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headlabels: {
    fontSize: '0.98rem',
    fontWeight: 500,
    color: theme.palette.button.paginated.color,
  },

  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
    // [theme.breakpoints.down('md')]: {
    //   fontSize: '0.95rem',
    // },
  },
  lebelsDiv: {
    fontWeight: '400',
    // [theme.breakpoints.down('md')]: {
    //   fontSize: '0.95rem',
    // },
  },
  mendotary: {
    color: '#FF5C5C',
    paddingLeft: 0,
  },
  dobIcon: {
    borderRadius: 5,
    padding: 2,
    // margin: "3px 10px 3px 10px",
    outline: 'none !important',
    backgroundColor: '#F0F0F0',
  },
  textField: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: '400',

      [theme.breakpoints.down('md')]: {
        paddingLeft: '10.5px',
      },
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 40,
    },
  },
  textField1: {
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
  },
  noBorder: {
    border: 'none',
  },
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

    [theme.breakpoints.down('md')]: {
      paddingRight: '0px',
    },
  },
}));

function BasicDetailsForm(props) {
  const { Option, SET_BASIC_DETAIL_INITIAL_STATE, patientDetailsData } = props;
  const user = React.useContext(UserContext);

  const classes = useStyles();

  const [expand, setExpand] = React.useState(false);
  const [showDOB, setshowDOB] = React.useState(false);
  const [dobData, setdobData] = React.useState([]);
  const [OnLoadData, setOnLoadData] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const handleClick = toggle => event => {
    setOpen(toggle);
  };

  const [maritalStatusData, setMaritalStatusData] = useState([]);
  const [occupationData, setOccupationData] = useState([]);
  const [BloodGroupData, setBloodGroupData] = useState([]);
  const [providerData, setProviderData] = useState([]);

  const [FullName, setFullName] = useState('');
  const [Phone, setPhone] = useState('');
  const [ReferredBy, setReferredBy] = useState('');
  const [Height, setHeight] = useState('');
  const [Weight, setWeight] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [City, setCity] = useState('');
  const [Pincode, setPincode] = useState('');
  const [NameOfInsured, setNameOfInsured] = useState('');
  const [PolicyNum, setPolicyNum] = useState('');

  //-----------------API CALLS ---------------
  const callValueSetSearch = async () => {
    const maritalStatusSetData = await props.valueSetSearch({
      url: 'http://hl7.org/fhir/ValueSet/marital-status',
    });
    setMaritalStatusData(
      maritalStatusSetData && maritalStatusSetData.payload.message
        ? []
        : maritalStatusSetData.payload,
    );

    const occupationSetData = await props.valueSetSearch({
      url: 'http://dataquent.com/fhir/us/custom/ValueSet/custom-occupation-vs',
    });
    setOccupationData(
      occupationSetData && occupationSetData.payload.message
        ? []
        : occupationSetData.payload,
    );

    const BloodGroupSetData = await props.valueSetSearch({
      url: 'http://dataquent.com/fhir/us/custom/valueSet/custom-blood-group-vs',
    });
    setBloodGroupData(
      BloodGroupSetData && BloodGroupSetData.payload.message
        ? []
        : BloodGroupSetData.payload,
    );
  };

  const callproviderNameSet = async () => {
    const { payload } = await props.providerNameSet({
      url: '',
    });

    if (payload && payload.data) {
      let value = Object.assign([], payload.data.cancerOrganization);
      let array = [];
      for (let i = 0; i < value.length; i++) {
        array.push(value[i].organization);
      }

      setProviderData(array);
    } else if (payload && payload.message) {
      setProviderData([]);
    }
  };
  //-----------------API CALLS END---------------

  useEffect(() => {
    callValueSetSearch();
    callproviderNameSet();
  }, []);

  const checkBoxData = () => (
    <>
      <div>
        <CheckBoxField name="addressCheck" label="Address" />
      </div>

      <div>
        <CheckBoxField name="occupationCheck" label="Occupation" />
      </div>
      <div>
        <CheckBoxField name="maritalStatusCheck" label="Marital Status" />
      </div>
      <div>
        <CheckBoxField name="emailCheck" label="Email Address" />
      </div>
      <div>
        <CheckBoxField name="bloodGroupCheck" label="Blood Group" />
      </div>
      <div>
        <CheckBoxField name="insuranceCheck" label="Insurance" />
      </div>
    </>
  );

  useEffect(() => {
    let firstN = '';
    let lastN = '';
    let birthDateN = '';
    let genderN = '';
    let referredByNameN = '';
    let phoneN = '';
    let heightN = '';
    let heightUnitN = '';
    let weightN = '';
    let weightUnitN = '';
    let occupationN = '';
    let maritalStatusN = '';
    let emailN = '';
    let insuranceNameN = '';
    let providerNameN = '';
    let policyNumberN = '';
    let bloodGroupN = '';
    let imageN = '';
    let contentTypeN = '';

    let tline = '';
    let tcity = '';
    let tstate = '';
    let tpostalCode = '';

    let addressCheck = false;
    let occupationCheck = false;
    let maritalStatusCheck = false;
    let emailCheck = false;
    let bloodGroupCheck = false;
    let insuranceCheck = false;

    let ageN = '';
    let dobN = '';
    if (patientDetailsData && patientDetailsData.patient) {
      const {
        resourceId,
        first,
        last,
        email,
        birthDate,
        gender,
        phone,
        maritalStatus,
        occupation,
        referredByName,
        insuranceName,
        policyNumber,
        providerName,
        addressDetail,
        height,
        weight,
        bloodGroup,
        age,
        image,
        contentType,
      } = patientDetailsData.patient;

      if (addressDetail != null) {
        const a = addressDetail.find(val => val.addressType === null || 'Temp');

        if (a != undefined) {
          if (a.addressType === null || 'Temp') {
            (tline = a.line === null ? '' : a.line),
              (tcity = a.city === null ? '' : a.city),
              (tstate = a.state === null ? '' : ',' + a.state),
              (tpostalCode = a.postalCode === null ? '' : a.postalCode);
          }
        }
      }
      ageN = age ? age : '';
      dobN = age
        ? { code: parseInt(age), display: age }
        : { code: '', display: '' };
      firstN = first === null ? '' : first;
      lastN = last === null ? '' : last;
      birthDateN = birthDate === null ? '' : birthDate;
      genderN = gender === null ? '' : gender;
      referredByNameN = referredByName === null ? '' : referredByName;
      phoneN = phone === null ? '' : phone;

      heightN = height === null ? '' : height.value;
      (heightUnitN = height === null ? 'cm' : height.unit),
        (weightN = weight === null ? '' : weight.value);
      (weightUnitN = weight === null ? 'kg' : weight.unit),
        (occupationN =
          occupation === null
            ? { code: '', display: '' }
            : { code: resourceId, display: occupation });
      maritalStatusN =
        maritalStatus === null ? { code: '', display: '' } : maritalStatus;
      emailN = email === null ? '' : email;

      imageN = image ? image : '';
      contentTypeN = contentType ? contentType : '';

      insuranceNameN = insuranceName === null ? '' : insuranceName;
      providerNameN =
        providerName === null
          ? { resourceId: '', name: '' }
          : { resourceId: '', name: providerName };
      policyNumberN = policyNumber ? policyNumber : '';

      bloodGroupN =
        bloodGroup === null
          ? { code: '', display: '' }
          : { code: '', display: bloodGroup };

      addressCheck = addressDetail !== null ? true : false;
      occupationCheck = occupation !== null ? true : false;
      maritalStatusCheck = maritalStatus !== null ? true : false;
      emailCheck = email !== null ? true : false;
      bloodGroupCheck = bloodGroup !== null ? true : false;
      insuranceCheck = insuranceName !== null ? true : false;
    }

    let checkFollowUp =
      patientDetailsData &&
      patientDetailsData.cancerEncounterOPDs &&
      patientDetailsData.cancerEncounterOPDs.length;

    setFullName(`${firstN} ${lastN}`);
    setPhone(phoneN);
    setReferredBy(referredByNameN);
    setHeight(heightN);
    setWeight(weightN);
    setEmail(emailN);
    setAddress(tline);
    setCity(`${tcity} ${tstate}`);
    setPincode(tpostalCode);

    setNameOfInsured(insuranceNameN);
    setPolicyNum(policyNumberN);

    const BASIC_DETAIL_INITIAL_STATE = {
      fullName: `${firstN} ${lastN}`,
      dateOfBirth: birthDateN,
      gender: genderN,
      referredBy: referredByNameN,
      phone: phoneN,

      height: heightN,
      heightUnit: heightUnitN,

      weight: weightN,
      weightUnit: weightUnitN,

      occupation: occupationN,
      maritalStatus: maritalStatusN,
      email: emailN,

      address: tline,
      city: `${tcity} ${tstate}`,
      pincode: tpostalCode,

      nameOfInsured: insuranceNameN,
      providerName: providerNameN,
      policyNum: policyNumberN,

      bloodGroup: bloodGroupN,

      addressCheck: addressCheck,
      occupationCheck: occupationCheck,
      maritalStatusCheck: maritalStatusCheck,
      emailCheck: emailCheck,
      bloodGroupCheck: bloodGroupCheck,
      insuranceCheck: insuranceCheck,
      age: ageN,
      dob: dobN,
      checkFollowUp: checkFollowUp,
      image: imageN,
      contentType: contentTypeN,
    };

    SET_BASIC_DETAIL_INITIAL_STATE(BASIC_DETAIL_INITIAL_STATE);
  }, [patientDetailsData]);

  const choices = [
    { key: 'Male', value: 'Male' },
    { key: 'Female', value: 'Female' },
    { key: 'Other', value: 'Other' },
  ];
  const heightData = [
    { key: 'Cm', value: 'cm' },
    { key: 'Inch', value: 'inch' },
    { key: 'Feet', value: 'feet' },
  ];

  const weightData = [
    { key: 'Kg', value: 'kg' },
    { key: 'Pound', value: 'pound' },
    { key: 'Grains', value: 'grains' },
  ];

  user.setshowDOB(showDOB);

  useEffect(() => {
    function generateValue() {
      var res = [];
      for (var i = 0; i < 151; i += 1) {
        res.push(i);
      }
      return res;
    }

    var result = generateValue();
    let res = [];

    result.forEach(val => {
      res.push({ code: val, display: `${val}` });
    });

    setdobData(res);
  }, []);

  useEffect(() => {
    // let res = [];
    const {
      fullName,
      phone,
      address,
      city,
      referredBy,
      height,
      heightUnit,
      weight,
      weightUnit,
      occupation,
      maritalStatus,
      email,
      bloodGroup,
      nameOfInsured,
      providerName,
      policyNum,
    } = Option.values;

    let res = [
      {
        title: '',
        subtitle: `${fullName && fullName}`,
        status: true,
        type: 'name',
      },
      { title: 'Contact Number', subtitle: phone && phone, status: true },
      {
        title: 'Address',
        subtitle: `${address && address} ,${city && city}`,
        status: address && address !== '',
      },
      {
        title: 'Referred by',
        subtitle: referredBy && referredBy,
        status: referredBy && referredBy !== '',
      },
      {
        title: 'Height',
        subtitle: `${height && height} ${heightUnit}`,
        status: height !== '',
      },
      {
        title: 'Weight',
        subtitle: `${weight && weight} ${weightUnit}`,
        status: weight !== '',
      },
      {
        title: 'Occupation',
        subtitle: occupation && occupation.display,
        status: occupation && occupation.display !== '',
      },
      {
        title: 'Marital Status',
        subtitle: maritalStatus && maritalStatus.display,
        status: maritalStatus && maritalStatus.display !== '',
      },
      {
        title: 'Email Address',
        subtitle: email && email,
        status: email && email !== '',
      },
      {
        title: 'Blood Group',
        subtitle: bloodGroup && bloodGroup.display,
        status: bloodGroup && bloodGroup.display !== '',
      },

      {
        title: 'Name Of Insured',
        subtitle: nameOfInsured && nameOfInsured,
        status: nameOfInsured && nameOfInsured !== '',
      },
      {
        title: 'Provider Name',
        subtitle: providerName && providerName.name,
        status: providerName && providerName.name !== '',
      },
      {
        title: 'Policy Number',
        subtitle: policyNum && policyNum,
        status: policyNum && policyNum !== '',
      },
    ];

    setOnLoadData(filter(res, { status: true }));
  }, [Option.values]);

  useEffect(() => {
    if (Option.values.checkFollowUp && Option.values.checkFollowUp > 1) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  }, [Option.values.checkFollowUp]);

  const onExpand = () => {
    setExpand(!expand);
  };

  return (
    <Fragment>
      {open && (
        <PopperComponent
          open={open}
          handleClick={handleClick}
          checkBoxData={checkBoxData()}
        />
      )}

      <Accordion expanded={expand} onChange={onExpand} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid container>
            <Grid item xs md={2} className={classes.centerDiv}>
              <Typography className={classes.headlabels}>
                Basic Details
              </Typography>
            </Grid>
            <Grid item xs md={10}>
              {!expand && <OnFollowUpVisitCard OnLoadData={OnLoadData} />}

              {expand && (
                <SquareAddIconButton
                  style={{ float: 'right', padding: 2 }}
                  onMouseEnter={handleClick(true)}
                />
              )}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <Grid item container xs={12}>
              <Grid item container xs={12} md={4}>
                <Grid item xs={12} md={4} className={classes.lebels}>
                  Patient Name <span className={classes.mendotary}>{' *'}</span>
                </Grid>
                <Grid item xs={12} md={7} className={classes.centerDiv}>
                  <TextFieldOnBlur
                    name="fullName"
                    placeholder="First Name"
                    onChange={e => {
                      setFullName(e.target.value);
                    }}
                    value={FullName}
                  />
                </Grid>
              </Grid>

              <Grid item container xs={12} md={4}>
                <Grid item xs={12} md={4} className={classes.lebelsDiv}>
                  <div>Age /</div> Date Of Birth{' '}
                  <span className={classes.mendotary}>{' *'}</span>
                </Grid>
                <Grid item xs={12} md={7} className={classes.centerDiv}>
                  <DatePickerField
                    name="dateOfBirth"
                    type="date"
                    placeholder="Date Of Birth"
                    minDate=""
                    maxDate={new Date()}
                    onChange={e => {
                      if (e.target.value !== '') {
                        let totalAge = moment().diff(e.target.value, 'years');

                        Option.setFieldValue('dob', {
                          code: totalAge,
                          display: totalAge.toString(),
                        });
                      } else {
                        Option.setFieldValue('dob', {
                          code: '',
                          display: '',
                        });
                      }

                      Option.setFieldValue('dateOfBirth', e.target.value);
                    }}
                  />

                  <div
                    style={{
                      width: '2rem',
                      display: 'flex',
                      justifyContent: 'center',
                      fontWeight: '400',
                    }}
                  >
                    or
                  </div>

                  <AutoCompleteForAge
                    id="dob"
                    options={dobData && dobData.length !== 0 ? dobData : []}
                    label="Age"
                    name="dob"
                    value={Option.values.dob} //is required
                    style={{ width: '55%' }}
                    fontWeightProps={true}
                    marginDenseProps={true}
                  />
                </Grid>
              </Grid>

              <Grid item container xs={12} md={4}>
                <Grid item xs={12} md={4} className={classes.lebels}>
                  Select Gender<span className={classes.mendotary}>{'*'}</span>
                </Grid>
                <Grid item xs={12} md={8} className={classes.centerDiv}>
                  <RadioButton
                    row={true}
                    name="gender"
                    value={Option.values.gender}
                    options={choices}
                    onChange={Option.handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={12} md={4}>
                <Grid item xs={12} md={4} className={classes.lebelsDiv}>
                  <div>Contact</div>Number{' '}
                  <span className={classes.mendotary}>{' *'}</span>
                </Grid>
                <Grid item xs={12} md={7} className={classes.centerDiv}>
                  <TextFieldOnBlur
                    name="phone"
                    type="number"
                    placeholder="Mobile Number"
                    onChange={e => {
                      setPhone(e.target.value);
                    }}
                    value={Phone}
                  />
                </Grid>
              </Grid>

              <Grid item container xs={12} md={4}>
                <Grid item xs={12} md={4} className={classes.lebels}>
                  Referred by
                </Grid>
                <Grid item xs={12} md={7} className={classes.centerDiv}>
                  <TextFieldOnBlur
                    name="referredBy"
                    placeholder=""
                    onChange={e => {
                      setReferredBy(e.target.value);
                    }}
                    value={ReferredBy}
                  />
                </Grid>
              </Grid>

              <Grid item container xs={12} md={4}>
                <Grid item xs={12} md={2} className={classes.lebels}>
                  Height
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldOnBlur
                    name="height"
                    type="number"
                    placeholder="Height"
                    style={{ width: '70%' }}
                    onChange={e => {
                      setHeight(e.target.value);
                    }}
                    value={Height}
                  />
                  <SelectField
                    name="heightUnit"
                    value={Option.values.heightUnit}
                    options={heightData}
                    width="30%"
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={2}
                  style={{ justifyContent: 'center' }}
                  className={classes.lebels}
                >
                  Weight
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextFieldOnBlur
                    name="weight"
                    type="number"
                    placeholder="Weight"
                    style={{ width: '70%' }}
                    onChange={e => {
                      setWeight(e.target.value);
                    }}
                    value={Weight}
                  />
                  <SelectField
                    name="weightUnit"
                    value={Option.values.weightUnit}
                    options={weightData}
                    width="30%"
                  />
                </Grid>
              </Grid>
            </Grid>

            {Option.values.occupationCheck ||
            Option.values.maritalStatusCheck ||
            Option.values.emailCheck ? (
              <Grid item container xs={12}>
                {Option.values.occupationCheck && (
                  <Grid item container xs={12} md={4}>
                    <Grid item xs={12} md={4} className={classes.lebels}>
                      Occupation
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <AutoCompleteField
                        id="occupation"
                        size="small"
                        options={
                          occupationData && occupationData.length !== 0
                            ? occupationData
                            : []
                        }
                        label="Occupation"
                        name="occupation"
                        val={Option.values.occupation}
                        code="code"
                        display="display"
                      />
                    </Grid>
                  </Grid>
                )}

                {Option.values.maritalStatusCheck && (
                  <Grid item container xs={12} md={4}>
                    <Grid item xs={12} md={4} className={classes.lebels}>
                      Marital Status
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <AutoCompleteField
                        id="maritalStatus"
                        size="small"
                        options={
                          maritalStatusData && maritalStatusData.length !== 0
                            ? maritalStatusData
                            : []
                        }
                        label="Marital Status"
                        name="maritalStatus"
                        val={Option.values.maritalStatus}
                        code="code"
                        display="display"
                      />
                    </Grid>
                  </Grid>
                )}

                {Option.values.emailCheck && (
                  <Grid item container xs={12} md={4}>
                    <Grid item xs={12} md={4} className={classes.lebels}>
                      Email Address
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <TextFieldOnBlur
                        name="email"
                        placeholder=""
                        onChange={e => {
                          setEmail(e.target.value);
                        }}
                        value={Email}
                      />
                    </Grid>
                  </Grid>
                )}
              </Grid>
            ) : (
              ''
            )}

            {Option.values.bloodGroupCheck && (
              <Grid item container xs={12}>
                <Grid item container xs={12} md={4}>
                  <Grid item xs={12} md={4} className={classes.lebels}>
                    Blood Group
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <AutoCompleteField
                      id="bloodGroup"
                      size="small"
                      options={
                        BloodGroupData && BloodGroupData.length !== 0
                          ? BloodGroupData
                          : []
                      }
                      label="Blood Group"
                      name="bloodGroup"
                      val={Option.values.bloodGroup}
                      code="id"
                      display="display"
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}

            {Option.values.addressCheck && (
              <Grid item container xs={12}>
                <Grid item container xs={12} md={4}>
                  <Grid item xs={12} md={4} className={classes.lebels}>
                    Address
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextFieldOnBlur
                      name="address"
                      placeholder="Plot No. Apartment"
                      onChange={e => {
                        setAddress(e.target.value);
                      }}
                      value={Address}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid item xs={12} md={4} className={classes.lebels}>
                    Select City
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextFieldOnBlur
                      name="city"
                      placeholder="City, State"
                      onChange={e => {
                        setCity(e.target.value);
                      }}
                      value={City}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid item xs={12} md={4} className={classes.lebels}>
                    Pincode
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextFieldOnBlur
                      name="pincode"
                      type="number"
                      placeholder=""
                      onChange={e => {
                        setPincode(e.target.value);
                      }}
                      value={Pincode}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}

            {Option.values.insuranceCheck && (
              <Grid item container xs={12}>
                <Grid item container xs={12} md={4}>
                  <Grid item xs={12} md={4} className={classes.lebels}>
                    Name Of Insured
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextFieldOnBlur
                      name="nameOfInsured"
                      placeholder="Name Of Insured"
                      onChange={e => {
                        setNameOfInsured(e.target.value);
                      }}
                      value={NameOfInsured}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid item xs={12} md={4} className={classes.lebels}>
                    Provider Name
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <AutoCompleteField
                      id="providerName"
                      size="small"
                      options={
                        providerData && providerData.length !== 0
                          ? providerData
                          : []
                      }
                      label="Provider Name"
                      name="providerName"
                      val={Option.values.providerName}
                      code="resourceId"
                      display="name"
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} md={4}>
                  <Grid item xs={12} md={4} className={classes.lebels}>
                    Policy Number
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <TextFieldOnBlur
                      name="policyNum"
                      placeholder="0000-0000-0000-0000"
                      onChange={e => {
                        setPolicyNum(e.target.value);
                      }}
                      value={PolicyNum}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
}
const mapStateToProps = state => state.globalReducerThunk;

export function mapDispatchToProps(dispatch) {
  return {
    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    providerNameSet: payload => dispatch(providerNameSet(payload)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BasicDetailsForm);
