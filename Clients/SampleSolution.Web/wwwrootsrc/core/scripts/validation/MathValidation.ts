import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint as sValidatorConstraint,
    ValidatorConstraintInterface
} from "class-validator";

export const match = (property: string, validationOptions?: ValidationOptions) => (object: object, propertyName: string): void => {
    registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [property],
        validator: MatchConstraint
    });
};

@sValidatorConstraint({ name: "Match" })
export class MatchConstraint implements ValidatorConstraintInterface {

    public validate(value: unknown, args: ValidationArguments): boolean {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];
        return value === relatedValue;
    }

}
