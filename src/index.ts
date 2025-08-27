/**
 * Ethiopian phone number formatter and validator
 * Supports both local (09/07) and international (+251) formats
 */

/**
 * Base error class for phone number validation errors
 */
export class PhoneNumberError extends Error {
  constructor(message: string, public phoneNumber?: string) {
    super(message);
    this.name = 'PhoneNumberError';
  }
}

/**
 * Error for invalid phone number format
 */
export class InvalidFormatError extends PhoneNumberError {
  constructor(message: string, phoneNumber?: string) {
    super(message, phoneNumber);
    this.name = 'InvalidFormatError';
  }
}

/**
 * Error for invalid phone number length
 */
export class InvalidLengthError extends PhoneNumberError {
  constructor(message: string, phoneNumber?: string, public actualLength?: number) {
    super(message, phoneNumber);
    this.name = 'InvalidLengthError';
  }
}

/**
 * Error for invalid characters in phone number
 */
export class InvalidCharacterError extends PhoneNumberError {
  constructor(message: string, phoneNumber?: string, public invalidCharacters?: string[]) {
    super(message, phoneNumber);
    this.name = 'InvalidCharacterError';
  }
}

/**
 * Error for unsupported phone number types
 */
export class UnsupportedTypeError extends PhoneNumberError {
  constructor(message: string, phoneNumber?: string, public phoneType?: string) {
    super(message, phoneNumber);
    this.name = 'UnsupportedTypeError';
  }
}

/**
 * Error for operator not found
 */
export class OperatorNotFoundError extends PhoneNumberError {
  constructor(message: string, phoneNumber?: string, public operator?: string) {
    super(message, phoneNumber);
    this.name = 'OperatorNotFoundError';
  }
}

/**
 * Legacy error class for backward compatibility
 * @deprecated Use specific error types instead
 */
export class InvalidPhoneNumberError extends PhoneNumberError {
  constructor(message: string, phoneNumber?: string) {
    super(message, phoneNumber);
    this.name = 'InvalidPhoneNumberError';
  }
}

/**
 * Formats Ethiopian phone numbers to either local or international format
 * @param phone - phone number to be formatted
 * @param type - local or international format, defaults to international
 * @returns formatted phone number
 * @throws {InvalidFormatError|InvalidLengthError} if the phone number is invalid
 */
export function formatPhone(
  phone: string,
  type: "local" | "international" = "international"
): string {
  // Input validation
  if (!phone || typeof phone !== 'string') {
    throw new InvalidFormatError("Phone number must be a non-empty string", phone);
  }

  // Check for invalid characters first
  if (!/^[0-9+\-()\s]+$/.test(phone)) {
    const invalidChars = phone.split('').filter(char => !/[0-9+\-()\s]/.test(char));
    throw new InvalidCharacterError(
      `Phone number contains invalid characters: [${invalidChars.join(', ')}]. Only digits, +, -, (, ), and spaces are allowed.`,
      phone,
      invalidChars
    );
  }

  const formatted_phone = phone.replace(/[^+\d]/g, "");
  const phone_length = formatted_phone.length;

  // Length validation
  if (phone_length < 9 || phone_length > 13) {
    throw new InvalidLengthError(
      `Phone number length must be between 9 and 13 digits, got ${phone_length}`,
      phone,
      phone_length
    );
  }

  // Handle different formats
  if (phone_length === 13 && formatted_phone.startsWith("+251")) {
    return type === "local" ? formatLocal(formatted_phone) : formatted_phone;
  } else if (phone_length === 12 && formatted_phone.startsWith("251")) {
    return type === "local"
      ? formatLocal(`+${formatted_phone}`)
      : `+${formatted_phone}`;
  } else if (
    phone_length === 10 &&
    ["09", "07"].includes(formatted_phone.slice(0, 2))
  ) {
    return type === "local"
      ? formatted_phone
      : `+251${formatted_phone.slice(1)}`;
  } else if (
    phone_length === 9 &&
    ["9", "7"].includes(formatted_phone.charAt(0))
  ) {
    return type === "local"
      ? `0${formatted_phone}`
      : `+251${formatted_phone}`;
  } else {
    throw new InvalidFormatError(
      `Invalid phone number format: ${phone}. Expected format: 09XXXXXXXX, 07XXXXXXXX, 9XXXXXXXX, 7XXXXXXXX, +251XXXXXXXXX, or 251XXXXXXXXX`,
      phone
    );
  }
}

