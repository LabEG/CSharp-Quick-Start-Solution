import { BaseController } from "../../components/_base/BaseController";
import React from "react";

export class EmptyController<T, S> extends BaseController<T, S> {

    constructor(props: T, context?: S) {
        super(
            props,
            context,
            void 0,
            () => React.createElement("div", void 0, "")
        );
        this.activate();
    }

    public activate(): void {
        // code here
    }

    public update(_props?: T): void {
        // code here
    }

    public dispose(): void {
        // code here
    }

}
