import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import parseWithOptions from 'date-fns/esm/fp/parseWithOptions/index.js';

const CheckBox = ({ field, form, label, ...rest }) => {
    const { name, value: formikValue } = field;
    const { setFieldValue } = form;
  
    const handleChange = event => {
      const values = formikValue || [];
      const index = values.indexOf(rest.value);
      if (index === -1) {
        values.push(rest.value);
      } else {
        values.splice(index, 1);
      }
      setFieldValue(name, values);
    };
  
    return (
      <label>
        <input
          type="checkbox"
          onChange={handleChange}
          checked={formikValue.indexOf(rest.value) !== -1}
          {...rest}
        />
        <span>{label}</span>
      </label>
    );
  };

export default CheckBox
