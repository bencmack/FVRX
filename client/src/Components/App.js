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
      rxId: '',
      redeemPhoneNumber: '',
      redeemAmount: '',
      redeemMarket: '',
      redeemRxId: '',
      rxDetailsLoading: false,
      redeemLoading: false,
      redeemMarketLoading: false
    };
  };

  redeemPhoneNumberChange(evt) {
    //get the phone number entered by user
    this.setState({ redeemPhoneNumber: evt.target.value });
  };

  redeem() {
    this.setState({ redeemLoading: true });

    //get the redeem phone # from state
    const { redeemPhoneNumber } = this.state;

    if (isNaN(redeemPhoneNumber) || redeemPhoneNumber.length !== 10) { //validate phone number format
      alert('Invalid phone number, please try again.') //throw error if format is invalid
    } else {
      axios.get(`${serverName}/api/rx/${redeemPhoneNumber}`)//fetch rx for phone number from server`
        .then((res) => {
          //get the rx amount, clear the phone number entry, go to Redeemed page
          console.log(res);
          const { rxid, amount } = res.data.payload;
          this.setState({ display: 'Redeemed', redeemPhoneNumber: '', redeemRxId: rxid, redeemAmount: amount, redeemLoading: false });
        })
          .catch((e) => {
            console.log(e);
            alert('An error occured. Check your entry and try again.')
            this.setState({ redeemLoading: false });
          });
    };
  };

  marketSelected(market) {
    //this.setState({ redeemMarketLoading: true });

    // const { redeemRxId } = this.state;
    // console.log(market);
    // //send selected market to server, update corresponding rxId
    // axios.patch(`${serverName}/api/rx/${redeemRxId}`,{ market })
    //   .then((res) => console.log(res))
    //     .catch((e) => console.log(e));
    this.setState({ redeemMarket: market });
  };

  pinChange(evt) {
    //get the pin value entered by user
    this.setState({ pin: evt.target.value });
  };

  logIn() {
    //get the pin from state
    const { pin } = this.state;

    if (isNaN(pin) || pin.length !== 4) { //validate pin is 4 digit number
      alert('Invalid PIN, please try again.') //throw error if format is invalid
    } else if (pin !== '7262') { //validate pin is correct
      alert('Incorrect PIN, please try again.') //throw error if pin is incorrect
    } else {
      this.setState({ display: 'RxDetails', pin: '' }); //log user in
    };
  };

  mrnChange(evt) {
    //get the MRN value entered by user
    this.setState({ mrn: evt.target.value });
  };

  phoneNumberChange(evt) {
    //get the phone number value entered by user
    this.setState({ phoneNumber: evt.target.value });
  };

  amountSelectChange(evt) {
    //get the amount value entered by user
    this.setState({ rxAmount: evt.target.value });
  };

  createRx() {
    this.setState({ rxDetailsLoading: true });

    //get mrn, phone#, and rxAmount from state
    const { mrn, phoneNumber, rxAmount } = this.state;

    if (mrn.length < 1) { //validate an MRN was entered
      alert('Please enter an MRN.') //throw error if no MRN
    } else if (isNaN(phoneNumber) || phoneNumber.length !== 10) { //validate phone number format
      alert('Please enter a valid phone number.') //throw error if format is invalid
    } else if (rxAmount === '0') { //validate an rxAmount is selected
      alert('Please select an Rx amount.') //throw error if rxAmount not selected
    } else { //create Rx
      axios.post(`${serverName}/api/rx`,{ mrn: mrn, phone:phoneNumber, amount: rxAmount }) //send Rx data to server
        .then((res) => {
          console.log(res.data.payload);
          //if Rx creation successful, clear state, get RxId, go to RxDisplay
          const { rxid } = res.data.payload;
          this.setState({ display: 'RxDisplay', mrn: '', phoneNumber: '', rxAmount: '0', rxId: rxid, rxDetailsLoading: false });
        })
          .catch(() => {
            //otherwise throw error
            this.setState({ rxDetailsLoading: false });
            alert('An error occured. Check your entry and try again.')
          });
    };
  };

  createNew() {
    this.setState({ display: 'RxDetails', rxId: '' });
  };

  logOut() {
    this.setState({
      display: 'Login',
      pin: '',
      mrn: '',
      phoneNumber: '',
      rxAmount: '0',
      redeemPhoneNumber: '',
      rxId: '',
      rxDetailsLoading: false
    });
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
                    loading={this.state.rxDetailsLoading}
                  />
          break;
        case 'RxDisplay':
          return <RxDisplay
                    onLogOut={this.logOut.bind(this)}
                    onCreateNew={this.createNew.bind(this)}
                    rxId={this.state.rxId}
                  />
          break;
        case 'Redeemed':
          return <Redeemed
                    onLogOut={this.logOut.bind(this)}
                    redeemAmount={this.state.redeemAmount}
                    onMarketSelect={this.marketSelected.bind(this)}
                    market={this.state.redeemMarket}
                    loading={this.state.redeemMarketLoading}
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
                    redeemLoading={this.state.redeemLoading}
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
