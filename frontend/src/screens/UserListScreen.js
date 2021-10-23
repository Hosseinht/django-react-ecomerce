import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button,} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listUsers, deleteUser} from "../actions/userActions";

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete


    useEffect(() => {
        if (userInfo && userInfo.is_Admin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }
    return (
        <div>
            <h1>Users</h1>
            {
                loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> :
                    <Table striped bordered responsive hover className='table-sm'>
                        <thead>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>EMAIL</td>
                            <td>ADMIN</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.is_Admin ? (<i className='fas fa-check' style={{color: 'green'}}> </i>) :
                                    (<i className='fas fa-check' style={{color: 'red'}}> </i>)}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light btn-sm'><i className='fas fa-edit'> </i></Button>
                                    </LinkContainer>
                                    <Button variant='danger btn-sm' className='ms-2'
                                            onClick={() => deleteHandler(user._id)}><i
                                        className='fas fa-trash'> </i></Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
            }
        </div>
    );
};

export default UserListScreen;
