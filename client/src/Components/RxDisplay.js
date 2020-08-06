import React, { Component } from 'react';
import '../Styling/App.css';
import QRCode from 'qrcode.react';
import { PDFExport } from '@progress/kendo-react-pdf';
import nyp_logo from '../Images/nyp_logo.PNG';

class RxDisplay extends Component {

  componentDidMount() {
    //download PDF
    this.rxPDF.save();
  };

  render() {
    return (
      <div className = "App">

        <div style={{ marginBottom: 10 }}>
          <button className="button" onClick={this.props.onLogOut}>
            Log Out
          </button>
          <button className="button" onClick={this.props.onCreateNew}>
            Create New
          </button>
        </div>

        <PDFExport paperSize={'Letter'} fileName={`FVRx-${this.props.rxId}.pdf`} ref={(r) => this.rxPDF = r}>
          <div style={{ height: 792, width: 612, padding: 'none', margin: 'none', overflowX: 'hidden', overflowY: 'hidden'}}>

            <div className="Rx-header">
              <img src={nyp_logo} alt='New York Presbyterian Logo' width="204" height="32" />
              <p className="Rx-header-text">
                Fruit and Vegetable Prescription // Receta de Frutas y Verduras
              </p>
              <QRCode size={100} value={`https://fvrx.azurewebsites.net/#/${this.props.rxId}`} />
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
                <p className="Rx-subheader-text">
                  MANHATTAN
                </p>
                <p className="Rx-body-text">
                  Fort Washington Greenmarket<br/>168th St. & Fort Washington Ave.<br/>Tuesday 8:00 AM - 4:00 PM
                </p>
                <p className="Rx-body-text">
                  175th Street Greenmarket<br/>175th St. between Wadsworth & Broadway<br/>Thursday 8:00 AM - 4:00 PM
                </p>
                <p className="Rx-body-text">
                  Inwood Greenmarket<br/>Isham Street between Seaman Ave & Cooper St.<br/>Saturday 8:00 AM – 3:00 PM
                </p>
                <p className="Rx-body-text">
                  Broadway Practice Youth Market<br/>Broadway between Dyckman St. & Cumming St.<br/>Wednesday 9:00 AM – 3:00 PM<br/>July 8 - August 26
                </p>
                <p className="Rx-subheader-text">
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
                <p className="Rx-subheader-text">
                  MANHATTAN
                </p>
                <p className="Rx-body-text">
                  Fort Washington Greenmarket<br/>Calle 168 & Av. Fort Washington<br/>Martes 8:00 AM – 4:00 PM
                </p>
                <p className="Rx-body-text">
                  175th Street Greenmarket<br/>Calle 175 entre Wadsworth & Broadway<br/>Jueves 8:00 AM – 4:00 PM
                </p>
                <p className="Rx-body-text">
                  Inwood Greenmarket<br/>Calle Isham entre Av. Seaman & Calle Cooper<br/>Sabado 8:00 AM – 3:00 PM
                </p>
                <p className="Rx-body-text">
                  Broadway Practice Youth Market<br/>Broadway entre Calle Dyckman & Calle Cumming<br/>Miercoles 9:00 AM – 3:00 PM<br/>Julio 8 - Agosto 26
                </p>
                <p className="Rx-subheader-text">
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
        </PDFExport>
      </div>
    );
  };
};

export default RxDisplay;
