import React from 'react';
import PropTypes from 'prop-types';
import Path from './Path';

/**
 * CustomSVG will render SVG using provided props.
 */

function CustomSVG(props) {
  const { name, fill, stroke, children, ...rest } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...rest}>
      {children || <Path name={name} fill={fill} stroke={stroke} />}
    </svg>
  );
}

CustomSVG.propTypes = {
  /** Type of SVG to be loaded */
  name: PropTypes.string.isRequired,
  /** SVG Path */
  children: PropTypes.node,
  /** SVG width */
  width: PropTypes.string,
  /** SVG height */
  height: PropTypes.string,
  /** SVG viewBox */
  viewBox: PropTypes.string,
  /** SVG Fill */
  fill: PropTypes.string,
  /** SVG Stroke */
  stroke: PropTypes.string,
  /** SVG click event */
  onClick: PropTypes.func,
  /** SVG class  */
  className: PropTypes.string,
};

CustomSVG.defaultProps = {
  children: undefined,
  onClick: undefined,
  className: '',
  width: '24',
  height: '24',
  viewBox: '0 0 100 100',
  fill: '#72C18C',
  stroke: '#d6d6d6',
};

export default CustomSVG;
