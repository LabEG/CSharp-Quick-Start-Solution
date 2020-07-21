import { BaseController } from "../_base/BaseController";
import { BaseRouter } from "../../BaseRouter";
import { shellView } from "./ShellView";
import { Config } from "../../Config";
import style from "./ShellStyles.scss";
import { BaseLayoutController, BaseLayoutOptions } from "../base-layout/BaseLayoutController";

export interface ShellOptions {

    routs: BaseRouter;
    layout: new <T extends BaseLayoutOptions, S>(props: T, context: S) => BaseLayoutController<T, S>;

}

export class ShellController<T extends ShellOptions, S> extends BaseController<ShellOptions, S> {

    constructor(props: T, context?: S) {
        super(props, context, style, shellView);

        window.addEventListener("resize", () => this.runFontResizer());
        this.runFontResizer();
    }

    public activate(): void {
        this.addOuterCss();
    }

    public update(): void {
        // code here
    }

    public dispose(): void {
        // code here
    }

    private runFontResizer(): void {
        const screenSize: number = window.innerWidth;
        let fontSize: number = 1;
        if (screenSize < Config.instance.smallScreen) {
            fontSize = screenSize / 360;
        } else if (screenSize < Config.instance.middleScreen) {
            fontSize = screenSize / 1024;
        } else if (screenSize < Config.instance.bigScreen) {
            fontSize = screenSize / 1366;
        } else {
            fontSize = screenSize / 1920;
        }

        // fontSize *= window.devicePixelRatio || 1;

        document.body.style.fontSize = `${fontSize}em`;
    }

    private async addOuterCss(): Promise<void> {
        await Promise.resolve();

        const cssUrls: string[] = [
            "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        ];

        for (const url of cssUrls) {
            const link: HTMLLinkElement = document.createElement("link");
            link.href = url;
            link.rel = "stylesheet";
            document.head.appendChild(link);
        }
    }

}
