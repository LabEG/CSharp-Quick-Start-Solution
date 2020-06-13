
import { BaseLayoutController, BaseLayoutOptions } from "./BaseLayoutController";
import * as React from "react";

export const baseLayoutView = <T extends BaseLayoutOptions, S>(ctrl: BaseLayoutController<T, S>, opts: T): JSX.Element => (
    <div className="BaseLayoutController">
        пусто
    </div>
);
