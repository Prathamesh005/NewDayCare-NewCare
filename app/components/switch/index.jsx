import { withStyles } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

export const PinkSwitch = withStyles(theme => ({
    switchBase: {
        color: theme.palette.secondary.main,
        '&$checked': {
            color: theme.palette.button.paginated.color,
        },
        '&$checked + $track': {
            backgroundColor: theme.palette.button.paginated.color,
        },
    },
    checked: {},
    track: {},
}))(Switch);