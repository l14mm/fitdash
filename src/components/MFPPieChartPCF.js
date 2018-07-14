import React, { Component } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#2ecc71', '#3498db', '#e74c3c'];

export default class MFPPieChartPCF extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [{ name: 'Protein', value: 400 }, { name: 'Carbs', value: 300 },
            { name: 'Fat', value: 300 }]
        }
    }

    componentDidMount() {
        this.regenData();
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
        const { data } = this.state;
        return (
            <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    cx={120}
                    cy={200}
                    innerRadius={80}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {
                        data.map((entry, index) => <Cell key={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart >
        )
    }
}