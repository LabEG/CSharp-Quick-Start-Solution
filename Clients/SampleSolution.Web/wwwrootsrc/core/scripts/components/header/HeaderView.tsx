import React from "react";
import { HeaderController, HeaderOptions } from "./HeaderController";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import { NavigationMenuController } from "../navigation/NavigationMenuController";
import Button from "@material-ui/core/Button";
import { MenuIcon } from "../../icons/menu-icon";

export const headerView = <T extends HeaderOptions, S>(ctrl: HeaderController<T, S>, _props?: T): JSX.Element => (
    <div className="HeaderController grid-middle">
        <div className="col-1 col-burger">
            <IconButton onClick={() => ctrl.openNavigationMenu()}>
                <MenuIcon color="black" />
            </IconButton>
            <Drawer open={ctrl.isOpenNavigationMenu}
                onClose={() => ctrl.closeNavigationMenu()}>
                <NavigationMenuController pages={ctrl.pages} />
            </Drawer>
        </div>
        <div className="col-6_md-5" />
        <div className="buttons col-6">
            <div className="user">
                Здравствуйте,
                {" "}
                <span>
                    Иванов Иван Иванович
                </span>
            </div>
            <Button onClick={() => ctrl.onLogoutClick()} >
                Выйти
            </Button>
        </div>
    </div>
);
