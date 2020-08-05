import React from 'react';
import '../Styling/App.css';
import nyp_logo from '../Images/nyp_logo.PNG';
import lettuce from '../Images/lettuce.PNG';
import tomato from '../Images/tomato.PNG';

const Login = (props) => {

  let toggleRedeemLoading = () => {
    if (props.redeemLoading) {
      return (
        <p className="subheader_2">
          Loading...
        </p>
      )
    } else {
      return (
        <button
          type='button'
          className='button'
          onClick={props.onRedeem}
        >
        Redeem
        </button>
      )
    }
  };

  return (
    <div className="App">

      <img src={nyp_logo} alt='New York Presbyterian Logo' width="272" height="43" />

      <header className="header">
        <img src={lettuce} alt='lettuce' width="112" height="88" />
        <p>
          Welcome to the FVRx Portal!
        </p>
        <img src={tomato} alt='tomato' width="95" height="89" />
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
        maxLength="10"
      />

      {toggleRedeemLoading()}

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
        maxLength="4"
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
