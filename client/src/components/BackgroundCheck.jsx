import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import ShopperForm from './ShopperForm.jsx';
import {Checkbox, Overlay} from 'react-bootstrap';
import ErrorPopover from './ErrorPopover.jsx';

import '../../styles/background-check.css';

class BackgroundCheck extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorized: false,
            displayAuthError : false
        };

        this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
        this.validateAuth = this.validateAuth.bind(this);
    }

    handleCheckboxClick(){
        this.setState({authorized:!this.state.authorized});
    }

    validateAuth(){
        if(!this.state.authorized) {
            this.setState({displayAuthError:true});
            return false;
        }

        return true;
    }

    render() {
        return (
            <div className="background-check">
                <h1>Notification and Authorization to Release Criminal Information for Employment Purposes</h1>
                <br />
                <br />
                <h2>Notification</h2><br />
                <p>
                    The position for which I am being considered requires me to consent to a criminal background check as a condition of employment.  This check includes the following:  Criminal history reference searches for felony and misdemeanor convictions at the county and federal levels of every jurisdiction where I currently reside or where I have resided during the past 7 years; and sex offender registry searches at the county and federal levels in every jurisdiction where I currently reside or where I have resided.
                </p>
                <br />

                <h2>Authorization</h2>


                <div style={{display:"inline"}}>
                <span className="important" style={{display:"inline"}} >*</span><Checkbox className="auth-check"  style={{display:"inline"}}  ref={button => {
                    this.target = button;
                }} checked={this.state.authorized} onClick={this.handleCheckboxClick} />
                <p style={{display:"inline"}}>
                I hereby authorize Instacart to conduct the criminal background check described above.  In connection with this, I also authorize the use of law enforcement agencies and/or private background check organizations to assist Instacart in collecting this information.  Validity Screening Solutions has been secured as a third party vendor (consumer reporting agency) to assist Instacart in collecting and verifying information.

                I also am aware that records of arrests on pending charges and/or convictions are not an absolute bar to employment.  Such information will be used to determine whether the results of the background check reasonably bear on my trustworthiness or my ability to perform the duties of my position as an Instacart employee.
                    </p>
                </div>



                <Overlay
                    show={this.state.displayAuthError}
                    onHide={() => this.setState({ displayAuthError: false })}
                    placement="right"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.target)}
                >
                    <ErrorPopover message={"Please check this box to approve background check"} />
                </Overlay>

                <br />

                <h4>Please verify your information below before submitting</h4>
                <ShopperForm submitUrl="add-shopper" validate={this.validateAuth}/>
            </div>
        );
    }
}

BackgroundCheck.propTypes = {};
BackgroundCheck.defaultProps = {};

export default BackgroundCheck;
