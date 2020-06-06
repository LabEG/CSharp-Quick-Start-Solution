
import { SampleController, SampleOptions } from../components/SampleControllerer";
import * as React from "./node_modules/react";

export function sampleView<T extends SampleOptions, S>(ctrl: SampleController<T, S>, opts: T): JSX.Element {
    return (
        <div className="SampleController">
            // todo: logic here
        </div>
    );
}
