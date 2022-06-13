import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { find } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import adviceLogo from '../../../../images/assets/MDI - pill.svg';
import relatedCasesLogo from '../../../../images/assets/relatedCasesLogo.png';
import reportLogo from '../../../../images/assets/reportLogo.png';
import timelineLogo from '../../../../images/assets/timelineLogo.png';
import RightSidebarAdviceAndPrescription from './RightSidebarAdviceAndPrescription';
import RightSidebarRelatedCases from './RightSidebarRelatedCases';
import RightSidebarReports from './RightSidebarReports';
import RightSidebarTimeline from './RightSidebarTimeline';

const RightSidebarCard = React.lazy(() => import('./RightSidebarCard'));

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    // margin: '-20px -25px 0px 0px',
    transition: '.35s ease-in-out',
  },
  drawer: {
    width: 80,
  },

  paper: {
    position: 'relative',
  },

  listItem: {
    padding: '20px 26px',
  },
}));

export default function SidebarRight({
  setSidebarShow,
  sidebarShow,
  TimelineData,
  setItem,
  item,
}) {
  const history = useHistory();

  const DRAWER_CONFIG_LIST = [
    {
      title: 'Timeline',
      key: 1,
      src: timelineLogo,
      isActive: true,
      alt: 'Not Found',
      showExpandButton: false,
      componentToRender: <RightSidebarTimeline TimelineData={TimelineData} />,
    },
    {
      title: 'Advice & Prescriptions',
      key: 2,
      src: adviceLogo,
      isActive: true,
      alt: 'Not Found',
      showExpandButton: false,
      componentToRender: <RightSidebarAdviceAndPrescription />,
    },
    {
      title: 'Reports',
      key: 3,
      isActive: true,
      src: reportLogo,
      alt: 'Not Found',
      showExpandButton: false,
      componentToRender: <RightSidebarReports />,
    },
    // {
    //   title: 'Treatment Plan',
    //   key: 4,
    //   isActive: true,
    //   src: treatmentPlanLogo,
    //   alt: 'Not Found',
    //   showExpandButton: true,
    //   expandClickAction: () =>
    //     history.push(ROUTES_CONSTANTS.TREATMENT_PLAN_CREATE),
    //   componentToRender: <RightSidebarTreatmentPlans />,
    // },
    {
      title: 'Related Cases',
      key: 5,
      isActive: true,
      src: relatedCasesLogo,
      alt: 'Not Found',
      showExpandButton: false,
      componentToRender: <RightSidebarRelatedCases />,
    },
  ];

  const classes = useStyles();

  const saveItem = key => {
    const selectedOption =
      find(DRAWER_CONFIG_LIST, data => data.key === key) || {};
    setItem(selectedOption);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: clsx(classes.paper),
        }}
      >
        <List>
          {DRAWER_CONFIG_LIST.map(({ key, src, alt }, index) => (
            <ListItem
              key={index}
              button
              onClick={() => saveItem(key)}
              className={classes.listItem}
            >
              <ListItemIcon>
                <img src={src} alt={alt || 'alt'} height="26" width="26" />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <React.Suspense fallback={<div />}>
        {sidebarShow && (
          <RightSidebarCard
            item={item}
            sidebarShow={sidebarShow}
            setSidebarShow={setSidebarShow}
          />
        )}
      </React.Suspense>
    </div>
  );
}
