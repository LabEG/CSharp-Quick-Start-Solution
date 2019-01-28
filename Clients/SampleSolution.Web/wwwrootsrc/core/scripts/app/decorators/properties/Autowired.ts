
export function autowired(target: object, propertyKey: string | symbol): void {

    const type: new () => object = Reflect.getMetadata('design:type', target, propertyKey);

    Object.defineProperty(
        target,
        propertyKey,
        {
            configurable: false,
            enumerable: false,
            value: singleton(type),
            writable: false
        }
    );
}

const singletonsList: Map<new () => object, object> = new Map<new () => object, object>();

export function singleton<T extends object>(constructor: new () => T): T {

    if (singletonsList.has(constructor)) {

        return singletonsList.get(constructor) as T;
    } else {
        const object = new constructor();
        singletonsList.set(constructor, object);

        return object;
    }

}
