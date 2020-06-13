import { BaseController } from "../../../../core/scripts/components/_base/BaseController";
import { sampleView } from "./SampleView";
import style from "./SampleStyles.scss";

export class SampleOptions {
    // code here
}

export class SampleController<T extends SampleOptions, S> extends BaseController<SampleOptions, S> {

    constructor(props: T, context?: S) {
        super(props, context, style, sampleView);
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
