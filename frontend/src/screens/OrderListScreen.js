import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button,} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listOrders} from "../actions/orderActions";

const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin


    useEffect(() => {
        if (userInfo && userInfo.is_Admin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])

    return (
        <div>
            <h1>Orders</h1>
            {
                loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> :
                    <Table striped bordered responsive hover className='table-sm'>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>USER</td>
                            <td>DATE</td>
                            <td>TOTAL</td>
                            <td>PAID</td>
                            <td>DELIVERED</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.created_At.substring(0, 10)}</td>
                                <td>${order.total_Price}</td>
                                <td>{order.is_Paid ?
                                    order.paid_At.substring(0, 10)
                                    :
                                    (<i className='fas fa-check' style={{color: 'red'}}> </i>)}
                                </td>
                                <td>{order.is_Delivered ?
                                    order.delivered_At.substring(0, 10)
                                    :
                                    (<i className='fas fa-check' style={{color: 'red'}}> </i>)}
                                </td>

                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='light btn-sm'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
            }
        </div>
    );
};

export default OrderListScreen;
