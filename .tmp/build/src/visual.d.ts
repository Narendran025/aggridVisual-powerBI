import powerbi from "powerbi-visuals-api";
import ISelectionId = powerbi.visuals.ISelectionId;
import DataViewTable = powerbi.DataViewTable;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import "./../style/visual.less";
export interface ISelectionIdBuilder {
    withMeasure(measureId: string): this;
    withTable(table: DataViewTable, rowIndex: number): this;
    createSelectionId(): ISelectionId;
}
export declare class Visual implements IVisual {
    private target;
    private updateState;
    private visualSettings;
    private formattingSettingsService;
    private Theme;
    private selectionManager;
    private host;
    private state;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    getFormattingModel(): powerbi.visuals.FormattingModel;
}
