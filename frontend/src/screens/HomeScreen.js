import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col} from "react-bootstrap";
import Product from '../components/Product';
import Loader from "../components/Loader";
import Message from "../components/Message";
import {listProducts} from "../actions/productActions";

function HomeScreen() {
    const dispatch = useDispatch()
    // useDispatch() to dispatch our action
    const productList = useSelector(state => state.productList)
    // Let us select a certain part of our state or redux store
    const {error, loading, products} = productList

    useEffect(() => {
        dispatch(listProducts())
        // in productActions
        // now our state is updated. now we need useSelector() to render data into the HomeScreen
    }, [dispatch])
    // useEffect gets loaded or triggered everysingle time  the component loads or when a state attribute or one of the state values get updated

    return (
        <div>
            <h1>Latest Products</h1>
            {loading ? <Loader/>
                // If the page is loading show this component. If you'hve got and error show he error component otherwise show the data
                : error ? <Message variant='danger '>{error}</Message>
                    : <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
            }

        </div>
    );
};

export default HomeScreen;
