import { BaseRouter } from "../../core/scripts/BaseRouter";
import { SignInPage } from "./pages/signin-page/SignInPageController";
import { SignUpPage } from "./pages/signup-page/SignUpPageController";
import { RestorePage } from "./pages/restore-page/RestorePageController";

export class Router extends BaseRouter {

    public static routs: Router = new Router();

    public signinPage: SignInPage<object> = new SignInPage();

    public signUpPage: SignUpPage<object> = new SignUpPage();

    public restorePage: RestorePage<object> = new RestorePage();

}
