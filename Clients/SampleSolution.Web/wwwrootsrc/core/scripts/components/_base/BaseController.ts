import * as React from "react";

export abstract class BaseController<P, S> extends React.Component<P, S> {

    private readonly css?: string;

    private readonly view: (ctrl: BaseController<P, S>, props?: P) => JSX.Element;

    constructor(props: P, context?: S, css?: string, view?: (ctrl: BaseController<P, S>, props?: P) => JSX.Element) {
        super(props, context);

        this.css = css ?? void 0;
        this.view = view ?? ((_ctrl: BaseController<P, S>, _props?: P) => React.createElement("div", void 0, "не определено"));

        this.insertCss();
    }

    public render(): JSX.Element {
        return this.view(this, this.props);
    }

    public redraw(): void {
        // eslint-disable-next-line no-console
        console.time("redraw");
        this.forceUpdate();
        // eslint-disable-next-line no-console
        console.timeEnd("redraw");
    }

    public shouldComponentUpdate(nextProps: P, nextState: S, nextContext: any): boolean {
        const result: void | boolean = this.update(nextProps);

        return typeof result === "boolean" ? result : true;
    }

    private hashCode(data: string): number {
        let hash: number = 0;
        let i: number = 0;
        let chr: number = 0;
        let len: number = 0;
        if (data.length === 0) {
            return hash;
        }
        for (i = 0, len = data.length; i < len; i += 1) {
            chr = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }

        return hash;
    }

    private insertCss(): void {
        if (this.css) {
            const hashcode: number = this.hashCode(this.css);
            if (!document.getElementById(`as_${hashcode}`)) {
                const style: HTMLStyleElement = document.createElement("style");
                style.id = `as_${hashcode}`;
                style.textContent = this.css;
                document.head.appendChild(style);
            }
        }
    }

    public abstract activate(): void;

    public abstract update(props?: P): void | boolean;

    public abstract dispose(): void;

}
