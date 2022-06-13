import { makeStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import moment from 'moment';
import React from 'react';
import morningColor from '../../images/assets/morning (-2.png';
import morning from '../../images/assets/morning (1).png';
import night from '../../images/assets/night-mode-6.png';
import nightColor from '../../images/assets/night-mode-8.png';
import afternoonColor from '../../images/assets/sun-2.png';
import afternoon from '../../images/assets/sun.png';
import evening from '../../images/assets/sunset-6.png';
import eveningColor from '../../images/assets/sunset-8.png';
import { APT_FORM_DATE } from '../../utils/constants';

const useStyles = makeStyles(theme => ({
  groupToggle: {
    // width: '100%',
    // display: 'contents',
    '& button': {
      marginRight: 35,
      border: 'none',
      height: 45,
      width: 150,

      [theme.breakpoints.down('md')]: {
        width: 125,
        marginRight: 20,
      },
    },
    '& img': {
      marginRight: 10,
      position: 'absolute',
      left: 15,
    },
    '& .Mui-selected': {
      color: '#FF3399',
      background: '#ffffff',
    },
    '& .Mui-selected:hover': {
      background: '#ffffff',
    },
    '& button:hover': {
      background: '#ffffff',
      fontWeight: 'bold',
      color: '#4d4c4f',
    },
  },
  timeDisplay: {
    fontSize: 12,
    marginLeft: 20,
    [theme.breakpoints.down('md')]: {
      fontSize: 10,
      marginLeft: 14,
    },
  },
}));

const SearchByPartsOfDay = ({ date, value, onChange, selectedTime }) => {
  const classes = useStyles();
  const [z1, setZ1] = React.useState('');

  const [toggleData, setToggleData] = React.useState([]);
  React.useEffect(() => {
    setToggleData([
      {
        image: morning,
        image1: morningColor,
        name: 'Morning',
        displayTime: '06:00 to 12.00',
        value: `${moment(date).format(APT_FORM_DATE) +
          'T' +
          '06:00'} to ${moment(date).format(APT_FORM_DATE) + 'T' + '11:59'}`,
      },
      {
        image: afternoon,
        image1: afternoonColor,
        name: 'Afternoon',
        displayTime: '12:00 to 16.00',
        value: `${moment(date).format(APT_FORM_DATE) +
          'T' +
          '12:00'} to ${moment(date).format(APT_FORM_DATE) + 'T' + '15:59'}`,
      },
      {
        image: evening,
        image1: eveningColor,
        name: 'Evening',
        displayTime: '16:00 to 20.00',
        value: `${moment(date).format(APT_FORM_DATE) +
          'T' +
          '16:00'} to ${moment(date).format(APT_FORM_DATE) + 'T' + '19:59'}`,
      },
      {
        image: night,
        image1: nightColor,
        name: 'Night',
        displayTime: '20:00 to 00.00',
        value: `${moment(date).format(APT_FORM_DATE) +
          'T' +
          '20:00'} to ${moment(date).format(APT_FORM_DATE) + 'T' + '23:59'}`,
      },
    ]);
  }, [date]);

  const setShow = (boolVal, i) => {
    // debugger
    let a = '';
    let b = '';
    let c = '';
    let d = '';
    if (i === 0) {
      a = '06:00 to 12.00';
    } else if (i === 1) {
      b = '12:00 to 18.00';
    } else if (i === 2) {
      c = '18:00 to 24.00';
    } else if (i === 3) {
      d = '18:00 to 24.00';
    }

    if (boolVal === true) {
      setZ1(i);
    } else {
      setZ1('');
    }
  };
  return (
    <>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={onChange}
        aria-label="text alignment"
        className={classes.groupToggle}
      >
        {toggleData.map((val, index) => {
          return (
            <ToggleButton
              value={val.value}
              aria-label="left aligned"
              onMouseEnter={() => setShow(true, index)}
              onMouseLeave={() => setShow(false, index)}
              key={(index + 1).toString()}
            >
              <img
                src={val.value === selectedTime ? val.image1 : val.image}
                height="25"
                alt="Not Found !"
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginLeft: 20,
                }}
              >
                {index === z1 ? (
                  <span style={{ fontSize: 14, color: 'black' }}>
                    {val.name}{' '}
                  </span>
                ) : val.value === selectedTime ? (
                  <span style={{ fontSize: 14, color: '#FF3399' }}>
                    {val.name}{' '}
                  </span>
                ) : (
                  <span style={{ fontSize: 14, color: '#727272' }}>
                    {val.name}{' '}
                  </span>
                )}

                {index === z1 || val.value === selectedTime ? (
                  <span className={classes.timeDisplay}>{val.displayTime}</span>
                ) : (
                  ''
                )}
              </div>
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </>
  );
};

export default SearchByPartsOfDay;
