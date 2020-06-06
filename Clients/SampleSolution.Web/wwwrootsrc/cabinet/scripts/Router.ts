import { IndexPage } from./pages/IndexPageControllerer";
import { BaseRouter } from "../../../core/scripts/app/BaseRouter";

export class Router extends BaseRouter {

    public static routs: Router = new Router();

    public indexPage: IndexPage<object> = new IndexPage();

}
