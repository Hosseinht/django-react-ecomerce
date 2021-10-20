import React from 'react';
import {Container, Row, Col} from "react-bootstrap";

function Footer() {
    return (
        <footer className='w-100 bg-dark'>
            <Container >
                <Row>
                    <Col className='text-center text-white py-3  w-100 mt-auto'>Copyright &copy; ShoppY</Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
