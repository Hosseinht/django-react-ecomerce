import React from 'react';
import {Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <Spinner
            animation='border'
            role='status'
            style={
                {
                    height: '100px',
                    width: '100px',
                    margin: '50%',
                    display: 'block'
                }
            }
        >
            <span className='sr-only'>Loading...</span>
        </Spinner>
    );
};

export default Loader;
