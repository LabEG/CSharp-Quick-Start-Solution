import React from "react";
import { SignInPageController } from "./SignInPageController";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const signInPageView = <P, S>(ctrl: SignInPageController<P, S>, _props?: P): JSX.Element => (
    <div className="SignInPageController">
        <form>
            <h2 className="text-center">
                Sign In
            </h2>
            <AccountCircle key={10} className="avatar" />
            <div className="grid input-block">
                <div className="col-6 text-left link-block">
                    <Link to="/sign-up" component={RouterLink}>
                        Sign Up
                    </Link>
                </div>
                <div className="col-6 text-right link-block">
                    <Link to="/restore" component={RouterLink}>
                        Restore
                    </Link>
                </div>
                <div className="col-12">
                    <TextField key={20}
                        fullWidth
                        name="login"
                        label="Login"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => ctrl.setLogin(event.target.value)}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <TextField key={30}
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => ctrl.setPassword(event.target.value)}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <FormControlLabel label={
                        <small>
                            Remember Me
                        </small>
                    }
                        control={
                            <Checkbox name="remember"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => ctrl.setRememberMe(checked)}
                                color="primary" />
                        } />
                </div>
                <div className="col-12">
                    {
                        !ctrl.isProgress ?
                            (
                                <Button key={40}
                                    variant="contained"
                                    color="primary"
                                    disabled={!ctrl.login || !ctrl.password}
                                    onClick={() => ctrl.makeLogin()} >
                                    Sign In
                                </Button>
                            ) :
                            (
                                <CircularProgress size={60} thickness={7} />
                            )
                    }
                </div>
            </div>
        </form>
    </div>
);
