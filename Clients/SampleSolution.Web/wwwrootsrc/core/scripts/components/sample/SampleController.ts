import { BaseController } from "../_base/BaseController";
import { sampleView } from "./SampleView";

export class SampleOptions {
    // code here
}

export class SampleController<T extends SampleOptions, S> extends BaseController<SampleOptions, S> {

    constructor(props: T, context?: object) {
        super(
            props,
            context,
            require("./../../../content/less/components/sample.less"),
            sampleView
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
