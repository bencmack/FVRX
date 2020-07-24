import React from 'react';
import '../Styling/App.css';

function PhoneNumberRedeem() {
  return (
    <div className="App">

      <header className="Login-header">
        <p>
          Welcome to the FVRx Portal!
        </p>
      </header>

      <p>
        Please enter the redeemer's phone number (digits only):
      </p>
      <input
        type='tel'
        //value={this.props.username}
        //onChange={this.props.onNameChange}
        //className='invite-respond-input'
        placeholder='XXXXXXXXXX'
      />

      <button
        type='button'
        className='button'
        //onClick={this.props.onAccept}
        //disabled={this.props.buttonDisabled}
      >
      Redeem
      </button>

    </div>
  );
};

export default PhoneNumberRedeem;
