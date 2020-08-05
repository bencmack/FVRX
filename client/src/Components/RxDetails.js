import React from 'react';
import '../Styling/App.css';

const RxDetails = (props) => {

  let toggleLoading = () => {
    if (props.loading) {
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
          onClick={props.onCreateRx}
        >
        Create Rx
        </button>
      )
    };
  };

  return (
    <div className="App">

      <p className="subheader_1">
        Please enter the prescription details:
      </p>

      <div className="RxDetails-field">
        <p className="subheader_2">
          MRN:
        </p>
        <input
          type='text'
          value={props.mrn}
          onChange={props.onMrnChange}
          className='input'
          placeholder=''
        />
      </div>

      <div className="RxDetails-field">
        <p className="subheader_2">
          Phone# (10 digits only):
        </p>
        <input
          type='tel'
          value={props.phoneNumber}
          onChange={props.onPhoneNumberChange}
          className='input'
          placeholder=''
          maxLength="10"
        />
      </div>

      <div className="RxDetails-field">
      <p className="subheader_2">
        Rx Amount:
      </p>
      <select className="select" value={props.rxAmount} onChange={props.onAmountSelectChange}>
        <option value="0">Please Select</option>
        <option value="10">$10</option>
        <option value="20">$20</option>
      </select>
      </div>

      {toggleLoading()}

    </div>
  );
};

export default RxDetails;
