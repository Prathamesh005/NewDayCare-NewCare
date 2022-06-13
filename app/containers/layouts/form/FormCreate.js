import React from 'react';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
// import { DatePicker, MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  sideLabel: {
    fontSize: '18px',
    color: '#373737',
  },
  sideLabelContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    // backgroundColor:'#F4F4F4 !important',
    // fontWeight:'bold',
    // outline:'none !important',
    // border:'1px solid transparent !important',
    // borderBottom: '1px solid #878787  !important',
    // borderRadius:'5px'
  },
  labelClass: {
    color: '#727272',
    fontSize: '18px',
    fontWeight: 'normal',
    opacity: '0.7',
  },
  input: {
    background: '#fff',
    paddingTop: '0px',
    padding: '20px !important',
    height: 57,
    borderRight: '1px solid black',
    borderRadius: '5px 0px 0px 5px',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    '&:focus': {
      background: '#fff !important',
    },
    '&:active': {
      background: '#fff !important',
    },
    '&:hover': {
      background: '#fff !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
  input1: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
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
  input2: {
    background: '#ffffff',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    marginTop: 6,
    '&:focus': {
      background: '#ffffff !important',
    },
    '&:active': {
      background: '#ffffff !important',
    },
    '&:hover': {
      background: '#ffffff !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
    '& .MuiFilledInput-input': {
      padding: 12,
    },
  },
}));

