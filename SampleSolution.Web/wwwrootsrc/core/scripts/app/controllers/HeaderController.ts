import {BaseController} from './_base/BaseController';
import {headerView} from '../views/HeaderView';
import * as alertify from 'alertify.js';
import {PageController} from './_base/PageController';

export class HeaderOptions {
    public pages: PageController<object>[] = [];
}

export class HeaderController<T extends HeaderOptions, S> extends BaseController<T, S> {
    public isSettingOpen: boolean = false;
    public isOpenNavigationMenu: boolean = false;
    public settingsButtonElement: HTMLDivElement | null = null;
    public pages: PageController<object>[] = [];

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
    }

    public update(): void {
        // code here
    }

    public async getCurrentUser(): Promise<void> {
        try {
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
                    } catch (e) {
                    }
                    window.location.href = './login';
                }
            );
    }

    public async openSettingsMenu(event: Event): Promise<void> {
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