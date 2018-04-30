export class Config {

    public static instance: Config = new Config();

    // 1
    public smallScreen: number = 768;
    // 2
    public middleScreen: number = 1080;
    // 3
    public bigScreen: number = 1380;
    // 4

    public serverUrl: string = 'setup before use';

    constructor() {
        const isBrowser: Function = new Function('try {return this===window;}catch(e){ return false;}');

        if (isBrowser()) { // if browser
            this.serverUrl = location.protocol + '//' + location.hostname + '/';
            // this.wsConnectionsString = 'scsh-conf.obr.mos.ru:1002';
            if (location.port === '30402') {
                this.serverUrl = location.protocol + '//' + location.hostname + ':30202/';
            }
        } else { // if node
            const hostName: string = require('os').hostname();
            this.serverUrl = 'http://' + hostName + ':30202/';
        }
    }

}
