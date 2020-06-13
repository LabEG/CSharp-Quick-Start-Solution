
import { LoginLayoutController, LoginLayoutOptions } from "./LoginLayoutController";
import * as React from "react";

export const loginLayoutView = <T extends LoginLayoutOptions, S>(ctrl: LoginLayoutController<T, S>, opts: T): JSX.Element => (
    <div className="LoginLayoutController">
        пусто
    </div>
);
