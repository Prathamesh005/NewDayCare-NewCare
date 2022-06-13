import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import {
  actionsConfig,
  useAdministrationSlice,
} from '../../../../../../apis/administrationApis/administrationSlice';
import {
  OuterBox,
  PageTitleText,
  PinkAddCircleButton,
  SearchInput,
  SquareIconButton,
  ViewTable,
  MessageComponent,
} from '../../../../../../components';
import { List_DATE_TIME_DISPLAY } from '../../../../../../utils/constants';
import { ROUTES_CONSTANTS } from '../../../../../app/routeConstants';

const Skeleton = React.lazy(() =>
  import('../../../../../skeleton/tableSkeletone'),
);
const NoRecord = React.lazy(() =>
  import('../../../../../../components/elements/NoRecordPage'),
);

const useStyles = makeStyles(theme => ({
  textFieldGrid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },
  main: {
    flexGrow: 1,
  },
  iconClass: {
    color: '#727272',
    cursor: 'pointer',
  },
}));

function AllHospitals(props) {
  useAdministrationSlice();
  const { resetAdministrationStore } = props;
  const classes = useStyles();
  const [data, setData] = useState({
    query: false,
    date: moment().format(List_DATE_TIME_DISPLAY),
    activeFilter: [],
  });
  const [hospitalList, setHospitalList] = React.useState([]);
  const [LocalLoader, setLocalLoader] = React.useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const history = useHistory();
  const onHandleDetail = (value, row, Id) => {
    setOpenDetail(value);
    setSelectedId(Id);
    setSelectedData(row);
  };

  const getHospitalsListApi = async inputData => {
    setLocalLoader(true);
    const { payload } = await props.getStaffList(inputData);
    setLocalLoader(false);

    if (payload && payload.length !== 0) {
      setHospitalList(payload);
    }
    if (payload.networkError && payload.networkError.statusCode == 401) {
      props.snackbarShowMessage(payload.networkError.result.message, 'error');
    } else if (payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  useEffect(() => {
    // getHospitalsListApi('');
    resetAdministrationStore();
  }, []);

  const handleChange = value => {
    setData({ ...data, query: value });
  };

  let Data = hospitalList && hospitalList.length !== 0 ? hospitalList : [];
  // console.log('Data', Data);
  const search = data.query;
  if (search && search.length > 0) {
    Data =
      hospitalList &&
      hospitalList.filter(eachVal => {
        let opt =
          eachVal.practitioner.display
            .toLowerCase()
            .search(search.toLowerCase()) !== -1;
        return opt;
      });
  }

  const defaultHeadCells = [
    {
      id: 'practitioner',
      label: 'Hospital / Clinic Name',
      render: ({ value }) => {
        return <span style={{ fontWeight: 500 }}> {value}</span>;
      },
    },
    {
      id: 'practitioner',
      label: 'Service Type',
      render: ({ value }) => {
        return 'Physical therapists';
      },
    },
    {
      id: 'practitioner',
      label: 'Primary Address',
      render: ({ value }) => {
        return 'Lorem ipsum dolor sit amet,';
      },
    },
    {
      id: 'practitioner',
      label: 'Added on',
      render: ({ value }) => {
        return '10/04/2022';
      },
    },
    {
      id: 'practitioner',
      label: '',
      maxWidth: '50px',
      width: '50px',

      render: ({ value, row }) => {
        return (
          <SquareIconButton
            onClick={() => {
              history.push({
                pathname: ROUTES_CONSTANTS.ADMINISTRATION_HOSPITALS,
                state: { detailData: row },
              });
            }}
            style={{ padding: 4 }}
          >
            <InfoIcon style={{ fontSize: '1.2rem' }} />
          </SquareIconButton>
        );
      },
    },
  ];

  const OuterBoxTopComponent = () => {
    return (
      <>
        <Grid container>
          <Grid item xs sm={4}>
            <SearchInput
              onChange={e => handleChange(e.target.value)}
              placeholder="Search Hospitals / Clinics"
            />
          </Grid>
        </Grid>
      </>
    );
  };

  const OuterBoxBottomComponent = () => {
    return (
      <>
        {!LocalLoader ? (
          Data && Data.length > 0 ? (
            <ViewTable
              rows={Data}
              headCells={defaultHeadCells}
              headBackground={'#f0f0f0'}
              pagination={false}
            />
          ) : (
            <div style={{ height: 400, width: '100%' }}>
              <NoRecord />
            </div>
          )
        ) : (
          <Skeleton />
        )}
      </>
    );
  };

  return (
    <Fragment>
      <div className={classes.main}>
        <Grid container>
          <Grid container style={{ marginBottom: 25 }}>
            <Grid item xs sm={4}>
              <PageTitleText>Hospitals / Clinics</PageTitleText>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <OuterBox
              topComponent={OuterBoxTopComponent()}
              bottomComponent={OuterBoxBottomComponent()}
              bottomHeight="64vh"
            />
          </Grid>
        </Grid>
      </div>

      <PinkAddCircleButton
        title={'Add Hosp/Clinic'}
        onClick={() => {
          history.push(ROUTES_CONSTANTS.ADMINISTRATION_HOSPITAL_CREATE);
        }}
        size="small"
        style={{
          width: 165,
          borderRadius: 50,
          position: 'fixed',
          bottom: 40,
          right: 40,
        }}
      />
    </Fragment>
  );
}

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    // getStaffList: payload => dispatch(getStaffList(payload)),
    resetAdministrationStore: () =>
      dispatch(actionsConfig.resetAdministrationStore()),

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  MessageComponent,
)(AllHospitals);
