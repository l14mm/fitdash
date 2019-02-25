import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

import ConfigureContainer from './ConfigureContainer'
import * as actions from '../../actions';

const COLORS = ['#2ecc71', '#e74c3c'];

class MFPPieChartCals extends Component {
    configureClicked = () => this.props.showConfigureDialog(this.configView());

    configView = () => <p>no config available</p>

    regenData = () => {
        setTimeout(() => {
            const newData = this.state.data.map((i) => ({ name: i.name, value: Math.abs(i.value + (Math.random() - 0.5) * 500) }))  // eslint-disable-line react/no-access-state-in-setstate
            this.setState({
                data: newData
            })
            this.regenData();
        }, 2000)
    }

    render() {
        const data = [{ name: 'Calories', value: this.props.actual }, { name: 'Calorie Goal', value: this.props.remaining }]
        const inner = 80;
        const outer = 100;
        return (
            <>
                <ConfigureContainer {...this.props} configureClicked={this.configureClicked} configView={this.configView} />
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart onMouseEnter={this.onPieEnter}>
                        <Pie
                            data={data}
                            innerRadius={inner}
                            outerRadius={outer}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label
                        >
                            {
                                data.map((entry, index) => <Cell key={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <p>
                            Calories: {data[0].value}
                        </p>
                    </PieChart>
                </ResponsiveContainer>
            </>
        )
    }
}

function mapStateToProps(state) {
    let goals = 0;
    let totals = 0;

    if (state.mfp.mfpWeek !== null) {
        state.mfp.mfpWeek.mfpData.reverse();
        goals = 0;
        totals = 0;
        for (let i = 0; i < state.mfp.mfpWeek.mfpData.length; i += 1) {
            goals += state.mfp.mfpWeek.mfpData[i].goals.calories;
            totals += state.mfp.mfpWeek.mfpData[i].totals.calories;
        }
    }

    return {
        actual: totals, goal: goals, remaining: goals - totals
    }

}

export default connect(mapStateToProps, actions)(MFPPieChartCals);