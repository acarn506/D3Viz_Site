import React from "react";
import HouseScat from "../Components/HouseScat";
import HouseBar from "../Components/HouseBar";
import { urlLocal, urlServer } from "../clientURL";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barData: [],
      scatData: [],
      barDataLoaded: false,
      scatDataLoaded: false,
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
        barDataLoaded: false,
        houseLength: data.length
      });
      that.formatBarData();
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
        barDataLoaded: false
      });
    });
  }

  formatBarData() {
    const salePrices = this.state.barData;

    const dataReduce = (arr, val) =>
      arr.reduce((acc, cur) => (cur.SalePrice <= val ? acc + 1 : acc), 0);

    const groupSalePrices = [];

    for (let i = 1; i <= 6; i++) {
      let count = 0;
      let group = i * 100000;

      count = dataReduce(salePrices, group);
      groupSalePrices.push({ group: group, count: count });
    }

    for (let j = 5; j > 0; j--) {
      groupSalePrices[j].count =
        groupSalePrices[j].count - groupSalePrices[j - 1].count;
    }

    this.setState({
      barData: groupSalePrices,
      barDataLoaded: true,
      scatDataLoaded: false
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
        <h1 className="dashHeading">House Prices Dashboard</h1>
        <section className="houseChart">{chart}</section>
        <article className="lenContainer">
          <h3 className="lenHeading"># of House Instances</h3>
          <h1 className="lenNumber">{this.state.houseLength}</h1>
        </article>
        <article className="targetContainer">
          <h4 className="targetHeader">Target Feature: SalePrice</h4>
        </article>
        <article>
          <button className="salePricebtn" onClick={() => this.getBarData()}>
            <h3 className="lenNumber">SalePrice Chart</h3>
          </button>
        </article>

        <h3 className="header">Correlated SalePrice Features</h3>
        <section className="controls">
          <button
            className="btnDash"
            onClick={() => this.getScatData("OverallQual")}
          ></button>
          <h4>OverallQual</h4>
          <button
            className="btnDash"
            onClick={() => this.getScatData("GrLivArea")}
          ></button>
          <h4>GrLivArea</h4>
          <button
            className="btnDash"
            onClick={() => this.getScatData("TotalBsmtSF")}
          ></button>
          <h4>TotalBsmtSF</h4>
          <button
            className="btnDash"
            onClick={() => this.getScatData("GarageCars")}
          ></button>
          <h4>GarageCars</h4>
          <button
            className="btnDash"
            onClick={() => this.getScatData("FullBath")}
          ></button>
          <h4>FullBath</h4>
          <button
            className="btnDash"
            onClick={() => this.getScatData("YearBuilt")}
          ></button>
          <h4>YearBuilt</h4>
        </section>
      </>
    );
  }
}

export default Dashboard;