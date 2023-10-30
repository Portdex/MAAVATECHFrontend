import React , {useEffect , useState} from 'react';
import { Col, Row } from 'react-bootstrap';

const PostOptions = () => {
      
  return (
    <div className="container text-center buttons-container">
        <div className='row '>
            <div className="col-12 mb-4">
                <h6>
                    Select an Option
                </h6>
            </div>
            <div className="col-12 d-flex justify-content-center">
            <a href="/RaiseFund">
                <div className="buttons">
                Raise Fund for deserving students/Orphans
                </div>
                </a>
                <a href="/applyForAdmission">
                <div className="buttons">
                    Apply for Admissions
                </div>
                </a>
            </div>

        </div>
    </div>
  );
};

export default PostOptions;
