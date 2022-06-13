import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  CloseIconButton,
  SquareIconButton,
} from '../../../../components/button';
import expandIcon from '../../../../images/assets/expandIcon.png';
import ErrorBoundary from '../../../../utils/errorBoundry';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // margin: "-15px -35px 0px 35px"
  },
  header: {
    margin: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  hide: {
    display: 'none',
  },

  closeBtn: {
    '&:hover': {
      background: 'white',
    },
  },
}));

export default function RightSidebarCard(props) {
  const classes = useStyles();
  const { setSidebarShow } = props;
  const {
    title,
    componentToRender,
    showExpandButton,
    expandClickAction,
  } = props.item;

  return (
    <div className={classes.content}>
      <div className={classes.header}>
        <div style={{ fontWeight: '400' }}>{title ? title : ''}</div>

        <div className={classes.logo}>
          {showExpandButton && (
            <SquareIconButton
              aria-label="close"
              onClick={() => {
                expandClickAction && expandClickAction();
              }}
              size="small"
              style={{
                padding: 8,
                marginRight: 10,
              }}
              className={classes.closeBtn}
            >
              <img src={expandIcon} alt="Not Found !" height="13px" />
            </SquareIconButton>
          )}

          <CloseIconButton
            className={classes.closeBtn}
            onClick={() => {
              setSidebarShow(false);
            }}
          />
        </div>
      </div>
      <Divider />
      <div
        className={classes.description}
        style={{ padding: '20px 10px', height: '85vh' }}
      >
        {componentToRender && (
          <ErrorBoundary>{componentToRender}</ErrorBoundary>
        )}
      </div>
    </div>
  );
}
