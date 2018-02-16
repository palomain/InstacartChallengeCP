import React, {Component} from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Jumbotron, Button, Col} from 'react-bootstrap';
import {getCookies} from '../utils/utils.jsx';

class ShopperForm extends Component {

    constructor(props) {
        super(props);
        const cookies = getCookies();

        this.state = {
            name : '',
            email : '',
            number : '',
            zipcode : '',
            ...cookies

        };

        this.handleNameChanged = this.handleNameChanged.bind(this);
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handleNumberChanged = this.handleNumberChanged.bind(this);
        this.handleZipCodeChanged = this.handleZipCodeChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChanged(e) {
        const name = e.target.value;
        this.setState({name});
    }

    handleEmailChanged(e) {
        const email = e.target.value;
        this.setState({email});
    }

    handleNumberChanged(e) {
        const number = e.target.value;
        this.setState({number});
    }

    handleZipCodeChanged(e) {
        const zipcode = e.target.value;
        this.setState({zipcode});
    }

    handleSubmit(){
        if(this.validateData()) {
            fetch(`./${this.props.submitUrl}`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode:'cors'
            });
        }
    }

    validateData(){
        return true;
    }

    render() {

        return (
            <div>

                <Form horizontal className="form-box">
                    <FormGroup controlId="name"
                    >
                        <Col sm={2}><ControlLabel >Name</ControlLabel></Col>
                        <Col sm={5}>
                            <FormControl type="text"
                                         value={this.state.name}
                                         onChange={this.handleNameChanged}
                                         placeholder="Enter your full name"
                            >

                            </FormControl >
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="email"
                    >
                        <Col sm={2}><ControlLabel >Email</ControlLabel></Col>
                        <Col sm={5}>
                            <FormControl type="text"
                                         value={this.state.email}
                                         onChange={this.handleEmailChanged}
                                         placeholder="Enter your email"
                            >

                            </FormControl >
                        </Col>
                        <small className="error">{this.state.emailError}</small>
                    </FormGroup>
                    <FormGroup controlId="phone"
                    >
                        <Col sm={2}><ControlLabel >Phone number</ControlLabel></Col>
                        <Col sm={5}>
                            <FormControl type="text"
                                         value={this.state.number}
                                         onChange={this.handleNumberChanged}
                                         placeholder="Enter your phone"
                            >

                            </FormControl >
                        </Col>
                        <small className="error">{this.state.phoneError}</small>
                    </FormGroup>
                    <FormGroup controlId="zipCode"
                    >
                        <Col sm={2}><ControlLabel >Zip Code</ControlLabel></Col>
                        <Col sm={5}>
                            <FormControl type="text"
                                         value={this.state.zipcode}
                                         onChange={this.handleZipCodeChanged}
                                         placeholder="Enter your zip code "
                            >

                            </FormControl >
                        </Col>
                        <small className="error">{this.state.zipCodeError}</small>
                    </FormGroup>
                    <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        );
    }
}

ShopperForm.propTypes = {};
ShopperForm.defaultProps = {};

export default ShopperForm;
