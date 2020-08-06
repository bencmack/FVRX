import React, { Component } from 'react';
import axios from 'axios';
import '../Styling/App.css';
import Login from './Login';
import RxDetails from './RxDetails';
import RxDisplay from './RxDisplay';
import Redeemed from './Redeemed';
//import RedeemError from './RedeemError';

class Main extends Component {


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


  componentDidMount() {
    const { rxId } = this.props.match.params;
    // rxId will be defined if user scans an Rx QR code
    if (rxId !== undefined) {
      this.setState({ redeemLoading: true });
      axios.get(`/api/rx?rxId='${rxId}'`)//fetch rx for QR url from server
        .then((res) => {
          //get the rx amount, go to Redeemed page
          const { rxid, amount } = res.data.payload;
          this.setState({ display: 'Redeemed', redeemRxId: rxid, redeemAmount: amount, redeemLoading: false });
        })
        .catch((e) => {
          console.log(e);
          alert("An error occured. Try entering the redeemer's phone number.");
          this.setState({ redeemLoading: false });
        });
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
      this.setState({ redeemLoading: false });
    } else {
      axios.get(`/api/rx/${redeemPhoneNumber}`)//fetch rx for phone number from server
        .then((res) => {
          //get the rx amount, clear the phone number entry, go to Redeemed page
          const { rxid, amount } = res.data.payload;
          this.setState({ display: 'Redeemed', redeemPhoneNumber: '', redeemRxId: rxid, redeemAmount: amount, redeemLoading: false });
        })
          .catch((e) => {
            console.log(e);
            alert('An error occured. Either this prescription has already been redeemed or you entered the wrong phone number. Check your entry and try again.');
            this.setState({ redeemLoading: false });
          });
    };
  };


  marketSelected(market) {
    this.setState({ redeemMarketLoading: true });

    const { redeemRxId } = this.state;
    //send selected market to server, update corresponding rxId
    axios.patch(`/api/rx/${redeemRxId}`,{ market })
      .then((res) => {
        this.setState({ redeemMarketLoading: false, redeemMarket: market });
      })
        .catch((e) => alert('An error occured, please try again.'));
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
      this.setState({ rxDetailsLoading: false });
    } else if (isNaN(phoneNumber) || phoneNumber.length !== 10) { //validate phone number format
      alert('Please enter a valid phone number.') //throw error if format is invalid
      this.setState({ rxDetailsLoading: false });
    } else if (rxAmount === '0') { //validate an rxAmount is selected
      alert('Please select an Rx amount.') //throw error if rxAmount not selected
      this.setState({ rxDetailsLoading: false });
    } else { //create Rx
      axios.post(`/api/rx`,{ mrn: mrn, phone:phoneNumber, amount: rxAmount }) //send Rx data to server
        .then((res) => {
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
      redeemMarket: '',
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
        case 'RxDisplay':
          return <RxDisplay
                    onLogOut={this.logOut.bind(this)}
                    onCreateNew={this.createNew.bind(this)}
                    rxId={this.state.rxId}
                  />
        case 'Redeemed':
          return <Redeemed
                    onLogOut={this.logOut.bind(this)}
                    redeemAmount={this.state.redeemAmount}
                    onMarketSelect={this.marketSelected.bind(this)}
                    market={this.state.redeemMarket}
                    loading={this.state.redeemMarketLoading}
                  />
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

export default Main;
