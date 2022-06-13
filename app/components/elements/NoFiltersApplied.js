import React from 'react';
import NoFiltersSVG from '../../images/Apply Filters.svg';
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import messages from '../../translations/messages';

const useStyles = makeStyles(theme => ({
    addFilters: {
        color: '#9a9a9a',
        fontSize: 24,
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
        },
    },
}));

export default function NoFiltersApplied() {
    const classes = useStyles();
    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                textAlign: 'center',
            }}>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <img
                    style={{
                        maxHeight: '50%',
                        maxWidth: '50%',
                    }}
                    src={NoFiltersSVG} alt="NoFiltersApplied" />
                <div className={classes.addFilters} >
                    <FormattedMessage {...messages.filters.applyFilters} />
                </div>
            </div>
        </div>
    );
}
