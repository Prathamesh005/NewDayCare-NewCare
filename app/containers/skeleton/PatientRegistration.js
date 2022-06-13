import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({
  root: {
    background: '#F8F8F8',
    height: '100%',
  },
  mainBlock: {
    // width: '315px',
    // height: '200px',
    padding: '25px 20px',

    // margin: '50px auto',
  },
  cardContainer: {
    display: 'flex',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
  },
  cardMiddle: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px 10px 10px',
    '& .MuiSkeleton-text': {
      borderRadius: '20px',
    },
  },
  cardBottom: {
    padding: '0px 10px 10px 10px',
  },
  innerBlock: {
    background: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    margin: '50px 10px 10px 0',
    minWidth: '24%',
  },
  circle: {
    marginRight: '10px',
  },
  linePad: {
    marginRight: '10px',
  },
}));

export default function PatientRegistration() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.mainBlock}>
        <Skeleton animation="wave" variant="text" width="50vw" height={40} />
        <div className={classes.cardContainer}>
          <div className={classes.innerBlock}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={300}
              height={118}
            />
            <div className={classes.cardTop}>
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={150}
                  height={20}
                />
              </div>
            </div>
            <div className={classes.cardMiddle}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={40}
                className={classes.linePad}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={150}
                height={40}
              />
            </div>
            <div className={classes.cardBottom}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={200}
                height={20}
              />
            </div>
          </div>

          <div className={classes.innerBlock}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={300}
              height={118}
            />
            <div className={classes.cardTop}>
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={150}
                  height={20}
                />
              </div>
            </div>
            <div className={classes.cardMiddle}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={40}
                className={classes.linePad}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={150}
                height={40}
              />
            </div>
            <div className={classes.cardBottom}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={200}
                height={20}
              />
            </div>
          </div>

          <div className={classes.innerBlock}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={300}
              height={118}
            />
            <div className={classes.cardTop}>
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={150}
                  height={20}
                />
              </div>
            </div>
            <div className={classes.cardMiddle}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={40}
                className={classes.linePad}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={150}
                height={40}
              />
            </div>
            <div className={classes.cardBottom}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={200}
                height={20}
              />
            </div>
          </div>

          <div className={classes.innerBlock}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={300}
              height={118}
            />
            <div className={classes.cardTop}>
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={150}
                  height={20}
                />
              </div>
            </div>
            <div className={classes.cardMiddle}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={40}
                className={classes.linePad}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={150}
                height={40}
              />
            </div>
            <div className={classes.cardBottom}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={200}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={classes.mainBlock}>
        <div className={classes.cardContainer}>
          <div className={classes.innerBlock}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={300}
              height={118}
            />
            <div className={classes.cardTop}>
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={150}
                  height={20}
                />
              </div>
            </div>
            <div className={classes.cardMiddle}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={40}
                className={classes.linePad}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={150}
                height={40}
              />
            </div>
            <div className={classes.cardBottom}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={200}
                height={20}
              />
            </div>
          </div>

          <div className={classes.innerBlock}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={300}
              height={118}
            />
            <div className={classes.cardTop}>
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={150}
                  height={20}
                />
              </div>
            </div>
            <div className={classes.cardMiddle}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={40}
                className={classes.linePad}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={150}
                height={40}
              />
            </div>
            <div className={classes.cardBottom}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={200}
                height={20}
              />
            </div>
          </div>

          <div className={classes.innerBlock}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={300}
              height={118}
            />
            <div className={classes.cardTop}>
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={150}
                  height={20}
                />
              </div>
            </div>
            <div className={classes.cardMiddle}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={40}
                className={classes.linePad}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={150}
                height={40}
              />
            </div>
            <div className={classes.cardBottom}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={200}
                height={20}
              />
            </div>
          </div>

          <div className={classes.innerBlock}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={300}
              height={118}
            />
            <div className={classes.cardTop}>
              <div>
                <Skeleton
                  animation="wave"
                  variant="text"
                  width={150}
                  height={20}
                />
              </div>
            </div>
            <div className={classes.cardMiddle}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={40}
                className={classes.linePad}
              />
              <Skeleton
                animation="wave"
                variant="text"
                width={150}
                height={40}
              />
            </div>
            <div className={classes.cardBottom}>
              <Skeleton
                animation="wave"
                variant="text"
                width={100}
                height={20}
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={200}
                height={20}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
