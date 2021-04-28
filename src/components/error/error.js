import React from 'react-router';
import Box from '@material-ui/core/Box';
import {Link} from 'react-router-dom'; 
import './error.css';

const Error = () => {
    return (
        <div className="container-fluid mt-5 distance-from-footer">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <Box className="error-box">
                        <p className="error-title">Εrror 404...</p>
                        <p>H σελίδα δεν βρέθηκε...</p>
                        <p>Ανακατεύθυνση στην <Link to="/home">αρχική σελίδα</Link></p>
                    </Box>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    )

}

export default Error;