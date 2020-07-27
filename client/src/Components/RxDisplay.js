import React, { Component } from 'react';
import '../Styling/App.css';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class RxDisplay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  };

  componentDidMount() {
    this.setState({ loading: true });

    const input = document.getElementById('RxPDF');

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0, 200, 300);
        this.setState({ loading: false });
        pdf.save(`FVRx-${this.props.rxId}.pdf`);
      });
  };

  render() {
    let toggleDisplay = () => {
      if (this.state.loading) {
        return (
          <div className = "App">
            <p>
              Loading...
            </p>
          </div>
        )
      } else {
        return (
          <div className = "App">

            <div>
              <button className="button" onClick={this.props.onLogOut}>
                Log Out
              </button>
              <button className="button" onClick={this.props.onCreateNew}>
                Create New
              </button>
            </div>

            <div id='RxPDF' className="pdf">

              <div className="Rx-header">
                <p className="Rx-header-text">
                  Fruit and Vegetable Prescription // Receta de Frutas y Verduras
                </p>

                <QRCode value="http://www.nyp.org" />

                <p className="Rx-subheader-text">
                  RxID: {this.props.rxId}
                </p>
              </div>


              <div className="Rx-body">
                <div className="Rx-description">
                  <p className="Rx-body-text-header">
                    Have this code scanned at the GrowNYC tent at any of the farmers markets listed below to receive Greenmarket Bucks to spend on fruits and vegetables.
                  </p>
                  <p className="Rx-body-text-header">
                    Thank you for participating!
                  </p>
                  <p className="Rx-subheader">
                    MANHATTAN
                  </p>
                  <p className="Rx-body-text">
                    Fort Washington Greenmarket<br/>168th St. & Fort Washington Ave.<br/>Tuesday 8:00 AM – 4:00 PM
                  </p>
                  <p className="Rx-body-text">
                    175th Street Greenmarket<br/>175th St. between Wadsworth & Broadway<br/>Thursday 8:00 AM – 4:00 PM
                  </p>
                  <p className="Rx-body-text">
                    Inwood Greenmarket<br/>Isham Street between Seaman Ave & Cooper St.<br/>Saturday 8:00 AM – 3:00 PM
                  </p>
                  <p className="Rx-body-text">
                    Broadway Practice Youth Market<br/>Broadway between Dyckman St. & Cumming St.<br/>Wednesday 9:00 AM – 3:00 PM<br/>July 8 - August 26
                  </p>
                  <p className="Rx-subheader">
                    BRONX
                  </p>
                  <p className="Rx-body-text">
                    Bronx Borough Hall Greenmarket<br/>161st Street & Grand Concourse<br/>Tuesday 8:00 AM – 4:00 PM
                  </p>
                  <p className="Rx-body-text">
                    Lincoln Hospital Greenmarket<br/>149th Street between Park & Morris Aves.<br/>Tuesday 8:00 AM – 3:00 PM<br/>Friday 8:00 AM – 3:00 PM
                  </p>
                </div>

                <div className="Rx-description">
                  <p className="Rx-body-text-header">
                    Escanee este código en la tienda GrowNYC de los mercados de agricultores enumerados a continuación para recibir los cupones “Greenmarket Bucks” para frutas y verduras.
                  </p>
                  <p className="Rx-body-text-header">
                    ¡Gracias por participar!
                  </p>
                  <p className="Rx-subheader">
                    MANHATTAN
                  </p>
                  <p className="Rx-body-text">
                    Fort Washington Greenmarket<br/>Calle 168  & Av. Fort Washington<br/>Martes 8:00 AM – 4:00 PM
                  </p>
                  <p className="Rx-body-text">
                    175th Street Greenmarket<br/>Calle 175 entre Wadsworth & Broadway<br/>Jueves 8:00 AM – 4:00 PM
                  </p>
                  <p className="Rx-body-text">
                    Inwood Greenmarket<br/>Calle Isham entre Av. Seaman & Calle Cooper<br/>Sábado 8:00 AM – 3:00 PM
                  </p>
                  <p className="Rx-body-text">
                    Broadway Practice Youth Market<br/>Broadway entre Calle Dyckman & Calle Cumming<br/>Miércoles 9:00 AM – 3:00 PM<br/>Julio 8 - Agosto 26
                  </p>
                  <p className="Rx-subheader">
                    BRONX
                  </p>
                  <p className="Rx-body-text">
                    Bronx Borough Hall Greenmarket<br/>Calle 161 & Grand Concourse<br/>Martes 8:00 AM – 4:00 PM
                  </p>
                  <p className="Rx-body-text">
                    Lincoln Hospital Greenmarket<br/>Calle 149 entre Av. Park & Av. Morris<br/>Martes 8:00 AM – 3:00 PM<br/>Viernes 8:00 AM – 3:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>
        );
      };
    };

    return toggleDisplay()
  };
};

export default RxDisplay;
