import React from 'react';
import requireAuth from './requireAuth'

const MembersArea = () => {
    return (
        <div style={{
            flex: '1 0 auto'
        }}>
            <p>
                Members area!
            </p>
        </div>
    )
}


export default requireAuth(MembersArea);