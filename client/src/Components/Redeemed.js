import React from 'react';
import '../Styling/App.css';

const Redeemed = (props) => {

  let toggleDisplay = () => {
    if (props.market === '') {
      return (
        <div className="Market-select">
          <p className="subheader_1_with_margin">
            Please select your market:
          </p>
          <button className="button-alt" onClick={() => props.onMarketSelect('Fort Washington Greenmarket')}>
            Fort Washington Greenmarket
          </button>
          <button className="button-alt" onClick={() => props.onMarketSelect('175th Street Greenmarket')}>
            175th Street Greenmarket
          </button>
          <button className="button-alt" onClick={() => props.onMarketSelect('Inwood Greenmarket')}>
            Inwood Greenmarket
          </button>
          <button className="button-alt" onClick={() => props.onMarketSelect('Broadway Practice Youth Market')}>
            Broadway Practice Youth Market
          </button>
          <button className="button-alt" onClick={() => props.onMarketSelect('Bronx Borough Hall Greenmarket')}>
            Bronx Borough Hall Greenmarket
          </button>
          <button className="button-alt" onClick={() => props.onMarketSelect('Lincoln Hospital Greenmarket')}>
            Lincoln Hospital Greenmarket
          </button>
        </div>
      )
    } else if (props.loading) {
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
          <button className="button" onClick={props.onLogOut}>
            Return Home
          </button>
        </div>
      )
    };
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
        {`$${props.redeemAmount}`}
      </p>
    </div>

    {toggleDisplay()}

    </div>
  );
};

export default Redeemed;
