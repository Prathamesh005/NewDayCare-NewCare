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
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';


function Form(props) {
  const { fieldConfig, blured, changed, handleDateChange } = props;
  // console.log('practionerFilterData',practionerFilterData)
  let element = null;
  const classes = ['field'];
 
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
              InputLabelProps={{
                shrink: true,
              }}
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
              <DatePicker
                disableToolbar
                variant="inline"
                label={fieldConfig.label}
                value={fieldConfig.value}
                format="MM/dd/yyyy"
                onChange={handleDateChange}
                onKeyDown={blured}
                name={fieldConfig.name}
              />
            </MuiPickersUtilsProvider> */}

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

    case 'search':
        let data = fieldConfig.options;
        // console.log('fieldConfig.options',JSON.parse(data));
        //console.log('data final',data);
        element = (
        <Grid item xs={12} sm={fieldConfig.size}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
          >
            <Autocomplete
              id={fieldConfig.id}
              name={fieldConfig.name}
              options={data}
              getOptionLabel={fieldConfig.getOptionLabel}
              value={fieldConfig.value}
              // inputValue={fieldConfig.inputValue}
              onChange={fieldConfig.change}
              // onInputChange={fieldConfig.inputchange}
              disabled={fieldConfig.disabled==true?fieldConfig.disabled:false}
              renderInput={params => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
              multiple
              id={fieldConfig.id}
              options={fieldConfig.options ? fieldConfig.options : []}
              getOptionLabel={fieldConfig.getOptionLabel ? fieldConfig.getOptionLabel : 'ABC'}
              value={fieldConfig.value}
              filterSelectedOptions
              onChange={fieldConfig.change}
              renderInput={(params) => (
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
