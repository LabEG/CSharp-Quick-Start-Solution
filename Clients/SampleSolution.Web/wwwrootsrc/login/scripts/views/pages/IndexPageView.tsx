import * as React from "react";
import { IndexPageController } from "../../controllers/pages/IndexPageController";
import Paper from "material-ui/Paper";
import ActionFlightTakeoff from "material-ui/svg-icons/action/account-circle";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";

export function indexPageView<P, S>(ctrl: IndexPageController<P, S>, opts?: P): JSX.Element {
    return (
        <div className="IndexPageController">
            <Paper key={10}
                className="login-form"
                zDepth={4}>
                <form>
                    <ActionFlightTakeoff key={10}
                        color="rgba(0,0,0,0.3)"
                        style={{ width: "100%", height: "16em" }} />
                    <TextField key={20}
                        name="login"
                        floatingLabelText="Логин"
                        onChange={(e: React.FormEvent<object>, value: string) => {
                            ctrl.login = value;
                            ctrl.redraw();
                        }}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                    <TextField key={30}
                        name="password"
                        floatingLabelText="Пароль"
                        type="password"
                        onChange={(e: React.FormEvent<object>, value: string) => {
                            ctrl.password = value;
                            ctrl.redraw();
                        }}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                    <div key={35}
                        style={{ height: "2em" }}>
                        &nbsp;
                    </div>
                    {
                        !ctrl.isProgress ?
                            <RaisedButton key={40}
                                className="button--flat"
                                disabled={!ctrl.login || !ctrl.password}
                                label="Войти"
                                onClick={() => ctrl.makeLogin()} /> :
                            <CircularProgress size={60} thickness={7} />
                    }
                </form>
            </Paper>
        </div>
    );
}
