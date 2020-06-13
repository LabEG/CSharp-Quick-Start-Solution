
import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Router } from "./Router";
import { alertify } from "@labeg/alertify.js";
import { ShellController } from "../../core/scripts/components/shell/ShellController";
import { BaseLayoutController } from "../../core/scripts/components/base-layout/BaseLayoutController";

// alertify setup
alertify
    .setMaxLogItems(10)
    .setLogPosition("top right");

window.onerror = (msg: string, url: string, line: number, col: number, error: Error) => {
    alertify.error(`Ошибка в работе программы: \r\n ${msg}`);
};

const { routs } = Router;

ReactDOM.render(
    React.createElement(
        MuiThemeProvider,
        void 0,
        React.createElement(
            ShellController,
            {
                routs,
                layout: BaseLayoutController
            }
        )
    ),
    document.querySelector("body > #app") ?? document.body
);
