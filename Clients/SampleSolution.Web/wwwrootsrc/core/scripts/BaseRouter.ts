import { PageController } from "./components/_base/PageController";

export class BaseRouter {

    public getRouts(): PageController<object>[] {
        const routs: string[] = Object.keys(this);
        const pages: PageController<object>[] = [];

        for (const rout in routs) {
            if (this[routs[rout]] instanceof PageController) {
                pages.push(this[routs[rout]]);
            }
        }

        return pages;
    }

}
