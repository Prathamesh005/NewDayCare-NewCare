import React, { Fragment } from 'react';
import { Box } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {
  SquareIconButton,
  BoldText,
  SemiBoldText,
  SecondaryText,
  WhitePaper,
} from '../../../../../../../../components';
import PersonpinIcon from '../../../../../../../../images/assets/PersonPinIcon.svg';

const MyChannel = ({ link }) => {
  return (
    <Fragment>
      <a
        href={link}
        target="_blank"
        style={{
          color: '#373737',
          textDecoration: 'none',
          marginBottom: 15,
        }}
      >
        <WhitePaper
          style={{
            display: 'flex',
            padding: '20px',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <Box flexGrow={1} display="flex" flexDirection={'row'}>
            <img
              src={PersonpinIcon}
              style={{ marginTop: 5, height: 18, width: 18 }}
            />

            <Box ml={2}>
              <SemiBoldText variant="h3" component="span">
                {' My Channel'}
              </SemiBoldText>

              <SecondaryText variant="h4"> {link || '-'}</SecondaryText>
            </Box>
          </Box>
          <Box>
            <OpenInNewIcon
              fontSize="small"
              style={{ fontSize: '18px', opacity: 0.6 }}
            />
          </Box>
        </WhitePaper>
      </a>
    </Fragment>
  );
};

export default MyChannel;
