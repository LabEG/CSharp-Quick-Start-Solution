import * as React from "react";
import { HeaderController, HeaderOptions } from"./HeaderController";
import IconButton from "material-ui/IconButton";
import Drawer from "material-ui/Drawer";
import { NavigationMenuController } from"../navigation/NavigationMenuController";
import SvgIcon from "material-ui/SvgIcon";
import RaisedButton from "material-ui/RaisedButton";

const MenuIcon = (props: any) => (
    <SvgIcon {...props}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </SvgIcon>
);

export function headerView<T extends HeaderOptions, S>(ctrl: HeaderController<T, S>, opts?: T): JSX.Element {
    return (
        <div key={1} className="HeaderController grid-middle">
            <div key={1} className="col-1 col-burger">
                <IconButton key={1}
                    touch
                    className="icon-button burger"
                    onClick={() => ctrl.openNavigationMenu()}>
                    <MenuIcon color="black" />
                </IconButton>
                <Drawer docked={false}
                    disableSwipeToOpen
                    openSecondary={false}
                    open={ctrl.isOpenNavigationMenu}
                    onRequestChange={(open) => ctrl.closeNavigationMenu()}>
                    <NavigationMenuController pages={ctrl.pages} />
                </Drawer>
            </div>
            <div key={2} className="col-6_md-5" />
            <div key={3} className="buttons col-6">
                <div key={10} className="user">
                    Здравствуйте,
                    <span>
                        Иванов Иван Иванович
                    </span>
                </div>
                <RaisedButton key={20} className="mui-button--flat"
                    label="Выйти"
                    onClick={() => ctrl.onLogoutClick()} />
            </div>
        </div>
    );
}
