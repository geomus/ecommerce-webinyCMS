import React from 'react';
import { lighten, makeStyles, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import OrdersBtnCreate from './OrdersBtnCreate';


const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    }
}));

const OrdersTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                Orders
            </Typography>
            <OrdersBtnCreate/>
        </Toolbar>
    );
}

export default OrdersTableToolbar;

OrdersTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};