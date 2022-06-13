import { CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  doReportsDownloadData,
  loadReportsData,
} from '../../../../apis/patient360Apis/patient360Slice';
import { saveReportsDownloadData } from '../../../../apis/patient360Apis/serviceCalls';
import { MessageComponent } from '../../../../components';
import jpg_logo from '../../../../images/assets/jpg_format_logo.jpg';
import pdf_logo from '../../../../images/assets/pdf_download_icon.png';
import png_logo from '../../../../images/assets/png_format_logo.png';
import { NO_RECORD } from '../../../../utils/constants';
import { getFromLocalStorage } from '../../../../utils/localStorageUtils';

var FileSaver = require('file-saver');

const useStyles = makeStyles(theme => ({
  mainDiv: {
    height: '100%',
    overflowY: 'auto',
  },
  root: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: '0.7rem',
    fontWeight: '500',
  },
  cardAction: {
    alignSelf: 'center',
  },
  buttonProgress: {
    color: theme.palette.button.paginated.color,
    margin: 12,
  },
}));

function RightSidebarReports(props) {
  const { reportsData, reportsLoader } = props;

  const classes = useStyles();
  const [downloadReport, setDownloadedReport] = useState(null);
  const [downloadHeading, setDownloadedHeading] = useState(null);
  function base64ToBlob(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    let str = '';
    if (base64.charAt(0) === '/') {
      str = 'image/jpeg';
    } else if (base64.charAt(0) === 'i') {
      str = 'image/png';
    } else if (base64.charAt(0) === 'J') {
      str = 'application/pdf';
    }

    return new Blob([bytes], { type: str });
  }

  const getHeading = heading => {
    return setDownloadedHeading(heading);
  };

  if (
    downloadReport != null &&
    downloadReport.data != undefined &&
    downloadHeading != null
  ) {
    // console.log("downloadReport",downloadReport)
    // console.log("downloadHeading",downloadHeading)

    var blog = base64ToBlob(downloadReport.data);
    // console.log(blog)

    let filename = `${downloadHeading}`;

    if (blog.type === 'image/jpeg') {
      filename += '.jpg';
    } else if (blog.type === 'image/png') {
      filename += '.png';
    } else if (blog.type === 'application/pdf') {
      filename += '.pdf';
    }

    FileSaver.saveAs(blog, filename);

    setDownloadedReport(null);
    setDownloadedHeading(null);
  }

  const getTitle = async name => {
    let title = name.toString();

    const { payload } = await props.doReportsDownloadData(
      saveReportsDownloadData(title),
    );

    if (payload && payload.status === 200) {
      props.snackbarShowMessage(payload.data.message, 'success');
      setDownloadedReport(payload.data);
    } else if (payload && payload.message) {
      let m =
        payload.response &&
        payload.response.data &&
        payload.response.data.message
          ? payload.response.data.message
          : payload.message;

      props.snackbarShowMessage(m, 'error');
    }
  };

  useEffect(() => {
    let id = '';

    if (props.Id !== undefined) {
      id = props.Id;
    } else {
      id = getFromLocalStorage('resourceId');
    }

    console.log(id);
    let field = {
      id: id,
    };
    onLoad(field);
  }, []);

  const onLoad = async field => {
    const { payload } = await props.loadReportsData(field);

    if (payload && payload.message) {
      props.snackbarShowMessage(payload.message, 'error');
    }
  };

  const getLogo = val => {
    let src = '';

    let res = val.cancerDocumentReference.content.map(y => {
      return y.attachment.title;
    });

    // console.log("res",res)
    if (res !== undefined && res[0] !== null) {
      if (res[0].toLocaleLowerCase().includes('jpg')) {
        src = jpg_logo;
      } else if (res[0].toLocaleLowerCase().includes('png')) {
        src = png_logo;
      } else if (res[0].toLocaleLowerCase().includes('pdf')) {
        src = pdf_logo;
      }
    }
    // debugger
    return src;
  };

  return (
    <>
      <div className={classes.mainDiv}>
        {!reportsLoader &&
        reportsData &&
        reportsData.cancerDocumentReferences &&
        reportsData.recordCount != null ? (
          <div>
            {reportsData.cancerDocumentReferences.map(val => {
              return (
                <>
                  {' '}
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar
                          className={classes.avatar}
                          src={getLogo(val)}
                          alt="Not Found!"
                        />
                      }
                      action={
                        <IconButton aria-label="settings">
                          <GetAppIcon
                            onClick={() => {
                              getTitle(
                                val.cancerDocumentReference.content.map(y => {
                                  return y.attachment.title.split('|')[1];
                                }),
                              );
                              getHeading(
                                val.cancerDocumentReference.recordName,
                              );
                            }}
                          />
                        </IconButton>
                      }
                      title={val.cancerDocumentReference.recordName}
                      subheader={`Date-${moment(
                        val.cancerDocumentReference.date,
                      ).format('DD/MM/YYYY')}`}
                      classes={{
                        title: classes.cardTitle,
                        subheader: classes.subHeader,
                        action: classes.cardAction,
                      }}
                    />
                  </Card>
                </>
              );
            })}
          </div>
        ) : reportsLoader ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {<CircularProgress size={30} className={classes.buttonProgress} />}
          </div>
        ) : (
          NO_RECORD
        )}
      </div>
    </>
  );
}

const mapStateToProps = state => state.patient360;

export function mapDispatchToProps(dispatch) {
  return {
    doReportsDownloadData: name => dispatch(doReportsDownloadData(name)),
    loadReportsData: id => dispatch(loadReportsData(id)),
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
)(RightSidebarReports);
