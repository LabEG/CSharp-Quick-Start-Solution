
import { LandingLayoutController, LandingLayoutOptions } from "./LandingLayoutController";
import { HashRouter, Switch, Redirect, Route, RouteComponentProps } from "react-router-dom";
import { PageController } from "../../../../core/scripts/components/_base/PageController";
import * as React from "react";

export const landingLayoutView = <T extends LandingLayoutOptions, S>(ctrl: LandingLayoutController<T, S>, props: T): JSX.Element => (
    <div className="LandingLayoutController">
        <aside key={1} className="left-panel col-2">
            navigation
        </aside>
        <div key={2} className="right-panel col-10">
            <header key={1} className="header">
                header
            </header>
            <article key={2} className="article">
                <HashRouter key={1}>
                    <Switch key={location.pathname}>
                        {
                            props.routs
                                .getRouts()
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
