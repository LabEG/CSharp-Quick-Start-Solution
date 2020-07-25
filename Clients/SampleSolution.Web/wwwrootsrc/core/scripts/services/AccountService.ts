import { reflection } from "first-di";
import { AccountRepository } from "../repositories/AccountRepository";
import { LoginDto } from "../models/Dto/AccountsDto/LoginDto";

@reflection
export class AccountService {

    protected accountRepository: AccountRepository;

    constructor(accountRepository: AccountRepository) {
        this.accountRepository = accountRepository;
    }

    public async login(login: LoginDto): Promise<void> {
        return await this.accountRepository.login(login);
    }

    public async login2f(): Promise<void> {
        return await this.accountRepository.login2f();
    }

    public async recovery(): Promise<void> {
        return await this.accountRepository.recovery();
    }

    public async register(): Promise<void> {
        return await this.accountRepository.register();
    }

    public async logut(): Promise<void> {
        return await this.accountRepository.logut();
    }

    public async externalLogin(): Promise<void> {
        return await this.accountRepository.externalLogin();
    }

    public async externalLoginConfirm(): Promise<void> {
        return await this.accountRepository.externalLoginConfirm();
    }

    public async forgot(): Promise<void> {
        return await this.accountRepository.forgot();
    }

    public async reset(): Promise<void> {
        return await this.accountRepository.reset();
    }

}
