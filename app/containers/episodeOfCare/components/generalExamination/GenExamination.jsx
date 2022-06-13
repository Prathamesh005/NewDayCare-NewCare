import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { differenceBy } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserContext from '../../MyStateContext';

const useStyles = makeStyles(theme => ({
  lebels: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
  },
  centerGrid: {
    display: 'flex',
    alignItems: 'center',
  },
  calculateBtn: {
    backgroundColor: '#ffffff',
    padding: '0px 16px',
    // marginBottom:40,
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },
  },
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    backgroundColor: 'transparent',
    paddingLeft: '0px',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '0.5rem',
  },
  textDisplay: {
    fontSize: '0.9rem',
    fontWeight: 'normal',
  },
  textInsideList1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '0.5px solid #cacaca',
    borderRadius: '25px',
    marginRight: '0.5rem',
    padding: '0.5rem',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  textField2: {
    '& .MuiOutlinedInput-input': {
      fontSize: '0.9rem',
      fontWeight: 'normal',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 400,
    },
    '& .MuiFormControl-marginDense': {
      marginTop: '4px',
    },
    '& .MuiOutlinedInput-inputMarginDense': {
      padding: '0.1px 0.5px',
    },
    margin: theme.spacing(0.5),
  },
  input3: {
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    '&:focus': {
      background: '#F4F4F4 !important',
    },
    '&:active': {
      background: '#F4F4F4 !important',
    },
    '&:hover': {
      background: '#F4F4F4 !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },
  noBorder: {
    border: 'none',
  },
}));

export default function GenExamination(props) {
  const classes = useStyles();
  const [openInputBox, setOpenInputBox] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  const [arrayOfItems, setArrayOfItems] = useState();
  const prevData = props.generalExamData;

  const user = React.useContext(UserContext);

  useEffect(() => {
    const res =
      arrayOfItems && arrayOfItems.length > 0
        ? arrayOfItems
            .filter(val => val.status === true)
            .map(v => {
              return {
                description: v.note,
                valueCodeableConcept: {
                  codeableSystem: 'http://snomed.info/sct',
                  code: v.code,
                  text: v.display,
                  display: v.display,
                },
                resourceId: v.resourceId,
              };
            })
        : [];

    // console.log("res",res)
    user.setGeneralExaminationData(res);

    var deletedData = differenceBy(prevData, res, 'resourceId');
    user.setDelGeneralExaminationData(deletedData);

    return () => {};
  }, [arrayOfItems]);

  const handleStatus = item => {
    if (
      prevData &&
      prevData.length > 0 &&
      prevData.find(ele => ele.valueCodeableConcept['code'] === item)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleNote = item => {
    if (
      prevData &&
      prevData.length > 0 &&
      prevData.find(ele => ele.valueCodeableConcept['code'] === item)
    ) {
      const obj = prevData.find(
        ele => ele.valueCodeableConcept['code'] === item,
      );
      return obj.description;
    } else {
      return '';
    }
  };
  const handleId = item => {
    if (
      prevData &&
      prevData.length > 0 &&
      prevData.find(ele => ele.valueCodeableConcept['code'] === item)
    ) {
      const obj = prevData.find(
        ele => ele.valueCodeableConcept['code'] === item,
      );
      return obj.resourceId;
    } else {
      return uuidv4();
    }
  };
  useEffect(() => {
    setArrayOfItems([
      {
        code: 'icterus',
        display: 'Icterus',
        status: handleStatus('icterus'),
        note: handleNote('icterus'),
        resourceId: handleId('icterus'),
      },
      {
        code: 'pallor',
        display: 'Pallor',
        status: handleStatus('pallor'),
        note: handleNote('pallor'),
        resourceId: handleId('pallor'),
      },
      {
        code: 'clubbing',
        display: 'Clubbing',
        status: handleStatus('clubbing'),
        note: handleNote('clubbing'),
        resourceId: handleId('clubbing'),
      },
      {
        code: 'cyanosis',
        display: 'Cyanosis',
        status: handleStatus('cyanosis'),
        note: handleNote('cyanosis'),
        resourceId: handleId('cyanosis'),
      },
      {
        code: 'oedema',
        display: 'Oedema',
        status: handleStatus('oedema'),
        note: handleNote('oedema'),
        resourceId: handleId('oedema'),
      },
      {
        code: 'lymphadenopathy',
        display: 'Lymphadenopathy',
        status: handleStatus('lymphadenopathy'),
        note: handleNote('lymphadenopathy'),
        resourceId: handleId('lymphadenopathy'),
      },
    ]);
  }, [prevData]);

  const handleOpenTextField = index => {
    if (arrayOfItems[index]['status'] === false) {
      arrayOfItems[index]['status'] === true;
      setOpenInputBox(true);
      setSelectedIndex(index);
    } else {
      arrayOfItems[index]['status'] = false;
      arrayOfItems[index]['note'] = '';
      setArrayOfItems([...arrayOfItems]);
    }
    user.setCheckGeneralExamination(true);
  };
  const handleInputNote = (value, index) => {
    arrayOfItems[index]['note'] = value;
    arrayOfItems[index]['status'] = true;
    setArrayOfItems([...arrayOfItems]);
    setSelectedIndex();
  };

  return (
    <Fragment>
      <Grid item container xs={12}>
        <Grid item xs={12} md={1} className={classes.lebels}>
          General Examination
        </Grid>
        <Grid item xs>
          <Paper elevation={0} component="ul" className={classes.root}>
            {arrayOfItems &&
              arrayOfItems.map((ele, index) => {
                // debugger;
                return (
                  <li
                    key={index.toString()}
                    className={classes.listItem}
                    onClick={() => handleOpenTextField(index)}
                  >
                    <div
                      className={classes.textInsideList1}
                      style={{
                        backgroundColor: !ele.status
                          ? '#f4f4f4'
                          : 'transparent',
                      }}
                    >
                      {ele.note ? (
                        <Typography className={classes.textDisplay}>
                          {ele.display} - {ele.note}
                        </Typography>
                      ) : (
                        <Typography className={classes.textDisplay}>
                          {ele.display}
                        </Typography>
                      )}
                      {selectedIndex === index && (
                        <TextField
                          className={classes.textField2}
                          style={{
                            marginTop: '0px',
                            marginBottom: '0px',
                            marginLeft: '0.5rem',
                            fontSize: '0.4rem',
                            padding: '0px 2px',
                          }}
                          margin="dense"
                          variant="outlined"
                          InputLabelProps={{ shrink: false }}
                          autoFocus
                          onBlur={e => {
                            handleInputNote(e.target.value, index);
                          }}
                          InputProps={{
                            placeholder: 'Enter Note',
                            className: classes.input3,
                            classes: { notchedOutline: classes.noBorder },
                          }}
                        />
                      )}
                      {ele.status ? (
                        <IconButton
                          // onClick={() => handleResetStatus(index)}
                          edge="end"
                          style={{ padding: '0px 10px' }}
                        >
                          <CloseIcon style={{ fontSize: '0.9rem' }} />
                        </IconButton>
                      ) : (
                        ''
                      )}
                    </div>
                  </li>
                );
              })}
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
