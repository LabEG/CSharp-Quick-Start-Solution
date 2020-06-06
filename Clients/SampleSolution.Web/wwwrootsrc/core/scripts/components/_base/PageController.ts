import { BaseController } from "./BaseController";

export abstract class PageController<P> {

    public abstract isShowInNavigation: boolean;

    public abstract title: string;

    public abstract route: string;

    public abstract pageConstructor: new (props: any, context?: object) => BaseController<P, object>;

    protected openLocation(hash: string): void {
        window.location.hash = hash;
    }

    public abstract open(...keys: (string | number | void)[]): void;

    public abstract getUrl(...keys: (string | number | void)[]): void;

}
