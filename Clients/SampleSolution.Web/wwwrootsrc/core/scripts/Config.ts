export class Config {

    public static instance: Config = new Config();

    // 1
    public smallScreen: number = 448;

    // 2
    public middleScreen: number = 1056;

    // 3
    public bigScreen: number = 1376;
    // 4

    public serverUrl: string = "/";

    public isShowDiagnostic: boolean = true;

    constructor() {
        this.serverUrl = "/";
    }

}
