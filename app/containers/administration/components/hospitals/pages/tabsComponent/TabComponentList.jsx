import React from 'react';
import OuterBoxWithTabs from '../../../../../../components/outerBox/OuterBoxWithTabs';
import Location from '../../../location/index';
import Admin from '../../../admin/index';
import AllDoctors from '../../../doctors/Lodable';
import AllStaff from '../../../staff/Lodable';
import { connect } from 'react-redux';
import { compose } from 'redux';

function TabComponent(props) {
  const { tabIndex } = props;
  const tabArray = [
    {
      tabName: 'Location',
      render: () => {
        return <Location />;
      },
    },
    {
      tabName: 'Admins',
      render: () => {
        return <Admin />;
      },
    },
    {
      tabName: 'All Doctors',
      render: () => {
        return <AllDoctors />;
      },
    },
    {
      tabName: 'All Staff',
      render: () => {
        return <AllStaff />;
      },
    },
  ];
  return (
    <OuterBoxWithTabs
      topComponent={tabArray}
      bottomHeight={'46vh'}
      tabIndex={tabIndex}
    />
  );
}

const mapStateToProps = state => state.Administration;
const withConnect = connect(mapStateToProps);

export default compose(withConnect)(TabComponent);
