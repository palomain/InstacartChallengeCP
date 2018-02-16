import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShopperForm from './ShopperForm.jsx';
import {getCookies} from '../utils/utils.jsx';

class BackgroundCheck extends Component {

    render() {

        const data = getCookies();

        return (
            <div>
                <h1>Notification and Authorization to Release Criminal Information for Employment Purposes</h1>
                <br />
                <br />
                <h2>Notification</h2><br />
                <p>
                    The position for which I am being considered requires me to consent to a criminal background check as a condition of employment.  This check includes the following:  Criminal history reference searches for felony and misdemeanor convictions at the county and federal levels of every jurisdiction where I currently reside or where I have resided during the past 7 years; and sex offender registry searches at the county and federal levels in every jurisdiction where I currently reside or where I have resided.
                </p>
                <br />

                <h2>Authorization</h2>

                <p>

                    <span class="important">*</span><input type="checkbox" name="auth"  id="auth"/>   I hereby authorize Instacart to conduct the criminal background check described above.  In connection with this, I also authorize the use of law enforcement agencies and/or private background check organizations to assist Instacart in collecting this information.  Validity Screening Solutions has been secured as a third party vendor (consumer reporting agency) to assist Instacart in collecting and verifying information.

                    I also am aware that records of arrests on pending charges and/or convictions are not an absolute bar to employment.  Such information will be used to determine whether the results of the background check reasonably bear on my trustworthiness or my ability to perform the duties of my position as an Instacart employee.

                </p>

                <br />
                <small  id="authNotChecked" class="form-text hidden err-message ">*Please check the box before submitting to authorize background check and store your information in our candidate database.</small>

                <h4>Please verify your information below before submitting</h4>
                <ShopperForm submitUrl="add-shopper"/>
            </div>
        );
    }
}

BackgroundCheck.propTypes = {};
BackgroundCheck.defaultProps = {};

export default BackgroundCheck;
