import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';
import HeaderContext from '../../../../../utils/contextCreate';

const useStyles = makeStyles(theme => ({
  contactDetails: {
    border: `1px solid ${theme.palette.divider}`,
    textAlign: 'left',
    opacity: '0.8',
    backgroundColor: '#F4F4F4',
    paddingLeft: '0.8rem',
    paddingRight: '0.8rem',
  },
  orgImg: {
    objectFit: 'contain',
  },
  vip: {
    marginBottom: 0,
    '& .MuiCheckbox-colorSecondary.Mui-checked': {
      color: theme.palette.button.paginated.color,
    },
    backgroundColor: '#f4f4f4',
    borderRadius: '3px',
    paddingRight: '7px',
    border: `1px solid ${theme.palette.divider}`,
    zIndex: '1',
    marginRight: '-20px',
    marginTop: '-20px',
  },
  headerCheck: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    position: 'absolute',
    right: 50,
    top: 142,
  },
}));
function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { headerToggle } = props;
  const headerAction = React.useContext(HeaderContext);

  const handleCheckboxChange = (e, isChecked, value) => {
    headerAction.setHeaderToggle(isChecked);
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={12} className={classes.headerCheck}>
          <FormControlLabel
            className={classes.vip}
            control={
              <Checkbox
                checked={headerToggle}
                onChange={handleCheckboxChange}
                name="checkedA"
                icon={<CheckBoxOutlineBlankOutlinedIcon />}
                checkedIcon={<CheckBoxOutlinedIcon />}
                size="small"
                style={{
                  transform: 'scale(0.8)',
                  padding: '3px',
                }}
              />
            }
            label={
              <Typography
                variant="h5"
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  color: '#727272',
                }}
              >
                {'Print Without Header And Footer'}
              </Typography>
            }
          />
        </Grid>
        {!headerToggle && (
          <>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <img
                    height="100"
                    width="100"
                    src={
                      'data:image/*;base64,' +
                      props.userDetailsForHeader.organizationLogo.split('|')[1]
                    }
                    alt="icon"
                    className={classes.orgImg}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {props.userDetailsForHeader.userName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    style={{
                      fontWeight: 500,
                      color: '#373737',
                      lineHeight: 'inherit',
                    }}
                  >
                    {props.userDetailsForHeader.qualification
                      ? props.userDetailsForHeader.qualification.join(', ')
                      : ''}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    style={{ fontWeight: 600, color: '#373737' }}
                  >
                    {props.userDetailsForHeader.organization}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} className={classes.contactDetails}>
                <Grid item xs={4}>
                  <Typography
                    variant={(mdDown && 'h4') || 'body2'}
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    Mob: +91 {props.userDetailsForHeader.mobileNumber}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant={(mdDown && 'h4') || 'body2'}
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    Email: {props.userDetailsForHeader.email}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    variant={(mdDown && 'h4') || 'body2'}
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    Website: {props.userDetailsForHeader.website}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        {/* <Grid item xs={12} style={{textAlign:"center", marginTop: "10px", marginBottom:"10px"}}>
                    <Typography variant="h2" style={{fontWeight:500, color: "#373737"}}>Appointment Summary</Typography>
                </Grid> */}
      </Grid>
    </>
  );
}

export default Header;
