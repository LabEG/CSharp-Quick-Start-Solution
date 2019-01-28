export function debounce(timeout: number = 500) {
    return function(target: object, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {

        let timeOut: number | null = null;

        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            value: function(...arg: Object[]) {

                if (timeOut) {
                    clearTimeout(timeOut);
                }

                timeOut = window.setTimeout(
                    () => {
                        timeOut = null;
                        descriptor.value.apply(this, arg);
                    },
                    timeout
                );

            }
        };
    };
}
