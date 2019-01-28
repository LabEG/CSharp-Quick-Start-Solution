// Type definitions for Alertify.js v1.0.11
// Project: https://github.com/alertifyjs/alertify.js
// Definitions by: Vlad Jerca <https://github.com/LabEG>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

// https://alertifyjs.org/
// WARNING: not https://alertifyjs.com/

declare namespace Alertify {

    interface IAlertifyStatic {

        /**
         *
         */
        version: string;

        /**
         *
         * @param elem
         */
        parent(elem: HTMLElement): void;

        /**
         *
         */
        reset(): this;

        /**
         * Create an alert dialog box
         * @param message   The message passed from the callee
         * @param onOkay    Callback function
         * @param onCancel  Callback function
         * @return alertify (ie this)
         * @since 0.0.1
         */
        alert(message: string, onOkay?: Function, onCancel?: Function): this;

        /**
         * Create a confirm dialog box
         * @param message   The message passed from the callee
         * @param onOkay    Callback function
         * @param onCancel  Callback function
         * @return alertify (ie this)
         * @since 0.0.1
         */
        confirm(message: string, onOkay?: Function, onCancel?: Function): this;

        /**
         * Create a prompt dialog box
         * @param message   The message passed from the callee
         * @param onOkay    Callback function
         * @param onCancel  Default value for prompt input
         * @return alertify (ie this)
         * @since 0.0.1
         */
        prompt(message: string, onOkay?: Function, onCancel?: Function): this;

        /**
         * Show a new log message box
         * @param message   The message passed from the callee
         * @param click      Callback function
         * @return alertify (ie this)
         * @since 0.0.1
         */
        log(message: string, click?: Function): this;

        /**
         *
         * @param themeStr
         */
        theme(themeStr: string): this;

        /**
         * Shorthand for log messages
         * @param message The message passed from the callee
         * @param click      Callback function
         * @return alertify (ie this)
         * @since 0.0.1
         */
        success(message: string, click?: Function): this;

        /**
         * Shorthand for log messages
         * @param message The message passed from the callee
         * @param click      Callback function
         * @return alertify (ie this)
         * @since 0.0.1
         */
        error(message: string, click?: Function): this;

        /**
         *
         * @param text
         */
        cancelBtn(text: string): this;

        /**
         *
         * @param text
         */
        okBtn(text: string): this;

        /**
         *
         * @param delay in ms
         */
        delay(delay: number): this;

        /**
         *
         * @param text
         */
        placeholder(text: string): this;

        /**
         *
         * @param text
         */
        defaultValue(text: string): this;

        /**
         *
         * @param num
         */
        maxLogItems(num: number): this;

        /**
         *
         * @param yes
         */
        closeLogOnClick(yes?: boolean): this;

        /**
         *
         * @param text
         */
        logPosition(text?: string): this;

        /**
         *
         * @param text
         */
        setLogTemplate(func: (input: string) => string): this;

        /**
         *
         * @param text
         */
        clearLogs(text: string): this;

    }

}

declare const alertify: Alertify.IAlertifyStatic;

declare module 'alertify.js' {
    const alertify: Alertify.IAlertifyStatic;
    export = alertify;
}
