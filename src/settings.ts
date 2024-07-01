/*
 *  Power BI Visualizations
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

// "use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

export class GridSettings extends FormattingSettingsCard{
    // public theme = new formattingSettings.ColorPicker({
    //     name: "theme",
    //     displayName: "Theme",
    //     value: { value: "#ffffff" },
    //     visible: false
    // });

    // public color = new formattingSettings.ColorPicker({
    //     name: 'color',
    //     displayName : 'Font Color',
    //     value: { value : '#000000'},
    //     visible: false
    // })

    public theme = new formattingSettings.ReadOnlyText({
        name: 'theme',
        displayName: 'Theme',
        value: 'light'
    })


    public name: string = "grid";
    public displayName: string = "Table View";
    public visible: boolean = false;
    public slices: FormattingSettingsSlice[] = [this.theme]
}

export class VisualSettings extends FormattingSettingsModel {
    public grid: GridSettings = new GridSettings();
    public cards: FormattingSettingsCard[] = [this.grid];
}