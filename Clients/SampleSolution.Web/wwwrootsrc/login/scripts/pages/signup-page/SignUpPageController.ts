import { PageController } from "../../../../core/scripts/components/_base/PageController";
import { signUpPageView } from "./SignUpPageView";
import { BaseController } from "../../../../core/scripts/components/_base/BaseController";
import style from "./SignUpPageStyles.scss";
import { FormErrors } from "../../../../core/scripts/models/ViewModels/FormErrors";
import { RegistrationDto } from "../../../../core/scripts/models/Dto/AccountsDto/RegistrationDto";
import { autowired } from "first-di";
import { AccountService } from "../../../../core/scripts/services/AccountService";
import { alertify } from "@labeg/alertify.js";

export class SignUpPage<P> extends PageController<P> {

    public isShowInNavigation: boolean = false;

    public title: string = "Логин";

    public route: string = "/sign-up";

    public pageConstructor: new (props: P, context?: Object) => BaseController<P, Object> = SignUpPageController;

    public open(): void {
        this.openLocation(this.route);
    }

    public getUrl(): string {
        return this.route;
    }

}

export class SignUpPageController<P, S> extends BaseController<P, S> {

    public isProgress: boolean = false;

    public errorMessage: string | null = null;

    public registration: RegistrationDto;

    public formErrors: FormErrors<RegistrationDto>;

    @autowired()
    private readonly accountService!: AccountService;

    constructor(props: P, context?: S) {
        super(props, context, style, signUpPageView);

        this.registration = new RegistrationDto();
        this.formErrors = new FormErrors(this.registration);
    }

    public activate(): void {
        // code here
    }

    public update(_props?: P): void {
        // code here
    }

    public dispose(): void {
        // code here
    }

    public async makeLogin(): Promise<void> {
        try {
            this.isProgress = true;
            this.redraw();

            await this.accountService.register(this.registration);
        } catch (err: unknown) {
            this.errorMessage = (err as Error).message;
            alertify.error(`An error occurred while trying to register: ${String(err)}`);
        } finally {
            this.isProgress = false;
            this.redraw();
        }
    }

    public async handleInput(prop: keyof RegistrationDto): Promise<void> {
        await this.formErrors.onChangeProp(prop);
        this.redraw();
    }

    public async handleBlur(prop: keyof RegistrationDto): Promise<void> {
        await this.formErrors.onTouchProp(prop);
        this.redraw();
    }

    public onEnterKeyPress(event: KeyboardEventInit): void {
        if (event.key === "Enter") {
            this.makeLogin();
        }
    }

}
