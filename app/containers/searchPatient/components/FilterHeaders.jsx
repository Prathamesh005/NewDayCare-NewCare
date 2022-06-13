import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { WhiteAnimationButton } from '../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderRadius: '5px',
    margin: '50px 0px 40px 0px',
    background: '#F2F5FA',
    boxShadow: 'none',
    // height:60
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&.MuiCardContent-root:last-child': {
      padding: '10px 15px',
    },
  },
  clsButtonRight: {
    width: 90,
    padding: '0px 10px',
    transition: 'transform 300ms ease-in-out',
    '&:hover': {
      transform: 'translateX(-15px)',
      transition: '0.2 ease-in-out',
    },
  },
  clsButtonLeft: {
    padding: '0px 10px',
  },
}));

export default function FilterHeader({ onClick, title }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent classes={{ root: classes.cardContent }}>
        <Typography variant="h3" component="h2" className={classes.cardTitle}>
          {title}
        </Typography>

        <WhiteAnimationButton
          title="Clear"
          onClick={onClick}
          iconWithProps={<CloseIcon style={{ fontSize: 20 }} />}
          onHoverEffect={classes.clsButtonRight}
          normalEffect={classes.clsButtonLeft}
        />
      </CardContent>
    </Card>
  );
}
