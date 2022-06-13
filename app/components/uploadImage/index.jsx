import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { GreyOnHoverWhiteButton, WhiteButton } from '../button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import uploadIcon from '../../images/assets/upload.svg';
import { Box } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(theme => ({}));
export default function UploadImage(props) {
  const {
    selectedFile,
    handleCapture,
    removeCapture,
    id = uuidv4(),
    vertical = false,
    addText = 'Upload Photo',
    changeText = 'Change Photo',
    removeText = 'Remove Photo',
  } = props;
  const classes = useStyles();

  return (
    <>
      <input
        accept="image/*"
        id={id} //required
        multiple
        type="file"
        onChange={handleCapture}
        style={{ display: 'none' }}
      />

      <label htmlFor={id} style={{ marginBottom: 0 }}>
        <WhiteButton
          variant="contained"
          color="primary"
          component="span"
          startIcon={
            <img src={uploadIcon} alt="Not Found" height="15px" width="20px" />
          }
        >
          {selectedFile === null ? addText : changeText}
        </WhiteButton>
      </label>

      {selectedFile && (
        <GreyOnHoverWhiteButton
          variant="contained"
          color="primary"
          onClick={removeCapture}
          style={{
            marginLeft: vertical ? 0 : 15,
            background: '#ECECEC',
            '&:hover': {
              background: '#ECECEC',
              boxShadow: 'none',
            },
          }}
          startIcon={<DeleteOutlineIcon />}
        >
          {removeText}
        </GreyOnHoverWhiteButton>
      )}
    </>
  );
}
