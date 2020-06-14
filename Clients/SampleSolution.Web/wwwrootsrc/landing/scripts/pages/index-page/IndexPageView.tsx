import { IndexPageController } from "./IndexPageController";
import React from "react";

export const indexPageView = <T, S>(ctrl: IndexPageController<T, S>, opts?: T): JSX.Element => (
    <div className="IndexPageController">
        Привет!
    </div>
);