function Form(props) {
  const classes = useStyles();
  const {
    fieldConfig,
    blured,
    changed,
    change,
    handleDateChange,
    handleSlotChange,
    slots,
    onSpecialityChange,
    practionerFilterData,
    avaliableOT,
    toggleCheckboxValue,
  } = props;
  // console.log('practionerFilterData',practionerFilterData)
  let element = null;
  // const classes = ['field'];

  // console.log('field is',props.data);
  switch (fieldConfig.type) {
    case 'text':
      element = (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            className={classes.sideLabelContainer}
          >
            <strong className={classes.sideLabel}>
              {fieldConfig.sidelabel}
            </strong>
          </Grid>

          <Grid item xs={12} sm={12} md={9}>
            <TextField
              autoComplete={fieldConfig.name}
              name={fieldConfig.name}
              value={fieldConfig.value}
              // variant="outlined"
              fullWidth
              label={
                <span className={classes.labelClass}>{fieldConfig.label}</span>
              }
              placeholder={fieldConfig.placeholder}
              onChange={changed}
              onKeyDown={blured}
              InputProps={{
                className: classes.input1,
              }}
              error={
                fieldConfig.touched && !fieldConfig.valid
                  ? fieldConfig.errorMessage
                  : ''
              }
              helperText={
                fieldConfig.touched && !fieldConfig.valid
                  ? fieldConfig.errorMessage
                  : ''
              }
              variant="filled"
              disabled={fieldConfig.disabled ? fieldConfig.disabled : false}
            />
          </Grid>
        </>
      );
      break;
    case 'input':
      element = (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            className={classes.sideLabelContainer}
          >
            <strong className={classes.sideLabel}>
              {fieldConfig.sidelabel}
            </strong>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <TextField
              autoComplete={fieldConfig.name}
              name={fieldConfig.name}
              value={fieldConfig.value}
              // variant="outlined"
              fullWidth
              label={
                <span className={classes.labelClass}>{fieldConfig.label}</span>
              }
              placeholder={fieldConfig.placeholder}
              autoFocus={fieldConfig.autoFocus}
              onChange={changed}
              onKeyDown={blured}
              // className={classes.input}
              error={
                fieldConfig.touched && !fieldConfig.valid
                  ? fieldConfig.errorMessage
                  : ''
              }
              helperText={
                fieldConfig.touched && !fieldConfig.valid
                  ? fieldConfig.errorMessage
                  : ''
              }
              InputProps={{
                className: classes.input1,
              }}
              variant="filled"
              disabled={fieldConfig.disabled ? fieldConfig.disabled : false}
            />
          </Grid>
        </>
      );
      break;
    case 'textarea':
      element = (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            className={classes.sideLabelContainer}
          >
            <strong className={classes.sideLabel}>
              <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
            </strong>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <TextField
              autoComplete={fieldConfig.name}
              name={fieldConfig.name}
              value={fieldConfig.value}
              multiline
              // variant="outlined"
              fullWidth
              rows="4"
              label={
                <span className={classes.labelClass} style={{ color: '#000' }}>
                  {fieldConfig.label}
                </span>
              }
              placeholder={fieldConfig.placeholder}
              onChange={changed}
              onKeyDown={blured}
              error={
                fieldConfig.touched && !fieldConfig.valid
                  ? fieldConfig.errorMessage
                  : ''
              }
              variant="filled"
              helperText={
                fieldConfig.touched == true && fieldConfig.valid == false
                  ? fieldConfig.errorMessage
                  : ''
              }
              className={classes.textField}
              InputProps={{
                className: classes.input1,
              }}
            />
          </Grid>
        </>
      );
      break;
    case 'email':
      element = (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            className={classes.sideLabelContainer}
          >
            <strong className={classes.sideLabel}>
              {fieldConfig.sidelabel}
            </strong>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <TextField
              autoComplete={fieldConfig.name}
              name={fieldConfig.name}
              value={fieldConfig.value}
              // variant="outlined"
              fullWidth
              label={
                <span className={classes.labelClass}>{fieldConfig.label}</span>
              }
              placeholder={fieldConfig.placeholder}
              onChange={changed}
              onKeyDown={blured}
              error={
                fieldConfig.touched && !fieldConfig.valid
                  ? fieldConfig.errorMessage
                  : ''
              }
              variant="filled"
              helperText={
                fieldConfig.touched == true && fieldConfig.valid == false
                  ? fieldConfig.errorMessage
                  : ''
              }
              InputProps={{
                className: classes.input1,
              }}
            />
          </Grid>
        </>
      );
      break;

    case 'select':
      element = (
        <Grid item xs={12} sm={12}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              {fieldConfig.label}
            </InputLabel>
            <Select
              native
              label={
                <span className={classes.labelClass}>{fieldConfig.label}</span>
              }
              fullWidth
              name={fieldConfig.name}
              onChange={changed}
              onKeyDown={blured}
              placeholder={fieldConfig.placeholder}
              variant="filled"
            >
              {fieldConfig.options.map(option => (
                <option value={option.value}>{option.displayValue}</option>
              ))}
            </Select>
          </FormControl>
        </Grid>
      );
      break;

    case 'checkbox':
      element = (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            className={classes.sideLabelContainer}
          >
            <strong className={classes.sideLabel}>
              <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
            </strong>
          </Grid>
          <Grid item xs={12} sm={fieldConfig.size}>
            {/* <FormLabel component="legend">{fieldConfig.label}</FormLabel> */}
            <FormGroup
              row
              aria-label="checkbox"
              name={fieldConfig.name}
              onChange={changed}
              onKeyDown={blured}
            >
              {fieldConfig.options.map(option => (
                <FormControlLabel
                  value={option.value}
                  control={<Checkbox color="primary" />}
                  label={
                    <span className={classes.labelClass}>
                      {option.displayValue}
                    </span>
                  }
                  labelPlacement="end"
                />
              ))}
            </FormGroup>
          </Grid>
        </>
      );
      break;

    case 'multicheckbox':
      element = (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            className={classes.sideLabelContainer}
          >
            <strong className={classes.sideLabel}>
              <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
            </strong>
          </Grid>
          <Grid item xs={12} sm={fieldConfig.size}>
            {/* <FormLabel component="legend">{fieldConfig.label}</FormLabel> */}
            <FormGroup row aria-label="checkbox" name={fieldConfig.name}>
              {fieldConfig.options.map(option => (
                <FormControlLabel
                  value={option.value}
                  control={<Checkbox color="primary" />}
                  label={
                    <span className={classes.labelClass}>
                      {option.displayValue}
                    </span>
                  }
                  labelPlacement="end"
                  onChange={() => toggleCheckboxValue(option.value)}
                />
              ))}
            </FormGroup>
          </Grid>
        </>
      );
      break;

    case 'radio':
      element = (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            className={classes.sideLabelContainer}
          >
            <strong className={classes.sideLabel}>
              {fieldConfig.sidelabel + ' *'}
            </strong>
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <RadioGroup
              row
              aria-label="gender"
              name={fieldConfig.name}
              onChange={fieldConfig.change ? fieldConfig.change : changed}
              onKeyDown={blured}
              value={fieldConfig.value}
            >
              {fieldConfig.options.map(option => (
                <FormControlLabel
                  value={option.value}
                  control={<Radio color="primary" />}
                  label={option.displayValue}
                />
              ))}
            </RadioGroup>
          </Grid>
        </>
      );
      break;

    case 'date':
      element = (
        <>
          {fieldConfig.sidelabel != null ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              className={classes.sideLabelContainer}
            >
              <strong className={classes.sideLabel}>
                <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
              </strong>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={12} md={9}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                variant="inline"
                label={fieldConfig.label}
                value={fieldConfig.value}
                format="MM/dd/yyyy"
                onChange={handleDateChange}
                onKeyDown={blured}
                name={fieldConfig.name}
              />
            </MuiPickersUtilsProvider>  */}

              <TextField
                id={fieldConfig.id}
                label={
                  <span
                    className={classes.labelClass}
                    style={{ color: '#000' }}
                  >
                    {fieldConfig.label}
                  </span>
                }
                // type="datetime-local"
                type="date"
                defaultValue={fieldConfig.value}
                value={fieldConfig.value}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={handleDateChange}
                onKeyDown={blured}
                name={fieldConfig.name}
                variant="filled"
                InputProps={{
                  inputProps: {
                    min: moment(new Date())
                      .local()
                      .format('YYYY-MM-DD'),
                  },
                  className: classes.input1,
                }}
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={3}>
        <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
           <TextField
              id="time"
              label="Select Slot"
              type="time"
              defaultValue="11:58"
             // value={ slots&&slots.map(x =>x.slots.start)}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleSlotChange}
              inputProps={{
                step:  slots&&slots.map(x =>x.slots.start), // 5 min
              }}
            />
        </FormControl>
        </Grid> */}
        </>
      );
      break;

    case 'appointmentDate':
      element = (
        <>
          {fieldConfig.sidelabel != null ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              className={classes.sideLabelContainer}
            >
              <strong className={classes.sideLabel}>
                <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
              </strong>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={fieldConfig.size}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <TextField
                id={fieldConfig.id}
                label={
                  <span
                    className={classes.labelClass}
                    style={{ color: '#000' }}
                  >
                    {fieldConfig.label}
                  </span>
                }
                // type="datetime-local"
                type="date"
                defaultValue={fieldConfig.value}
                value={fieldConfig.value}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleDateChange}
                onKeyDown={blured}
                name={fieldConfig.name}
                variant="filled"
                InputProps={{
                  // inputProps: {
                  //   min: moment(new Date())
                  //     .local()
                  //     .format('YYYY-MM-DD')
                  // },
                  className: classes.input2,
                }}
              />
            </FormControl>
          </Grid>
        </>
      );
      break;

    case 'time':
      element = (
        <>
          {fieldConfig.sidelabel != null ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              className={classes.sideLabelContainer}
            >
              <strong className={classes.sideLabel}>
                <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
              </strong>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={fieldConfig.size}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <TextField
                id="time"
                label={
                  <span
                    className={classes.labelClass}
                    style={{ color: '#000' }}
                  >
                    {fieldConfig.label}
                  </span>
                }
                name={fieldConfig.name}
                type="time"
                defaultValue={fieldConfig.value}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                variant="filled"
                onChange={fieldConfig.change}
              />
            </FormControl>
          </Grid>
        </>
      );
      break;

    // case 'KeyboardDatePicker':
    //   element = (
    //     <>
    //     {fieldConfig.sidelabel!=null?<Grid item xs={12} sm={12} md={3} className={classes.sideLabelContainer}>
    //     <strong className={classes.sideLabel}><p style={{marginTop:15}}>{fieldConfig.sidelabel}</p></strong>
    //     </Grid>:null}
    //     <Grid item xs={12} sm={fieldConfig.sidelabel!=null?4:12}>
    //       <FormControl
    //         fullWidth
    //         variant="outlined"
    //         className={classes.formControl}
    //       >
    //         <TextField
    //           id={fieldConfig.id}
    //           label={<span className={classes.labelClass}>{fieldConfig.label}</span>}
    //           // type="datetime-local"
    //           type="date"
    //           value={fieldConfig.value}
    //           InputLabelProps={{
    //             shrink: true,
    //           }}
    //           onChange={handleDateChange}
    //           onKeyDown={blured}
    //           name={fieldConfig.name}
    //           variant="filled"
    //         />
    //          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //           <KeyboardDatePicker
    //             disableToolbar
    //             //variant="inline"
    //             margin="normal"
    //             format="dd-MM-yyyy"
    //             id={fieldConfig.id}
    //             label={<span className={classes.labelClass}>{fieldConfig.label}</span>}
    //             value={fieldConfig.value}
    //             onChange={handleDateChange}
    //             onKeyDown={blured}
    //             name={fieldConfig.name}
    //           />
    //           </MuiPickersUtilsProvider> */}
    //       </FormControl>
    //     </Grid>
    //     </>
    //   );
    //   break;

    case 'KeyboardDatePicker':
      element = (
        <>
          {fieldConfig.sidelabel != null ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              className={classes.sideLabelContainer}
            >
              <strong className={classes.sideLabel}>
                <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel + ' *'}</p>
              </strong>
            </Grid>
          ) : null}
          <Grid
            item
            xs={12}
            // sm={fieldConfig.sidelabel != null ? fieldConfig.size : 12}
            sm={12}
            md={9}
          >
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <TextField
                id={fieldConfig.id}
                label={
                  <span className={classes.labelClass}>
                    {fieldConfig.label}
                  </span>
                }
                // type="datetime-local"
                type="date"
                defaultValue={fieldConfig.value}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleDateChange}
                onKeyDown={blured}
                name={fieldConfig.name}
                variant="filled"
                InputProps={{ className: classes.input1 }}
                // InputProps={{inputProps: { min: moment(new Date())
                //   .local()
                //   .format('YYYY-MM-DD')} }}
              />
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    //variant="inline"
                    margin="normal"
                    format="dd-MM-yyyy"
                    id={fieldConfig.id}
                    label={<span className={classes.labelClass}>{fieldConfig.label}</span>}
                    value={fieldConfig.value}
                    onChange={handleDateChange}
                    onKeyDown={blured}
                    name={fieldConfig.name}
                  />
                  </MuiPickersUtilsProvider> */}
            </FormControl>
          </Grid>
        </>
      );
      break;

    case 'dates':
      element = (
        <Grid item xs={12} sm={12}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <DatePicker
              style={{ width: '100%' }}
              id={fieldConfig.id}
              label={
                <span className={classes.labelClass}>{fieldConfig.label}</span>
              }
              selected={fieldConfig.value}
              value={fieldConfig.value}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="time"
              showMonthDropdown
              showYearDropdown
              minDate={fieldConfig.minDate}
              maxDate={fieldConfig.maxDate}
              minTime={fieldConfig.minTime}
              maxTime={fieldConfig.maxTime}
              name={fieldConfig.name}
              dateFormat="dd-MM-yyyy h:mm"
            />
          </FormControl>
        </Grid>
      );
      break;
    case 'search':
      let data = fieldConfig.options;
      // console.log('fieldConfig.options',JSON.parse(data));
      // console.log('data final',data);
      console.log('config-create', fieldConfig);
      element = (
        <>
          {fieldConfig.sidelabel != null && fieldConfig.sidelabel != '' ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              className={classes.sideLabelContainer}
            >
              <strong className={classes.sideLabel}>
                <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
              </strong>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={12} md={9}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <Autocomplete
                id="search-patient"
                options={(data && data) || []}
                getOptionLabel={fieldConfig.getOptionLabel}
                onChange={fieldConfig.change}
                renderInput={params => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      className:
                        fieldConfig.name == 'cancertype'
                          ? classes.input
                          : classes.input1,
                    }}
                    label={
                      <span
                        className={classes.labelClass}
                        style={{ color: '#000' }}
                      >
                        {fieldConfig.label}
                      </span>
                    }
                    // variant="outlined"
                    variant={
                      fieldConfig.sidelabel != null ? 'filled' : 'outlined'
                    }
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </Grid>
          {fieldConfig.name == 'OT' ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              className={classes.sideLabelContainer}
            >
              <div>
                <strong>Avaliable OTs</strong>
              </div>
              <div style={{ marginTop: '5' }}>
                {avaliableOT && avaliableOT != null
                  ? avaliableOT.map(c => c.location.name)
                  : 'No OTS Are Avaliable'}
              </div>
            </Grid>
          ) : null}
        </>
      );
      break;

    case 'searchPractioner':
      // console.log('data final',data);
      element = (
        <>
          {fieldConfig.sidelabel != null && fieldConfig.sidelabel != '' ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              className={classes.sideLabelContainer}
            >
              <strong className={classes.sideLabel}>
                <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
              </strong>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={fieldConfig.size}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <Autocomplete
                id="search-patient"
                options={(fieldConfig && fieldConfig.options) || []}
                value={fieldConfig.value}
                getOptionLabel={fieldConfig.getOptionLabel}
                onChange={change}
                disabled={fieldConfig.disabled}
                renderInput={params => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      className: classes.input1,
                    }}
                    label={
                      <span
                        className={classes.labelClass}
                        style={{ color: '#000' }}
                      >
                        {fieldConfig.label}
                      </span>
                    }
                    // variant="outlined"
                    variant={
                      fieldConfig.sidelabel != null ? 'filled' : 'outlined'
                    }
                  />
                )}
              />
            </FormControl>
          </Grid>
        </>
      );
      break;

    case 'multiplesearch':
      // console.log('data multisearch', fieldConfig.options);
      element = (
        <>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            className={classes.sideLabelContainer}
          >
            <strong className={classes.sideLabel}>
              <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
            </strong>
          </Grid>
          <Grid item xs={12} sm={fieldConfig.size}>
            <FormControl
              fullWidth
              // variant="outlined"
              variant="filled"
              className={classes.formControl}
            >
              <Autocomplete
                // id="search-patient"
                // options={fieldConfig.options}
                // getOptionLabel={fieldConfig.getOptionLabel}
                // onChange={fieldConfig.change}
                // renderInput={params => (
                //   <TextField
                //     {...params}
                //     label={fieldConfig.label}
                //     variant="outlined"
                //   />
                // )}

                multiple
                id={fieldConfig.id}
                options={fieldConfig.options ? fieldConfig.options : []}
                getOptionLabel={
                  fieldConfig.getOptionLabel
                    ? fieldConfig.getOptionLabel
                    : 'ABC'
                }
                onChange={fieldConfig.change}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={
                      <span className={classes.labelClass}>
                        {fieldConfig.label}
                      </span>
                    }
                    // variant="outlined"
                    variant="filled"
                  />
                )}
              />
            </FormControl>
          </Grid>
        </>
      );
      break;
    case 'startEndDate':
      element = (
        <>
          {fieldConfig.sidelabel != null ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              className={classes.sideLabelContainer}
            >
              <strong className={classes.sideLabel}>
                <p style={{ marginTop: 15 }}>{fieldConfig.sidelabel}</p>
              </strong>
            </Grid>
          ) : null}
          {/* {fieldConfig.sidelabel !== null? "":<Grid xs={1}></Grid>} */}
          <Grid item xs={12} sm>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                variant="inline"
                label={fieldConfig.label}
                value={fieldConfig.value}
                format="MM/dd/yyyy"
                onChange={handleDateChange}
                onKeyDown={blured}
                name={fieldConfig.name}
              />
            </MuiPickersUtilsProvider>  */}

              <TextField
                id={fieldConfig.id}
                label={
                  <span
                    className={classes.labelClass}
                    style={{ color: '#000' }}
                  >
                    {fieldConfig.label}
                  </span>
                }
                // type="datetime-local"
                type="date"
                defaultValue={fieldConfig.value}
                value={fieldConfig.value}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={handleDateChange}
                onKeyDown={blured}
                name={fieldConfig.name}
                variant="filled"
                InputProps={{
                  inputProps: {
                    min: moment(new Date())
                      .local()
                      .format('YYYY-MM-DD'),
                  },
                  className: classes.input1,
                }}
              />
            </FormControl>
          </Grid>
        </>
      );
      break;
    default:
      element = (
        <Grid item xs={12} sm={12}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                disableToolbar
                variant="inline"
                label={
                  <span className={classes.labelClass}>
                    {fieldConfig.label}
                  </span>
                }
                value={fieldConfig.value}
                format="MM/dd/yyyy"
                onChange={changed}
                onKeyDown={blured}
                name={fieldConfig.name}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        </Grid>
      );
  }

  return <>{element}</>;
}

Form.propTypes = {
  fieldConfig: PropTypes.any.isRequired,
  blured: PropTypes.func,
  changed: PropTypes.func,
};

export default Form;
