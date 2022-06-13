import { Avatar, Grid, makeStyles, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AdminImage from '../../../../../../../../../app/images/adminProfile.png';
import {
  EditIconSquareButton,
  SecondaryText,
  SemiBoldText,
  SquareIconButton,
} from '../../../../../../../../components';
import OuterBoxPaper from '../../../../../../../../components/outerBox/OuterBoxPaper';
import VerticalTune from '../../../../../../../../images/assets/tune-vertical.svg';
import { ROUTES_CONSTANTS } from '../../../../../../../app/routeConstants';
import profileImageDefault from '../../../../../../../../images/profile-Image.png';
import { getQueryStringValByKey } from '../../../../../../../../hooks/useQueryParam';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 55,
    height: 55,
  },
  typo: {
    fontSize: '1rem',
  },

  typo1: {
    fontSize: '1rem',
    opacity: 0.8,
    fontWeight: 400,
  },
  header: {
    marginLeft: 15,
    fontSize: '1.1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
    },
  },
}));

const ProfileCard = props => {
  const classes = useStyles();
  const { practitionerDetails, handleModelClick } = props;
  const history = useHistory();
  let practitionerID = getQueryStringValByKey('practitionerID');

  let firstName = '';
  let middleName = '';
  let lastName = '';
  let dateOfBirth = '';
  let genderN = '';
  let aboutN = '';
  let phoneN = '';
  let emailN = '';
  let speciality = '';
  let language = '';
  let qualification = '';
  let experienceYear = '';
  let registrationDetails = '';
  let channelLink = '';
  let signatureText = '';
  let signatureImageN = null;
  let profileImage = null;

  if (practitionerDetails && practitionerDetails) {
    const {
      first,
      middle,
      last,
      birthDate,
      gender,
      about,
      phone,
      email,
      experience,
      registrationNo,
      practitionerRoleInOrganization,
      languages,
      qualifications,
      signatureImage,
      image,
    } = practitionerDetails;

    profileImage = image;
    firstName = first || '';
    middleName = middle || '';
    lastName = last || '';
    dateOfBirth = birthDate || '-';
    genderN = gender || '-';
    aboutN = about || '-';
    phoneN = phone || '-';
    emailN = email || '';
    registrationDetails = registrationNo || '-';

    experienceYear = (experience && experience) || '';
    speciality =
      practitionerRoleInOrganization &&
      practitionerRoleInOrganization[0] &&
      practitionerRoleInOrganization[0].speciality &&
      practitionerRoleInOrganization[0].speciality[0] &&
      practitionerRoleInOrganization[0].speciality[0].display;

    language =
      (languages &&
        languages.length > 0 &&
        _.map(languages, 'display').join(', ')) ||
      '-';

    qualification =
      (qualifications &&
        qualifications[0] &&
        qualifications[0].qualification &&
        qualifications[0].qualification) ||
      '-';

    signatureImageN = signatureImage;
  }

  const LeftContainer = () => {
    return (
      <>
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          src={'data:image/*;base64,' + profileImage}
        />
        <Grid container>
          <Grid item lg={12}>
            <SemiBoldText
              variant="h3"
              className={classes.header}
              component="span"
            >
              {`${firstName} ${middleName} ${lastName}`}
            </SemiBoldText>
          </Grid>

          <Grid item lg={12}>
            <SecondaryText variant="h3" className={classes.header}>
              {speciality}
            </SecondaryText>
          </Grid>
        </Grid>
      </>
    );
  };

  const RightContainer = () => {
    return (
      <>
        <SquareIconButton
          style={{ padding: 4, margin: 4 }}
          onClick={() => {
            history.push(ROUTES_CONSTANTS.ADMINISTRATION_PROFILE_CONFIGURE);
          }}
        >
          <img src={VerticalTune} height="19px" width="19px" />
        </SquareIconButton>

        <SquareIconButton
          onClick={handleModelClick}
          style={{ padding: 4, margin: 4 }}
        >
          <DeleteIcon style={{ fontSize: '1.2rem' }} />
        </SquareIconButton>

        <EditIconSquareButton
          style={{ margin: 4 }}
          onClick={() => {
            history.push({
              pathname: ROUTES_CONSTANTS.ADMINISTRATION_DOCTOR_EDIT,
              state: {
                practitionerID: practitionerID,
              },
            });
          }}
        />
      </>
    );
  };

  const BottomComponent = () => {
    return (
      <>
        <Grid container spacing={2} style={{ marginBottom: 40 }}>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h3" component="span" className={classes.typo}>
              {' About me'}
            </Typography>
            <SecondaryText varient="h3" className={classes.typo1}>
              {aboutN}
            </SecondaryText>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h3" component="span" className={classes.typo}>
              {'Language Known'}
            </Typography>
            <SecondaryText varient="h3" className={classes.typo1}>
              {language}
            </SecondaryText>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h3" component="span" className={classes.typo}>
              {'Qualification'}
            </Typography>
            <SecondaryText varient="h3" className={classes.typo1}>
              {qualification}
            </SecondaryText>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h3" component="span" className={classes.typo}>
              {'Experience'}
            </Typography>
            <SecondaryText varient="h3" className={classes.typo1}>
              {experienceYear ? `${experienceYear} Years` : '-'}
            </SecondaryText>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h3" component="span" className={classes.typo}>
              {'RegistrationDetails'}
            </Typography>
            <SecondaryText varient="h3" className={classes.typo1}>
              {registrationDetails}
            </SecondaryText>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h3" component="span" className={classes.typo}>
              {'Contact Details'}
            </Typography>
            <SecondaryText varient="h3" className={classes.typo1}>
              {`+91 ${phoneN}`}
            </SecondaryText>
            <SecondaryText varient="h3" className={classes.typo1}>
              {emailN}
            </SecondaryText>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h3" component="span">
              {'Signature'}
            </Typography>
            <SecondaryText varient="h3" className={classes.typo1}>
              {signatureImageN ? (
                <img
                  src={'data:image/*;base64,' + signatureImageN}
                  alt="Not Found"
                  height="100px"
                  width="175px"
                  style={{ borderRadius: 5 }}
                />
              ) : (
                '-'
              )}
            </SecondaryText>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <OuterBoxPaper
        hideCloseIcon={true}
        leftContainer={LeftContainer()}
        rightContainer={RightContainer()}
        bottomComponent={BottomComponent()}
        bottomHeight={'71vh'}
      />
    </>
  );
};

export default ProfileCard;
