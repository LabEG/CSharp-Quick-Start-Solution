import { IndexPage } from"./pages/index-page/IndexPageController";
import { BaseRouter } from "../../core/scripts/BaseRouter";

export class Router extends BaseRouter {

    public static routs: Router = new Router();

    public indexPage: IndexPage<object> = new IndexPage();

}
