import { Box } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import cancelImage from '../../images/delete-empty-outline.svg';
import { OutlinedButton, SaveActionButton } from '../button';
import { PinkText, SemiBoldText } from '../typography';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
  },
  title: {
    color: '#FF3399',
    fontSize: '18px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(4),
    top: theme.spacing(4),
    background: '#F4F4F4 0% 0% no-repeat padding-box',
    borderRadius: 5,
    padding: 5,
  },
}));

export default function CancleDialog(props) {
  const {
    open,
    handleClick,
    isLoading,
    handleDelete,
    disabled,
    image = cancelImage,
    imageText = 'Confirm Delete',
    deletedText = '',
    saveText = 'Yes, Delete Now',
    cancleText = 'No, Keep it',
  } = props;
  const classes = useStyles();

  return (
    <Dialog
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      open={open}
      onClose={handleClick}
      fullWidth
      maxWidth={'xs'}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        id="form-dialog-title"
        style={{ boxShadow: '0px 1px 4px #00000029' }}
      >
        <Box textAlign="center">
          <Box py={3}>
            <img src={image} alt="Not Found!" height="45px" width="45px" />
          </Box>
          <Box pb={2}>
            <PinkText style={{ fontSize: '1rem', fontWeight: 'bold' }}>
              {imageText && imageText}
            </PinkText>
          </Box>

          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={handleClick}
          >
            <CloseIcon style={{ fontSize: 25 }} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent style={{ background: '#F0F0F0', padding: 0 }}>
        <Box px={11} py={5}>
          <Box pb={5}>
            <SemiBoldText variant="h3">
              Are You Sure You Want To Delete {deletedText} ?
            </SemiBoldText>
          </Box>

          <Box pb={4} display="flex" justifyContent={'space-between'}>
            <OutlinedButton
              variant="outlined"
              onClick={handleClick}
              style={{
                padding: 0,
                minWidth: '155px',
                fontSize: '0.9rem',
              }}
            >
              {cancleText}
            </OutlinedButton>

            <SaveActionButton
              isLoading={isLoading}
              disabled={disabled}
              onClick={handleDelete}
              style={{
                padding: 0,
                minWidth: '155px',
                fontSize: '0.9rem',
              }}
            >
              {saveText}
            </SaveActionButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
