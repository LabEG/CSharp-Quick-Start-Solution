import { BaseLayoutController, BaseLayoutOptions } from "../../../../core/scripts/components/base-layout/BaseLayoutController";
import { loginLayoutView } from "./LoginLayoutView";
import style from "./LoginLayoutStyles.scss";

export interface LoginLayoutOptions extends BaseLayoutOptions {
    children?: JSX.Element;
}

export class LoginLayoutController<T extends LoginLayoutOptions, S> extends BaseLayoutController<T, S> {

    constructor(props: T, context?: S) {
        super(props, context, style, loginLayoutView);
    }

}
