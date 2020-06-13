import { PageController } from "../../../../core/scripts/components/_base/PageController";
import { BaseController } from "../../../../core/scripts/components/_base/BaseController";
import { indexPageView } from "./IndexPageView";
import style from "./IndexPageStyles.scss";

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

    constructor(props: P, context?: S) {
        super(props, context, style, indexPageView);
        window.scrollTo(0, 0);
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

}
