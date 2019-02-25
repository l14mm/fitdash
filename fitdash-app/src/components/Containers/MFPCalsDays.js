import React, { Component } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from "@material-ui/core/styles"

import MFPCalsLine from './MFPCalsLine'
import ConfigureContainer from './ConfigureContainer'
import * as actions from '../../actions';

const styles = {
    root: {
        display: "flex",
        flexWrap: "wrap"
    }
};

class MFPCalsDays extends Component {
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    configureClicked = () => this.props.showConfigureDialog(this.configView());

    configView = () => <p>no config available</p>

    progress = completion => {
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
            // this.timer = setTimeout(() => this.progress(5), 100);
        }
    }

    render() {
        const { data } = this.props;
        const { classes } = this.props;
        return (
            <>
                <ConfigureContainer 
                {...this.props} 
                configureClicked={this.configureClicked} 
                configView={this.configView} 
                />
                <div className={classes.root}>
                    {data && data.map((day, i) => (
                        <MFPCalsLine 
                        goal={day.goals.calories} 
                        actual={day.totals.calories} 
                        date={i === 0 ? "Today" : new Date(day.date).toDateString()} 
                        key={day.date} 
                        />
                    ))}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => state.mfp.mfpWeek ? { data: state.mfp.mfpWeek.mfpData.reverse() } : { data: null };

export default compose(
    connect(mapStateToProps, actions),
    withStyles(styles)
)(MFPCalsDays);