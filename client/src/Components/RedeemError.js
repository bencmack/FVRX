import React from 'react';
import '../Styling/App.css';

const RedeemError = (props) => {
  return (
    <div className="App">

      <p className="header">
        Error: This prescription has already been redeemed.
      </p>

      <button
        type='button'
        className='button'
        onClick={props.onReturn}
      >
      Return
      </button>

    </div>
  );
};

export default RedeemError;
