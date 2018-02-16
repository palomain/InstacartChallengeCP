import React, {Component} from 'react';
import ShopperForm from './ShopperForm.jsx';
import {Jumbotron, Button} from 'react-bootstrap';

import '../../styles/page.css'

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startApplication : false
        };

        this.handleApply = this.handleApply.bind(this);
    }

    handleApply(){
        this.setState({startApplication:true});
    }

    render() {
        return (

            <div className="shopper-registration">

                <Jumbotron>
                    <h1>Welcome, new Shopper!</h1>
                    <p>Apply here to start your recruitment process with Instacart!!!</p>
                    <Button bsSize="large" bsStyle="primary" onClick={this.handleApply}>Apply</Button>
                    <br/>
                    <div className={this.state.startApplication ? "show" : "hide"}>
                        <h5 style={{color:"blue"}}>
                        Please fill in the following details to complete your registration as new shopper
                        </h5>

                        <ShopperForm submitUrl="save-shopper"/>
                    </div>
                </Jumbotron>

            </div>
        );
    }
}

Main.propTypes = {};
Main.defaultProps = {};

export default Main;
