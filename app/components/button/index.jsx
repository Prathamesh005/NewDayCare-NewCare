import React from 'react';
import { Button, CircularProgress, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useTheme } from '@material-ui/core/styles';

// <----------------------------- Buttons Start ------------------------------>
export const PrimaryPinkButton = withStyles(theme => ({
  root: {
    padding: '5px 30px',
    background: theme.palette.button.paginated.color,
    color: theme.palette.text.white,
    boxShadow: 'none',
    '&:hover': {
      background: theme.palette.button.paginated.color,
      opacity: 0.9,
      boxShadow: 'none',
    },
  },
  disabled: {
    background: '#D9D9D9',
  },
}))(Button);

export const OutlinedButton = withStyles(theme => ({
  root: {
    paddingLeft: '30px',
    paddingRight: '30px',
    minWidth: '100px',
    border: '1px solid #FF3399',
    color: theme.palette.text.active,
    '&:hover': {
      opacity: 0.9,
    },
  },
  disabled: {
    background: '#ECECEC',
  },
}))(Button);

export const GrayButton = props => {
  const {
    onClick,
    children,
    style = {},
    justifyContent,
    ...otherProps
  } = props;
  return (
    <Button
      onClick={onClick}
      fullWidth={true}
      variant="contained"
      style={{
        background: '#F4F4F4',
        boxShadow: 'none',
        justifyContent: justifyContent || 'center',
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </Button>
  );
};

export const WhiteButton = withStyles(theme => ({
  root: {
    background: '#ffffff',
    color: '#000000',
    boxShadow: '0px 0px 10px #00000029;',
    '&:hover': {
      background: '#ECECEC',
      boxShadow: 'none',
    },
  },
}))(Button);

export const GreyOnHoverWhiteButton = withStyles(theme => ({
  root: {
    background: 'transparent',
    color: '#000000',
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      background: '#ffffff',
      boxShadow: 'none',
    },
  },
}))(Button);
// <----------------------------- Buttons End ------------------------------>

// <----------------------------- Icons Buttons Start------------------------------>
export const SquareIconButton = withStyles(theme => ({
  root: {
    borderRadius: '5px',
    backgroundColor: '#F7F6F4',
    padding: '3px',
    // border: '0.5px solid #E6E6E6',
  },
}))(IconButton);

export const WhiteSquareIconButton = withStyles(theme => ({
  root: {
    borderRadius: '5px',
    background: '#ffffff',
    padding: 7,
    boxShadow: '0px 0px 6px #00000029',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  },
}))(IconButton);

export const WhiteIconButton = withStyles(theme => ({
  root: {
    backgroundColor: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  },
}))(IconButton);

export const GrayIconButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.backgroundColor.extraLight,
    '&:hover': {
      backgroundColor: theme.palette.backgroundColor.extraLight,
    },
  },
}))(IconButton);

export const AddIconButton = props => {
  const { iconProps = {}, onClick, ...etc } = props;
  return (
    <WhiteIconButton
      size="medium"
      onClick={onClick}
      style={{ boxShadow: '0px 0px 3px #00000029' }}
      {...etc}
    >
      <AddIcon fontSize="small" style={{ color: '#FF3399' }} {...iconProps} />
    </WhiteIconButton>
  );
};

export const EditIconButton = props => {
  const { iconProps = {}, onClick, ...etc } = props;
  const { style = {}, ...iconPropsEtc } = iconProps;
  return (
    <WhiteIconButton size="small" onClick={onClick} {...etc}>
      <EditIcon style={{ fontSize: '1rem', ...style }} {...iconPropsEtc} />
    </WhiteIconButton>
  );
};

export const CloseIconButton = props => {
  const { iconProps = {}, onClick, ...etc } = props;

  return (
    <SquareIconButton
      aria-label="close"
      onClick={onClick}
      size="small"
      {...etc}
    >
      <CloseIcon fontSize="small" {...iconProps} />
    </SquareIconButton>
  );
};

export const WhiteCloseIconButton = props => {
  const { iconProps = {}, onClick, ...etc } = props;

  return (
    <WhiteSquareIconButton
      aria-label="close"
      onClick={onClick}
      size="small"
      {...etc}
    >
      <CloseIcon fontSize="small" {...iconProps} />
    </WhiteSquareIconButton>
  );
};

