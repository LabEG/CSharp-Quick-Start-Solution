import React from "react";
import * as ReactDOM from "react-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { ShellController } from "../../core/scripts/components/shell/ShellController";
import { Router } from "./Router";
import { alertify } from "@labeg/alertify.js";
import { LoginLayoutController } from "./components/login-layout/LoginLayoutController";

(async () => {
    // alertify setup
    alertify
        .setMaxLogItems(10)
        .setLogPosition("top right");

    window.onerror = (message: string, filename?: string, lineno?: number, colno?: number, error?: Error) => {
        alertify.error(`Ошибка в работе программы: \r\n ${message}`);
    };

    const muiTheme = createMuiTheme({
        palette: {
            primary: blue
        }
    });

    ReactDOM.render(
        // eslint-disable-next-line react/no-children-prop
        React.createElement(
            ThemeProvider,
            {
                theme: muiTheme,
                children: React.createElement(
                    ShellController,
                    {
                        routs: Router.routs,
                        layout: LoginLayoutController
                    }
                )
            }
        ),
        document.querySelector("body > #app") ?? document.body
    );

    const loader = document.querySelector("body > #init");
    document.body.removeChild(loader as HTMLElement);
})();
