import React from 'react';
import TextField from '@material-ui/core/TextField';
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

function Form(props) {
  const {
    fieldConfig,
    blured,
    changed,
    handleDateChange,
    onSpecialityChange,
    practionerFilterData,
  } = props;
  // console.log('practionerFilterData',practionerFilterData)
  let element = null;
  const classes = ['field'];
  const specialityData = [
    {
      code: '408467006',
      display: 'Adult mental illness',
      first: 'Ashish',
    },
    {
      code: '394577000',
      display: 'Anesthetics',
      first: 'Rosanna866',
    },
    {
      code: '394578005',
      display: 'Audiological medicine',
      first: 'Winona266',
    },
    {
      code: '421661004',
      display: 'Blood banking and transfusion medicine',
      first: 'Miguelina323',
    },
    {
      code: '408462000',
      display: 'Burns care',
      first: 'Ulysses632',
    },
  ];

  // console.log('field is',props.data);
  switch (fieldConfig.type) {
    case 'text':
      element = (
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete={fieldConfig.name}
            name={fieldConfig.name}
            value={fieldConfig.value}
            variant="outlined"
            fullWidth
            label={fieldConfig.label}
            placeholder={fieldConfig.placeholder}
            autoFocus
            onChange={changed}
            onKeyDown={blured}
            className={classes.join(' ')}
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
            disabled={fieldConfig.disabled ? fieldConfig.disabled : false}
          />
        </Grid>
      );
      break;
    case 'input':
      element = (
        <Grid item xs={12} sm={12}>
          <TextField
            autoComplete={fieldConfig.name}
            name={fieldConfig.name}
            value={fieldConfig.value}
            variant="outlined"
            fullWidth
            label={fieldConfig.label}
            placeholder={fieldConfig.placeholder}
            autoFocus
            onChange={changed}
            onKeyDown={blured}
            className={classes.join(' ')}
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
            disabled={fieldConfig.disabled ? fieldConfig.disabled : false}
          />
        </Grid>
      );
      break;
    case 'textarea':
      element = (
        <Grid item xs={12} sm={12}>
          <TextField
            autoComplete={fieldConfig.name}
            name={fieldConfig.name}
            value={fieldConfig.value}
            multiline
            variant="outlined"
            fullWidth
            rows="4"
            label={fieldConfig.label}
            placeholder={fieldConfig.placeholder}
            onChange={changed}
            onKeyDown={blured}
            error={
              fieldConfig.touched && !fieldConfig.valid
                ? fieldConfig.errorMessage
                : ''
            }
            helperText={
              fieldConfig.touched == true && fieldConfig.valid == false
                ? fieldConfig.errorMessage
                : ''
            }
          />
        </Grid>
      );
      break;
    case 'email':
      element = (
        <Grid item xs={12} sm={12}>
          <TextField
            autoComplete={fieldConfig.name}
            name={fieldConfig.name}
            value={fieldConfig.value}
            variant="outlined"
            fullWidth
            label={fieldConfig.label}
            placeholder={fieldConfig.placeholder}
            onChange={changed}
            onKeyDown={blured}
            error={
              fieldConfig.touched && !fieldConfig.valid
                ? fieldConfig.errorMessage
                : ''
            }
            helperText={
              fieldConfig.touched == true && fieldConfig.valid == false
                ? fieldConfig.errorMessage
                : ''
            }
          />
        </Grid>
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
              label={fieldConfig.label}
              fullWidth
              name={fieldConfig.name}
              onChange={changed}
              onKeyDown={blured}
              placeholder={fieldConfig.placeholder}
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
        <Grid item xs={12} sm={12}>
          <FormLabel component="legend">{fieldConfig.label}</FormLabel>
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
                label={option.displayValue}
                labelPlacement="end"
              />
            ))}
          </FormGroup>
        </Grid>
      );
      break;

    case 'radio':
      element = (
        <Grid item xs={12} sm={12}>
          <RadioGroup
            row
            aria-label="gender"
            name={fieldConfig.name}
            onChange={changed}
            onKeyDown={blured}
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
      );
      break;

    case 'date':
      element = (
        <Grid item xs={12} sm={12}>
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
              label={fieldConfig.label}
              type="datetime-local"
              defaultValue={fieldConfig.value}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleDateChange}
              onKeyDown={blured}
              name={fieldConfig.name}
            />
          </FormControl>
        </Grid>
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
              label={fieldConfig.label}
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
      console.log('data final', data);
      element = (
        <Grid item xs={12} sm={fieldConfig.size}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <Autocomplete
              id="search-patient"
              options={data}
              getOptionLabel={fieldConfig.getOptionLabel}
              onChange={fieldConfig.change}
              renderInput={params => (
                <TextField
                  {...params}
                  label={fieldConfig.label}
                  variant="outlined"
                />
              )}
            />
          </FormControl>
        </Grid>
      );
      break;

    case 'multiplesearch':
      console.log('data multisearch', fieldConfig.options);
      element = (
        <Grid item xs={12} sm={fieldConfig.size}>
          <FormControl
            fullWidth
            variant="outlined"
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
                fieldConfig.getOptionLabel ? fieldConfig.getOptionLabel : 'ABC'
              }
              onChange={fieldConfig.change}
              renderInput={params => (
                <TextField
                  {...params}
                  label={fieldConfig.label}
                  variant="outlined"
                />
              )}
            />
          </FormControl>
        </Grid>
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
                label={fieldConfig.label}
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
