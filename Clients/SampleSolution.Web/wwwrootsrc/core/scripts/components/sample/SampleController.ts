import { BaseController } from../components/_base/BaseControllerer";
import { sampleView } from "./SampleView";

export class SampleOptions {
    // todo: properties here
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
        // todo: logic here
    }

    public update(props?: T): void {
        // code here
    }

}
