/**
 * Created by Евгений on 08.01.2015.
 *
 */

export class GUID {

    public static v4() {
        return [
            this.s4(),
            this.s4(),
            "-",
            this.s4(),
            "-",
            this.s4(),
            "-",
            this.s4(),
            "-",
            this.s4(),
            this.s4(),
            this.s4()
        ].join("");
    }

    private static s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

}
