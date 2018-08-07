import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles"

const styles = {
    progress: {
        height: '20px'
    }
};

class MFPCalsLine extends Component {
    constructor(props) {
        super(props);

        let data = [
            {
                id: 'calories',
                completed: this.props.completed
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
        const data = [
            {
                id: 'calories',
                completed: this.props.completed
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
        return (
            playersData ?
                (
                    <div>
                        <LinearProgress color="primary" className={classes.progress} variant="determinate" value={playersData[0].completed} />
                        <p>Calories: {playersData[0].completed / 100}</p>
                    </div>
                )
                : (<div />)
        );
    }
}

export default withStyles(styles)(MFPCalsLine);