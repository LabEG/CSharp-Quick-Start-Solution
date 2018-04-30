import {PageController} from '../../../../../core/scripts/app/controllers/_base/PageController';
import {BaseController} from '../../../../../core/scripts/app/controllers/_base/BaseController';
import {indexPageView} from '../../views/pages/IndexPageView';
import {Breadcrumb} from '../../../../../core/scripts/app/models/ViewModels/Breadcrumb';
import {Router} from '../../Router';
import {BreadcrumbsService} from '../../../../../core/scripts/app/services/BreadcrumbsService';
import {autowired} from '../../../../../core/scripts/app/decorators/properties/Autowired';
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

    @autowired
    private breadcrumbsService: BreadcrumbsService;

    private breadcrumbs: Breadcrumb[] = [];

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
        this.breadcrumbs.push(new Breadcrumb(Router.routs.indexPage.title, Router.routs.indexPage.getUrl()));
        this.breadcrumbsService.setBreadcrumbs(this.breadcrumbs);
    }

    public activate(): void {
        // code here
    }

    public update(props?: P): void {
        // code here
    }

}
