import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { EmptyController } from "../../core/scripts/components/empty/EmptyController";
import { ShellController } from "../../core/scripts/components/shell/ShellController";
import { Router } from "./Router";
import {alertify} from "@labeg/alertify.js";

// alertify setup
alertify
    .setMaxLogItems(10)
    .setLogPosition("top right");

window.onerror = (message: string, filename?: string, lineno?: number, colno?: number, error?: Error) => {
    alertify.error(`Ошибка в работе программы: \r\n ${message}`);
};

ReactDOM.render(
    React.createElement(
        MuiThemeProvider,
        void 0,
        React.createElement(
            ShellController,
            {
                routs: Router.routs,
                leftPanelConstructor: EmptyController,
                headerPanelConstructor: EmptyController
            }
        )
    ),
    document.getElementById("app") ?? document.body
);
