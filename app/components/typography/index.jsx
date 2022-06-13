import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export function SectionTitle(props) {
  const { title, subTitle } = props;
  return (
    <Box width={1}>
      {title && (
        <Typography variant="h3" style={{ fontWeight: 500 }}>
          {title}
        </Typography>
      )}
      {subTitle && (
        <Box width={{ xs: 1, md: '90%' }}>
          <Typography variant="h4" color="primary">
            {subTitle}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export const SemiBoldText = withStyles(theme => ({
  root: {
    fontWeight: 500,
  },
}))(Typography);

export const BoldText = withStyles(theme => ({
  root: {
    fontWeight: 600,
  },
}))(Typography);

export const SecondaryText = withStyles(theme => ({
  root: {
    opacity: 0.6,
  },
}))(Typography);

export const PinkText = props => {
  return (
    <SemiBoldText
      style={{
        color: ' #ff3399',
        fontSize: '0.98rem',
        ...props.style,
      }}
    >
      {props.children}
    </SemiBoldText>
  );
};

export const LabelValueContainer = props => {
  const { label, value, labelProps, valueProps } = props;
  return (
    <Box display="flex" p={3}>
      {label && (
        <Typography variant="h4" {...labelProps}>
          {label}
        </Typography>
      )}
      {value && (
        <Typography
          variant="h4"
          style={{ fontWeight: 500, marginLeft: '10px' }}
          {...valueProps}
        >
          {value}
        </Typography>
      )}
    </Box>
  );
};

export const BulletText = props => {
  const { children, imgProps, color, ...etc } = props;
  return (
    <Box display="flex" alignItems="center">
      <FiberManualRecordIcon
        style={{
          width: 10,
          margin: '0px 10px',
          marginLeft: '15px',
          color: color ? color : 'rgba(0, 0, 0, 0.6)',
        }}
      />
      <Typography
        variant="h4"
        style={{
          fontWeight: 500,
          color: color ? color : 'rgba(0, 0, 0, 0.6)',
        }}
        {...etc}
      >
        {children}
      </Typography>
    </Box>
  );
};

export const InputLabelWrapper = props => {
  const { label, children, labelProps = {}, ...others } = props;
  const { style, ...labelEtc } = labelProps;

  return (
    <Box display="flex" alignItems="center" {...others}>
      {label && (
        <Typography
          variant="body2"
          style={{
            color: '#444444',
            minWidth: 'fit-content',
            fontWeight: 400,
            marginRight: '10px',
            ...style,
          }}
          {...labelEtc}
        >
          {label}
        </Typography>
      )}
      {/* children */}
      {children}
    </Box>
  );
};

export const PageTitleText = props => {
  return (
    <SemiBoldText
      style={{
        fontSize: '2rem',
      }}
    >
      {props.children}
    </SemiBoldText>
  );
};
