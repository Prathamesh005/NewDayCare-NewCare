import React from 'react';
import {
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';
import { useState, useEffect } from 'react';
import tick from '../../../../images/tick.png';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const useStyles = makeStyles(theme => ({
  tableRoot: {
    tableLayout: 'fixed',
    borderCollapse: 'collapse',
    width: '100%',
    '& th, td': {
      border: '1px solid #F4F4F4',
      textAlign: 'left',
      padding: '8px',
    },
    '& th:nth-child(1), td:nth-child(1)': {
      textAlign: 'center',
    },
    '& th': {
      backgroundColor: '#F4F4F4',
    },
  },
  textField: {
    width: '300px',
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
  },
  textFieldTick: {
    '& .MuiOutlinedInput-input': {
      background: '#F4F4F4',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
  },
  textField1: {
    '& .MuiFormControl-marginDense': {
      margin: 0,
    },
  },
  noBorder: {
    border: 'none',
  },
  input1: {
    background: '#F4F4F4',
    borderBottom: '1px solid transparent !important',
    outline: 'none !important',
    paddingRight: 18,
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
  addDiscount: {
    color: theme.palette.button.paginated.color,
    cursor: 'pointer',
    fontWeight: 500,
  },
  discountHover: {
    '&:hover': {
      '& span': {
        color: theme.palette.button.paginated.color,
      },
    },
    '& span': {
      color: '#f0f0f0',
    },
  },
  deleteBtn: {
    '&:hover': {
      '& span': {
        color: theme.palette.button.paginated.color,
      },
    },
    '& span': {
      color: 'pink',
    },
  },
}));
function ReportTableEach(props) {
  const classes = useStyles();
  const { column, openAddNewRowInput } = props;
  const [arrayOfBilledItems, setArrayOfBilledItems] = useState(
    props.arrayOfBilledItems,
  );
  const [serviceArr, setServiceArr] = useState([]);
  const [selectedService, setSelectedService] = useState({
    code: '',
    display: '',
  });
  const [selectedServiceInputValue, setSelectedServiceInputValue] = useState({
    code: '',
    display: '',
  });
  const arrLength = arrayOfBilledItems && arrayOfBilledItems.length;
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [openSelectedIndexInputBox, setOpenSelectedIndexInputBox] = useState(
    false,
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalBilledAmount, setTotalBilledAmount] = useState(0);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
  const [discountValueForEdit, setDiscountValueForEdit] = useState(null);
  const [amountForEdit, setAmountForEdit] = useState(null);
  const [
    openSelectedAmountIndexInputBox,
    setOpenSelectedAmountIndexInputBox,
  ] = useState(false);
  const [
    openSelectedServiceIndexInputBox,
    setOpenSelectedServiceIndexInputBox,
  ] = useState(false);
  const [serviceForEdit, setServiceForEdit] = useState(null);
  useEffect(() => {
    setArrayOfBilledItems(props.arrayOfBilledItems);
  }, [props.arrayOfBilledItems]);
  useEffect(() => {
    props.handleTotalAmount(totalAmount);
    props.handleTotalBilledAmount(totalBilledAmount);
    props.handleTotalDiscountAmount(totalDiscountAmount);
    props.handleFilteredArrayOfBilledItems(arrayOfBilledItems);
  }, [totalAmount, totalBilledAmount, totalDiscountAmount]);
  useEffect(() => {
    setServiceArr(props.serviceListArray);
  }, [props.serviceListArray]);

  const handleAddNewService = value => {
    setSelectedIndex(null);
    const obj = {
      service: { code: value.code.code, display: value.code.display },
      amount: value.amount,
    };
    arrayOfBilledItems.push(obj);
    setSelectedService({ code: '', display: '' });

    // <-----Net------->
    const total = arrayOfBilledItems.reduce(
      (prevValue, currentValue) =>
        prevValue +
        (currentValue.amount ? currentValue.amount : 0) +
        (currentValue.discount ? currentValue.discount : 0),
      0,
    );
    setTotalAmount(total);

    // <-----Gross------->
    const totalBilled = arrayOfBilledItems.reduce(
      (prevValue, currentValue) =>
        prevValue + (currentValue.amount ? currentValue.amount : 0),
      0,
    );
    setTotalBilledAmount(totalBilled);

    // <-------Discount----------->
    const totalDiscount = arrayOfBilledItems.reduce(
      (prevValue, currentValue) =>
        prevValue + (currentValue.discount ? currentValue.discount : 0),
      0,
    );
    setTotalDiscountAmount(totalDiscount);
    props.handleFilteredArrayOfBilledItems(arrayOfBilledItems);
  };
  const handleAddDiscount = (item, index) => {
    setSelectedIndex(index);
    setOpenSelectedIndexInputBox(true);
    // console.log(index, item)
  };
  const handleSaveService = (e, item, index) => {
    if (e.target.value !== '') {
      const objIndex = arrayOfBilledItems.findIndex(
        obj => obj.service.display === item.service.display,
      );
      arrayOfBilledItems[objIndex]['service'] = {
        code: e.target.value,
        display: e.target.value,
      };
      setArrayOfBilledItems([...arrayOfBilledItems]);
      setSelectedIndex(null);
    }
  };
  const handleEditService = (e, item, index) => {
    setSelectedIndex(index);
    setOpenSelectedIndexInputBox(false);
    setOpenSelectedAmountIndexInputBox(false);
    setOpenSelectedServiceIndexInputBox(true);
    setServiceForEdit(e.target.value);
  };
  const handleSaveDiscountAmount = (e, item, index) => {
    // console.log(typeof e.target.value)
    if (parseFloat(e.target.value) < item.amount) {
      const objIndex = arrayOfBilledItems.findIndex(
        obj => obj.service.display === item.service.display,
      );
      arrayOfBilledItems[objIndex]['discount'] =
        parseFloat(e.target.value).toFixed(2) - 0;
      setArrayOfBilledItems([...arrayOfBilledItems]);
      setSelectedIndex(null);
    }
  };
  const handleSaveAmount = (e, item, index) => {
    const objIndex = arrayOfBilledItems.findIndex(
      obj => obj.service.display === item.service.display,
    );
    arrayOfBilledItems[objIndex]['amount'] =
      parseFloat(e.target.value).toFixed(2) - 0;
    setArrayOfBilledItems([...arrayOfBilledItems]);
    setSelectedIndex(null);
  };
  const handleEditDiscount = (e, item, index) => {
    if (props.status !== 'Issued') {
      setSelectedIndex(index);
      setOpenSelectedIndexInputBox(true);
      setOpenSelectedServiceIndexInputBox(false);
      setOpenSelectedAmountIndexInputBox(false);
      setDiscountValueForEdit(parseFloat(e.target.value).toFixed(2));
    }
  };
  const handleEditAmount = (e, item, index) => {
    if (props.status !== 'Issued') {
      setSelectedIndex(index);
      setOpenSelectedIndexInputBox(false);
      setOpenSelectedServiceIndexInputBox(false);
      setOpenSelectedAmountIndexInputBox(true);
      setAmountForEdit(e.target.value);
    }
  };
  const handleDeleteBtn = (e, item, index) => {
    if (props.status !== 'Issued') {
      const filterArray = arrayOfBilledItems.filter(
        (obj, ind) => ind !== index,
      );
      setArrayOfBilledItems([...filterArray]);
    }
  };
  const handleCheckService = (item, index) => {
    const found =
      serviceArr && serviceArr.some(ele => ele.code.code === item.code);
    if (!found) return false;
    else return true;
  };
  useEffect(() => {
    if (arrayOfBilledItems) {
      // <-----Net------->
      const total =
        arrayOfBilledItems &&
        arrayOfBilledItems.reduce(
          (prevValue, currentValue) =>
            prevValue +
            (currentValue.amount ? currentValue.amount : 0) -
            (currentValue.discount ? currentValue.discount : 0),
          0,
        );
      setTotalAmount(total);

      // <-----Gross------->
      const totalBilled =
        arrayOfBilledItems &&
        arrayOfBilledItems.reduce(
          (prevValue, currentValue) =>
            prevValue + (currentValue.amount ? currentValue.amount : 0),
          0,
        );
      setTotalBilledAmount(totalBilled);

      // <-------Discount----------->
      const totalDiscount =
        arrayOfBilledItems &&
        arrayOfBilledItems.reduce(
          (prevValue, currentValue) =>
            prevValue + (currentValue.discount ? currentValue.discount : 0),
          0,
        );
      setTotalDiscountAmount(totalDiscount);
      props.handleFilteredArrayOfBilledItems(arrayOfBilledItems);
    }
  }, [arrayOfBilledItems]);
  // console.log("props", props)
  return (
    <>
      <table className={classes.tableRoot}>
        <col style={{ width: '10%' }} />
        <col style={{ width: '30%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '20%' }} />
        {/* <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "15%" }} /> */}
        <tr>
          {column.map(item => (
            <th style={{ fontWeight: 500, color: '#6a6a6a' }}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </th>
          ))}
        </tr>

        {arrayOfBilledItems && arrayOfBilledItems.length > 0
          ? arrayOfBilledItems.map((item, index) => {
            // console.log(item)
            // console.log(item.hasOwnProperty('discount'))
            return (
              <tr key={index.toString()}>
                <td>
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 500, color: '#373737' }}
                  >
                    {index + 1}
                  </Typography>
                </td>
                {item.hasOwnProperty('service') &&
                  handleCheckService(item['service'], index) ? (
                  <td>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: 500, color: '#373737' }}
                    >
                      {item.service.display}
                    </Typography>
                  </td>
                ) : openSelectedServiceIndexInputBox &&
                  selectedIndex === index ? (
                  <td>
                    <TextField
                      className={classes.textFieldTick}
                      fullWidth
                      variant="outlined"
                      value={serviceForEdit}
                      size="small"
                      disabled={true}
                      onBlur={e => {
                        handleSaveService(e, item, index);
                      }}
                      InputProps={{
                        placeholder: 'Enter Service Name',
                        className: classes.input1,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                  </td>
                ) : (
                  <td>
                    <Grid
                      container
                      className={classes.discountHover}
                    // onClick={e => handleEditService(e, item, index)}
                    >
                      <Grid item xs={10}>
                        <Typography
                          variant="h4"
                          style={{ fontWeight: 500, color: '#373737' }}
                        >
                          {item['service'].display}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} className={classes.iconBtn}>
                        <IconButton
                          size="small"
                          edge="end"
                          color="primary"
                          className={classes.iconButton}
                          aria-label="directions"
                          disabled={true}
                        >
                          <EditIcon
                            style={{ fontSize: 15, visibility: 'hidden' }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </td>
                )}
                {item.hasOwnProperty('amount') &&
                  item['amount'] !== undefined ? (
                  <td>
                    <Typography
                      variant="h4"
                      style={{ fontWeight: 500, color: '#373737' }}
                    >
                      {item.amount}
                    </Typography>
                  </td>
                ) : openSelectedAmountIndexInputBox &&
                  selectedIndex === index ? (
                  <td>
                    <TextField
                      className={classes.textFieldTick}
                      type="number"
                      fullWidth
                      variant="outlined"
                      defaultValue={amountForEdit}
                      size="small"
                      disabled={true}
                      onBlur={e => {
                        handleSaveAmount(e, item, index);
                      }}
                      InputProps={{
                        placeholder: 'Enter Value',
                        className: classes.input1,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                  </td>
                ) : (
                  <td>
                    <Grid
                      container
                      className={classes.discountHover}
                    // onClick={e => handleEditAmount(e, item, index)}
                    >
                      <Grid item xs={10}>
                        <Typography
                          variant="h4"
                          style={{ fontWeight: 500, color: '#373737' }}
                        >
                          0
                        </Typography>
                      </Grid>
                      <Grid item xs={2} className={classes.iconBtn}>
                        <IconButton
                          size="small"
                          edge="end"
                          color="primary"
                          className={classes.iconButton}
                          aria-label="directions"
                          disabled={true}
                        >
                          <EditIcon
                            style={{ fontSize: 15, visibility: 'hidden' }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </td>
                )}
                {item.hasOwnProperty('discount') ? (
                  openSelectedIndexInputBox && selectedIndex === index ? (
                    <td>
                      <TextField
                        className={classes.textFieldTick}
                        type="number"
                        fullWidth
                        variant="outlined"
                        disabled={true}
                        defaultValue={discountValueForEdit}
                        size="small"
                        onBlur={e => {
                          handleSaveDiscountAmount(e, item, index);
                        }}
                        InputProps={{
                          placeholder: 'Enter Value',
                          className: classes.input1,
                          classes: { notchedOutline: classes.noBorder },
                        }}
                      />
                    </td>
                  ) : (
                    <td>
                      <Grid
                        container
                        className={classes.discountHover}
                      // onClick={e => handleEditDiscount(e, item, index)}
                      >
                        <Grid item xs={10}>
                          <Typography
                            variant="h4"
                            style={{ fontWeight: 500, color: '#373737' }}
                          >
                            {item.discount}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.iconBtn}>
                          <IconButton
                            size="small"
                            edge="end"
                            color="primary"
                            className={classes.iconButton}
                            aria-label="directions"
                            disabled={true}
                          >
                            <EditIcon
                              style={{ fontSize: 15, visibility: 'hidden' }}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </td>
                  )
                ) : openSelectedIndexInputBox && selectedIndex === index ? (
                  <td>
                    <TextField
                      className={classes.textFieldTick}
                      type="number"
                      fullWidth
                      disabled={true}
                      variant="outlined"
                      value={discountValueForEdit}
                      size="small"
                      onBlur={e => {
                        handleSaveDiscountAmount(e, item, index);
                      }}
                      InputProps={{
                        placeholder: 'Enter Value',
                        className: classes.input1,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                  </td>
                ) : (
                  <td>
                    <Typography
                      variant="h4"
                      className={classes.addDiscount}
                    // onClick={() => handleAddDiscount(item, index)}
                    >
                      + Add Discount
                    </Typography>
                  </td>
                )}
                {item.hasOwnProperty('service') ? (
                  <td>
                    <Grid container>
                      <Grid item xs={9}>
                        <Typography
                          variant="h4"
                          style={{ fontWeight: 500, color: '#373737' }}
                        >
                          {item.hasOwnProperty('amount') &&
                            item.hasOwnProperty('discount')
                            ? parseFloat(item.amount) -
                            parseFloat(item.discount)
                            : item.hasOwnProperty('amount') &&
                              item['amount'] !== undefined
                              ? parseFloat(item.amount)
                              : 0}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className={classes.deleteBtn}
                      // onClick={e => handleDeleteBtn(e, item, index)}
                      >
                        <IconButton
                          size="small"
                          edge="end"
                          color="primary"
                          className={classes.iconButton}
                          aria-label="directions"
                        >
                          <DeleteForeverIcon
                            style={{ fontSize: 15, visibility: 'hidden' }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </td>
                ) : (
                  ''
                )}
              </tr>
            );
          })
          : ''}
        {/* {openAddNewRowInput ?  */}
        <tr>
          <td>
            <Typography
              variant="h4"
              style={{ fontWeight: 500, color: '#373737' }}
            >
              {arrLength ? arrLength + 1 : 1}
            </Typography>
          </td>
          <td colSpan={column.length - 1}>
            <Autocomplete
              id="serviceArr"
              name="serviceArr"
              options={serviceArr && serviceArr}
              value={selectedService}
              freeSolo
              fullWidth
              disableClearable
              blurOnSelect
              hiddenLabel
              disabled={true}
              getOptionLabel={option => {
                if (typeof option === 'string') {
                  return option;
                }
                return (option && option.code && option.code['display']) || '';
              }}
              onChange={(e, value) => {
                if (typeof value === 'string')
                  handleAddNewService({
                    code: { code: value, display: value },
                  });
                else if (typeof value === 'null')
                  setSelectedService({ code: '', display: '' });
                else handleAddNewService(value);
                setSelectedServiceInputValue({ code: '', display: '' });
              }}
              inputValue={selectedServiceInputValue['display']}
              onInputChange={(e, value) => {
                if (value)
                  setSelectedServiceInputValue({ code: value, display: value });
              }}
              filterOptions={(x, s) => {
                const matchingValueArr = [];
                x.forEach(ele => {
                  if (
                    ele.code['display'] &&
                    ele.code['display'].includes(s['inputValue'])
                  )
                    matchingValueArr.push(ele);
                });
                return matchingValueArr;
              }}
              className={classes.textField1}
              renderInput={params => (
                <TextField
                  {...params}
                  className={classes.textField}
                  margin="dense"
                  variant="outlined"
                  InputLabelProps={{ shrink: false }}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    placeholder: 'Select Service',
                    className: classes.input1,
                    classes: { notchedOutline: classes.noBorder },
                  }}
                />
              )}
            />
          </td>
        </tr>
        {/* : ""} */}
      </table>
    </>
  );
}

export default ReportTableEach;
