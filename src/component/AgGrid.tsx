import { useEffect, useState } from 'react'
import { State } from '../interfaces'
import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid


const AgGrid = ({updateCallback}) => {
    const [state, setState] = useState<State>({
        data: [],
        columns: []
    });

    useEffect(()=>{
        updateCallback(setState);
        
    }, [updateCallback])
    
    
  return (
    <div  className="ag-theme-quartz" style={{ height: 500 }} >
      <AgGridReact
        rowData={state.data}
        columnDefs={state.columns}
        alwaysShowVerticalScroll={true}
        animateRows={true}
      />
    </div>
  )
}

export default AgGrid
