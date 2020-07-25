
import { HttpRepository } from "@labeg/webapp-core/dist/repositories/http.repository";
import { reflection } from "first-di";
import { Config } from "../../Config";

@reflection
export class BaseHttpRepository extends HttpRepository {

    protected apiRoot: string;

    public readonly config: Config;

    constructor(config: Config) {
        super();

        this.config = config;
        this.apiRoot = config.serverUrl;
    }

}
