import { BaseController } from "../_base/BaseController";
import { baseLayoutView } from "./BaseLayoutView";
import style from "./BaseLayoutStyles.scss";
import { BaseRouter } from "../../BaseRouter";

export interface BaseLayoutOptions {
    routs: BaseRouter;
}

export class BaseLayoutController<T extends BaseLayoutOptions, S> extends BaseController<BaseLayoutOptions, S> {

    constructor(props: T, context?: S, css?: string, view?: (ctrl: BaseLayoutController<T, S>, props: T) => JSX.Element) {
        super(props, context, css ?? style, view ?? baseLayoutView);
    }

    public activate(): void {
        // code here
    }

    public update(_props: T): void {
        // code here
    }

    public dispose(): void {
        // code here
    }

}
