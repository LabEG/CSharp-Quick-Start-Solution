import {PageController} from '../../../../../core/scripts/app/controllers/_base/PageController';
import {BaseController} from '../../../../../core/scripts/app/controllers/_base/BaseController';
import {indexPageView} from '../../views/pages/IndexPageView';
// import * as alertify from 'alertify.js';

export class IndexPage<P> extends PageController<P> {
    public isShowInNavigation: boolean = true;
    public title: string = 'Стартовая';
    public route: string = '/';
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
            require('./../../../../content/less/index-page.less'),
            indexPageView
        );
        window.scrollTo(0, 0);

        this.activate();
    }

    public componentWillMount(): void {

    }

    public activate(): void {
        // code here
    }

    public update(props?: P): void {
        // code here
    }

}
