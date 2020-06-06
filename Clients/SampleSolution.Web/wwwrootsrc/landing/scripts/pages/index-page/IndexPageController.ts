import { PageController } from "../../../../core/scripts/components/_base/PageController";
import { BaseController } from "../../../../core/scripts/components/_base/BaseController";
import { indexPageView } from "./IndexPageView";

export class IndexPage<P> extends PageController<P> {

    public isShowInNavigation: boolean = true;

    public title: string = "Стартовая";

    public route: string = "/";

    public pageConstructor: new (props: P, context?: Object) => BaseController<P, Object> = IndexPageController;

    public open(): void {
        this.openLocation(this.route);
    }

    public getUrl(): string {
        return this.route;
    }

}

export class IndexPageController<P, S> extends BaseController<P, S> {

    constructor(props: P, context?: object) {
        super(
            props,
            context,
            require("./../../../../content/less/index-page.less"),
            indexPageView
        );
        window.scrollTo(0, 0);

        this.activate();
    }

    public activate(): void {
        // code here
    }

    public update(props?: P): void {
        // code here
    }

    public dispose(): void {
        // code here
    }

}
