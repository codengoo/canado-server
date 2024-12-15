import { ValidationError } from '../utils/error';

interface ICheckOption {
  isThrowError?: boolean;
  valueName: string;
  nullable?: boolean;
}

function isDef(value: any): boolean {
  return value === undefined;
}

function checkFn(
  value: any,
  option: ICheckOption | undefined,
  fn: () => void,
): boolean {
  try {
    if (isDef(value)) {
      if (option?.nullable) return true;
      else throw new ValidationError('must be provided');
    }

    fn();
    return true;
  } catch (error) {
    const err = error as ValidationError;
    err.message = (option?.valueName || 'Value') + ' ' + error.message;

    if (!option || option.isThrowError === undefined || option.isThrowError)
      throw error;
    return false;
  }
}

export function isValidString(value: string, option?: ICheckOption): boolean {
  return checkFn(value, option, () => {
    if (typeof value !== 'string')
      throw new ValidationError('must be a string');
    if (value.trim().length === 0)
      throw new ValidationError('must not be empty');
  });
}

export function isInEnum(
  value: any,
  enumType: Object,
  option?: ICheckOption,
): boolean {
  return checkFn(value, option, () => {
    isValidString(value, option);

    if (!Object.values(enumType).includes(value))
      throw new ValidationError('is invalid value in enum');
  });
}

export function isObjectId(value: any, option?: ICheckOption): boolean {
  return checkFn(value, option, () => {
    isValidString(value, option);

    const objectIdRegex = /^[a-fA-F0-9]{24}$/;
    if (!objectIdRegex.test(value))
      throw new ValidationError('must be an objectId');
  });
}

export function isUUIDv4(value: any, option?: ICheckOption) {
  return checkFn(value, option, () => {
    isValidString(value, option);

    const uuidV4Regex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidV4Regex.test(value)) throw new ValidationError('must be an uuid');
  });
}

export function isNumber(value: any, option?: ICheckOption) {
  return checkFn(value, option, () => {
    if (typeof Number(value) !== 'number' || isNaN(Number(value)))
      throw new ValidationError('must be a number');
  });
}
