import { jsonProperty } from "ts-serializable";
import { BaseModel } from "../../_base/BaseModel";

export class LoginDto extends BaseModel {

    @jsonProperty(String)
    public login: string = "";

    @jsonProperty(String)
    public password: string = "";

    @jsonProperty(Boolean)
    public rememberMe: boolean = false;

}
