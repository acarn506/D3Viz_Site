import React from "react";
import HouseScat from "../Components/HouseScat";
import HouseBar from "../Components/HouseBar";
import { urlLocal, urlServer } from "../clientURL";

class HousingDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barData: [],
      scatData: [],
      allData: [],
      barDataLoaded: false,
      scatDataLoaded: false,
      allDataLoaded: false,
      houseLength: 0
    };
  }

  // fetch bar chart data
  getBarData() {
    let that = this;
    // A promise for the response
    let myRes = fetch(urlLocal + "housePrices");
    // A promise for the body
    let myBody = myRes.then(function(res) {
      // Work with response
      console.log(`${res.statusText} response for ${res.url}`);
      // returns a promise for the body
      return res.json();
    });

    myBody.then(function(body) {
      let data = body;

      that.setState({
        barData: data,
        barDataLoaded: true,
        scatDataLoaded: false,
        allDataLoaded: false,
        houseLength: data.length
      });
    });
  }

  // fetch House data
  getScatData(event) {
    let feature = event;
    let that = this;
    // A promise for the response
    let myRes = fetch(urlLocal + "housePrices/" + event);
    // A promise for the body
    let myBody = myRes.then(function(res) {
      // Work with response
      console.log(`${res.statusText} response for ${res.url}`);
      // returns a promise for the body
      return res.json();
    });

    myBody.then(function(body) {
      let data = body;

      that.setState({
        scatData: data,
        scatDataLoaded: true,
        barDataLoaded: false,
        allDataLoaded: false
      });
    });
  }

  // fetch all house features
  getAllData() {
    let that = this;
    // A promise for the response
    let myRes = fetch(urlLocal + "allHouseFeatures");
    // A promise for the body
    let myBody = myRes.then(function(res) {
      // Work with response
      console.log(`${res.statusText} response for ${res.url}`);
      // returns a promise for the body
      return res.json();
    });

    myBody.then(function(body) {
      let data = body;

      console.log("all data", data);

      that.setState({
        allData: data,
        barDataLoaded: false,
        scatDataLoaded: false,
        allDataLoaded: true
      });
    });
  }

  componentDidMount() {
    this.getBarData();
  }

  render() {
    let chart = null;
    if (this.state.barDataLoaded) {
      chart = <HouseBar data={this.state.barData} />;
    } else if (this.state.scatDataLoaded) {
      chart = <HouseScat data={this.state.scatData} />;
    } else {
      chart = <h1>Waiting for Data to Load</h1>;
    }

    return (
      <>
        <div className="mainContainer">
          <section className="infoContainer">
            <article className="lenContainer">
              <h3 className="lenHeading"># of House Instances</h3>
              <h1 className="lenNumber">{this.state.houseLength}</h1>
            </article>
            <article className="targetContainer">
              <h4 className="targetHeader">Target Feature: SalePrice</h4>
            </article>
            <article>
              <button
                className="salePricebtn"
                onClick={() => this.getBarData()}
              >
                <h3 className="salePriceHeader">SalePrice Chart</h3>
              </button>
            </article>
            <article>
              <button
                className="salePricebtn"
                onClick={() => this.getAllData()}
              >
                <h3 className="salePriceHeader">Features Histogram</h3>
              </button>
            </article>
          </section>

          <section className="chartContainer">
            <h1 className="dashHeading">House Prices Dashboard</h1>
            <section className="houseChart">{chart}</section>
          </section>

          <section className="btnContainer">
            <h3 className="header">Correlated SalePrice Features</h3>
            <section className="controls">
              <article>
                <button
                  className="btnDash"
                  onClick={() => this.getScatData("OverallQual")}
                ></button>
                <h4>OverallQual</h4>
              </article>
              <article>
                <button
                  className="btnDash"
                  onClick={() => this.getScatData("GrLivArea")}
                ></button>
                <h4>GrLivArea</h4>
              </article>
              <article>
                <button
                  className="btnDash"
                  onClick={() => this.getScatData("TotalBsmtSF")}
                ></button>
                <h4>TotalBsmtSF</h4>
              </article>
              <article>
                <button
                  className="btnDash"
                  onClick={() => this.getScatData("GarageCars")}
                ></button>
                <h4>GarageCars</h4>
              </article>
              <article>
                <button
                  className="btnDash"
                  onClick={() => this.getScatData("FullBath")}
                ></button>
                <h4>FullBath</h4>
              </article>
              <article>
                <button
                  className="btnDash"
                  onClick={() => this.getScatData("YearBuilt")}
                ></button>
                <h4>YearBuilt</h4>
              </article>
            </section>
          </section>
        </div>
      </>
    );
  }
}

export default HousingDashboard;
