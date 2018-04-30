import {BaseController} from './_base/BaseController';
import {headerView} from '../views/HeaderView';
import * as alertify from 'alertify.js';
import {TouchTapEvent} from 'material-ui';
import {SecurityService} from '../services/SecurityService';
import {UserPrincipalEntity} from '../models/entities/UserPrincipalEntity';
import {PageController} from './_base/PageController';
import {autowired} from '../decorators/properties/Autowired';
import {BreadcrumbsService} from '../services/BreadcrumbsService';
import {Breadcrumb} from '../models/ViewModels/Breadcrumb';

export class HeaderOptions {
    public pages: PageController<object>[];
}

export class HeaderController<T extends HeaderOptions, S> extends BaseController<T, S> {
    public isSettingOpen: boolean;
    public isOpenNavigationMenu: boolean;
    public settingsButtonElement: HTMLDivElement;
    public user: UserPrincipalEntity = new UserPrincipalEntity();
    public pages: PageController<object>[] = [];

    public breadCrumbs: Breadcrumb[] = [];

    @autowired
    private userService: SecurityService;
    @autowired
    private breadcrumbsService: BreadcrumbsService;

    constructor(props: T, context?: object) {
        super(
            props,
            context,
            require('./../../../content/less/header.less'),
            headerView
        );
        this.activate();
    }

    public activate(): void {
        this.pages = this.props.pages || [];
        this.getCurrentUser();

        this.breadcrumbsService.events.addEventListener('onBreadcrumbsChange', (e: CustomEvent) => {
            this.breadCrumbs = e.detail;
            this.redraw();
        });
    }

    public update(): void {
        // code here
    }

    public async getCurrentUser(): Promise<void> {
        try {
            this.user = await this.userService.getCurrentUser();
            this.redraw();
        } catch (err) {
            // alertify.error(`HeaderController.getCurrentUser: error on user request ${err}`);
        }
    }

    public async onLogoutClick(): Promise<void> {
        this.isSettingOpen = false;
        this.redraw();

        alertify
            .okBtn('Выйти')
            .cancelBtn('Отмена')
            .confirm(
                'Вы действительно хотите выйти из аккаунта?',
                async () => {
                    try {
                        await this.userService.getLogout();
                    } catch (e) {
                    }
                    window.location.href = './login';
                }
            );
    }

    public async openSettingsMenu(event: TouchTapEvent): Promise<void> {
        event.preventDefault();
        this.settingsButtonElement = event.currentTarget as HTMLDivElement;
        this.isSettingOpen = true;
        this.redraw();
    }

    public async closeSettingsMenu(): Promise<void> {
        this.isSettingOpen = false;
        this.redraw();
    }

    public async openNavigationMenu(): Promise<void> {
        this.isOpenNavigationMenu = true;
        this.redraw();
    }

    public async closeNavigationMenu(): Promise<void> {
        this.isOpenNavigationMenu = false;
        this.redraw();
    }
}