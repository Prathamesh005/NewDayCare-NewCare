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
} from '../../../../apis/administrationApis/administrationSlice';
import {
  OuterBox,
  OutlinedAutoCompleteInput,
  PageTitleText,
  SearchInput,
  SquareIconButton,
  ViewTable,
  WhiteButton,
  MessageComponent,
} from '../../../../components';
import { List_DATE_TIME_DISPLAY } from '../../../../utils/constants';
import { ROUTES_CONSTANTS } from '../../../app/routeConstants';
const Skeleton = React.lazy(() => import('../../../skeleton/tableSkeletone'));
const NoRecord = React.lazy(() =>
  import('../../../../components/elements/NoRecordPage'),
);
import uploadIcon from '../../../../images/assets/upload.svg';
import spreadsheetImage from 'images/assets/google-spreadsheet.svg';
import { Box } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
// import XLSX from 'xlsx';

const useStyles = makeStyles(theme => ({}));

function LabMaster(props) {
  useAdministrationSlice();
  const {} = props;
  const classes = useStyles();
  const [data, setData] = useState({
    query: false,
    date: moment().format(List_DATE_TIME_DISPLAY),
    activeFilter: [],
  });
  const [LocalLoader, setLocalLoader] = React.useState(false);
  const history = useHistory();

  const handleChange = value => {
    setData({ ...data, query: value });
  };

  const onSearch = () => {};

  const Data = [
    {
      code: 'NQLAB 00000029',
      labName: 'Anti Microsomal Antibody (AMA)',
      dates: '20/04/2022 to 19/05/2022',
      providerMrp: '1985',
      providerNQCost: '1200',
      nqPriceList: '1700',
      nqOfferList: '1400',
    },
    {
      code: 'NQLAB 00000028',
      labName: '17 OH Progesterone',
      dates: '20/04/2022 to 19/05/2022',
      providerMrp: '1200',
      providerNQCost: '1700',
      nqPriceList: '1200',
      nqOfferList: '1700',
    },
    {
      code: 'NQLAB 00000028',
      labName: '17 OH Progesterone',
      dates: '20/04/2022 to 19/05/2022',
      providerMrp: '1200',
      providerNQCost: '1700',
      nqPriceList: '1200',
      nqOfferList: '1700',
    },
    {
      code: 'NQLAB 00000029',
      labName: 'Anti Microsomal Antibody (AMA)',
      dates: '20/04/2022 to 19/05/2022',
      providerMrp: '1985',
      providerNQCost: '1200',
      nqPriceList: '1700',
      nqOfferList: '1400',
    },
  ];
  // console.log('Data', Data);
  const search = data.query;
  if (search && search.length > 0) {
    // Data =
    //   practitionerList &&
    //   practitionerList.filter(eachVal => {
    //     let opt =
    //       eachVal.practitioner.display
    //         .toLowerCase()
    //         .search(search.toLowerCase()) !== -1;
    //     return opt;
    //   });
  }

  const defaultHeadCells = [
    {
      id: 'code',
      label: 'Code',
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'labName',
      label: 'Name',
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'dates',
      label: 'Rate Effective Date/Rate End Date',
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'providerMrp',
      label: 'Provider MRP',
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'providerNQCost',
      label: 'Provider nQ Cost',
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'nqPriceList',
      label: 'nQ List Price',
      render: ({ value }) => {
        return value;
      },
    },
    {
      id: 'nqOfferList',
      label: 'nQ Offer Price',
      render: ({ value }) => {
        return value;
      },
    },

    {
      id: 'practitioner',
      label: '',
      maxWidth: '80px',
      width: '80px',

      render: ({ value, row }) => {
        return (
          <SquareIconButton
            onClick={() => {
              history.push(ROUTES_CONSTANTS.ADMINISTRATION_LAB_MASTER_EDIT);
            }}
            style={{ padding: 4 }}
          >
            <Edit style={{ fontSize: '1.2rem' }} />
          </SquareIconButton>
        );
      },
    },
  ];

  const handleJsonToExcel = () => {
    // /* generate worksheet and workbook */
    // const worksheet = XLSX.utils.json_to_sheet(Data);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Lab-Names");
    // /* fix headers */
    // XLSX.utils.sheet_add_aoa(worksheet, [["code", "labName", "dates", "providerMrp", "providerNQCost", "nqPriceList", "nqOfferList"]], { origin: "A1" });
    // /* calculate column width */
    // const max_width = Data.reduce((w, r) => Math.max(w, r.labName.length), 10);
    // worksheet["!cols"] = [{ wch: max_width }];
    // /* create an XLSX file and try to save to Presidents.xlsb */
    // XLSX.writeFile(workbook, "LabName.xlsx");
  };
  const OuterBoxTopComponent = () => {
    return (
      <>
        <Grid container>
          <Grid item xs sm={4}>
            <SearchInput
              onChange={e => handleChange(e.target.value)}
              placeholder="Search by Name, code"
            />
          </Grid>
          <Grid item xs>
            <Box display="flex">
              <OutlinedAutoCompleteInput
                placeholder={'Search By Provider'}
                style={{ width: 200, marginLeft: 20 }}
                onChange={onSearch}
                options={[]}
                getOptionLabel={option => option.display || ''}
                value={{
                  code: '',
                  display: '',
                }}
              />
              <OutlinedAutoCompleteInput
                placeholder={'Search By Category'}
                style={{ width: 200, marginLeft: 20 }}
                onChange={onSearch}
                options={[]}
                getOptionLabel={option => option.display || ''}
                value={{
                  code: '',
                  display: '',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs style={{ textAlign: 'end' }}>
            <WhiteButton
              variant="contained"
              color="primary"
              component="span"
              style={{ float: 'inline-end' }}
              startIcon={
                <img
                  src={spreadsheetImage}
                  alt="upload"
                  height="15rem"
                  width="20rem"
                />
              }
              onClick={() => handleJsonToExcel()}
            >
              Download MasterSheet
            </WhiteButton>
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
            <div style={{ height: 450, width: '100%' }}>
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
              <PageTitleText>Lab Master</PageTitleText>
            </Grid>

            <Grid
              item
              xs
              sm={8}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              <WhiteButton
                variant="contained"
                color="primary"
                component="span"
                startIcon={
                  <img
                    src={uploadIcon}
                    alt="Not Found"
                    height="15px"
                    width="20px"
                  />
                }
                onClick={() => {
                  history.push(
                    ROUTES_CONSTANTS.ADMINISTRATION_LAB_MASTER_UPLOAD,
                  );
                }}
              >
                Bulk Upload
              </WhiteButton>
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
    </Fragment>
  );
}

const mapStateToProps = state => state;

export function mapDispatchToProps(dispatch) {
  return {
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
)(LabMaster);
