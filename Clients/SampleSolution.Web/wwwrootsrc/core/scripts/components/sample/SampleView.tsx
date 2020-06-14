
import { SampleController, SampleOptions } from "./SampleController";
import React from "react";

export const sampleView = <T extends SampleOptions, S>(ctrl: SampleController<T, S>, opts: T): JSX.Element => (
    <div className="SampleController">
        empty
    </div>
);
