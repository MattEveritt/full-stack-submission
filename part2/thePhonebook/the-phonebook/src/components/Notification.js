import React from 'react'

const Notification = ({ successMessage, failureMessage }) => {
    if (successMessage === null && failureMessage === null) {
        return null
    }
    return (
        <>
            {successMessage === null  
                ? <div className="failure">{failureMessage}</div> 
                : <div className="success">{successMessage}</div>
            }
        </>

    )
}

export default Notification