import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsMinWords(min: number, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsMinWords',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [min],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (typeof value !== 'string') {
                        return false;
                    }
                    const words = value.trim().split(/\s+/);
                    return words.length >= min;
                },
                defaultMessage(args: ValidationArguments) {
                    return `The task must be at least ${args.constraints[0]} words`;
                },
            },
        });
    };
}
