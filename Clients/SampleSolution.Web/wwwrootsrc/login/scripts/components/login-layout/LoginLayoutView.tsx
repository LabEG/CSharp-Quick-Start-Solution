
import { LoginLayoutController, LoginLayoutOptions } from "./LoginLayoutController";
import { BrowserRouter, Switch, Redirect, RouteComponentProps, Route } from "react-router-dom";
import { PageController } from "../../../../core/scripts/components/_base/PageController";
import Paper from "@material-ui/core/Paper";
import React from "react";

// https://reacttraining.com/react-router/web/api/Route
export const loginLayoutView = <T extends LoginLayoutOptions, S>(ctrl: LoginLayoutController<T, S>, props: T): JSX.Element => (
    <div className="LoginLayout">
        <div className="login-background sm-hidden" />
        <Paper className="login-form"
            elevation={4}>
            <BrowserRouter basename="/login/">
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
            </BrowserRouter>
        </Paper>
    </div>
);
