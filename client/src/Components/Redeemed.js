import React, { Component } from 'react';
import '../Styling/App.css';

class Redeemed extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    let toggleDisplay = () => {
      if (this.props.market === '') {
        return (
          <div className="Market-select">
            <p className="subheader_1_with_margin">
              Please select your market:
            </p>
            <button className="button-alt" onClick={() => this.props.onMarketSelect('Fort Washington Greenmarket')}>
              Fort Washington Greenmarket
            </button>
            <button className="button-alt" onClick={() => this.props.onMarketSelect('175th Street Greenmarket')}>
              175th Street Greenmarket
            </button>
            <button className="button-alt" onClick={() => this.props.onMarketSelect('Inwood Greenmarket')}>
              Inwood Greenmarket
            </button>
            <button className="button-alt" onClick={() => this.props.onMarketSelect('Broadway Practice Youth Market')}>
              Broadway Practice Youth Market
            </button>
            <button className="button-alt" onClick={() => this.props.onMarketSelect('Bronx Borough Hall Greenmarket')}>
              Bronx Borough Hall Greenmarket
            </button>
            <button className="button-alt" onClick={() => this.props.onMarketSelect('Lincoln Hospital Greenmarket')}>
              Lincoln Hospital Greenmarket
            </button>
          </div>
        )
      } else if (this.props.loading) {
        return (
          <div className="Market-select">
            <p className="subheader_1_with_margin">
              Loading...
            </p>
          </div>
        )
      } else {
        return (
          <div className="Market-select">
            <p className="subheader_1_with_margin">
              Thank you!
            </p>
            <button className="button" onClick={this.props.onLogOut}>
              Return Home
            </button>
          </div>
        )
      }
    };

    return (
      <div className="App">

      <header className="subheader_1">
        <p>
          Redemption Amount:
        </p>
      </header>

      <div className="Redeemed-amount-display">
        <p className="Redeemed-amount-text">
          {`$${this.props.redeemAmount}`}
        </p>
      </div>

      {toggleDisplay()}

      </div>
    );
  };
};

export default Redeemed;
