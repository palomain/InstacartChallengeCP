import React, {Component} from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Jumbotron, Button, Col} from 'react-bootstrap';
import {getCookies} from '../utils/utils.jsx';
import '../../styles/shopper-form.css';

class ShopperForm extends Component {

    constructor(props) {
        super(props);
        const cookies = getCookies();

        this.state = {
            fname : '',
            lname : '',
            email : '',
            number : '',
            zipcode : '',
            ...cookies
        };

        this.handleFNameChanged = this.handleFNameChanged.bind(this);
        this.handleLNameChanged = this.handleLNameChanged.bind(this);
        this.handleEmailChanged = this.handleEmailChanged.bind(this);
        this.handleNumberChanged = this.handleNumberChanged.bind(this);
        this.handleZipCodeChanged = this.handleZipCodeChanged.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validatePhoneNumber(){

        if(!this.validateNotEmpty("number", "numberError", "Phone number")){
            return false;
        }

        const number = this.state.number;
        const phoneno = /^\d{10}$/;
        if ( number.match(phoneno)) {
            this.setState({numberError:""});
            return true;
        } else {
            this.setState({numberError:"The entered number is invalid. It has to be a 10 digit number"});
            return false;
        }
    }

    validateNotEmpty(stateAttr, errorStateAttr, attrDisplay){
        const val = this.state[stateAttr];
        if(val && val.trim().length){
            this.setState({[errorStateAttr]:""});
            return true;
        } else {
            this.setState({[errorStateAttr]:attrDisplay + " must be specified"});
            return false;
        }
    }

    validateEmail(){
        if(!this.validateNotEmpty("email", "emailError", "Email")){
            return false;
        }

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(String(this.state.email).toLowerCase())){
            this.setState({emailError:""});
            return true;
        } else {
            this.setState({emailError:"The email format is invalid"});
            return false;
        }
    }

    validateZipCode(){
        if(!this.validateNotEmpty("zipcode", "zipCodeError", "Zip code")){
            return false;
        }

        const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(this.state.zipcode);
        if(isValidZip) {
            this.setState({zipCodeError:""});
            return true;
        } else {
            this.setState({zipCodeError:"The zip code is invalid"});
            return false;
        }
    }

    formatNumber(){
        if(!this.state.number.length){
            return "";
        }

        var s2 = (""+this.state.number).replace(/\D/g, '');
        var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
        return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
    }


    handleFNameChanged(e) {
        const fname = e.target.value;
        this.setState({fname});
    }

    handleLNameChanged(e) {
        const lname = e.target.value;
        this.setState({lname});
    }

    handleEmailChanged(e) {
        const email = e.target.value;
        this.setState({email});
    }

    handleNumberChanged(e) {
        let number = e.target.value;
        number = (""+number).replace(/\D/g, '');
        number = number.substr(0, 10);

        this.setState({number});
    }

    handleZipCodeChanged(e) {
        let zipcode = e.target.value;
        zipcode = (""+zipcode).replace(/\D/g, '');
        zipcode = zipcode.substr(0, 5);
        this.setState({zipcode});
    }

    handleSubmit(){
        if(this.validateData()) {
            fetch(`./${this.props.submitUrl}`, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                   fname : this.state.fname,
                   lname : this.state.lname,
                   email : this.state.email,
                   number : this.state.number,
                   zipcode : this.state.zipcode
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode:'cors'
            }).then((response)=> {
                    const cookies = getCookies();

                    if(cookies.email) {
                        window.location.href = "./background";
                    } else {
                        window.location.href = './';
                    }
                }
            );
        }
    }

    validateData(){
        let valid = this.validatePhoneNumber();
        valid = this.validateNotEmpty("fname", "fnameError", "First name") && valid;
        valid = this.validateNotEmpty("lname", "lnameError",  "Last name") && valid;
        valid = this.validateEmail() && valid;
        valid = this.validateZipCode()&& valid;
        valid = ( !this.props.validate || this.props.validate() ) && valid;

        return valid ;
    }

    render() {
        return (
            <div className="shopper-form">

                <Form horizontal className="form-box">
                    <FormGroup controlId="fname"
                    >
                        <Col sm={2}><ControlLabel >First Name</ControlLabel></Col>
                        <Col sm={8}>
                            <FormControl type="text"
                                         value={this.state.fname}
                                         onChange={this.handleFNameChanged}
                                         placeholder="Enter your first name"
                            >

                            </FormControl >
                        </Col>
                        <small className="error">{this.state.fnameError}</small>
                    </FormGroup>
                    <FormGroup controlId="lname"
                    >
                        <Col sm={2}><ControlLabel >Last Name</ControlLabel></Col>
                        <Col sm={8}>
                            <FormControl type="text"
                                         value={this.state.lname}
                                         onChange={this.handleLNameChanged}
                                         placeholder="Enter your last name"
                            >

                            </FormControl >
                        </Col>
                        <small className="error">{this.state.lnameError}</small>
                    </FormGroup>
                    <FormGroup controlId="email"
                    >
                        <Col sm={2}><ControlLabel >Email</ControlLabel></Col>
                        <Col sm={8}>
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
                        <Col sm={8}>
                            <FormControl type="text"
                                         value={this.formatNumber()}
                                         onChange={this.handleNumberChanged}
                                         placeholder="Enter your phone"
                            >

                            </FormControl >
                        </Col>
                        <small className="error">{this.state.numberError}</small>
                    </FormGroup>
                    <FormGroup controlId="zipCode"
                    >
                        <Col sm={2}><ControlLabel >Zip Code</ControlLabel></Col>
                        <Col sm={8}>
                            <FormControl type="text"
                                         value={this.state.zipcode}
                                         onChange={this.handleZipCodeChanged}
                                         placeholder="Enter your zip code "
                            >

                            </FormControl >
                        </Col>
                        <small className="error">{this.state.zipCodeError}</small>
                    </FormGroup>
                    <FormGroup controlId="buttons"
                    >
                        <Col sm={2}></Col>
                        <Col sm={8}><Button bsStyle="primary" onClick={this.handleSubmit} className="submit-btn">Submit</Button></Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }
}

ShopperForm.propTypes = {};
ShopperForm.defaultProps = {};

export default ShopperForm;
