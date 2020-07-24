import React from 'react';
import '../Styling/App.css';
import nyp_logo from '../Images/nyp_logo.PNG';
import lettuce from '../Images/lettuce.PNG';
import tomato from '../Images/tomato.PNG';
import carrot from '../Images/carrot.PNG'

const Login = (props) => {
  return (
    <div className="App">

      <img src={nyp_logo} alt='New York Presbyterian Logo' width="272" height="43" />

      <header className="header">
        <img src={lettuce} alt='lettuce image' width="112" height="88" />
        <p>
          Welcome to the FVRx Portal!
        </p>
        <img src={tomato} alt='tomato image' width="95" height="89" />
      </header>

      <p className="subheader_1">
        Market Managers
      </p>
      <p className="subheader_2">
        Please enter the redeemer's phone number (10 digits only):
      </p>
      <input
        type='text'
        value={props.redeemPhoneNumber}
        onChange={props.onRedeemPhoneNumberChange}
        className='input'
        maxlength="10"
      />

      <button
        type='button'
        className='button'
        onClick={props.onRedeem}
      >
      Redeem
      </button>

      <p className="subheader_1_with_margin">
        RDs
      </p>
      <p className="subheader_2">
        Please enter your PIN:
      </p>
      <input
        type='text'
        value={props.pin}
        onChange={props.onPinChange}
        className='input'
        maxlength="4"
      />

      <button
        type='button'
        className='button'
        onClick={props.onLogIn}
      >
      Log In
      </button>

    </div>
  );
};

export default Login;
