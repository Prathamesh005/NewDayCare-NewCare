/*eslint-disable*/
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import themes from '../../../theme/theme';
import { NO_RECORD } from '../../../utils/constants';

const theme = themes;
const useStyles = makeStyles({
  tablecontainer: {},
  table: {
    minWidth: 550,
  },
  details: {
    // maxHeight: 180,
    // overflowY: "scroll"
  },
  card: {
    marginBottom: 20,
  },
  cardContent: {
    padding: '10px 15px',
    '&.MuiCardContent-root:last-child': {
      paddingBottom: '10px',
    },
  },
  addButton: {
    marginTop: 20,
    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'flex-start',
    },
  },
});

function Tabledata(props) {
  const classes = useStyles();
  const themes = useTheme();

  const [page, setPages] = React.useState(0);
  const [pageData, setPageData] = React.useState(props.Data);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  React.useEffect(() => {
    setPageData(props.Data);
  }, [props.Data, props.Id]);

  const Data =
    pageData && pageData.length > 5
      ? pageData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : pageData;

  return (
    <>
      <div className={classes.details}>
        {pageData != null && pageData.length > 0 ? (
          <>
            {pageData.map((row, index) => {
              return (
                <Card key={(index + 1).toString()} className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      gutterBottom
                      variant="h3"
                      component="span"
                      style={{
                        fontWeight: 500,
                        textTransform: 'capitalize',
                      }}
                    >
                      {row.relationship
                        ? row.relationship.display
                        : row.relationship.display}
                    </Typography>{' '}
                    <Typography
                      variant="h4"
                      component="span"
                      style={{ fontWeight: 500 }}
                      gutterBottom
                    >
                      {/* (1st Degree) */}
                    </Typography>
                    <Divider style={{ margin: '10px 0px' }} />
                    <Typography
                      variant="h4"
                      color="textSecondary"
                      style={{ fontWeight: 500 }}
                      gutterBottom
                    >
                      {row.condition != [] && row.condition
                        ? row.condition.map(x => {
                            return x.code ? x.code.display : x.code.text;
                          })
                        : 'n/a'}
                    </Typography>
                    <Typography
                      variant="h4"
                      component="span"
                      color="textSecondary"
                      style={{ fontWeight: 500 }}
                      gutterBottom
                    >
                      {row.condition != [] && row.condition
                        ? row.condition.map(x => {
                            return x.onSetAge ? ` ${x.onSetAge}` : 'n/a';
                          })
                        : 'n/a'}
                    </Typography>
                    {' - '}
                    <Typography
                      variant="h4"
                      component="span"
                      color="textSecondary"
                      style={{ fontWeight: 500 }}
                      gutterBottom
                    >
                      {row.condition &&
                      row.condition[0] &&
                      row.condition[0].outcome &&
                      row.condition[0].outcome.display
                        ? row.condition[0].outcome.display
                        : 'n/a'}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </>
        ) : (
          NO_RECORD
        )}
      </div>
    </>
  );
}

export default Tabledata;
