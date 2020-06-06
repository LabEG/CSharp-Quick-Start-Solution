import React, { CSSProperties } from "react";
import { NavigationMenuController, NavigationMenuOptions, MenuElement } from "./NavigationMenuController";
import { List } from "material-ui/List";
import ListItem from "material-ui/List/ListItem";

const noPadding: CSSProperties = {
    padding: 0
};

export function navigationMenuView<T, S>(ctrl: NavigationMenuController<NavigationMenuOptions, S>, opts?: T): JSX.Element {
    return (
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
                                primaryText={elem.title}
                                style={
                                    {
                                        fontSize: "1em",
                                        color: isActive ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)",
                                        textTransform: "uppercase",
                                        backgroundColor: isActive ? "rgba(0, 0, 0, 0.7)" : void 0
                                    }
                                } />
                        </a>
                    );
                })}
            </List>
        </div>
    );
}
