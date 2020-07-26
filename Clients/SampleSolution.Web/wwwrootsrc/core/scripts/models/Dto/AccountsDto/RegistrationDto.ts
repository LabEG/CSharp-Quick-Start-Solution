import { jsonProperty, jsonIgnore } from "ts-serializable";
import { BaseModel } from "../../_base/BaseModel";
import { IsEmail as sIsEmail, MinLength as sMinLength, Equals as sEquals } from "class-validator";

export class RegistrationDto extends BaseModel {

    @sMinLength(1)
    @jsonProperty(String)
    public login: string = "";

    @sIsEmail()
    @jsonProperty(String)
    public email: string = "";

    @sMinLength(8)
    @jsonProperty(String)
    public password: string = "";

    @sMinLength(8)
    @jsonIgnore()
    public confirmPassword: string = "";

    @sEquals(true)
    @jsonIgnore()
    public isAgree: boolean = false;

}
