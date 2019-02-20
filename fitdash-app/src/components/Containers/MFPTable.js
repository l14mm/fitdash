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

import ConfigureContainer from './ConfigureContainer'
import * as actions from '../../actions';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    }
}))(TableCell);

const styles = theme => ({
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});

class MFPTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: new Date('2014-08-18T21:11:54'),
            endDate: new Date('2014-08-21T21:11:54')
        }
    }

    setStartDate = date => this.setState({ startDate: date });

    setEndDate = date => this.setState({ endDate: date });

    configureClicked = () => this.props.showConfigureDialog(this.configView());

    configView() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container style={{ width: '60%' }} justify="space-around">
                    <DatePicker
                        margin="normal"
                        label="Start date"
                        value={this.state.startDate}
                        onChange={this.setStartDate}
                    />
                    <DatePicker
                        margin="normal"
                        label="End date"
                        value={this.state.endDate}
                        onChange={this.setEndDate}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
        )
    }

    render() {
        const { classes, data } = this.props;
        return (
            <>
                <ConfigureContainer {...this.props} configureClicked={this.configureClicked} configView={this.configView} />
                {data && data.map(row => (
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
                ))}
            </>
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