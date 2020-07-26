
import { ValidationError, validate } from "class-validator";

export class FormPropError {

    public constraints: { [type: string]: string } | void = void 0;

    public errorText: string = "";

    public isTouched: boolean = false;

    public isHaveError: boolean = false;

}

// eslint-disable-next-line @typescript-eslint/no-type-alias
type ValidationErrors<T> = {
    [P in keyof T]: FormPropError;
};

export class FormErrors<T extends object> {

    public ve: ValidationErrors<T> = {} as ValidationErrors<T>;

    public isChanged: boolean = false;

    public isValid: boolean = false;

    public readonly data: T;

    constructor(data: T) {
        this.data = data;
        this.initValidationErrors(data);
    }

    public async onTouchProp(...keys: [keyof T] | []): Promise<void> {
        keys.forEach((key: string) => {
            if (Reflect.has(this.ve, key)) {
                const formPropError = Reflect.get(this.ve, key) as FormPropError;
                formPropError.isTouched = true;
            }
        });

        this.isChanged = true;

        await this.validate();
    }

    public async touchAllProp(): Promise<void> {
        const dataKeys: [keyof T] | [] = Reflect.ownKeys(this.ve) as [keyof T] | [];

        await this.onTouchProp(...dataKeys);
    }

    public async onChangeProp(...keys: [keyof T] | []): Promise<void> {
        keys.forEach((key: string) => {
            if (Reflect.has(this.ve, key)) {
                const formPropError = Reflect.get(this.ve, key) as FormPropError;
                formPropError.isTouched = false;
            }
        });

        this.isChanged = true;

        await this.validate();
    }

    public async validate(): Promise<void> {
        const errors: ValidationError[] = await validate(this.data);
        this.isValid = true;

        const dataKeys: PropertyKey[] = Reflect.ownKeys(this.ve);
        dataKeys.forEach((dKey: PropertyKey) => {
            if (Reflect.has(this.ve, dKey)) {
                const formPropError = Reflect.get(this.ve, dKey) as FormPropError;
                const validationError = errors.find((err: ValidationError) => err.property === dKey);
                this.isValid = this.isValid && !validationError;

                if (validationError && validationError.value === "") {
                    this.isValid = false;
                } else if (validationError && validationError.value !== "" && formPropError.isTouched) {
                    const { constraints } = validationError;
                    formPropError.constraints = constraints;
                    formPropError.isHaveError = true;
                    formPropError.errorText = Reflect
                        .ownKeys(constraints as object)
                        .map((cKey: string) => Reflect.get(constraints as object, cKey) as string)
                        .join(". ");
                    this.isValid = false;
                } else {
                    formPropError.isHaveError = false;
                    formPropError.errorText = "";
                }
            }
        });
    }

    private initValidationErrors(data: T): void {
        const keys = Reflect.ownKeys(data);
        for (const key of keys) {
            if (!Reflect.has(this.ve, key)) {
                Reflect.set(this.ve, key, new FormPropError());
            }
        }
    }

}
