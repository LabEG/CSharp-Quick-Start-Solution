
import {SampleController, SampleOptions} from '../controllers/SampleController';
import * as React from 'react';

export function sampleView<T extends SampleOptions, S>(ctrl: SampleController<T, S>, opts: T): JSX.Element {
    return (
        <div className="SampleController">
            // todo: logic here
        </div>
    );
}
