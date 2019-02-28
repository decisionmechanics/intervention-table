import React from "react";
import * as PropTypes from "prop-types";
import "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { Sparklines, SparklinesLine } from "react-sparklines";

const CoverageTrendCellRenderer = props => (
  <Sparklines data={props.value}>
    <SparklinesLine
      style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }}
    />
  </Sparklines>
);

const DeathsAvertedCellRenderer = props => (
  <div>
    <div
      style={{
        width: ((props.value - props.minimum) / props.maximum) * 100,
        height: 10,
        backgroundColor: "blue"
      }}
    />
  </div>
);

const InterventionTable = props => (
  <div className="ag-theme-material">
    <AgGridReact
      domLayout="autoHeight"
      pagination={true}
      paginationPageSize={10}
      suppressColumnVirtualisation={true}
      suppressCellSelection={true}
      overlayNoRowsTemplate="<span />"
      rowData={props.interventions.map(intervention => ({
        ...intervention,
        coverageSummary:
          intervention.coverage.length && intervention.coverage[0]
      }))}
      onRowSelected={params => {
        if (params.node.selected) {
          props.onRowSelected(params.data.id);
        }
      }}
    >
      <AgGridColumn
        headerName="Indicator name"
        field="name"
        headerCheckboxSelection={true}
        checkboxSelection={true}
      />
      <AgGridColumn
        headerName="Current coverage 2019"
        field="coverageSummary"
        type="numericColumn"
        valueFormatter={params => `${params.value}%`}
      />
      <AgGridColumn
        headerName="Coverage trend"
        field="coverage"
        cellRendererFramework={CoverageTrendCellRenderer}
      />
      <AgGridColumn
        headerName="Deaths averted"
        field="deathsAverted"
        type="numericColumn"
      />
      <AgGridColumn
        headerName=""
        field="deathsAverted"
        cellRendererFramework={DeathsAvertedCellRenderer}
        cellRendererParams={{
          minimum: props.minimumDeathsAverted,
          maximum: props.maximumDeathsAverted
        }}
        cellStyle={{
          display: "flex",
          alignItems: "center"
        }}
      />
    </AgGridReact>
  </div>
);

InterventionTable.propTypes = {
  minimumDeathsAverted: PropTypes.number.isRequired,
  maximumDeathsAverted: PropTypes.number.isRequired,
  interventions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      baseYear: PropTypes.number.isRequired,
      coverage: PropTypes.arrayOf(PropTypes.number).isRequired,
      deathsAverted: PropTypes.number.isRequired,
      checked: PropTypes.bool.isRequired
    })
  ),
  onRowSelected: PropTypes.func.isRequired
};

InterventionTable.defaultProps = {
  interventions: []
};

export default InterventionTable;
