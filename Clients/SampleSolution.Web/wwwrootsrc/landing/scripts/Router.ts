import { IndexPage } from./pages/IndexPage/IndexPageControllerer";
import { BaseRouter } from "../../../core/scripts/app/BaseRouter";

export class Router extends BaseRouter {

    public static routs: Router = new Router();

    public indexPage: IndexPage<object> = new IndexPage();

}
