import { jsonProperty, jsonIgnore } from "ts-serializable";
import { BaseModel } from "../../_base/BaseModel";
import { match } from "../../../validation/MathValidation";
import {
    IsEmail as sIsEmail,
    MinLength as sMinLength,
    MaxLength as sMaxLength,
    IsString as sIsString,
    Equals as sEquals,
    Matches as sMatches
} from "class-validator";

export class RegistrationDto extends BaseModel {

    @sIsString()
    @sMinLength(1)
    @sMaxLength(20)
    @jsonProperty(String)
    public login: string = "";

    @sIsString()
    @sMaxLength(40)
    @sIsEmail()
    @jsonProperty(String)
    public email: string = "";

    @sIsString()
    @sMinLength(8)
    @sMaxLength(40)
    @sMatches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/u, { message: "password too weak" })
    @jsonProperty(String)
    public password: string = "";

    @sIsString()
    @sMinLength(8)
    @sMaxLength(40)
    @match("password", { message: "password and confirmation password do not match" })
    public confirmPassword: string = "";

    @sEquals(true)
    @jsonIgnore()
    public isAgree: boolean = false;

}
