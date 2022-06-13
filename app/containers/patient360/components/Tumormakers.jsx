/*eslint-disable*/
import { Box, Card, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { filter } from 'lodash';
import moment from 'moment';
import React from 'react';
import ViewTable from '../../../components/table/ViewTable';
import { EPISODE_DATE_FORMAT, NO_RECORD } from '../../../utils/constants';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // padding:15,
    height: 450,
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.card.main,

    borderRadius: '5px',
    boxShadow: '0px 2px 4px #00000029',
  },
  headerCard: {
    padding: '0px !important',
    height: 40,
    background: 'white',
    borderBottom: '3px solid #eeeeee',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 15,
  },
  cardAction: {
    margin: '0px 0px !important',
  },
  td: {
    fontSize: 12,
    fontWeight: 'bold',
  },

  date: {
    padding: '20px',
    fontWeight: 500,
  },
}));

// debugger;
export default function TumorMarkers(props) {
  const classes = useStyles();
  const [pageData, setPageData] = React.useState(props.Data);

  React.useEffect(() => {
    // debugger;
    let data = [];
    let arr1 = [];

    arr1 =
      props.Data && props.Data.length > 0
        ? filter(props.Data, {
            valueCodeableConcept: {
              code: 'positive',
            },
          })
        : [];

    data =
      props.Data && props.Data.length > 0
        ? props.Data.filter(val => {
            return val.valueCodeableConcept === null;
          })
        : [];
    // console.log('props.Data', props.Data);
    setPageData([...arr1, ...data]);
  }, [props.Data]);

  let rows = pageData || [];
  const defaultHeadCells = [
    {
      id: 'code',
      label: '',
      maxWidth: 100,
      render: ({ value }) => {
        return value && value.display ? (
          <span style={{ fontWeight: 500 }}>{value.display}</span>
        ) : (
          '-'
        );
      },
    },
    {
      id: 'note',
      label: '',
      maxWidth: 75,
      render: ({ value, row }) => {
        return row.note
          ? row.note
          : row.valueQuantity && row.valueQuantity.value
          ? row.valueQuantity.value
          : '-';
      },
    },
  ];

  return (
    <Card className={classes.root} elevation={0}>
      <CardHeader
        title="Tumor Markers"
        className={classes.headerCard}
        classes={{
          title: classes.cardTitle,
          action: classes.cardAction,
        }}
      />
      {rows && rows.length > 0 ? (
        <Box mt={2} style={{ height: '100%' }}>
          <ViewTable
            rows={rows}
            headCells={defaultHeadCells}
            withoutHeader={true}
            footer={
              <Typography variant="h4" className={classes.date} gutterBottom>
                (
                {rows.length > 0 &&
                  moment(rows[0].effectiveDateTime)
                    .utc()
                    .format(EPISODE_DATE_FORMAT)}
                )
              </Typography>
            }
          />
        </Box>
      ) : (
        <CardContent>{NO_RECORD}</CardContent>
      )}
    </Card>
  );
}
