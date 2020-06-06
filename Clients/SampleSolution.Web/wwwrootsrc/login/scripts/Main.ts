// tslint:disable-next-line:no-reference
// / <reference path="./../../../typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { ShellController } from "../../core/scripts/app/controllers/ShellController";
import * as injectTapEventPlugin from "react-tap-event-plugin";
import { Router } from "./app/Router";
import * as alertify from "alertify.js";
import { EmptyController } from "../../core/scripts/app/controllers/components/EmptyController";

/*
 * Needed for onTouchTap
 * http://stackoverflow.com/a/34015469/988941
 */
injectTapEventPlugin();

// alertify setup
alertify
    .maxLogItems(10)
    .logPosition("top right");

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
    document.getElementById("app") || document.body
);
