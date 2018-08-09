import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#2ecc71', '#e74c3c'];

export default class MFPPieChartCals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [{ name: 'Calories', value: this.props.actual }, { name: 'Calorie Goal', value: this.props.remaining }]
        }
    }

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
        const data = this.props.mfp || this.state.data;
        const inner = 80;
        const outer = 100;
        return (
            <span style={{
                height: '100%'
            }}>
                <span>
                    <ResponsiveContainer>
                        <PieChart onMouseEnter={this.onPieEnter}>
                            <Pie
                                data={data}
                                // cx={120}
                                // cy={200}
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
                </span>
            </span>
        )
    }
}

function mapStateToProps(state) {
    let { totals, goals } = 0;
    if (state.auth.mfp) {
        ({ totals, goals } = state.auth.mfp.mfpData[0]);
    }
    return !state.auth.mfp ? null : {
        mfp: (state.auth.mfp === undefined) ? null : [{ name: 'Calories', value: totals.calories }, { name: 'Calorie Goal', value: goals.calories - totals.calories }]
    }
}