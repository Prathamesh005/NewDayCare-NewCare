import { Avatar, Box } from '@material-ui/core';
import React from 'react';
import { BoldText, BulletText, CloseIconButton, WhiteCard } from '../index';
import { UserHeaderSkeleton } from '../skeleton';

export function UserInfoHeader(props) {
  const {
    handleClose,
    imageUrl,
    userName = '',
    rightContainer,
    userInfoList,
    hideCloseIcon,
    loading = true,
  } = props;

  return (
    <WhiteCard>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
      >
        {loading ? (
          <UserHeaderSkeleton />
        ) : (
          <>
            {/* left */}
            <Box display="flex" pl={1}>
              <Avatar size="small" src={'data:image/*;base64,' + imageUrl} />
              <Box display="flex" alignItems="center" pl={2} flexWrap="wrap">
                {/* userName */}
                {userName && <BoldText variant="h3">{userName}</BoldText>}
                {/* info */}
                {userInfoList.length > 0 &&
                  userInfoList.map((value, index) => (
                    <Box key={index}>
                      <BulletText>{value}</BulletText>
                    </Box>
                  ))}
              </Box>
            </Box>

            {/* right */}
            <Box display="flex" alignItems="center">
              <Box display="flex">{rightContainer && rightContainer()}</Box>
              {!hideCloseIcon && (
                <Box pl={3}>
                  <CloseIconButton onClick={handleClose} />
                </Box>
              )}
            </Box>
          </>
        )}
      </Box>
    </WhiteCard>
  );
}
