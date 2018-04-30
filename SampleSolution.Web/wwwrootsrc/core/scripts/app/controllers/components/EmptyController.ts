import {BaseController} from '../_base/BaseController';
import * as React from 'react';

export class EmptyController<T, S> extends BaseController<T, S> {

    constructor(props: T, context?: object) {
        super(
            props,
            context,
            void 0,
            (ctrl: BaseController<T, S>, options?: T) => React.createElement('div', void 0, '')
        );
        this.activate();
    }

    public activate(): void {
        // todo: logic here
    }

    public update(props?: T): void {
        // code here
    }

}
