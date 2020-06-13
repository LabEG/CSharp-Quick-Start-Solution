import { PageController } from "../../../../core/scripts/components/_base/PageController";
import { restorePageView } from "./RestorePageView";
import { BaseController } from "../../../../core/scripts/components/_base/BaseController";
import { alertify } from "@labeg/alertify.js";
import style from "./RestorePageStyles.scss";

export class RestorePage<P> extends PageController<P> {

    public isShowInNavigation: boolean = false;

    public title: string = "Логин";

    public route: string = "/";

    public pageConstructor: new (props: P, context?: Object) => BaseController<P, Object> = RestorePageController;

    public open(): void {
        this.openLocation(this.route);
    }

    public getUrl(): string {
        return this.route;
    }

}

export class RestorePageController<P, S> extends BaseController<P, S> {

    public isProgress: boolean = false;

    public login: string = "";

    public password: string = "";

    constructor(props: P, context?: S) {
        super(props, context, style, restorePageView);
    }

    public activate(): void {
        this.checkLogin();
    }

    public update(_props?: P): void {
        // code here
    }

    public dispose(): void {
        // code here
    }

    public checkLogin(): void {
        try {
            location.href = "./";
        } catch (err) {
            // nothing do
        }
    }

    public makeLogin(): void {
        try {
            this.isProgress = true;
            this.redraw();

            location.href = "./";
        } catch (err) {
            if (err.message === "401 - Unauthorized") {
                alertify.error("При попытке залогиниться произошла ошибка: неверный логин или пароль");
            } else {
                alertify.error(`При попытке залогиниться произошла ошибка: ${err}`);
            }
            this.isProgress = false;
            this.redraw();
        }
    }

    public onEnterKeyPress(event: KeyboardEventInit): void {
        event.key === "Enter" ? this.makeLogin() : null;
    }

}
