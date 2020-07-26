import React from "react";
import { SignUpPageController } from "./SignUpPageController";
import PersonAdd from "@material-ui/icons/PersonAdd";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export const signUpPageView = <P, S>(ctrl: SignUpPageController<P, S>, _props?: P): JSX.Element => (
    <div className="SignUpPageController">
        <form>
            <h2 className="text-center">
                Sign Up
            </h2>
            <PersonAdd key={10} className="avatar" />
            <div className="grid input-block">
                <div className="col-6 text-left link-block">
                    <Link to="/sign-in" component={RouterLink}>
                        Sign In
                    </Link>
                </div>
                <div className="col-6 text-right link-block">
                    <Link to="/restore" component={RouterLink}>
                        Restore
                    </Link>
                </div>
                <div className="col-12">
                    <TextField fullWidth
                        name="login"
                        label="Login"
                        required
                        error={ctrl.formErrors.ve.login.isHaveError}
                        helperText={ctrl.formErrors.ve.login.errorText}
                        onInput={(event: React.FormEvent<HTMLInputElement>) => {
                            ctrl.registration.login = (event.target as HTMLInputElement).value;
                            ctrl.handleInput("login");
                        }}
                        onBlur={() => ctrl.handleBlur("login")}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <TextField fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        required
                        error={ctrl.formErrors.ve.email.isHaveError}
                        helperText={ctrl.formErrors.ve.email.errorText}
                        onInput={(event: React.FormEvent<HTMLInputElement>) => {
                            ctrl.registration.email = (event.target as HTMLInputElement).value;
                            ctrl.handleInput("email");
                        }}
                        onBlur={() => ctrl.handleBlur("email")}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <TextField fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        required
                        error={ctrl.formErrors.ve.password.isHaveError}
                        helperText={ctrl.formErrors.ve.password.errorText}
                        onInput={(event: React.FormEvent<HTMLInputElement>) => {
                            ctrl.registration.password = (event.target as HTMLInputElement).value;
                            ctrl.handleInput("password");
                        }}
                        onBlur={() => ctrl.handleBlur("password")}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <TextField fullWidth
                        name="password"
                        label="Confirm Password"
                        type="password"
                        required
                        error={ctrl.formErrors.ve.confirmPassword.isHaveError}
                        helperText={ctrl.formErrors.ve.confirmPassword.errorText}
                        onInput={(event: React.FormEvent<HTMLInputElement>) => {
                            ctrl.registration.confirmPassword = (event.target as HTMLInputElement).value;
                            ctrl.handleInput("confirmPassword");
                        }}
                        onBlur={() => ctrl.handleBlur("confirmPassword")}
                        onKeyPress={(event: KeyboardEventInit) => ctrl.onEnterKeyPress(event)} />
                </div>
                <div className="col-12">
                    <FormControlLabel label={
                        <small>
                            I accept the Terms of Use
                        </small>
                    }
                        control={
                            <Checkbox name="remember"
                                onChange={(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
                                    ctrl.registration.isAgree = checked;
                                    ctrl.handleInput("isAgree");
                                    ctrl.handleBlur("isAgree");
                                }}
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
                                    disabled={!ctrl.formErrors.isValid}
                                    onClick={() => ctrl.makeLogin()} >
                                    Sign Up
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
