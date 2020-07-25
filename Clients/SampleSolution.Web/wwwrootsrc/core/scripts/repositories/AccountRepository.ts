import { reflection } from "first-di";
import { Config } from "../Config";
import { BaseHttpRepository } from "./_base/BaseHttpRepository";
import { LoginDto } from "../models/Dto/AccountsDto/LoginDto";

@reflection
export class AccountRepository extends BaseHttpRepository {

    constructor(config: Config) {
        super(config);
        this.apiRoot += "api/account";
    }

    public async login(login: LoginDto): Promise<void> {
        return await this.customRequest("POST", `${this.apiRoot}/login`, login, void 0);
    }

    public async login2f(): Promise<void> {
        return await this.customRequest("POST", `${this.apiRoot}/login2fa`, void 0, void 0);
    }

    public async recovery(): Promise<void> {
        return await this.customRequest("POST", `${this.apiRoot}/recovery`, void 0, void 0);
    }

    public async register(): Promise<void> {
        return await this.customRequest("POST", `${this.apiRoot}/register`, void 0, void 0);
    }

    public async logut(): Promise<void> {
        return await this.customRequest("POST", `${this.apiRoot}/logout`, void 0, void 0);
    }

    public async externalLogin(): Promise<void> {
        return await this.customRequest("POST", `${this.apiRoot}/externallogin`, void 0, void 0);
    }

    public async externalLoginConfirm(): Promise<void> {
        return await this.customRequest("POST", `${this.apiRoot}/externalloginconfirm`, void 0, void 0);
    }

    public async forgot(): Promise<void> {
        return await this.customRequest("POST", `${this.apiRoot}/forgot`, void 0, void 0);
    }

    public async reset(): Promise<void> {
        return await this.customRequest("POST", `${this.apiRoot}/reset`, void 0, void 0);
    }

}
