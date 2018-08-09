import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles"

const styles = {
    progress: {
        height: "20px",
        backgroundColor: "green",
        width: "100%"
    }
};

const maxCaloriesOff = 100;

class MFPCalsLine extends Component {
    constructor(props) {
        super(props);

        const completed = (this.props.actual / this.props.goal) * 100;
        let data = [
            {
                id: 'calories',
                completed
            }
        ];

        if (this.props.data !== null) {
            ({ data } = this.props);
        }

        this.state = {
            data
        }
    }

    componentDidMount() {
        const completed = (this.props.actual / this.props.goal) * 100;
        const data = [
            {
                id: 'calories',
                completed
            }
        ];

        this.setState({
            data,
            playersData: this.props.data != null ? this.props.data.map(item => ({ ...item, completed: 0 })) : data.map(item => ({ ...item, completed: 0 }))
        })

        this.timer = setTimeout(() => this.progress(5), 100);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    progress(completion) {
        let done = 0;
        this.setState({
            playersData: this.state.data.map((item, i) => { // eslint-disable-line react/no-access-state-in-setstate
                const { completed: current } = this.state.playersData[i];
                const { completed: max } = item;
                if (current + completion >= max) {
                    done += 1;
                }
                return {
                    ...item,
                    completed: Math.min(current + completion, max)
                };
            })
        });
        if (done < this.state.data.length) {
            this.timer = setTimeout(() => this.progress(5), 100);
        }
    }

    render() {
        const { playersData } = this.state;
        const { classes } = this.props;
        const remaining = this.props.goal - this.props.actual;
        const color = Math.abs(this.props.goal - this.props.actual) < maxCaloriesOff ? "green" : "red";
        return (
            playersData ?
                (
                    <div>
                        <p style={{ margin: "0 0 10px 0" }}>{this.props.date}</p>
                        <p style={{ margin: 0, float: "right", fontSize: "12px" }}>Target calories: {this.props.goal}</p>
                        <LinearProgress color="primary" classes={{ bar: "color:red" }} className={classes.progress} variant="determinate" value={playersData[0].completed} />
                        <div style={{ width: "100%", display: "inline-block" }}>
                            <p style={{ margin: 0, float: "left", fontSize: "16px" }}>Actual calories: {Math.round(playersData[0].completed * this.props.goal / 100)}</p>
                        </div>
                        <p style={{ color, margin: "10px 0 0 0" }}>
                            {remaining} calories {remaining > 0 ? "under" : "over"}
                        </p>
                    </div>
                )
                : (<div />)
        );
    }
}

export default withStyles(styles)(MFPCalsLine);