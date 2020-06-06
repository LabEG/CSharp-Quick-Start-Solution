import { BaseController } from../../components/_base/BaseControllerer";
import * as React from "./node_modules/react";

export class EmptyController<T, S> extends BaseController<T, S> {

    constructor(props: T, context?: object) {
        super(
            props,
            context,
            void 0,
            (ctrl: BaseController<T, S>, options?: T) => React.createElement("div", void 0, "")
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
