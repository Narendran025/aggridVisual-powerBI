import { useEffect, useState } from 'react'
import { State } from '../interfaces'
import * as React from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import '../../style/grid.less'

const AgGrid = ({onRowClick, dataView, viewport, scaling}) => {
    // const visualHost : IVisualHost = host;
    // console.log(visualHost.colorPalette.backgroundDark.value);
    const [scale, setScale] = useState(scaling);

    const [state, setState] = useState<State>({
        data: [],
        columns: []
    });
    
    useEffect(()=>{
      setScale(scaling);
    }, [viewport, scaling])


    useEffect(()=>{
      if(dataView.table.rows && dataView.table.columns){
        const columns = dataView.table.columns.map(col=>{
            const obj: any = {};
            obj['field'] = col.displayName;
            return obj;
        })
        const data = dataView.table.rows.map((row) => {
            const obj: any = {};
           
            for(let i=0;i<row.length;i++){
              let data = row[i];
                if(typeof row[i] === 'number'){
                  data = getScaling(row[i], scale)
                }
                obj[`${dataView.table.columns[i].displayName}`] = data;
            }
            return obj;
        });
        
        setState({data, columns});
    } 
    }, [dataView, scale])

    const getScaling = (data, scaling)=>{      
      data = Number(data);
      switch(scaling){
        case 'normal':
          return data;
        case 'thousand':
          return `${data/1000}k`
        case 'million':
          return `${data/1000000}m`
        case 'billion':
          return `${data/1000000000}b`;
        case 'trillion':
          return `${data/1000000000000}t`
        default:
          return data;
      }

    }
    
  return (
    <div  style={{ height: viewport.height, width:viewport.width}} >
      {/* <AgGridReact
        rowData={state.data}
        columnDefs={state.columns}
        alwaysShowVerticalScroll={true}
        animateRows={true}
      /> */}

      <table style={{maxWidth: `500px`, maxHeight:`${viewport.height-150}px`, display:'block', overflowY:'scroll'}} id='customers'>
        <thead style={{fontWeight:'bold', padding: '20px'}}>
          <tr>
          {state.columns.map(col=>(
            <th style={{padding: '5px 10px'}}>{col.field}</th>
          ))}
          </tr>
        </thead>
        <tbody style={{overflowY: 'scroll'}}>
          {
            state.data.map((rowdata, index)=>(
              <tr onClick={()=>onRowClick(index)}>
                {state.columns.map(col=>(
                  <td style={{padding: '5px 10px'}}>{rowdata[col.field]}</td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default AgGrid
