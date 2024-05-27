/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/

"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import "./../style/visual.less";
import * as React from 'react';
import AgGrid from './component/AgGrid';
import {createRoot} from 'react-dom/client';
import { State } from "./interfaces";


export class Visual implements IVisual {
    private target: HTMLElement;
    private updateState: (newState: State) => void;

    private state: State = {
        data: [],
        columns: []
    }
    constructor(options: VisualConstructorOptions) {
        this.updateState = () => {
            this.state = {
                data: [],
                columns: []
            }
        };
        this.target = options.element;

        const reactRoot = React.createElement(AgGrid, {
            updateCallback: (updateFunc : (newState : State)=> void)=>{
                this.updateState = updateFunc;
            }
        });

        const root = createRoot(this.target);
        root.render(reactRoot);
        
    }

    public update(options: VisualUpdateOptions) {

        const dataView: DataView = options.dataViews[0];
        if(dataView.table.rows && dataView.table.columns){
            const columns = dataView.table.columns.map(col=>{
                const obj: any = {};
                obj['field'] = col.displayName;
                return obj;
            })
            const data = dataView.table.rows.map(row => {
                const obj: any = {};
               
                for(let i=0;i<row.length;i++){
                    obj[`${dataView.table.columns[i].displayName}`] = row[i];
                }
               
                return obj;
            });
    
            this.state = {
                data, columns
            }

            this.updateState(
                this.state
            )
        }
        
    }
}