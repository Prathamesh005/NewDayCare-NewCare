import { IconButton, Paper, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import {
  alpha,
  makeStyles,
  useTheme,
  withStyles,
} from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ChipSet } from '@material/react-chips';
import '@material/react-chips/dist/chips.css';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { PageTitleText } from '../../components';
import { MessageComponent } from '../../components';
import IconSearchWhite from '../../images/assets/Search Icon White.svg';
import { SEARCH_LIMIT } from '../../utils/constants';
import { ROUTES_CONSTANTS } from '../app/routeConstants';
import FilterCard from './components/FilterCards';
import FilterHeader from './components/FilterHeaders';

const SearchpatientCard = React.lazy(() =>
  import('./components/SearchpatientCard'),
);
const Skeleton = React.lazy(() => import('../skeleton/SearchPatient'));
const NoRecord = React.lazy(() =>
  import('../../components/elements/NoRecordPage'),
);

// TEST------------------------------->
import {
  loadSearchPatientData,
  useSearchPatientSlice,
} from '../../apis/searchPatientApis/searchPatientSlice';
import { valueSetSearch } from '../../apis/globalApis/globalSlice';
import { useDebouncing } from '../../hooks/useDebouncing';
// TEST------------------------------->

const drawerWidth = 365;
const drawerWidth1 = 340;

function GreenRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  clsButton: {
    position: 'absolute',
    right: theme.spacing(4),
    color: theme.palette.button.common.main,
    padding: 8,
    '&:hover': {
      borderRadius: 2,
      backgroundColor: theme.palette.primary.header,
    },
  },
  clsButtonRight: {
    position: 'absolute',
    right: theme.spacing(1),
    marginBottom: '20px',
    width: 100,
    outline: 'none !important',
  },
  clsButtonLeft: {
    position: 'absolute',
    right: theme.spacing(1),
    marginBottom: '20px',
    outline: 'none !important',
  },
  activeClass: {
    color: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.header,
    borderRadius: '0px',
  },
  cardsWrapper: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gridGap: '20px',
    flexWrap: 'wrap',
    clear: 'both',
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    backgroundColor: '#FF3399',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '0ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1),
      width: 'auto',
    },
  },
  paginatedButton: {
    background: theme.palette.button.paginated.color,
    margin: '20px 10px 0px 10px',
  },
  floatingButton: {
    background: theme.palette.button.paginated.color,
    color: theme.palette.button.primary.color,
    margin: '50px 20px 10px 40px',
    float: 'left',
  },
  showHideFloatingButton: {
    background: theme.palette.button.paginated.color,
    color: theme.palette.button.primary.color,
    margin: '50px 20px 10px 40px',
    float: 'left',
    width: '180px',
    borderRadius: '50px',
    '&:focus': {
      background: theme.palette.button.paginated.color,
    },
    '&:hover': {
      background: theme.palette.button.paginated.color,
    },
  },
  Bottom: {
    position: 'fixed',
    bottom: 10,
    right: 0,
  },
  drawerPaperStyle: {
    width: drawerWidth,
    marginTop: 60,
    overflowY: 'scroll',
    zIndex: '1',
    padding: '15px',
    background: `${theme.palette.backgroundColor.main} !important`,
    height: '100vh',
    [theme.breakpoints.down('md')]: {
      width: drawerWidth1,
    },
  },
  drawer: {
    flexShrink: 0,
    position: 'relative',
    zIndex: '1',
    background: `${theme.palette.backgroundColor.main} !important`,
  },
  shiftTextLeft: {
    marginRight: '0px',
    marginBottom: 20,
  },
  shiftTextRight: {
    marginRight: 0,
    marginBottom: 20,
    [theme.breakpoints.up('md')]: {
      marginRight: drawerWidth,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: drawerWidth1,
    },
  },
  shiftTextLeftHeader: {
    marginRight: '0px',
    marginBottom: 20,
  },
  shiftTextRightHeader: {
    marginRight: 0,
    marginBottom: 20,
    [theme.breakpoints.up('md')]: {
      marginRight: 260,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 300,
    },
  },

  submit: {
    // margin: theme.spacing(2, 8, 8),
    padding: 8,
    marginLeft: theme.spacing(5),
    width: 130,
    color: theme.palette.button.common.main,
    boxShadow: 'none',
    //float:'right',
    border: '1px solid black',
    fontWeight: 'bold',
    outline: 'none !important',
    '&:hover': {
      background: '#fff',
      outline: 'none !important',
      border: '1px solid transparent',
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  alignButtom: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      margin: '10px 0px 20px 0px',
    },
  },
  textFieldSearch: {
    borderRadius: '0px !important',
    background: '#ffffff',
    outline: 'none !important',
  },
  chipClass: {
    width: '120px',
    borderRadius: '5px !important',
    background: theme.palette.chip.unselected,
    color: theme.palette.chip.text,
    textAlign: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  circleClass: {
    background: theme.palette.chip.unselected,
    color: theme.palette.blackShades.d2,
    width: '40px',
    height: '40px',
    justifyContent: 'center',
    margin: 5,
    borderRadius: '100%',
    '&:hover': {
      backgroundColor: theme.palette.chip.unselected,
    },
    '&:focus': {
      backgroundColor: theme.palette.chip.unselected,
    },
  },
  onSelectchipClass: {
    background: `${theme.palette.chip.selection} !important`,
    color: `${theme.palette.chip.common} !important`,
    width: '120px',
    borderRadius: '5px !important',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  onSelectcircleClass: {
    background: `${theme.palette.chip.selection} !important`,
    color: `${theme.palette.chip.common} !important`,
    width: '40px',
    height: '40px',
    justifyContent: 'center',
    margin: 5,
    borderRadius: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  hidden: {
    display: 'none',
  },
  visible: {
    display: 'block',
  },
  textFieldType: {
    background: `${theme.palette.primary.light} !important`,
    borderRight: '2px solid #F7F6F4',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
    },
  },
  borderBottom: {
    background: `${theme.palette.primary.light} !important`,
    border: '0px solid transparent',
    outline: 'none !important',
    '&:hover': {
      border: 'none !important',
      outline: 'none !important',
    },
    '&:focus': {
      border: 'none !important',
      outline: 'none !important',
    },
    '&&&:before': {
      border: 'none',
    },
    '&&:after': {
      border: 'none',
    },
  },
  borderBottomDropdown: {
    background: `${theme.palette.primary.light} !important`,
    border: '0px solid transparent',
    //borderRight:'1px solid gray',
    outline: 'none !important',
    '&:hover': {
      border: 'none !important',
      borderRight: '1px solid gray',
      outline: 'none !important',
    },
    '&:focus': {
      border: 'none !important',
      //borderRight:'1px solid gray',
      outline: 'none !important',
    },
    '&&&:before': {
      border: 'none',
      //borderRight:'1px solid gray',
    },
    '&&:after': {
      border: 'none',
      //borderRight:'1px solid gray',
    },
  },

  iconStyle: {
    backgroundColor: '#FF3399',
    padding: 13,
    borderRadius: 5,
    '&:hover': {
      backgroundColor: '#FF5CAD',
    },
  },
  textFieldGrid: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },

  textField: {
    boxShadow: '-2px 1px 3px #00000029',
    borderRadius: '5px 0px 0px 5px',
    '& .MuiOutlinedInput-input': {
      background: '#ffffff',
      fontSize: '0.9rem',
      fontWeight: '500',
      padding: 14.5,
      borderRadius: '5px 0px 0px 5px',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-marginDense': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
    '& input::placeholder': {
      fontSize: '1rem',
      color: '#000000',
      opacity: 1,
      [theme.breakpoints.down('md')]: {
        fontSize: '0.8rem',
      },
    },
  },

  noBorder: {
    border: 'none',
  },
  input1: {
    background: '#ffffff',
    // borderBottom: '1px solid transparent !important',
    borderRadius: '5px 0px 0px 5px',
    outline: 'none !important',
    paddingRight: 18,
    '&:focus': {
      background: '#ffffff !important',
    },
    '&:active': {
      background: '#ffffff !important',
    },
    '&:hover': {
      background: '#ffffff !important',
    },
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
    disableUnderline: true,
  },

  paperroot: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    // width: 400,
    boxShadow: '0px 1px 3px #00000029',
    borderRadius: '0px 5px 5px 0px',
  },
  paperinput: {
    marginLeft: theme.spacing(4),
    flex: 1,
    font: 'caption',
    fontWeight: '500',
    fontSize: '1rem',
    '& input::placeholder': {
      fontSize: '1rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '0.8rem',
      },
    },
  },
  papericonButton: {
    padding: 2,
    borderRadius: 0,
    marginRight: 15,
    opacity: 0.4,
    '&:hover': {
      background: '#F4F4F4',
      opacity: 1,
    },
  },
  paperdivider: {
    height: 38,
    margin: 4,
  },
  container: {
    // border:"2px solid",
    position: 'sticky',
    top: 55,
    zIndex: 1,
    background: '#f7f6f4',
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    // 'input:disabled ~ &': {
    //   boxShadow: 'none',
    //   background: 'rgba(206,217,224,.5)',
    // },
  },
  checkedIcon: {
    backgroundColor: theme.palette.button.paginated.color,
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.button.paginated.color,
    },
  },
  formLabel: {
    marginBottom: 0,
    '& .MuiTypography-body1': {
      fontSize: '1rem',
      fontWeight: '400',
      color: '#6E6E6E',
    },
    '& svg': {
      width: '1rem',
      height: '1rem',
    },
  },
}));

