import {BaseController} from './_base/BaseController';
import {shellView} from './../views/ShellView';
import {NavigationMenuController} from './NavigationMenuController';
import {HeaderController} from './HeaderController';
import {BaseRouter} from '../BaseRouter';
import {PageController} from './_base/PageController';
import {Config} from '../Config';

export class ShellOptions {
    public leftPanelConstructor?: new (props?: object, context?: object) => BaseController<object, object>;
    public headerPanelConstructor?: new (props?: object, context?: object) => BaseController<object, object>;
    public routs: BaseRouter;
}

export class ShellController<T extends ShellOptions, S> extends BaseController<ShellOptions, S> {

    public leftPanelConstructor: new (props?: object, context?: object) => BaseController<object, object>;
    public headerPanelConstructor: new (props?: object, context?: object) => BaseController<object, object>;
    public routs: PageController<object>[] = [];

    constructor(props: T, context?: object) {
        super(
            props,
            context,
            require('./../../../content/less/schell.less'),
            shellView
        );

        this.leftPanelConstructor = props && props.leftPanelConstructor || NavigationMenuController;
        this.headerPanelConstructor = props && props.headerPanelConstructor || HeaderController;
        this.routs = props && props.routs && props.routs.getRouts() || [];

        this.activate();

        window.addEventListener('resize', () => this.runFontResizer());
        this.runFontResizer();
    }

    public activate(): void {
        this.addOuterCss();
    }

    public update(): void {
        // code here
    }

    private runFontResizer(): void {

        const screenSize: number = window.innerWidth;
        let fontSize: number = 1;
        if (screenSize < Config.instance.smallScreen) {
            fontSize = screenSize / 520;
        } else if (Config.instance.smallScreen <= screenSize && screenSize < Config.instance.middleScreen) {
            fontSize = screenSize / 1024;
        } else if (Config.instance.middleScreen <= screenSize && screenSize < Config.instance.bigScreen) {
            fontSize = screenSize / 1366;
        } else {
            fontSize = screenSize / 1920;
        }

        // fontSize *= window.devicePixelRatio || 1;

        document.body.style.fontSize = fontSize + 'em';
    }

    private async addOuterCss(): Promise<void> {

        await Promise.resolve();

        const cssUrls: string[] = [
            'https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&amp;subset=cyrillic'
        ];

        for (const url of cssUrls) {
            const style: HTMLLinkElement = document.createElement('link');
            style.href = url;
            style.rel = 'stylesheet';
            document.head.appendChild(style);
        }
    }

}