/**
 * Converts international format to local format
 * @param phone - phone number in international format (+251...)
 * @returns phone number in local format (09... or 07...)
 * @throws {InvalidFormatError} if the phone number is invalid
 */
export function formatLocal(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    throw new InvalidFormatError("Phone number must be a non-empty string", phone);
  }

  if (phone.startsWith("+251")) {
    return `0${phone.slice(4)}`;
  }

  throw new InvalidFormatError(
    `Phone number must start with +251, got: ${phone}`,
    phone
  );
}

/**
 * Checks if the phone number is a mobile number
 * @param phone - phone number to check
 * @returns true if it's a mobile number, false otherwise
 * @throws {InvalidFormatError|InvalidLengthError} if the phone number is invalid
 */
export function isMobile(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    throw new InvalidFormatError("Phone number must be a non-empty string", phone);
  }

  try {
    const formattedPhone = formatPhone(phone);
    // Mobile numbers start with +2519 or +2517
    return formattedPhone.startsWith("+2519") || formattedPhone.startsWith("+2517");
  } catch (error) {
    if (error instanceof PhoneNumberError) {
      throw error;
    }
    throw new InvalidFormatError(`Failed to validate mobile number: ${error}`, phone);
  }
}

/**
 * Checks if the phone number is a landline number
 * @param phone - phone number to check
 * @returns true if it's a landline number, false otherwise
 * @throws {InvalidFormatError|InvalidLengthError} if the phone number is invalid
 */
export function isLandline(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    throw new InvalidFormatError("Phone number must be a non-empty string", phone);
  }

  try {
    const formattedPhone = formatPhone(phone);
    // Landline numbers start with +2511 (Addis Ababa) or other regional codes
    // Common landline prefixes: +2511, +2512, +2513, +2514, +2515, +2516, +2518
    const landlinePrefixes = ["+2511", "+2512", "+2513", "+2514", "+2515", "+2516", "+2518"];
    return landlinePrefixes.some(prefix => formattedPhone.startsWith(prefix));
  } catch (error) {
    if (error instanceof PhoneNumberError) {
      throw error;
    }
    throw new InvalidFormatError(`Failed to validate landline number: ${error}`, phone);
  }
}

/**
 * Identifies the mobile operator for a given phone number
 * @param phone - phone number to check the operator
 * @returns 'Safaricom', 'Ethio Telecom', or 'UNKNOWN'
 * @throws {InvalidFormatError|InvalidLengthError} if the phone number is invalid
 */
export function checkOperator(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    throw new InvalidFormatError("Phone number must be a non-empty string", phone);
  }

  try {
    const formattedPhone = formatPhone(phone);

    if (formattedPhone.startsWith("+2519")) {
      return "Ethio Telecom";
    } else if (formattedPhone.startsWith("+2517")) {
      return "Safaricom";
    } else {
      return "UNKNOWN";
    }
  } catch (error) {
    if (error instanceof PhoneNumberError) {
      throw error;
    }
    throw new InvalidFormatError(`Failed to check operator: ${error}`, phone);
  }
}

/**
 * Validates if a phone number is valid according to Ethiopian standards
 * @param phone - phone number to check if it's valid
 * @returns true if valid
 * @throws {InvalidFormatError} if the phone number is invalid
 */
export function isValid(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    throw new InvalidFormatError("Phone number must be a non-empty string", phone);
  }

  try {
    formatPhone(phone);
    return true;
  } catch (error) {
    if (error instanceof PhoneNumberError) {
      return false;
    }
    throw new InvalidFormatError(`Failed to validate phone number: ${error}`, phone);
  }
}