const PrettoSlider = withStyles(theme => ({
  root: {
    color: '#FF3399',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    background: `${theme.palette.primary.light} !important`,
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
}))(Slider);

function Searchpatient(props) {
  //-------------- using thunk ----------------
  useSearchPatientSlice();
  //-------------- using thunk ----------------

  const theme = useTheme();
  const [cancerValue, setCancerValue] = React.useState(null);
  const [data, setData] = useState({
    query: false,
    isDrawerOpen: false,
    filterOptions: [
      { code: 'Bladder', display: 'Bladder Cancer' },
      { code: 'Lung', display: 'Lung Cancer' },
      { code: 'Breast', display: 'Breast Cancer' },
    ],
    patientType: [
      { value: 'Triage', label: 'Triage' },
      { value: 'Active', label: 'Active' },
      { value: 'Survivor', label: 'Survivor' },
    ],
    stageOptions: [
      { value: '1', label: 'I' },
      { value: '2', label: 'II' },
      { value: '3', label: 'III' },
      { value: '4', label: 'IV' },
    ],
    kscoreOptions: [
      { value: '0', label: '0' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' },
    ],
    activeFilter: [],
    activeStage: [],
    activeType: [],
    activeScore: [],
    value: 'null',
  });
  const [ageValue, setAgeValue] = React.useState([null, null]);
  const [ecogValue, setEcogValue] = React.useState([null, null]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [maxItemsPerPage, setmax] = React.useState(SEARCH_LIMIT);

  const [page, setPage] = useState(1);
  // add loader refrence
  const loaders = useRef(null);
  const history = useHistory();
  const classes = useStyles();

  //-------------------- using thunk get data --------------------
  // searchresulterror
  let Data = props.searchPatient && props.searchPatient.actdata;
  let searchresult =
    props.searchPatient && props.searchPatient.searchresultdata;
  let loader = props.searchPatient && props.searchPatient.searchListLoading;
  ////-------------------- using thunk get data --------------------

  //-------------------- using thunk api call start --------------------
  const [cancerData, cancerMasterData] = useState([]);
  const callIntentApi = async () => {
    const { payload } = await props.valueSetSearch({
      url: 'http://dataquent.com/fhir/us/custom/ValueSet/custom-cancer-type-vs',
    });
    cancerMasterData(payload && payload.message ? [] : payload);
    setData({
      ...data,
      filterOptions: payload && payload.message ? [] : payload,
    });
  };

  useEffect(() => {
    callIntentApi();
  }, []);
  // -------------------- using thunk api call end --------------------

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loaders.current) {
      observer.observe(loaders.current);
    }
  }, []);

  useEffect(() => {
    const id = 0;
    const url = ' ';
    const sortOrder = '';
    const limit = SEARCH_LIMIT;
    let search = 'string';
    let value = data.query == false ? 'string' : data.query;
    onLoad(
      url,
      sortOrder,
      limit,
      id,
      search,
      value,
      ageValue,
      data.value,
      ecogValue,
      data.activeScore.map(i => Number(i)),
      data.activeStage,
      data.activeType,
      data.activeFilter,
      cancerValue,
    );

    //console.log('data.activeScore', data.activeScore.map(i=>Number(i)))
  }, [
    data.activeScore,
    ageValue,
    ecogValue,
    data.value,
    data.activeStage,
    data.activeType,
    data.activeFilter,
    cancerValue,
  ]);

  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage(page => page + 1);
    }
  };

  useEffect(() => {
    fetchMoreData(SEARCH_LIMIT);
  }, [page]);

  const handleChange = values => {
    const id = 0;
    const url = ' ';
    const sortOrder = '';
    const limit = SEARCH_LIMIT;
    let search = 'string';
    let value = 'string';

    if (values != '') {
      search = 'Name';
      value = values.trim();
    }

    onLoad(
      url,
      sortOrder,
      limit,
      id,
      search,
      value,
      ageValue,
      data.value,
      ecogValue,
      data.activeScore.map(i => Number(i)),
      data.activeStage,
      data.activeType,
      data.activeFilter,
      cancerValue,
    );
    setData({ ...data, query: values });

    setCurrentPage(0);
    setmax(SEARCH_LIMIT);
  };

  //using debouncing
  const onDebounceLoadData = useDebouncing(handleChange);
  const onHandleChange = value => {
    onDebounceLoadData(value);
  };

  const onEnterPress = ev => {
    if (ev.key === 'Enter') {
      // Do code here
      ev.preventDefault();
    }
  };

  const onLoad = async (
    url,
    sortOrder,
    limit,
    id,
    search,
    value,
    ageValue,
    gValue,
    ecogValue,
    activeScore,
    activeStage,
    activeType,
    activeFilter,
    cancerValue,
  ) => {
    const { payload } = await props.loadSearchPatientData({
      url,
      sortOrder,
      limit,
      id,
      search,
      value,
      ageValue,
      gValue,
      ecogValue,
      activeScore,
      activeStage,
      activeType,
      activeFilter,
      cancerValue,
    });

    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  const fetchMoreData = limit_get => {
    //console.log('limit_get',limit_get)

    if (
      searchresult &&
      searchresult.nextResultUrl !== undefined &&
      searchresult.nextResultUrl !== null
    ) {
      const id = 1;
      const url = searchresult.nextResultUrl;
      const sortOrder = '';
      const limit = limit_get;
      let search = 'string';
      let value = 'string';
      onLoad(
        url,
        sortOrder,
        limit,
        id,
        search,
        value,
        ageValue,
        data.value,
        ecogValue,
        data.activeScore.map(i => Number(i)),
        data.activeStage,
        data.activeType,
        data.activeFilter,
        cancerValue,
      );
    }
  };

  const toggleDrawerOpenClose = e => {
    e.preventDefault();
    setData({
      ...data,
      isDrawerOpen: !data.isDrawerOpen,
    });
  };

  const [indicatorsType, setIndicatorsType] = React.useState('All');
  const [searchIndicators, setSearchIndicators] = React.useState('');
  const [checked, setChecked] = React.useState({
    savedQuestion: true,
    advancedFilter: false,
  });

  const color = letter =>
    letter === 'Basic Indicator'
      ? '#886F66'
      : letter === 'Composite Indicator'
        ? '#37845B'
        : '#DA1F91';

  const onFilterChange = filters => {
    const filter = filters;
    const { activeFilter } = data;

    if (activeFilter.includes(filter)) {
      const filterIndex = activeFilter.indexOf(filter);
      const newFilter = [...activeFilter];
      newFilter.splice(filterIndex, 1);
      setData({
        ...data,
        activeFilter: newFilter,
      });
    } else {
      setData({
        ...data,
        activeFilter: [...activeFilter, filter],
      });
    }
  };

  const onTypeChange = filters => {
    const filter = filters;
    const { activeType } = data;

    if (activeType.includes(filter)) {
      const filterIndex = activeType.indexOf(filter);
      const newFilter = [...activeType];
      newFilter.splice(filterIndex, 1);
      setData({
        ...data,
        activeType: newFilter,
      });
    } else {
      setData({
        ...data,
        activeType: [...activeType, filter],
      });
    }
  };

  const onStageChange = filters => {
    const filter = filters;
    const { activeStage } = data;

    if (activeStage.includes(filter)) {
      const filterIndex = activeStage.indexOf(filter);
      const newFilter = [...activeStage];
      newFilter.splice(filterIndex, 1);
      setData({
        ...data,
        activeStage: newFilter,
      });
    } else {
      setData({
        ...data,
        activeStage: [...activeStage, filter],
      });
    }
  };

  const onScoreChange = filters => {
    //console.log('filteris', filters)
    const filter = filters;
    const { activeScore } = data;

    if (activeScore.includes(filter)) {
      const filterIndex = activeScore.indexOf(filter);
      const newFilter = [...activeScore];
      newFilter.splice(filterIndex, 1);
      setData({
        ...data,
        activeScore: newFilter,
      });
    } else {
      setData({
        ...data,
        activeScore: [...activeScore, filter],
      });
    }
  };

  const onCancerChange = (event, newValue) => {
    setCancerValue(newValue != null ? newValue.code : newValue);
  };

  const CancerTypeData = (
    <ChipSet filter style={{ padding: 0 }}>
      {data.filterOptions.map((t, index) => {
        return (
          <Chip
            key={(index + 1).toString()}
            className={
              data.activeFilter.includes(t.code)
                ? classes.onSelectchipClass
                : classes.chipClass
            }
            checked={data.activeFilter.includes(t.code)}
            onClick={() => onFilterChange(t.code)}
            id={t.code}
            label={t.display}
          />
        );
      })}
    </ChipSet>
  );

  // const [value, setValue] = React.useState('female');

  // const handleGenderChange = (event) => {
  //   setValue(event.target.value);
  // };

  const handleGenderChange = event => {
    setData({ ...data, value: event.target.value });
  };

  const RadioData = (
    <FormControl component="fieldset">
      <RadioGroup
        row
        aria-label="gender"
        name="gender1"
        value={data.value}
        onChange={handleGenderChange}
      >
        <FormControlLabel
          control={<GreenRadio />}
          className={classes.formLabel}
          value="Female"
          label="Female"
        />
        <FormControlLabel
          control={<GreenRadio />}
          className={classes.formLabel}
          value="Male"
          label="Male"
        />
      </RadioGroup>
    </FormControl>
  );

  const PatientData = (
    <ChipSet filter>
      {data.patientType.map((t, index) => {
        return (
          <Chip
            key={(index + 1).toString()}
            className={
              data.activeType.includes(t.value)
                ? classes.onSelectchipClass
                : classes.chipClass
            }
            checked={false}
            onClick={() => onTypeChange(t.value)}
            id={t.value}
            label={t.label}
          />
        );
      })}
    </ChipSet>
  );

  const StageData = (
    <ChipSet filter>
      {data.stageOptions.map((t, index) => {
        return (
          <Chip
            key={(index + 1).toString()}
            className={
              data.activeStage.includes(t.value)
                ? classes.onSelectcircleClass
                : classes.circleClass
            }
            checked={data.activeStage.includes(t.value)}
            onClick={() => onStageChange(t.value)}
            id={t.value}
            label={t.label}
          />
        );
      })}
    </ChipSet>
  );

  const KScoreData = (
    <ChipSet filter>
      {data.kscoreOptions.map((t, index) => {
        return (
          <Chip
            key={(index + 1).toString()}
            className={
              data.activeScore.includes(t.value)
                ? classes.onSelectcircleClass
                : classes.circleClass
            }
            checked={data.activeScore.includes(t.value)}
            onClick={() => onScoreChange(t.value)}
            id={t.value}
            label={t.label}
          />
        );
      })}
    </ChipSet>
  );

  const handleAgeChange = (event, newValue) => {
    setAgeValue(newValue);
  };

  const handleEcogChange = (event, newValue) => {
    setEcogValue(newValue);
  };
  const AgeData = (
    <PrettoSlider
      min={0}
      max={150}
      valueLabelDisplay="auto"
      aria-labelledby="Age"
      value={ageValue}
      onChange={handleAgeChange}
    />
  );

  const EScoreData = (
    <PrettoSlider
      valueLabelDisplay="auto"
      aria-labelledby="Ecog Score"
      value={ecogValue}
      onChange={handleEcogChange}
    />
  );

  const [buttonHover, setButtonHovered] = React.useState(false);

  const showPatientRegistration = () => {
    history.push(ROUTES_CONSTANTS.CREATE_PATIENTS);
  };
  // console.log(props);

  return (
    <>
      <Grid container spacing={4} className={classes.container}>
        <Grid item xs={12}>
          <PageTitleText>Search</PageTitleText>
        </Grid>
        <Grid
          item
          xs
          className={
            data.isDrawerOpen
              ? classes.shiftTextRightHeader
              : classes.shiftTextLeftHeader
          }
        >
          <form className={classes.root} noValidate autoComplete="off">
            <Grid
              container
              justifyContent="center"
              direction="row"
              className={classes.gridContainerFilter}
            >
              <Grid className={classes.textFieldGrid} item sm={1} />
              <Grid className={classes.textFieldGrid} item sm={2} xs={12}>
                <Autocomplete
                  fullWidth={true}
                  // autoSelect: true,
                  options={cancerData}
                  getOptionLabel={option => option.display || ''}
                  onChange={(e, value) => {
                    if (value !== null) {
                      setData({ ...data, activeFilter: [value.code] });
                    } else {
                      setData({ ...data, activeFilter: [] });
                    }
                  }}
                  renderOption={option => {
                    const cancerNam = option && option.display;
                    return (
                      <div
                        style={{
                          color: 'black',
                        }}
                      >
                        <Typography variant="h3">{cancerNam}</Typography>
                      </div>
                    );
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder={'All Cancer Types'}
                      className={classes.textField}
                      variant="outlined"
                      InputProps={{
                        ...params.InputProps,
                        className: classes.input1,
                        classes: { notchedOutline: classes.noBorder },
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={5} xs={12}>
                <Paper
                  component="form"
                  className={classes.paperroot}
                  elevation={0}
                >
                  <Divider
                    className={classes.paperdivider}
                    orientation="vertical"
                  />

                  <InputBase
                    className={classes.paperinput}
                    placeholder="Search Your Patient Name"
                    onChange={e => onHandleChange(e.target.value)}
                    onKeyPress={onEnterPress}
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />

                  <IconButton
                    color="primary"
                    type="reset"
                    onClick={() => handleChange('')}
                    className={classes.papericonButton}
                    aria-label="directions"
                  >
                    <ClearIcon />
                  </IconButton>

                  <div>
                    <IconButton
                      color="primary"
                      // type="reset"
                      // onClick={() => setData({ ...data, query: "" })}
                      className={classes.iconStyle}
                      aria-label="directions"
                    >
                      <img src={IconSearchWhite} height="20px" width="25px" />
                    </IconButton>
                  </div>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={3}>
                <div className={classes.alignButtom}>
                  <Button
                    // type="submit"
                    variant="outlined"
                    className={classes.submit}
                    onClick={toggleDrawerOpenClose}
                  >
                    Filter
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12} sm={2} />
            </Grid>
          </form>
        </Grid>
      </Grid>

      <Divider style={{ margin: '20px 0px' }} />

      {Data ? (
        <div className={classes.main}>
          <div className={classes.cardsWrapper}>
            <Grid container>
              <Grid
                item
                sm={12}
                xs={12}
                className={
                  data.isDrawerOpen
                    ? classes.shiftTextRight
                    : classes.shiftTextLeft
                }
              >
                <Grid container spacing={2} direction="row">
                  {Data &&
                    Data.map((x, index) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sm={data.isDrawerOpen == true ? 3 : 4}
                          md={data.isDrawerOpen == true ? 3 : 4}
                          lg={data.isDrawerOpen == true ? 4 : 3}
                          key={(index + 1).toString()}
                        >
                          <SearchpatientCard
                            key={(index + 1).toString()}
                            display={x.patient.display}
                            first={x.patient.first}
                            last={x.patient.last}
                            age={x.patient.age}
                            gender={x.patient.gender}
                            resourceId={x.patient.resourceId}
                            address={x.patient.address}
                            image={x.patient.image}
                            open={data.isDrawerOpen}
                            disease={
                              x.primaryCancerCondition.code != null
                                ? x.primaryCancerCondition.code.display
                                : null
                            }
                            useWindow={false}
                          />
                        </Grid>
                      );
                    })}
                </Grid>
              </Grid>
              <Grid item sm={4} xs={12} align="start">
                <Drawer
                  BackdropProps={{ open: false, invisible: true }}
                  anchor="right"
                  className={classes.drawer}
                  variant="persistent"
                  classes={{
                    paper: classes.drawerPaperStyle,
                  }}
                  open={data.isDrawerOpen}
                >
                  <IconButton
                    aria-label="close"
                    className={classes.clsButton}
                    onClick={e =>
                      setData({
                        ...data,
                        isDrawerOpen: false,
                      })
                    }
                  >
                    <CloseIcon style={{ fontSize: 25 }} />
                  </IconButton>

                  <div
                    style={{ width: '500px', marginBottom: 60, width: '100%' }}
                  >
                    <FilterHeader
                      title="Filter"
                      onClick={() => {
                        setData({
                          ...data,
                          activeFilter: [],
                          activeStage: [],
                          activeType: [],
                          activeScore: [],
                          value: 'null',
                        });
                        setAgeValue([null, null]);
                        setEcogValue([null, null]);
                      }}
                    />
                    <FilterCard
                      Data={CancerTypeData}
                      title="Cancer Type"
                      Id={1}
                      value={1}
                      onClick={() => setData({ ...data, activeFilter: [] })}
                    />

                    <FilterCard
                      Data={RadioData}
                      title="Gender"
                      Id={1}
                      value={1}
                      onClick={() => setData({ ...data, value: 'null' })}
                    />
                    <FilterCard
                      Data={StageData}
                      title="Cancer Stage"
                      Id={1}
                      value={1}
                      onClick={() => setData({ ...data, activeStage: [] })}
                    />
                    <FilterCard
                      Data={AgeData}
                      title="Patient Age"
                      Id={0}
                      value={ageValue}
                      onClick={() => setAgeValue([null, null])}
                      change={(n1, n2) => setAgeValue([n1, n2])}
                    />
                    {/* <FilterCard Data={PatientData} title="Patient Type" Id={1} value ={1} 
                    onClick={()=> setData({ ...data,
                      activeType: [],
                    })}
                  />  */}
                    {/* <FilterCard Data={EScoreData} title="ECOG Score" Id={0} value ={ecogValue} 
                    onClick={()=>setEcogValue([null,null])} change={(n1,n2)=>setEcogValue([n1,n2])}
                  /> */}
                    {/* data name is change KScoreData==EScoreData */}
                    {/* <FilterCard Data={KScoreData} title="ECOG Score" Id={1} value ={1} 
                    onClick={()=> setData({ ...data,
                      activeScore: [],
                    })}
                  /> */}
                  </div>
                </Drawer>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : null}

      {
        <div
          ref={loaders}
          className={
            searchresult &&
              searchresult.nextResultUrl !== undefined &&
              searchresult.nextResultUrl !== null
              ? classes.visible
              : classes.hidden
          }
        >
          {/* <h2>Load More</h2>*/}
        </div>
      }
      {loader == true && searchresult && searchresult.length < 1 ? (
        <Skeleton />
      ) : loader == false && Data.length == 0 ? (
        <NoRecord />
      ) : null}
      <div />
      <div className={classes.Bottom}>
        <Fab
          aria-label="add"
          style={{ float: 'right' }}
          className={
            buttonHover
              ? classes.showHideFloatingButton
              : classes.floatingButton
          }
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          onClick={() => showPatientRegistration(false)}
        >
          {buttonHover ? <span>Add New Patient</span> : null}
          <AddIcon />
        </Fab>
      </div>
    </>
  );
}
//-------------------- using thunk get data through reducers --------------------
const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
    // using thunk------------------------------->
    loadSearchPatientData: (
      url,
      sortOrder,
      limit,
      id,
      search,
      value,
      ageValue,
      gValue,
      ecogValue,
      activeScore,
      activeStage,
      activeType,
      activeFilter,
      cancerValue,
    ) =>
      dispatch(
        loadSearchPatientData(
          url,
          sortOrder,
          limit,
          id,
          search,
          value,
          ageValue,
          gValue,
          ecogValue,
          activeScore,
          activeStage,
          activeType,
          activeFilter,
          cancerValue,
        ),
      ),

    valueSetSearch: payload => dispatch(valueSetSearch(payload)),
    // using thunk------------------------------->

    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withRouter,
  MessageComponent,
)(Searchpatient);
