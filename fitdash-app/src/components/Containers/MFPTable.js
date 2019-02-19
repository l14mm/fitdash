import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';

import * as actions from '../../actions';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [{
    "meal1": [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ]
}];

class MFPTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date('2014-08-18T21:11:54'),
            endDate: new Date('2014-08-19T21:11:54')
        }
    }

    handleDateChange = date => {
        this.setState({ startDate: date });
    };

    configView() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container style={{ width: '60%' }} justify="space-around">
                    <DatePicker
                        margin="normal"
                        label="Start date"
                        value={this.state.startDate}
                        onChange={this.handleDateChange}
                    />
                    <DatePicker
                        margin="normal"
                        label="End date"
                        value={this.state.endDate}
                        onChange={this.handleDateChange}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            this.props.data && this.props.data.map(row => (
                <Table className={classes.table} key={row.name}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>{row.name}</CustomTableCell>
                            <CustomTableCell align='right'>Calories</CustomTableCell>
                            <CustomTableCell align='right'>Fat (g)</CustomTableCell>
                            <CustomTableCell align='right'>Carbs (g)</CustomTableCell>
                            <CustomTableCell align='right'>Protein (g)</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    {row.entries.map(entry => (
                        <TableBody key={entry.id}>
                            <TableRow className={classes.row}>
                                <CustomTableCell component="th" scope="row">
                                    {entry.name}
                                </CustomTableCell>
                                <CustomTableCell align='right'>{entry.calories}</CustomTableCell>
                                <CustomTableCell align='right'>{entry.fat}</CustomTableCell>
                                <CustomTableCell align='right'>{entry.carbs}</CustomTableCell>
                                <CustomTableCell align='right'>{entry.protein}</CustomTableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            ))
        )
    }
}

MFPTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    const data = [];
    if (state.mfp.mfpMeals !== null) {
        state.mfp.mfpMeals[0].meals.forEach(meal => {
            const entries = []
            meal.entry.forEach((entry, j) => {
                entries.push({ id: j, name: entry.name, calories: entry.totals.calories, fat: entry.totals.fat, carbs: entry.totals.carbohydrates, protein: entry.totals.protein })
            })
            data.push({ "name": meal.name, "entries": entries })
        })
    }
    return { data }
}

export default compose(
    connect(mapStateToProps, actions),
    withStyles(styles)
)(MFPTable);