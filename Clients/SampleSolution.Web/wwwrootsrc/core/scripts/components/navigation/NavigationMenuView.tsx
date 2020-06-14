import React, { CSSProperties } from "react";
import { NavigationMenuController, NavigationMenuOptions, MenuElement } from "./NavigationMenuController";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';

const noPadding: CSSProperties = {
    padding: 0
};

export const navigationMenuView = <T, S>(ctrl: NavigationMenuController<NavigationMenuOptions, S>, _props?: T): JSX.Element => (
    <div key={1} className="NavigationMenuController">
        <div key={1} className="banner">
            <a href="#">
                <div key={2}>
                    Панель администратора
                </div>
            </a>
        </div>
        <List key={2} style={noPadding}>
            {ctrl.menuElements.map((elem: MenuElement, index: number) => {
                let isActive: boolean = false;
                if (location.hash !== "#/") {
                    isActive = location.hash.includes(elem.href) && elem.href !== "/";
                } else {
                    isActive = location.hash.includes(elem.href);
                }

                return (
                    <a key={index}
                        className="list-element"
                        href={`#${elem.href}`}>
                        <ListItem key={index}
                            style={{
                                fontSize: "1em",
                                color: isActive ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)",
                                textTransform: "uppercase",
                                backgroundColor: isActive ? "rgba(0, 0, 0, 0.7)" : void 0
                            }} >
                            <ListItemText primary={elem.title} />
                        </ListItem>
                    </a>
                );
            })}
        </List>
    </div>
);
