import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import { reduxForm, Field } from 'redux-form';
import requireAuth from './requireAuth';
import * as actions from '../actions';

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        marginBottom: theme.spacing.unit,
        marginTop: theme.spacing.unit
    },
    menu: {
        width: 200
    },
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: '1 0 auto'
    },
    card: {
        minWidth: 300,
        marginTop: "6em"
    },
    hint: {
        marginTop: "1em",
        display: "flex",
        justifyContent: "center",
        color: theme.palette.grey[500]
    },
    form: {
        padding: "0 1em 1em 1em",
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        marginTop: "1em"
    },
    actions: {
        padding: "0 1em 1em 1em"
    }
})

// Used to plug material ui text field into redux-form field
const renderTextField = ({
    input,
    label,
    value,
    className,
    ...custom
}) => (
        <TextField
            label={label}
            className={className}
            {...input}
            {...custom}
        />
    )

class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboardReady: false,
            user: {
                username: "username1",
                email: "email1",
                password: "password1",
            }
        };

        this.props.getUserDetails(() => {
            this.setState({
                dashboardReady: true,
            })
        });
    }

    onSubmit = (formProps) => {
        this.props.saveDetails(formProps, () => {
            console.log('details saved!')
        });
    }

    handleChange(event) {
        const { id, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [id]: value
            }
        });
    }

    render() {
        const { classes, handleSubmit } = this.props;
        const { dashboardReady } = this.state;
        return (
            <div className={classes.root}>
            {dashboardReady ? (
                <Card className={classes.card}>
                    <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                        <div className={classes.hint}>Edit Profile</div>
                        {}
                        <Field
                            name="mfpUsername"
                            type="text"
                            label="MyFitnessPal Username"
                            id="mfpUsername"
                            component={renderTextField}
                            className={classes.textField}
                            required
                        />
                        <div>
                            {this.props.errorMessage}
                        </div>
                        <Button type="submit" variant="contained" color="primary" className={classes.button} style={{ margin: '10px' }}
                        >
                            Save
                        </Button>
                        <CardActions className={classes.actions} />
                    </form>
                </Card>
            ):(<div />)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.auth.username,
        layout: state.auth.layout,
        initialValues: { mfpUsername: state.auth.mfpUsername }
    }
}

export default compose(
    requireAuth,
    connect(mapStateToProps, actions),
    reduxForm({ form: 'editprofile', enableReinitialize: true }),
    withStyles(styles)
)(EditProfile);