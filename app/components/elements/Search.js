import React from 'react';
import { useTheme } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import CustomSVG from '../../icons/CustomSVG';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex'
//   }
// }));

function Search({
  id,
  placeholder,
  searchTerm,
  setSearchTerm,
  showIcon,
  styleName
}) {
  // const classes = useStyles();
  const theme = useTheme();

  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styleName}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <TextField
          id={id}
          value={searchTerm}
          onChange={handleChange}
          placeholder={placeholder}
          type="search"
          variant="outlined"
          InputProps={
            showIcon && {
              startAdornment: (
                <InputAdornment position="start">
                  <CustomSVG
                    fill={theme.palette.text.extraLight}
                    name="deviceSearch"
                    height="15"
                    width="15"
                  />
                </InputAdornment>
              )
            }
          }
        />
      </form>
    </div>
  );
}

Search.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  showIcon: PropTypes.bool,
  styleName: PropTypes.string
};
Search.defaultProps = {
  showIcon: false,
  styleName: 'searchIcon'
};
export default Search;
