import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    borderRadius: '5px',
    marginBottom: '20px',
    background: '#F8F8F8',
    boxShadow: 'none',
  },
  cardContent: {
    '&.MuiCardContent-root:last-child': {
      padding: '10px 12px',
    },
  },
  cardTitle: {
    fontSize: 17,
  },
  clsButtonRight: {
    // border:"2px solid",
    padding: '0px 10px',
    width: 90,
    transition: 'transform 300ms ease-in-out',
    '&:hover': {
      transform: 'translateX(-15px)',
      transition: '0.2 ease-in-out',
      background: '#ffff !important',
    },
  },
  clsButtonLeft: {
    // border:"2px solid",
    padding: '0px 10px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    background: `${theme.palette.button.primary.color} !important`,
    borderRadius: '0px !important',
    width: 60,
    '& .MuiInputBase-input': {
      padding: '10px 15px',
      fontSize: '1rem',
      fontWeight: '400',
    },
  },
  back: {
    background: `${theme.palette.button.primary.color} !important`,
    borderRadius: '0px !important',
    width: 60,
    '& .MuiInputBase-input': {
      padding: '10px 15px',
      fontSize: '1rem',
      fontWeight: '400',
    },
  },
}));

export default function MediaCard({ Data, title, Id, value, onClick, change }) {
  const classes = useStyles();
  const [buttonHover, setButtonHovered] = React.useState(false);
  const [value1, setValue1] = React.useState(
    value != 'null' && value != null ? value && value[0] : 100,
  );
  const [value2, setValue2] = React.useState(
    value != 'null' && value != null ? value && value[1] : 100,
  );

  useEffect(() => {
    setValue1(value && value[0]);
    setValue2(value && value[1]);
  }, [value]);

  const change1 = e => {
    setValue1(e.target.value !== '' ? parseInt(e.target.value) : null);
    change(e.target.value !== '' ? parseInt(e.target.value) : null, value2);
  };

  const change2 = e => {
    setValue2(e.target.value !== '' ? parseInt(e.target.value) : null);
    change(value1, e.target.value !== '' ? parseInt(e.target.value) : null);
  };

  return (
    <Card className={classes.root}>
      <CardContent classes={{ root: classes.cardContent }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h3"
            // component="h2"
            className={classes.cardTitle}
          >
            {title}
          </Typography>

          <Button
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            className={
              buttonHover ? classes.clsButtonRight : classes.clsButtonLeft
            }
            // startIcon={}

            onClick={onClick}
          >
            <CloseIcon style={{ fontSize: 20 }} /> {buttonHover ? 'Clear' : ''}
          </Button>
        </div>
        <div>{Data}</div>
      </CardContent>

      {Id === 0 ? (
        <CardActions disableSpacing style={{ padding: '10px 15px' }}>
          <Input
            disableUnderline
            className={classes.back}
            value={value1 === null || value1 === undefined ? '' : value1}
            // type="number"
            onChange={change1}
          />
          <Input
            disableUnderline
            className={classes.expand}
            value={value2 === null || value2 === undefined ? '' : value2}
            // type="number"
            onChange={change2}
          />
        </CardActions>
      ) : null}
    </Card>
  );
}
