import React, { Component } from 'react';
import axios from 'axios';
import '../Styling/App.css';
import Login from './Login';
import RxDetails from './RxDetails';
import RxDisplay from './RxDisplay';
import PhoneNumberRedeem from './PhoneNumberRedeem';
import Redeemed from './Redeemed';
import RedeemError from './RedeemError';
const serverName = 'http://localhost:3000';
//post - /api/rx{mrn:'',phone:'',amount:''}'
//get - /api/rx/{phonenumber}
//patch - /api/rx/{rxId}/{market:''}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      display: 'Login',
      pin: '',
      mrn: '',
      phoneNumber: '',
      rxAmount: '0',
      redeemPhoneNumber: ''
    };
  };

  redeemPhoneNumberChange(evt) {
    //get the phone number entered by user
    this.setState({ redeemPhoneNumber: evt.target.value });
  };

  redeem() {
    //get the redeem phone # from state
    const { redeemPhoneNumber } = this.state;

    if (isNaN(redeemPhoneNumber) || redeemPhoneNumber.length !== 10) { //validate phone number format
      alert('Invalid phone number, please try again.') //throw error if format is invalid
    }
    //send to server for authentication
    //throw server error
    else { //go to redeemed page
      this.setState({ display: 'Redeemed', redeemPhoneNumber: '' });
    };
  };

  pinChange(evt) {
    //get the pin value entered by user
    this.setState({ pin: evt.target.value });
  };

  logIn() {
    //get the pin from state
    const { pin } = this.state;

    if (isNaN(pin) || pin.length !== 4) { //validate the pin format, must be 4 digit number
      alert('Invalid PIN, please try again.') //throw error if format is invalid
    } else if (pin !== '1234') {
      alert('Incorrect PIN, please try again.')
    } else { //log user in
      this.setState({ display: 'RxDetails', pin: '' });
    };
  };

  mrnChange(evt) {
    this.setState({ mrn: evt.target.value });
  };

  phoneNumberChange(evt) {
    this.setState({ phoneNumber: evt.target.value });
  };

  amountSelectChange(evt) {
    this.setState({ rxAmount: evt.target.value });
  };

  createRx() {
    //get mrn, phone#, and rxAmount from state
    const { mrn, phoneNumber, rxAmount } = this.state;

    if (mrn.length < 1) { //validate an MRN was entered
      alert('Please enter an MRN.') //throw error if no MRN
    } else if (isNaN(phoneNumber) || phoneNumber.length !== 10) { //validate phone number format
      alert('Please enter a valid phone number.') //throw error if format is invalid
    } else if (rxAmount === '0') { //validate an rxAmount is selected
      alert('Please select an Rx amount.') //throw error if rxAmount not selected
    } else { //create Rx
      axios.post(`${serverName}/api/rx`,{ mrn: mrn, phone:phoneNumber, amount: rxAmount })
        .then((res) => console.log(res))
          .catch((e) => console.log(e));
      //this.setState({ display: 'RxDisplay', mrn: '', phoneNumber: '', rxAmount: '0' });
    };
  };

  createNew() {
    this.setState({ display: 'RxDetails' });
  };

  logOut() {
    this.setState({ display: 'Login' });
  };

  render() {

    let getComponentToDisplay = () => {
      switch (this.state.display) {
        case 'RxDetails':
          return <RxDetails
                    mrn={this.state.mrn}
                    onMrnChange={this.mrnChange.bind(this)}
                    phoneNumber={this.state.phoneNumber}
                    onPhoneNumberChange={this.phoneNumberChange.bind(this)}
                    rxAmount={this.state.rxAmount}
                    onAmountSelectChange={this.amountSelectChange.bind(this)}
                    onCreateRx={this.createRx.bind(this)}
                  />
          break;
        case 'RxDisplay':
          return <RxDisplay
                    onLogOut={this.logOut.bind(this)}
                    onCreateNew={this.createNew.bind(this)}
                  />
          break;
        case 'Redeemed':
          return <Redeemed
                    onLogOut={this.logOut.bind(this)}
                  />
          break;
        default:
          return <Login
                    redeemPhoneNumber={this.state.redeemPhoneNumber}
                    onRedeemPhoneNumberChange={this.redeemPhoneNumberChange.bind(this)}
                    pin={this.state.pin}
                    onPinChange={this.pinChange.bind(this)}
                    onLogIn={this.logIn.bind(this)}
                    onRedeem={this.redeem.bind(this)}
                  />;
      };
    };


    return (
      <div className="App">
        {getComponentToDisplay()}
      </div>
    );
  };
};

export default App;
