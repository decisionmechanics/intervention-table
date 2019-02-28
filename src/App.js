import React, { Component } from "react";
import "./App.css";
import InterventionTable from "./components/InterventionTable";

class App extends Component {
  render() {
    return (
      <div className="App">
        <InterventionTable
          minimumDeathsAverted={0}
          maximumDeathsAverted={1500}
          interventions={[
            {
              id: "1",
              name: "Vitamin A",
              baseYear: 2019,
              coverage: [1, 3, 4, 7, 8, 9, 12, 12, 13, 15, 16, 17],
              deathsAverted: 1500,
              checked: false
            },
            {
              id: "2",
              name: "Zinc Supplementation",
              baseYear: 2019,
              coverage: [2, 2, 3, 5, 7, 10, 11, 12, 13, 16, 16, 18],
              deathsAverted: 900,
              checked: false
            }
          ]}
          onRowSelected={interventionId => {
            console.log(`Selected intervention ${interventionId}`);
          }}
        />
      </div>
    );
  }
}

export default App;
