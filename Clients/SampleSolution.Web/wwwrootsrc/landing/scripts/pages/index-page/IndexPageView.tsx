import { IndexPageController } from "./IndexPageController";
import * as React from "react";

export const indexPageView = <T, S>(ctrl: IndexPageController<T, S>, opts?: T): JSX.Element => (
    <div className="IndexPageController">
        Привет!
    </div>
);
