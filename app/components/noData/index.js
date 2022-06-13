import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NoDataSvg from '../../images/NoData.svg';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  NoDataImg: {
    paddingTop: 140,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

const NoData = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.NoDataImg} src={NoDataSvg} alt="Nodata" />
    </div>
  );
};

export default NoData;
