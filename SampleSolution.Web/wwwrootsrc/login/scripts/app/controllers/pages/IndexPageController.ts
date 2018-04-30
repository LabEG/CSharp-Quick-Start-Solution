import {PageController} from '../../../../../core/scripts/app/controllers/_base/PageController';
import {indexPageView} from '../../views/pages/IndexPageView';
import {BaseController} from '../../../../../core/scripts/app/controllers/_base/BaseController';
import {SecurityService} from '../../../../../core/scripts/app/services/SecurityService';
import * as alertify from 'alertify.js';

export class IndexPage<P> extends PageController<P> {
    public isShowInNavigation: boolean = false;
    public title: string = 'Логин';
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

    public isProgress: boolean = false;
    public login: string = '';
    public password: string = '';

    private userService: SecurityService = new SecurityService();

    constructor(props: P, context?: object) {
        super(
            props,
            context,
            require('./../../../../content/less/IndexPage.less'),
            indexPageView
        );
        this.activate();
    }

    public activate(): void {
        this.checkLogin();
    }

    public update(props?: P): void {
        // code here
    }

    public async checkLogin(): Promise<void> {
        try {
            await this.userService.getCurrentUser();
            location.href = './';
        } catch (err) {
            // nothing do
        }
    }

    public async makeLogin(): Promise<void> {
        try {
            this.isProgress = true;
            this.redraw();

            await this.userService.getLogin(this.login, this.password);
            location.href = './';
        } catch (err) {
            if (err.message === '401 - Unauthorized') {
                alertify.error(`При попытке залогиниться произошла ошибка: неверный логин или пароль`);
            } else {
                alertify.error(`При попытке залогиниться произошла ошибка: ${err}`);
            }
            this.isProgress = false;
            this.redraw();
        }
    }

    public onEnterKeyPress(event: KeyboardEventInit): void {
       event.key === 'Enter' ? this.makeLogin() : null;
    }

}
