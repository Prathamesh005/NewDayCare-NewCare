import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    marginRight: 40,
  },

  contentDiv: {
    maxWidth: '1050px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    // border: '2px solid red',

    [theme.breakpoints.down('md')]: {
      maxWidth: 820,
    },
  },
  Title: {
    fontSize: '1rem',
    color: '#636262',
  },
  subTitle: {
    fontSize: '1rem',
    fontWeight: 500,
  },
}));

export default function OnFollowUpVisitCard({ OnLoadData }) {
  const classes = useStyles();
  return (
    <div className={classes.contentDiv}>
      {OnLoadData && OnLoadData.length > 0
        ? OnLoadData.map((ele, i) => {
            return (
              <span className={classes.root} key={(i + 1).toString()}>
                <Typography
                  variant="h3"
                  component={'span'}
                  className={classes.Title}
                >
                  {ele.type === 'name' ? ele.title : `${ele.title} - `}
                </Typography>

                <Typography
                  variant="h3"
                  component={'span'}
                  className={classes.subTitle}
                >
                  {/* {ele.subtitle} */}

                  {ele.type === 'isSubArray'
                    ? ele.subtitle.map((e, index) => {
                        return ele.subtitle.at(-1) === e ? `${e}` : `${e}, `;
                      })
                    : ele.type === 'isSubArrayAndNote'
                    ? ele.subtitle.map((e, index) => {
                        return ele.subtitle.at(-1) === e
                          ? `${e.condition} - ${e.note}`
                          : `${e.condition} - ${e.note}, `;
                      })
                    : ele.subtitle}
                </Typography>
              </span>
            );
          })
        : ''}
    </div>
  );
}
