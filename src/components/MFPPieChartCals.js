import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import requireAuth from './requireAuth';

const COLORS = ['#2ecc71', '#e74c3c'];

class MFPPieChartCals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [{ name: 'Calories', value: 400 }, { name: 'Calorie Goal', value: 300 }]
        }
    }

    componentDidMount() {
        // this.regenData();
    }

    componentDidUpdate() {
        // console.log('update')
        // console.log(this.props.mfp)
        // this.setState({
        //     data: [{ name: 'Calories', value: this.props.mfp[0].totals.calories }, { name: 'Calorie Goal', value: this.props.mfp[0].goals.calories }]
        // });
    }

    regenData = () => {
        setTimeout(() => {
            const newData = this.state.data.map((i) => ({ name: i.name, value: Math.abs(i.value + (Math.random() - 0.5) * 500) }))
            this.setState({
                data: newData
            })
            this.regenData();
        }, 2000)
    }

    render() {
        const data = this.props.mfp || this.state.data;
        const { mfp } = this.props;
        const inner = 80;
        const outer = 100;
        return (
            <span style={{
                // display: 'flex', flexDirection: 'column',
                height: '100%'
            }}>
                <span style={{
                    // flex: 9
                    // display: 'block',
                    // height: '90%'
                }}>
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
                {/* <div style={{ 
                    // flex: 1
                     }}>Calories: {data[0].value}</div> */}
            </span>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.auth.mfp)
    return {
        // mfp: state.auth.mfp,
        mfp: state.auth.mfp === undefined ? null : [{ name: 'Calories', value: state.auth.mfp[0].totals.calories }, { name: 'Calorie Goal', value: state.auth.mfp[0].goals.calories - state.auth.mfp[0].totals.calories }]
    }
}

export default compose(
    // requireAuth,
    connect(mapStateToProps, actions),
    // WidthProvider(Responsive),
    // withStyles(styles)
)(MFPPieChartCals);