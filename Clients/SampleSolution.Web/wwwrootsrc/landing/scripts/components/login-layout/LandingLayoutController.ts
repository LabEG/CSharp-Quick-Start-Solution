import { BaseLayoutController, BaseLayoutOptions } from "../../../../core/scripts/components/base-layout/BaseLayoutController";

export interface LandingLayoutOptions extends BaseLayoutOptions {

    children?: JSX.Element;

}

export class LandingLayoutController<T extends LandingLayoutOptions, S> extends BaseLayoutController<T, S> {

}
