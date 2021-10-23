import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Button, Row, Col} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProducts, deleteProduct} from "../actions/productActions";

const ProductListScreen = ({history, match}) => {
    // const productId = match.params.id
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = productDelete


    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.is_Admin) {
            dispatch(listProducts())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = (product) => {
        //product
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'> </i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant={'danger'}>{errorDelete}</Message>}
            {loading ? <Loader/> : error ? <Message variant={'danger'}>{error}</Message> :
                <Table striped bordered responsive hover className='table-sm'>
                    <thead>
                    <tr>
                        <td>ID</td>
                        <td>NAME</td>
                        <td>PRICE</td>
                        <td>CATEGORY</td>
                        <td>BRAND</td>
                        <td></td>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light btn-sm'><i className='fas fa-edit'> </i></Button>
                                </LinkContainer>
                                <Button variant='danger btn-sm' className='ms-2'
                                        onClick={() => deleteHandler(product._id)}><i
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

export default ProductListScreen;