/**
 * Cleans and parses phone numbers by removing special characters
 * @param phone - The phone number to be cleaned
 * @returns The cleaned phone number
 * @throws {InvalidCharacterError} if the phone number contains invalid characters
 */
export function parse(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    throw new InvalidCharacterError("Phone number must be a non-empty string", phone);
  }

  // Allow + symbol in the regex
  const validPhoneRegex = /^[0-9+\-()\s]+$/;
  if (!validPhoneRegex.test(phone)) {
    // Find invalid characters
    const invalidChars = phone.split('').filter(char => !/[0-9+\-()\s]/.test(char));
    throw new InvalidCharacterError(
      `Phone number contains invalid characters: [${invalidChars.join(', ')}]. Only digits, +, -, (, ), and spaces are allowed.`,
      phone,
      invalidChars
    );
  }

  return phone.replace(/[-() ]/g, "");
}

/**
 * Gets the phone number type (mobile, landline, or unknown)
 * @param phone - phone number to check
 * @returns 'mobile', 'landline', or 'unknown'
 * @throws {InvalidFormatError|InvalidLengthError} if the phone number is invalid
 */
export function getPhoneType(phone: string): 'mobile' | 'landline' | 'unknown' {
  if (isMobile(phone)) {
    return 'mobile';
  } else if (isLandline(phone)) {
    return 'landline';
  } else {
    return 'unknown';
  }
}

/**
 * Extracts the area code from a phone number
 * @param phone - phone number to extract area code from
 * @returns area code (e.g., "11" for Addis Ababa) or empty string if invalid
 * @throws {InvalidFormatError|InvalidLengthError} if the phone number is invalid
 */
export function getAreaCode(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    throw new InvalidFormatError("Phone number must be a non-empty string", phone);
  }

  try {
    const formattedPhone = formatPhone(phone);

    // Extract area code from +251XXXXXXXXX format
    if (formattedPhone.startsWith("+251") && formattedPhone.length >= 7) {
      return formattedPhone.slice(4, 6);
    }

    return "";
  } catch (error) {
    if (error instanceof PhoneNumberError) {
      throw error;
    }
    throw new InvalidFormatError(`Failed to extract area code: ${error}`, phone);
  }
}

/**
 * Validates phone number with detailed error information
 * @param phone - phone number to validate
 * @returns validation result object
 */
export function validatePhoneNumber(phone: string): {
  isValid: boolean;
  errors: PhoneNumberError[];
  formattedNumber?: string;
  phoneType?: 'mobile' | 'landline' | 'unknown';
  operator?: string;
  areaCode?: string;
} {
  const errors: PhoneNumberError[] = [];
  let formattedNumber: string | undefined;
  let phoneType: 'mobile' | 'landline' | 'unknown' | undefined;
  let operator: string | undefined;
  let areaCode: string | undefined;

  try {
    // Try to format the phone number
    formattedNumber = formatPhone(phone);

    // Get additional information
    phoneType = getPhoneType(phone);
    operator = checkOperator(phone);
    areaCode = getAreaCode(phone);

    return {
      isValid: true,
      errors: [],
      formattedNumber,
      phoneType,
      operator,
      areaCode
    };
  } catch (error) {
    if (error instanceof PhoneNumberError) {
      errors.push(error);
    } else {
      errors.push(new InvalidFormatError(`Unexpected error: ${error}`, phone));
    }

    return {
      isValid: false,
      errors,
      formattedNumber,
      phoneType,
      operator,
      areaCode
    };
  }
}

/**
 * Parses the phone number to remove '-', '(', and ')'.
 * @param phone - The phone number to be cleaned.
 * @returns The cleaned phone number if it's valid otherwise "INVALID_PHONE_NUMBER".
 */
export function parse(phone: string): string {
  const validPhoneRegex = /^[0-9-()\s]+$/;
  if (!validPhoneRegex.test(phone)) {
    return "INVALID_PHONE_NUMBER";
  }
  return phone.replace(/[-() ]/g, "");
}
