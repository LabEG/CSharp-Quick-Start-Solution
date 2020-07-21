export class Config {

    public static instance: Config = new Config();

    // 1
    public smallScreen: number = 448;

    // 2
    public middleScreen: number = 1056;

    // 3
    public bigScreen: number = 1376;
    // 4

    public serverUrl: string = "setup before use";

    public isShowDiagnostic: boolean = true;

    constructor() {
        const isBrowser: Function = new Function("try {return this===window;}catch(e){ return false;}");

        if (isBrowser()) { // if browser
            this.serverUrl = `${location.protocol}//${location.hostname}/`;
            if (location.port === "30402") {
                this.serverUrl = `${location.protocol}//${location.hostname}:30202/`;
            }
        } else { // if node
            const hostName: string = require("os").hostname();
            this.serverUrl = `http://${hostName}:30202/`;
        }
    }

}
