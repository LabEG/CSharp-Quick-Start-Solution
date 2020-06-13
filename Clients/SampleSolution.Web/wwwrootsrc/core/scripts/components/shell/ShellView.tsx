import { ShellController, ShellOptions } from "./ShellController";
import React from "react";

export const shellView = <T extends ShellOptions, S>(ctrl: ShellController<ShellOptions, S>, props: T): JSX.Element => (
    <div className="ShellController grid-noGutter">
        {
            React.createElement(
                props.layout,
                {
                    routs: props.routs
                }
            )
        }
    </div>
);