export const EditIconSquareButton = props => {
  const { iconProps = {}, onClick, ...etc } = props;

  return (
    <SquareIconButton
      aria-label="close"
      onClick={onClick}
      size="small"
      {...etc}
    >
      <EditIcon fontSize="small" {...iconProps} />
    </SquareIconButton>
  );
};

export const SquareAddIconButton = props => {
  const { iconProps = {}, ...etc } = props;

  return (
    <SquareIconButton aria-label="add" size="small" {...etc}>
      <AddIcon style={{ color: '#FF5CAD', fontSize: 25 }} {...iconProps} />
    </SquareIconButton>
  );
};
// <----------------------------- Icons Buttons End ------------------------------>

// <----------------------------- Fab (Circle) Buttons Start ------------------------------>
export const PinkCircleButton = withStyles(theme => ({
  root: {
    background: theme.palette.button.paginated.color,
    color: theme.palette.button.primary.color,
    boxShadow: 'none',
    '&:focus': {
      background: theme.palette.button.paginated.color,
    },
    '&:hover': {
      background: theme.palette.button.paginated.color,
    },
    '&:active': {
      background: theme.palette.button.paginated.color,
      boxShadow: 'none',
    },
  },
}))(Fab);

export const WhiteCircleButton = withStyles(theme => ({
  root: {
    background: theme.palette.button.primary.color,
    color: theme.palette.button.paginated.color,
    boxShadow: 'none',
    '&:focus': {
      background: theme.palette.button.primary.color,
    },
    '&:hover': {
      background: theme.palette.button.primary.color,
    },
    '&:active': {
      background: theme.palette.button.primary.color,
      boxShadow: 'none',
    },
  },
}))(Fab);

export const PinkAddCircleButton = props => {
  const { iconProps = {}, onClick, title, style, ...etc } = props;
  const { width, borderRadius, ...etcStyle } = props.style;
  const [buttonHover, setButtonHovered] = React.useState(false);
  return (
    <PinkCircleButton
      aria-label="add"
      size="large"
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: buttonHover && width,
        borderRadius: buttonHover && borderRadius,
        ...etcStyle,
      }}
      {...etc}
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
      onClick={onClick}
    >
      <AddIcon {...iconProps} />
      {buttonHover ? <span>{title}</span> : ''}
    </PinkCircleButton>
  );
};

export const WhiteAddCircleButton = props => {
  const { iconProps = {}, onClick, title, style, ...etc } = props;
  const { width, borderRadius, ...etcStyle } = props.style;
  const [buttonHover, setButtonHovered] = React.useState(false);
  return (
    <WhiteCircleButton
      aria-label="add"
      size="large"
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: buttonHover && width,
        borderRadius: buttonHover && borderRadius,
        ...etcStyle,
      }}
      {...etc}
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
      onClick={onClick}
    >
      {buttonHover ? <span>{title}</span> : ''} <AddIcon {...iconProps} />
    </WhiteCircleButton>
  );
};
// <----------------------------- Fab (Circle) Buttons End ------------------------------>

// <----------------------------- Animation Buttons Start ------------------------------>
export const WhiteAnimationButton = props => {
  const {
    iconWithProps,
    onClick,
    title,
    onHoverEffect,
    normalEffect,
    ...etc
  } = props;
  const [buttonHover, setButtonHovered] = React.useState(false);
  return (
    <GreyOnHoverWhiteButton
      onMouseEnter={() => setButtonHovered(true)}
      onMouseLeave={() => setButtonHovered(false)}
      onClick={onClick}
      className={buttonHover ? onHoverEffect : normalEffect}
      {...etc}
    >
      {iconWithProps} {buttonHover ? title : ''}
    </GreyOnHoverWhiteButton>
  );
};
// <----------------------------- Animation Buttons End ------------------------------>

// NOTE : color bug , emr form submit or create pat
export const SaveActionButton = props => {
  const { children, isLoading, progressProps, ...etc } = props;
  const theme = useTheme();

  return (
    <PrimaryPinkButton {...etc}>
      {children}
      {isLoading && (
        <CircularProgress
          size={24}
          style={{
            color: theme.palette.button.paginated.color,
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
          }}
        />
      )}
    </PrimaryPinkButton>
  );
};
