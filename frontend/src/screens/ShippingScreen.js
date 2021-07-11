import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Form, Button} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import {saveShippingAddress} from "../actions/cartActions";


const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label> Address </Form.Label>
                    <Form.Control required type='text' placeholder='Enter Address'
                                  value={address ? address : ''}
                        // If address exist then add the address in from the state if doesn't set a empty value
                        // it just cause some error in console if you don't do this
                                  onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label> City </Form.Label>
                    <Form.Control required type='text' placeholder='Enter City'
                                  value={city ? city : ''}
                        // it just cause some error in console if you don't do this
                                  onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalcode'>
                    <Form.Label> Postalcode </Form.Label>
                    <Form.Control required type='text' placeholder='Enter Postalcode'
                                  value={postalCode ? postalCode : ''}
                        // it just cause some error in console if you don't do this
                                  onChange={(e) => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label> Country </Form.Label>
                    <Form.Control required type='text' placeholder='Enter Country'
                                  value={country ? country : ''}
                        // it just cause some error in console if you don't do this
                                  onChange={(e) => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingScreen;
