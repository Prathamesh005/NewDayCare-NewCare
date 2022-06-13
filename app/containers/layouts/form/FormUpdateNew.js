import React from 'react';
import moment from 'moment';
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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles(theme => ({
  sideLabel:{
    fontSize:'18px',
    color:'#373737'
  },
  labelClass:{
    color:"#000",
    fontSize:'18px',
    fontWeight:'normal',
    opacity:'0.7'
  },
  sideLabel:{
    fontSize:'18px',
    color:'#373737'
  },
  input1:{
    background: "#F4F4F4",
    borderBottom:"1px solid transparent !important",
    outline: 'none !important',
    '&:focus': {
      background: "#F4F4F4 !important",
    },
    '&:active': {
      background: "#F4F4F4 !important",
    },
    '&:hover': {
      background: "#F4F4F4 !important",
    },
    "&&&:before": {
      borderBottom: "none"
    },
    "&&:after": {
      borderBottom: "none"
    },
    disableUnderline: true ,
  }
}));

function Form(props) {
  const classes = useStyles();
  const { fieldConfig, blured, changed, handleDateChange , avaliableOT} = props;
  // console.log('practionerFilterData',practionerFilterData)
  let element = null;

 
  // console.log('field is',props.data);
  switch (fieldConfig.type) {
    case 'text':
      element = (
        <>
        <Grid item xs={12} sm={4}>
        <strong className={classes.sideLabel}>{fieldConfig.sidelabel}</strong>
         </Grid>

        <Grid item xs={12} sm={7}>
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
              fieldConfig.touched && !fieldConfig.valid
                ? fieldConfig.errorMessage
                : ''
            }

            InputProps={{
              classes: {
                notchedOutline: classes.textField
              },
              className:classes.input1
            }}
          />
        </Grid>
        </>
      );
      break;
      case 'input':
        element = (
          <>
          <Grid item xs={12} sm={4}>
          <strong className={classes.sideLabel}>{fieldConfig.sidelabel}</strong>
          </Grid>
          <Grid item xs={12} sm={8}>
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
                fieldConfig.touched && !fieldConfig.valid
                  ? fieldConfig.errorMessage
                  : ''
              }
              InputLabelProps={{
                shrink: true,
              }}

              InputProps={{
                classes: {
                  notchedOutline: classes.textField
                },
                className:classes.input1
              }}
              disabled={fieldConfig.disabled ? fieldConfig.disabled : false}
            />
          </Grid>
          </>
        );
        break;
    case 'textarea':
      element = (
        <>
        <Grid item xs={12} sm={4}>
        <strong className={classes.sideLabel}><p style={{marginTop:15}}>{fieldConfig.sidelabel}</p></strong>
        </Grid>
        <Grid item xs={12} sm={7}>
          <TextField
            autoComplete={fieldConfig.name}
            name={fieldConfig.name}
            value={fieldConfig.value}
            multiline
            variant="filled"
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
            className={classes.textField}
            InputProps={{
              classes: {
                notchedOutline: classes.textField
              },
                className:classes.input1
            }}
            disabled={fieldConfig.disabled==true?fieldConfig.disabled:false}

          />
         </Grid>
        </>
      );
      break;
    case 'email':
      element = (
        <>
        <Grid item xs={12} sm={4}>
        <strong className={classes.sideLabel}>{fieldConfig.sidelabel}</strong>
        </Grid>
        <Grid item xs={12} sm={7}>
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

            InputProps={{
              classes: {
                notchedOutline: classes.textField
              },
              className:classes.input1
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
        <>
        <Grid item xs={12} sm={4}>
        <strong className={classes.sideLabel}><p style={{marginTop:15}}>{fieldConfig.sidelabel}</p></strong>
        </Grid>
        <Grid item xs={12} sm={fieldConfig.size}>
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
        </>
      );
      break;

    case 'radio':
      element = (
        <>
        <Grid item xs={12} sm={4}>
        <strong className={classes.sideLabel}><p style={{marginTop:15}}>{fieldConfig.sidelabel}</p></strong>
        </Grid>
        <Grid item xs={12} sm={7}>
          <RadioGroup
            row
            aria-label="gender"
            name={fieldConfig.name}
            onChange={changed}
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
        <Grid item xs={12} sm={4}>
        <strong className={classes.sideLabel}><p style={{marginTop:15}}>{fieldConfig.sidelabel}</p></strong>
        </Grid>
        <Grid item xs={12} sm={7}>
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
              InputProps={{
                classes: {
                  notchedOutline: classes.textField
                },
                className:classes.input1
              }}
            />
          </FormControl>
        </Grid>
        </>
      );
      break;

    case 'KeyboardDatePicker':
      element = (
        <>
          {fieldConfig.sidelabel!=null?<Grid item xs={12} sm={4}>
          <strong className={classes.sideLabel}><p style={{marginTop:15}}>{fieldConfig.sidelabel}</p></strong>
          </Grid>:null}
          <Grid item xs={12} sm={fieldConfig.sidelabel!=null?fieldConfig.size:12}>
            <FormControl
              fullWidth
              variant="outlined"
              className={classes.formControl}
            >
              <TextField
                id={fieldConfig.id}
                label={<span className={classes.labelClass}>{fieldConfig.label}</span>}
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
                InputProps={{className:classes.input1 }}
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

    case 'search':
        let data = fieldConfig.options;
        // console.log('fieldConfig.options',JSON.parse(data));
        //console.log('data final',data);
        element = (
          <>
          {fieldConfig.sidelabel!=null&&fieldConfig.sidelabel!=''?<Grid item xs={12} sm={4}>
            <strong className={classes.sideLabel}><p style={{marginTop:15}}>{fieldConfig.sidelabel}</p></strong>
            </Grid>:null}
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
                  InputProps={{ ...params.InputProps, className: classes.input1}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={<span className={classes.labelClass}>{fieldConfig.label}</span>}
                  variant={fieldConfig.sidelabel!=null?'filled':'outlined'}
                />
              )}
            />
          </FormControl>
        </Grid>
        {fieldConfig.name=='OT'?<Grid item xs={12} sm={4}>
         <div><strong>Avaliable OTs</strong></div>
         <div style={{marginTop:'5'}}>{avaliableOT&&avaliableOT!=null?avaliableOT.map(c=><div>{c.location.name}</div>):'No OTS Are Avaliable'}</div>
         </Grid>:null}
          </>
      );
      break;
    case 'multiplesearch':
      //console.log('data multisearch', fieldConfig.options);
      element = (
        <>
        {fieldConfig.sidelabel!=null&&fieldConfig.sidelabel!=''?<Grid item xs={12} sm={4}>
          <strong className={classes.sideLabel}><p style={{marginTop:15}}>{fieldConfig.sidelabel}</p></strong>
          </Grid>:null}
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
                // <TextField
                // {...params}
                // InputProps={{ ...params.InputProps, className: classes.input1}}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                // label={<span className={classes.labelClass}>{fieldConfig.label}</span>}
                // variant='filled'
                // //{fieldConfig.sidelabel!=null?'filled':'outlined'}
                // />
                <TextField
                {...params}
                label={<span className={classes.labelClass}>{fieldConfig.label}</span>}
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
