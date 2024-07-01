import * as React from 'react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import '../../style/grid.less';
declare const AgGrid: ({ onRowClick, dataView, viewport, scaling }: {
    onRowClick: any;
    dataView: any;
    viewport: any;
    scaling: any;
}) => React.JSX.Element;
export default AgGrid;
