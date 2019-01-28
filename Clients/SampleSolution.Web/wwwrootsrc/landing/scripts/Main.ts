// tslint:disable-next-line:no-reference
/// <reference path="./../../../typings/index.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {ShellController} from '../../core/scripts/app/controllers/ShellController';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import {Router} from './app/Router';
import * as alertify from 'alertify.js';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// alertify setup
alertify
    .maxLogItems(10)
    .logPosition('top right');

window.onerror = (msg: string, url: string, line: number, col: number, error: Error) => {
    alertify.error(`Ошибка в работе программы: \r\n ${msg}`);
};

const routs = Router.routs;

ReactDOM.render(
    React.createElement(
        MuiThemeProvider,
        void 0,
        React.createElement(ShellController, {routs: routs})
    ),
    document.getElementById('app') || document.body
);
