import React, { Component } from "react";
import { compose } from 'redux';
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles"

const styles = {
    root: {
        display: "flex",
        flexWrap: "wrap",
        flexGrow: 1
    },
    outerBorder: {
        border: "2px black solid",
        padding: "5px",
        margin: "5px",
        flexGrow: 1
    },
    date: {
        margin: "0 0 10px 0"
    },
    target: {
        margin: 0,
        float: "right",
        fontSize: "12px"
    },
    actual: {
        margin: 0,
        float: "left",
        fontSize: "16px"
    },
    progress: {
        height: "20px",
        backgroundColor: "green",
        width: "100%"
    }
};

const MAX_CALORIES_OFF = 100;

class MFPCalsLine extends Component {
    constructor(props) {
        super(props);

        this.state = {
            percentComplete: 0,
            percentToFill: (this.props.actual / this.props.goal) * 100
        }
    }

    componentDidMount() { this.timer = setTimeout(() => this.progress(), 100); }

    componentWillUnmount() { clearTimeout(this.timer); }

    configureClicked = () => this.props.showConfigureDialog(this.configView());

    configView = () => <p>no config available</p>

    progress() {
        const { percentComplete, percentToFill } = this.state;

        this.setState({
            percentComplete: percentComplete + 1
        });

        if (percentComplete < percentToFill) {
            this.timer = setTimeout(() => this.progress(), 10);
        }
    }

    render() {
        const { percentComplete } = this.state;
        const { classes, goal, actual, date } = this.props;
        const remaining = Math.max(goal - actual, goal - Math.round((percentComplete * goal / 100)));
        const color = Math.abs(goal - actual) < MAX_CALORIES_OFF ? "green" : "red";
        const actualCals = Math.min(actual, Math.round(percentComplete * goal / 100));
        return (
            <div className={classes.root}>
                <div key={date} className={classes.outerBorder}>
                    <p className={classes.date}>{date}</p>
                    <p className={classes.target}>Target calories: {goal}</p>
                    <LinearProgress
                        color="primary"
                        classes={{ bar: "color:red" }}
                        className={classes.progress}
                        variant="determinate"
                        value={percentComplete} />
                    <div style={{ width: "100%", display: "inline-block" }}>
                        <p className={classes.actual}>
                            Actual calories: {actualCals}
                        </p>
                    </div>
                    <p style={{ color, margin: "10px 0 0 0" }}>
                        {remaining} calories {remaining > 0 ? "under" : "over"}
                    </p>
                </div>
            </div>
        );
    }
}

export default compose(
    withStyles(styles)
)(MFPCalsLine);