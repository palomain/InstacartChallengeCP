import React, {Component} from 'react';
import ShopperForm from './ShopperForm.jsx';
import {Jumbotron} from 'react-bootstrap';
import '../../styles/page.css'

class Main extends Component {

    render() {
        return (

            <div className="shopper-form">

                <Jumbotron>
                    <h1>Hello, new Shopper!</h1>
                    <p>
                        Please fill in the following details to complete your registration as new shopper
                    </p>
                    <ShopperForm submitUrl="save-shopper"/>

                </Jumbotron>

            </div>
        );
    }
}

Main.propTypes = {};
Main.defaultProps = {};

export default Main;
