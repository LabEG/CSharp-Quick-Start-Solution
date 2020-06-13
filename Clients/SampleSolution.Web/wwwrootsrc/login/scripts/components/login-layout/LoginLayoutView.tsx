
import { LoginLayoutController, LoginLayoutOptions } from "./LoginLayoutController";
import * as React from "react";
import { HashRouter, Switch, Redirect, RouteComponentProps, Route } from "react-router-dom";
import { PageController } from "../../../../core/scripts/components/_base/PageController";

// https://reacttraining.com/react-router/web/api/Route
export const loginLayoutView = <T extends LoginLayoutOptions, S>(ctrl: LoginLayoutController<T, S>, props: T): JSX.Element => (
    <div className="LoginLayoutController">
        <HashRouter key={1}>
            <Switch key={location.pathname}>
                {
                    props.routs
                        .getRouts()
                        .map((rout: PageController<RouteComponentProps<object>>, index: number) => (
                            <Route key={index + 1}
                                exact
                                path={rout.route}
                                component={rout.pageConstructor} />
                        ))
                }
                <Redirect to="/" />
            </Switch>
        </HashRouter>
    </div>
);
