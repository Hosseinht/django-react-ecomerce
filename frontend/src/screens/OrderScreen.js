import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getOrderDetails} from "../actions/orderActions";

const OrderScreen = ({match}) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const {order, error, loading} = orderDetails

    if (!loading && !error) {
        order.itemsPrice = order.order_items.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }


    useEffect(() => {
        if (!order || order._id !== Number(orderId)) {
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId])


    return (
        loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
            <div>
                <h1>Order: {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant={"flush"}>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p><strong>Name: {order.user.name}</strong></p>
                                <p>
                                    <strong>Shipping: </strong>
                                    {order.shipping_address.address},
                                    {order.shipping_address.city},
                                    {' '}
                                    {order.shipping_address.postalCode},
                                    {' '}
                                    {order.shipping_address.country},
                                </p>
                                {order.is_Delivered ?
                                    (<Message variant={'success'}>Delivered on {order.delivered_At}</Message>)
                                    :
                                    (
                                        <Message variant='warning'>Not Delivered</Message>
                                    )
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {order.payment_Method}
                                </p>
                                {order.is_Paid ?
                                    (<Message variant={'success'}>Paid on {order.paid_At}</Message>)
                                    :
                                    (
                                        <Message variant='warning'>Not paid</Message>
                                    )
                                }
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.order_items.length === 0 ? <Message variant={'info'}>
                                    Order is empty </Message> : (
                                    <ListGroup variant={"flush"}>
                                        {order.order_items.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.idProduct}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X {item.price} = ${item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card border={'0'}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Order Summery</h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Item:</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping:</Col>
                                        <Col>${order.shipping_Price}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax:</Col>

                                        <Col>${order.tax_Price}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total:</Col>
                                        <Col>${order.total_Price}</Col>
                                    </Row>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
    );
};

export default OrderScreen;
