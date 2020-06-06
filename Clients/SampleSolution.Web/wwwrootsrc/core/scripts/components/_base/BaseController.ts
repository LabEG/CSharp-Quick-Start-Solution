import * as React from "react";

export abstract class BaseController<P, S> extends React.Component<P, S> {

    private readonly _css?: string;

    private readonly _view: (ctrl: BaseController<P, S>, options?: P) => JSX.Element;

    constructor(props: P, context?: object, css?: string, view?: (ctrl: BaseController<P, S>, options?: P) => JSX.Element) {
        super(props, context);

        this._css = css || void 0;
        this._view = view || ((ctrl: BaseController<P, S>, options?: P) => React.createElement("div", void 0, "не определено"));

        this.insertCss();
    }

    public abstract activate(): void;

    public abstract update(props?: P): void | boolean;

    public render(): JSX.Element {
        return this._view(this, this.props);
    }

    public redraw(): void {
        console.time("redraw");
        this.forceUpdate();
        console.timeEnd("redraw");
    }

    public shouldComponentUpdate(nextProps: P, nextState: S, nextContext: any): boolean {
        this.props = nextProps || void 0;
        const result: void | boolean = this.update(nextProps);

        return typeof result === "boolean" ? result : true;
    }

    private hashCode(data: string): number {
        let hash: number = 0;
        let i: number;
        let chr: number;
        let len: number;
        if (data.length === 0) {
            return hash;
        }
        for (i = 0, len = data.length; i < len; i++) {
            chr = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }

        return hash;
    }

    private insertCss(): void {
        if (this._css) {
            const hashcode: number = this.hashCode(this._css);
            if (!document.getElementById(`as_${hashcode}`)) {
                const style: HTMLStyleElement = document.createElement("style");
                style.id = `as_${hashcode}`;
                style.textContent = this._css;
                document.head.appendChild(style);
            }
        }
    }

}
