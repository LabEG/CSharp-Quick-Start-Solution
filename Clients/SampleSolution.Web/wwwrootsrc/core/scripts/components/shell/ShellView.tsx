import { ShellController, ShellOptions } from "./ShellController";
import React, { Attributes } from "react";
import { HashRouter, Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";
import { PageController } from "../_base/PageController";

export const shellView = <T, S>(ctrl: ShellController<ShellOptions, S>, _props?: T): JSX.Element => (
    <div key={1} className="ShellController grid-noGutter">
        <aside key={1} className="left-panel col-2">
            {React.createElement(ctrl.leftPanelConstructor, { pages: ctrl.routs } as (Attributes & object))}
        </aside>
        <div key={2} className="right-panel col-10">
            <header key={1} className="header">
                {React.createElement(ctrl.headerPanelConstructor, { pages: ctrl.routs } as (Attributes & object))}
            </header>
            <article key={2} className="article">
                <HashRouter key={1}>
                    <Switch key={location.pathname}>
                        {
                            ctrl.routs
                                .map((rout: PageController<RouteComponentProps<object>>, index: number) =>
                                // https://reacttraining.com/react-router/web/api/Route
                                    (
                                        <Route key={index + 1}
                                            exact
                                            path={rout.route}
                                            component={rout.pageConstructor} />
                                    ))
                        }
                        <Redirect to="/" />
                    </Switch>
                </HashRouter>
            </article>
        </div>
    </div>
);
