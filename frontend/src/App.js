import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceorderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
    return (
        <Router>
            <Header/>
            <main className='py-3'>
                <Container>
                    <Route path='/' component={HomeScreen} exact/>
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/payment' component={PaymentScreen} />
                    <Route path='/placeorder' component={PlaceOrderScreen} />
                    <Route path='/order/:id' component={OrderScreen} />
                    <Route path='/product/:id' component={ProductScreen}/>
                    <Route path='/cart/:id?' component={CartScreen}/>
                    {/* ? is for id as an option. if we want to go straight to the cart we don't need the id */}
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
