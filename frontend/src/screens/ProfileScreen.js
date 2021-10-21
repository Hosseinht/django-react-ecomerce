import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap'
import {Form, Button, Row, Col, Table,} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {getUserDetails, updateUserProfile} from "../actions/userActions";
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstants";
import {listMyOrders} from "../actions/orderActions";


const ProfileScreen = ({history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()


    const userDetails = useSelector(state => state.userDetails)
    const {error, loading, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    // need to make sure that user is logged in

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy


    // If user is already logged in and go to login page will be redirect
    useEffect(() => {
        // if user is not logged in
        if (!userInfo) {
            history.push('/login')
        } else {
            // if user is logged in  and information is not loaded
            if (!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                // Profile is the id in action
                dispatch(listMyOrders())
            } else {
                // when we get data show it
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password,
            }))
            setMessage('')
            // when password does not match we will have an error. when we match the password error still shows because the page hasn't refreshed. so we do this
        }

    }
    return (
        <Row>
            <Col md={3}>
                <h2>Use Profile</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            // value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control

                            type='password'
                            placeholder='Confirm Password'
                            // value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button className='my-3' type='submit' variant='primary'>
                        Update
                    </Button>

                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader/> : errorOrders ? <Message variant={'danger'}>{errorOrders}</Message> :
                    <Table striped responsive className='table-sm'>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            {/*<th></th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.created_At.substring(0, 10)}</td>
                                <td>${order.total_Price}</td>
                                <td>{order.is_Paid ? order.paid_At.substring(0, 10) :
                                    <i className='fas fa-times' style={{color: 'red'}}> </i>}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </Table>
                }
            </Col>
        </Row>
    );
};

export default ProfileScreen;
