import { Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import upload from 'images/assets/cloud-upload.svg';
import spreadsheetImage from 'images/assets/google-spreadsheet.svg';
import greenCheck from 'images/assets/green-tick-circular.svg';
import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import XLSX from 'xlsx';
import { PrimaryPinkButton, WhiteCloseIconButton } from '../button';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#F4F4F4',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const useStyles = makeStyles(theme => ({
  mainContainer: {
    padding: '10px',
    border: '2px dashed #c0c0c0',
    borderRadius: '5px',
  },
  text: { textAlign: 'center', margin: '1rem 0rem' },
  bottomText: {
    width: '10rem',
    height: '4.5rem',
    borderRadius: '0.5rem',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileSizeText: { fontSize: '0.8rem', marginTop: '1rem' },
  cancelButton: { textAlign: 'right', height: '5%', width: '100%' },
}));
export default function DragAndDrop(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [sheetToJson, setSheetToJson] = useState(false);
  const [jsonViewData, setJsonViewData] = useState([]);
  const [fileDetails, setFileDetails] = useState();

  const onDrop = useCallback(acceptedFiles => {
    setFileDetails(acceptedFiles[0]);
    setSheetToJson(true);
    handleSetProgress(acceptedFiles);
  }, []);
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx',
      ],
    },
    multiple: false,
    maxFiles: 1,
    maxSize: 3000000,
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );
  const acceptedFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path} style={{ color: theme.palette.error.main }}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li
            key={e.code}
            style={{ fontSize: '0.8rem', color: theme.palette.error.main }}
          >
            <em>{e.message}</em>
          </li>
        ))}
      </ul>
    </li>
  ));
  const convertBytesToMB = (size, decimals = 2) => {
    let sizeInBytes = parseInt(size);
    if (sizeInBytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));
    return (
      parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    );
  };

  // React.useEffect(() => {
  //     if(progress {const timer = setInterval(() => {
  //         setProgress(oldProgress => {
  //             if (oldProgress === 100) {
  //                 return 0
  //             }
  //             return oldProgress + 10
  //         });
  //     }, 500);

  //     return () => {
  //         clearInterval(timer);
  //     };}
  // }, [progress])

  const handleSetProgress = acceptedFiles => {
    // acceptedFiles.forEach(file => {
    //   const reader = new FileReader();
    //   reader.onabort = () => console.log('file reading was aborted');
    //   reader.onerror = () => console.log('file reading has failed');
    //   reader.onload = () => {
    //     // Do whatever you want with the file contents
    //     const binaryStr = new Uint8Array(reader.result);
    //     let workbook = XLSX.read(binaryStr, { type: 'array' });
    //     let worksheet = workbook.Sheets[workbook.SheetNames[0]];
    //     if (worksheet) {
    //       let jsonData = XLSX.utils.sheet_to_json(worksheet);
    //       setJsonViewData(jsonData);
    //     }
    //   };
    //   reader.readAsArrayBuffer(file);
    // });
  };
  // console.log("jsonViewData", jsonViewData)
  // console.log("fileDetails", fileDetails)
  return (
    <>
      <div className={classes.mainContainer}>
        {!sheetToJson && (
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <img
              src={upload}
              alt="upload"
              height="50rem"
              width="50rem"
              style={{ marginTop: '3rem' }}
            />
            <Typography variant={'h3'} className={classes.text}>
              <span style={{ color: '#000000' }}>
                Drag 'n' drop your files here
              </span>{' '}
              <br />
              File Supported .xlsx
            </Typography>
            <PrimaryPinkButton>Browse</PrimaryPinkButton>
            <p className={classes.fileSizeText}>Maximum size : 5 MB</p>
          </div>
        )}
        {sheetToJson && (
          <div {...getRootProps({ style })} onClick={e => e.stopPropagation()}>
            <div className={classes.cancelButton}>
              <WhiteCloseIconButton
                onClick={e => {
                  setSheetToJson(false);
                }}
              />
            </div>
            <img
              src={spreadsheetImage}
              alt="upload"
              height="50rem"
              width="50rem"
              style={{ marginTop: '1rem' }}
            />
            <Typography variant={'h3'} className={classes.text}>
              <span style={{ color: '#000000' }}>{fileDetails['path']}</span>{' '}
              <br />
              {convertBytesToMB(fileDetails['size'])}
            </Typography>

            {/* <p style={{ fontSize: '0.8rem', marginTop: "1rem" }}>Progress</p>
                    <LinearProgressWithLabel value={progress} /> */}
            <div className={classes.bottomText}>
              <img
                src={greenCheck}
                alt="selected"
                height="20rem"
                width="20rem"
              />
              <Typography variant="h4">No issues found</Typography>
            </div>
          </div>
        )}
      </div>
      {fileRejectionItems && (
        <div>
          <ul>{fileRejectionItems}</ul>
        </div>
      )}
      {sheetToJson && (
        <div className={classes.bottomText} style={{ width: '100%' }}>
          <PrimaryPinkButton
            onClick={() =>
              props.handleData(jsonViewData, sheetToJson, fileDetails['path'])
            }
          >
            Done
          </PrimaryPinkButton>
        </div>
      )}
    </>
  );
}
