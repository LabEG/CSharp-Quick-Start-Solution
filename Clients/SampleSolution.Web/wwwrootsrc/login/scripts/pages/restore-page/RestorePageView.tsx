import React from "react";
import { RestorePageController } from "./RestorePageController";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

export const restorePageView = <P, S>(ctrl: RestorePageController<P, S>, _props?: P): JSX.Element => (
    <div className="RestorePageController">
        <form>
            <h2 className="text-center">
                Restore Login
            </h2>
            <AccountCircle key={10}
                style={{ width: "100%", height: "10em" }} />
            <TextField key={20}
                name="login"
                label="Логин"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    ctrl.login = event.target.value;
                    ctrl.redraw();
                }}
                onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
            <TextField key={30}
                name="password"
                label="Пароль"
                type="password"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    ctrl.password = event.target.value;
                    ctrl.redraw();
                }}
                onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
            <div key={35}
                style={{ height: "2em" }}>
                &nbsp;
            </div>
            {
                !ctrl.isProgress ?
                    (
                        <Button key={40}
                            variant="contained"
                            color="primary"
                            disabled={!ctrl.login || !ctrl.password}
                            onClick={() => ctrl.makeLogin()} >
                            Войти
                        </Button>
                    ) :
                    (
                        <CircularProgress size={60} thickness={7} />
                    )
            }
            <br />
            <Link to="/sign-up">
                Sign Up
            </Link>
            <br />
            <Link to="/">
                Sign In
            </Link>
        </form>
    </div>
);
