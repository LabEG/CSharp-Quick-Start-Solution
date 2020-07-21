/* eslint-disable no-console */
import React from "react";
import { autowired } from "first-di";
import { Config } from "../../Config";

export abstract class BaseController<P, S> extends React.Component<P, S> {

    public static countInstances: number = 0;

    public cancelationToken: AbortController = new AbortController();

    @autowired()
    public readonly config!: Config;

    private readonly css?: string;

    private readonly view: (ctrl: BaseController<P, S>, props?: P) => JSX.Element;

    private redrawTimer: number = 0;

    private createError: Error | null = null;

    constructor(props: P, context?: S, css?: string, view?: (ctrl: BaseController<P, S>, props?: P) => JSX.Element) {
        super(props, context);

        if (process.env.NODE_ENV !== "production" && this.config.isShowDiagnostic) {
            const constructorName: string = this.constructor.name;
            const statInst: {countInstances: number} = this.constructor as any;
            statInst.countInstances += 1;
            console.log(`Create component ${constructorName}, count ${statInst.countInstances}`);
        }

        this.css = css ?? void 0;
        this.view = view ?? ((_ctrl: BaseController<P, S>, _props?: P) => React.createElement("div", void 0, "не определено"));

        this.insertCss();
    }

    public render(): JSX.Element {
        try {
            if (this.createError) {
                return React.createElement(
                    "div",
                    {
                        style: {
                            margin: "1em",
                            padding: "1em",
                            border: "1px solid #e30611",
                            backgroundColor: "#ffeeee"
                        }
                    },
                    `При создании компонента произошла непредвиденная ошибка: ${this.createError.message}`
                );
            }
            return this.view(this, this.props);
        } catch (e) {
            return React.createElement(
                "div",
                {
                    style: {
                        margin: "1em",
                        padding: "1em",
                        border: "1px solid #e30611",
                        backgroundColor: "#ffeeee"
                    }
                },
                `При отрисовке компонента произошла непредвиденная ошибка: ${e.message}`
            );
        }
    }

    public componentDidMount(): void {
        this.activate();
    }

    public shouldComponentUpdate(nextProps: P, nextState: S, nextContext: P): boolean {
        if (process.env.NODE_ENV !== "production" && this.config.isShowDiagnostic) {
            const constructorName: string = this.constructor.name;
            console.log(`Update component ${constructorName}`);
        }

        const result: void | boolean = this.update(nextProps, nextState, nextContext);

        return typeof result === "boolean" ? result : true;
    }

    public componentWillUnmount(): void {
        if (process.env.NODE_ENV !== "production" && this.config.isShowDiagnostic) {
            const constructorName: string = this.constructor.name;
            const statInst: {countInstances: number} = this.constructor as any;
            statInst.countInstances -= 1;
            console.log(`Dispose component ${constructorName}, count ${statInst.countInstances}`);
        }

        this.dispose();

        this.cancelationToken.abort();
        clearTimeout(this.redrawTimer);
    }

    public componentDidCatch(error: Error): void {
        this.createError = error;
        this.forceUpdate();
    }

    public redraw(callback?: () => void): void {
        if (this.redrawTimer) {
            clearTimeout(this.redrawTimer);
        }
        this.redrawTimer = window.setTimeout(
            () => {
                const constructorName: string = this.constructor.name;
                const markName: string = `${constructorName} redraw`;

                if (process.env.NODE_ENV !== "production") {
                    console.time(markName);
                    this.forceUpdate(callback);

                    console.timeEnd(markName);
                } else {
                    this.forceUpdate(callback);
                }
            },
            16
        );
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

    public abstract activate(): void;

    public abstract update(nextProps: P, nextState: S, nextContext: P): void | boolean;

    public abstract dispose(): void;

}
