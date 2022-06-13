import React from 'react';
import PropTypes from 'prop-types';

const logoStyles = {
  height: '100%',
  width: '100%',
};
const logoSmall = {
  maxHeight: '50px',
  maxWidth: '50px',
};

const logoMedium = {
  maxHeight: '50px',
  maxWidth: '50px',
  zIndex: '1',
};

const logoLarge = {
  maxHeight: '161px',
  maxWidth: '161px',
  textAlign: 'left',

};

/**
 * Logo will render image as a logo
 */

function Logo({ sm, md, lg, path }) {
  if (sm) {
    return (
      <img src={path} alt="logo" style={{ ...logoStyles, ...logoSmall }} />
    );
  }
  if (md) {
    return (
      <img src={path} alt="logo" style={{ ...logoStyles, ...logoMedium }} />
    );
  }
  if (lg) {
    return (
      <img src={path} alt="logo" style={{ ...logoStyles, ...logoLarge }} />
    );
  }
  return <img src={path} alt="logo" style={logoStyles} />;
}

Logo.propTypes = {
  /** Logo image path */
  path: PropTypes.string.isRequired,
  /** Add this attribute to show a smaller logo */
  sm: PropTypes.bool,
  /** Add this attribute to show a medium logo */
  md: PropTypes.bool,
  /** Add this attribute to show a large logo */
  lg: PropTypes.bool,
};

Logo.defaultProps = {
  sm: false,
  md: false,
  lg: false,
};

export default Logo;
