import { PageController } from "../../../../core/scripts/components/_base/PageController";
import { signInPageView } from "./SignInPageView";
import { BaseController } from "../../../../core/scripts/components/_base/BaseController";
import { alertify } from "@labeg/alertify.js";
import style from "./SignInPageStyles.scss";
import { autowired } from "first-di";
import { AccountService } from "../../../../core/scripts/services/AccountService";

export class SignInPage<P> extends PageController<P> {

    public isShowInNavigation: boolean = false;

    public title: string = "Логин";

    public route: string = "/";

    public pageConstructor: new (props: P, context?: Object) => BaseController<P, Object> = SignInPageController;

    public open(): void {
        this.openLocation(this.route);
    }

    public getUrl(): string {
        return this.route;
    }

}

export class SignInPageController<P, S> extends BaseController<P, S> {

    public isProgress: boolean = false;

    public login: string = "";

    public password: string = "";

    public rememberMe: boolean = false;

    @autowired()
    private readonly accountService!: AccountService;

    constructor(props: P, context?: S) {
        super(props, context, style, signInPageView);
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
            // location.href = "./";
        } catch (err) {
            // nothing do
        }
    }

    public async makeLogin(): Promise<void> {
        try {
            this.isProgress = true;
            this.redraw();

            await this.accountService.login();
        } catch (err) {
            if (err.message === "401 - Unauthorized") {
                alertify.error("При попытке залогиниться произошла ошибка: неверный логин или пароль");
            } else {
                alertify.error(`При попытке залогиниться произошла ошибка: ${err}`);
            }
        } finally {
            this.isProgress = false;
            this.redraw();
        }
    }

    public onEnterKeyPress(event: KeyboardEventInit): void {
        event.key === "Enter" ? this.makeLogin() : null;
    }

    public setRememberMe(value: boolean): void {
        this.rememberMe = value;
        this.redraw();
    }

}
