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
import ISelectionId = powerbi.visuals.ISelectionId;
import DataView = powerbi.DataView;
import DataViewTable = powerbi.DataViewTable;
import ThemeData = powerbi.ThemeColorData;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import "./../style/visual.less";
import { State } from "./interfaces";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import {VisualSettings} from './settings'
import Starter from './component/Starter'
import DataViewer from './component/DataViewer';

export interface ISelectionIdBuilder {
    withMeasure(measureId: string): this;
    withTable(table: DataViewTable, rowIndex: number): this;
    createSelectionId(): ISelectionId;
}


export class Visual implements IVisual {
    private target: HTMLElement;
    private updateState: (newState: State) => void;
    private visualSettings: VisualSettings; 
    private formattingSettingsService : FormattingSettingsService;
    private Theme : ThemeData;
    private selectionManager;
    private host : IVisualHost;
    
    private state: State = {
        data: [],
        columns: []
    }
    constructor(options: VisualConstructorOptions) {
        this.host = options.host;
        this.formattingSettingsService = new FormattingSettingsService();
        this.selectionManager = this.host.createSelectionManager();
        this.updateState = () => {
            this.state = {
                data: [],
                columns: []
            }
        };
        this.target = options.element;

        // const reactRoot = React.createElement(AgGrid, {
        //     updateCallback: (updateFunc : (newState : State)=> void)=>{
        //         this.updateState = updateFunc;
        //     }
        // });

        // const root = createRoot(this.target);
        // root.render(reactRoot);
        Starter(this.target);
        
    }

    public update(options: VisualUpdateOptions) {
        const dataView: DataView = options.dataViews[0];
        this.visualSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualSettings, dataView);
        
        const onRowClick = (rowIndex: any) => {
            
            const selection: ISelectionId = this.host.createSelectionIdBuilder()
            .withTable(dataView.table, rowIndex)
            .createSelectionId();

            this.selectionManager.select(selection);
        };

        DataViewer(this.target,this.host, onRowClick, dataView, options.viewport, this.visualSettings);
        
    }
    
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.visualSettings);
    }
}