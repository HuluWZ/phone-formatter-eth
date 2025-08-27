# API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Core Functions](#core-functions)
3. [Validation Functions](#validation-functions)
4. [Analysis Functions](#analysis-functions)
5. [Utility Functions](#utility-functions)
6. [Error Classes](#error-classes)
7. [Types and Interfaces](#types-and-interfaces)
8. [Usage Patterns](#usage-patterns)
9. [Examples](#examples)

## Overview

The Ethiopian Phone Number Formatter & Validator provides a comprehensive set of functions for working with Ethiopian phone numbers. All functions are designed to be type-safe and provide detailed error information when validation fails.

## Core Functions

### `formatPhone(phone: string, type?: "local" | "international"): string`

Formats Ethiopian phone numbers to either local or international format.

**Parameters:**
- `phone` (string): The phone number to format
- `type` (optional): Output format - "local" (09/07) or "international" (+251), defaults to "international"

**Returns:** Formatted phone number as string

**Throws:** 
- `InvalidFormatError` - Invalid phone number format
- `InvalidLengthError` - Wrong phone number length
- `InvalidCharacterError` - Invalid characters in phone number

**Examples:**
```typescript
import { formatPhone } from 'phone-formater-eth';

// International format (default)
formatPhone("0912345678");        // "+251912345678"
formatPhone("0712345678");        // "+251712345678"
formatPhone("912345678");         // "+251912345678"
formatPhone("712345678");         // "+251712345678"

// Local format
formatPhone("0912345678", "local"); // "0912345678"
formatPhone("+251912345678", "local"); // "0912345678"

// Handle formatted numbers
formatPhone("+251912345678");     // "+251912345678" (no change)
formatPhone("251912345678");      // "+251912345678" (adds +)
```

### `formatLocal(phone: string): string`

Converts international format to local format.

**Parameters:**
- `phone` (string): Phone number in international format (+251...)

**Returns:** Phone number in local format (09... or 07...)

**Throws:** `InvalidFormatError` - Phone number must start with +251

**Examples:**
```typescript
import { formatLocal } from 'phone-formater-eth';

formatLocal("+251912345678"); // "0912345678"
formatLocal("+251712345678"); // "0712345678"

// This will throw an error
// formatLocal("0912345678"); // InvalidFormatError
```

## Validation Functions

### `isValid(phone: string): boolean`

Validates if a phone number is valid according to Ethiopian standards.

**Parameters:**
- `phone` (string): Phone number to validate

**Returns:** `true` if valid, `false` otherwise

**Throws:** `InvalidFormatError` - For null/empty inputs

**Examples:**
```typescript
import { isValid } from 'phone-formater-eth';

isValid("0912345678");        // true
isValid("0712345678");        // true
isValid("+251912345678");     // true
isValid("+251112345678");     // true (landline)
isValid("1234567890");        // false
isValid("812345678");         // false
isValid("");                  // false (throws InvalidFormatError)
```

### `isMobile(phone: string): boolean`

Checks if the phone number is a mobile number.

**Parameters:**
- `phone` (string): Phone number to check

**Returns:** `true` if mobile, `false` otherwise

**Throws:** `InvalidFormatError` | `InvalidLengthError`

**Examples:**
```typescript
import { isMobile } from 'phone-formater-eth';

isMobile("0912345678");       // true (Ethio Telecom)
isMobile("0712345678");       // true (Safaricom)
isMobile("912345678");        // true (Ethio Telecom)
isMobile("712345678");        // true (Safaricom)
isMobile("+251912345678");    // true (Ethio Telecom)
isMobile("+251712345678");    // true (Safaricom)
isMobile("+251112345678");    // false (Landline)
```

### `isLandline(phone: string): boolean`

Checks if the phone number is a landline number.

**Parameters:**
- `phone` (string): Phone number to check

**Returns:** `true` if landline, `false` otherwise

**Throws:** `InvalidFormatError` | `InvalidLengthError`

**Examples:**
```typescript
import { isLandline } from 'phone-formater-eth';

isLandline("+251112345678");  // true (Addis Ababa)
isLandline("+251212345678");  // true (Dire Dawa)
isLandline("+251312345678");  // true (Gondar)
isLandline("+251412345678");  // true (Bahir Dar)
isLandline("+251512345678");  // true (Dessie)
isLandline("+251612345678");  // true (Jimma)
isLandline("+251812345678");  // true (Mekelle)
isLandline("0912345678");     // false (Mobile)
isLandline("0712345678");     // false (Mobile)
```

## Analysis Functions

### `checkOperator(phone: string): string`

Identifies the mobile operator for a given phone number.

**Parameters:**
- `phone` (string): Phone number to check

**Returns:** 'Safaricom', 'Ethio Telecom', or 'UNKNOWN'

**Throws:** `InvalidFormatError` | `InvalidLengthError`

**Examples:**
```typescript
import { checkOperator } from 'phone-formater-eth';

checkOperator("0912345678");      // "Ethio Telecom"
checkOperator("0712345678");      // "Safaricom"
checkOperator("912345678");       // "Ethio Telecom"
checkOperator("712345678");       // "Safaricom"
checkOperator("+251912345678");   // "Ethio Telecom"
checkOperator("+251712345678");   // "Safaricom"
checkOperator("+251112345678");   // "UNKNOWN" (Landline)
```

### `getPhoneType(phone: string): 'mobile' | 'landline' | 'unknown'`

Gets the phone number type.

**Parameters:**
- `phone` (string): Phone number to check

**Returns:** 'mobile', 'landline', or 'unknown'

**Throws:** `InvalidFormatError` | `InvalidLengthError`

**Examples:**
```typescript
import { getPhoneType } from 'phone-formater-eth';

getPhoneType("0912345678");      // "mobile"
getPhoneType("0712345678");      // "mobile"
getPhoneType("+251112345678");   // "landline"
getPhoneType("+251212345678");   // "landline"
getPhoneType("1234567890");      // "unknown" (invalid)
```

### `getAreaCode(phone: string): string`

Extracts the area code from a phone number.

**Parameters:**
- `phone` (string): Phone number to extract area code from

**Returns:** Area code (e.g., "11" for Addis Ababa) or empty string if invalid

**Throws:** `InvalidFormatError` | `InvalidLengthError`

**Examples:**
```typescript
import { getAreaCode } from 'phone-formater-eth';

getAreaCode("+251112345678");    // "11" (Addis Ababa)
getAreaCode("+251212345678");    // "21" (Dire Dawa)
getAreaCode("+251312345678");    // "31" (Gondar)
getAreaCode("+251412345678");    // "41" (Bahir Dar)
getAreaCode("+251512345678");    // "51" (Dessie)
getAreaCode("+251612345678");    // "61" (Jimma)
getAreaCode("+251812345678");    // "81" (Mekelle)
getAreaCode("+251912345678");    // "91" (Mobile)
getAreaCode("+251712345678");    // "71" (Mobile)
getAreaCode("0912345678");       // "91" (Local format - will be formatted first)
```

## Utility Functions

### `parse(phone: string): string`

Cleans and parses phone numbers by removing special characters.

**Parameters:**
- `phone` (string): Phone number to clean

**Returns:** Cleaned phone number

**Throws:** `InvalidCharacterError` - For invalid characters

**Examples:**
```typescript
import { parse } from 'phone-formater-eth';

parse("(251) 911-123-456");     // "251911123456"
parse("(251) 9-11-123-456");    // "251911123456"
parse("(251) 9111-23-456");     // "251911123456"
parse("(2519) 11-123-456");     // "251911123456"
parse("09 123 456 78");         // "0912345678"
parse("+251-91-234-5678");      // "+251912345678"
parse("09-123-456-78");         // "0912345678"
parse("(09)123-456-78");        // "0912345678"
```

### `validatePhoneNumber(phone: string): ValidationResult`

Comprehensive phone number validation with detailed results.

**Parameters:**
- `phone` (string): Phone number to validate

**Returns:** Validation result object

**Examples:**
```typescript
import { validatePhoneNumber } from 'phone-formater-eth';

// Valid phone number
const validResult = validatePhoneNumber("0912345678");
console.log(validResult);
// {
//   isValid: true,
//   errors: [],
//   formattedNumber: "+251912345678",
//   phoneType: "mobile",
//   operator: "Ethio Telecom",
//   areaCode: "91"
// }

// Invalid phone number
const invalidResult = validatePhoneNumber("1234567890");
console.log(invalidResult);
// {
//   isValid: false,
//   errors: [InvalidFormatError],
//   formattedNumber: undefined,
//   phoneType: undefined,
//   operator: undefined,
//   areaCode: undefined
// }

// Landline number
const landlineResult = validatePhoneNumber("+251112345678");
console.log(landlineResult);
// {
//   isValid: true,
//   errors: [],
//   formattedNumber: "+251112345678",
//   phoneType: "landline",
//   operator: "UNKNOWN",
//   areaCode: "11"
// }
```

## Error Classes

### `PhoneNumberError`

Base error class for all phone number errors.

**Properties:**
- `message` (string): Error message
- `phoneNumber` (string | undefined): The phone number that caused the error
- `name` (string): Error class name

**Example:**
```typescript
import { PhoneNumberError } from 'phone-formater-eth';

const error = new PhoneNumberError("Test error", "123456789");
console.log(error.message);      // "Test error"
console.log(error.phoneNumber);  // "123456789"
console.log(error.name);         // "PhoneNumberError"
```

### `InvalidFormatError`

Error for invalid phone number format.

**Example:**
```typescript
import { InvalidFormatError } from 'phone-formater-eth';

try {
  formatPhone("1234567890");
} catch (error) {
  if (error instanceof InvalidFormatError) {
    console.error("Invalid format:", error.message);
    console.error("Phone number:", error.phoneNumber);
  }
}
```

### `InvalidLengthError`

Error for wrong phone number length.

**Properties:**
- `actualLength` (number | undefined): The actual length of the phone number

**Example:**
```typescript
import { InvalidLengthError } from 'phone-formater-eth';

try {
  formatPhone("12345678");
} catch (error) {
  if (error instanceof InvalidLengthError) {
    console.error("Invalid length:", error.message);
    console.error("Actual length:", error.actualLength);
  }
}
```

### `InvalidCharacterError`

Error for invalid characters in phone number.

**Properties:**
- `invalidCharacters` (string[] | undefined): Array of invalid characters found

**Example:**
```typescript
import { InvalidCharacterError } from 'phone-formater-eth';

try {
  parse("123@456#789");
} catch (error) {
  if (error instanceof InvalidCharacterError) {
    console.error("Invalid characters:", error.message);
    console.error("Invalid chars:", error.invalidCharacters);
  }
}
```

## Types and Interfaces

### `ValidationResult`

Interface for the result of `validatePhoneNumber()` function.

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: PhoneNumberError[];
  formattedNumber?: string;
  phoneType?: 'mobile' | 'landline' | 'unknown';
  operator?: string;
  areaCode?: string;
}
```

**Properties:**
- `isValid` (boolean): Whether the phone number is valid
- `errors` (PhoneNumberError[]): Array of validation errors (empty if valid)
- `formattedNumber` (string | undefined): Formatted phone number (if valid)
- `phoneType` ('mobile' | 'landline' | 'unknown' | undefined): Type of phone number
- `operator` (string | undefined): Mobile operator (if mobile)
- `areaCode` (string | undefined): Area code (if available)

## Usage Patterns

### Basic Usage

```typescript
import { formatPhone, checkOperator } from 'phone-formater-eth';

// Simple formatting
const formatted = formatPhone("0912345678");
const operator = checkOperator("0712345678");

console.log(formatted);  // "+251912345678"
console.log(operator);   // "Safaricom"
```

### Error Handling

```typescript
import { 
  formatPhone, 
  InvalidFormatError, 
  InvalidLengthError,
  InvalidCharacterError 
} from 'phone-formater-eth';

function processPhoneNumber(phone: string) {
  try {
    const formatted = formatPhone(phone);
    return { success: true, formatted };
  } catch (error) {
    if (error instanceof InvalidFormatError) {
      return { success: false, error: "Invalid format", details: error.message };
    } else if (error instanceof InvalidLengthError) {
      return { success: false, error: "Invalid length", details: error.message };
    } else if (error instanceof InvalidCharacterError) {
      return { success: false, error: "Invalid characters", details: error.message };
    } else {
      return { success: false, error: "Unknown error", details: error.message };
    }
  }
}
```

### Validation Workflow

```typescript
import { validatePhoneNumber } from 'phone-formater-eth';

function validateAndProcess(phone: string) {
  const result = validatePhoneNumber(phone);
  
  if (result.isValid) {
    console.log("Valid phone number:", result.formattedNumber);
    console.log("Type:", result.phoneType);
    console.log("Operator:", result.operator);
    console.log("Area code:", result.areaCode);
    
    // Process the phone number
    return processValidPhone(result);
  } else {
    console.error("Invalid phone number");
    result.errors.forEach(error => {
      console.error(`- ${error.message}`);
    });
    
    // Handle validation errors
    return handleValidationErrors(result.errors);
  }
}
```

### Batch Processing

```typescript
import { isValid, formatPhone } from 'phone-formater-eth';

function processPhoneNumbers(phones: string[]) {
  const results = phones.map(phone => {
    if (isValid(phone)) {
      try {
        const formatted = formatPhone(phone);
        return { phone, valid: true, formatted };
      } catch (error) {
        return { phone, valid: false, error: error.message };
      }
    } else {
      return { phone, valid: false, error: "Invalid phone number" };
    }
  });
  
  return results;
}
```

## Examples

### Complete Phone Number Processing

```typescript
import { 
  parse, 
  isValid, 
  formatPhone, 
  isMobile, 
  checkOperator,
  getPhoneType,
  getAreaCode 
} from 'phone-formater-eth';

function processPhoneNumber(input: string) {
  try {
    // Step 1: Parse and clean
    const cleaned = parse(input);
    console.log("Cleaned:", cleaned);
    
    // Step 2: Validate
    if (!isValid(cleaned)) {
      throw new Error("Invalid phone number after cleaning");
    }
    
    // Step 3: Format to international
    const international = formatPhone(cleaned);
    console.log("International:", international);
    
    // Step 4: Analyze
    const isMobileNumber = isMobile(international);
    const operator = checkOperator(international);
    const phoneType = getPhoneType(international);
    const areaCode = getAreaCode(international);
    
    // Step 5: Format to local
    const local = formatPhone(international, "local");
    
    return {
      original: input,
      cleaned,
      international,
      local,
      isMobile: isMobileNumber,
      operator,
      phoneType,
      areaCode
    };
    
  } catch (error) {
    console.error("Error processing phone number:", error.message);
    return null;
  }
}

// Usage
const result = processPhoneNumber("(09) 123-456-78");
console.log(result);
```

### Error Handling with Type Guards

```typescript
import { 
  formatPhone, 
  PhoneNumberError,
  InvalidFormatError,
  InvalidLengthError,
  InvalidCharacterError 
} from 'phone-formater-eth';

function isPhoneNumberError(error: unknown): error is PhoneNumberError {
  return error instanceof PhoneNumberError;
}

function handlePhoneNumberError(error: unknown) {
  if (!isPhoneNumberError(error)) {
    console.error("Unexpected error:", error);
    return;
  }
  
  console.error("Phone number error:", error.message);
  console.error("Phone number:", error.phoneNumber);
  
  if (error instanceof InvalidFormatError) {
    console.error("Format validation failed");
  } else if (error instanceof InvalidLengthError) {
    console.error("Length validation failed");
    console.error("Actual length:", error.actualLength);
  } else if (error instanceof InvalidCharacterError) {
    console.error("Character validation failed");
    console.error("Invalid characters:", error.invalidCharacters);
  }
}

// Usage
try {
  const result = formatPhone("invalid");
} catch (error) {
  handlePhoneNumberError(error);
}
```

This comprehensive API documentation provides all the information needed to effectively use the Ethiopian Phone Number Formatter & Validator library. 