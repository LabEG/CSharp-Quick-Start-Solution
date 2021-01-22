import { PageController } from "../../../../core/scripts/components/_base/PageController";
import { signInPageView } from "./SignInPageView";
import { BaseController } from "../../../../core/scripts/components/_base/BaseController";
import { alertify } from "@labeg/alertify.js";
import style from "./SignInPageStyles.scss";
import { autowired } from "first-di";
import { AccountService } from "../../../../core/scripts/services/AccountService";
import { LoginDto } from "../../../../core/scripts/models/Dto/AccountsDto/LoginDto";

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
        } catch (err: unknown) {
            // nothing do
        }
    }

    public async makeLogin(): Promise<void> {
        try {
            this.isProgress = true;
            this.redraw();

            const login = new LoginDto();
            login.login = this.login;
            login.password = this.password;
            login.rememberMe = this.rememberMe;

            await this.accountService.login(login);
        } catch (err: unknown) {
            if (err instanceof Error && err.message === "400 - Bad Request") {
                alertify.error("An error occurred while trying to login: wrong login or password.");
            } else {
                alertify.error(`An error occurred while trying to login: ${String(err)}`);
            }
        } finally {
            this.isProgress = false;
            this.redraw();
        }
    }

    public onEnterKeyPress(event: KeyboardEventInit): void {
        if (event.key === "Enter") {
            this.makeLogin();
        }
    }

    public setLogin(value: string): void {
        this.login = value;
        this.redraw();
    }

    public setPassword(value: string): void {
        this.password = value;
        this.redraw();
    }

    public setRememberMe(value: boolean): void {
        this.rememberMe = value;
        this.redraw();
    }

}
