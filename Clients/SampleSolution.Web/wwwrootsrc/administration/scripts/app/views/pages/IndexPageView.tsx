import {IndexPageController} from '../../controllers/pages/IndexPageController';
import * as React from 'react';

export function indexPageView<T, S>(ctrl: IndexPageController<T, S>, opts?: T): JSX.Element {
    return (
        <div className="IndexPageController">
            Привет!
        </div>
    );
}
