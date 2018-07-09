import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import requireAuth from './requireAuth'

class MembersArea extends Component {
    render() {
        return (
            <div>
                Members area!
            </div>
        )
    }
}

export default requireAuth(MembersArea);