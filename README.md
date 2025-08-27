# Ethiopian Phone Number Formatter & Validator

[![npm version](https://badge.fury.io/js/phone-formater-eth.svg)](https://badge.fury.io/js/phone-formater-eth)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-52%20passing-brightgreen.svg)](https://github.com/HuluWZ/phone-formater-eth)
[![CircleCI](https://circleci.com/gh/HuluWZ/phone-formater-eth.svg?style=svg)](https://circleci.com/gh/HuluWZ/phone-formater-eth)

A comprehensive TypeScript library for formatting, validating, and analyzing Ethiopian phone numbers. Supports both mobile and landline numbers with advanced error handling and validation.

## ✨ Features

- **📱 Mobile Number Support**: 09/07 prefixes and +2519/+2517 formats
- **🏠 Landline Number Support**: +2511 (Addis Ababa), +2512 (Dire Dawa), etc.
- **🔍 Smart Validation**: Comprehensive phone number validation with detailed error messages
- **🔄 Format Conversion**: Convert between local (09/07) and international (+251) formats
- **🏢 Operator Detection**: Identify Safaricom, Ethio Telecom, and landline operators
- **📍 Area Code Extraction**: Extract regional area codes from phone numbers
- **⚡ TypeScript First**: Full TypeScript support with comprehensive type definitions
- **🚨 Advanced Error Handling**: Specific error types for different validation failures
- **🧪 Comprehensive Testing**: 52+ test cases ensuring reliability

## 📦 Installation

```bash
npm install phone-formater-eth
```

```bash
yarn add phone-formater-eth
```

```bash
pnpm add phone-formater-eth
```

## 🚀 Quick Start

```typescript
import { 
  formatPhone, 
  isMobile, 
  isLandline, 
  checkOperator,
  validatePhoneNumber 
} from 'phone-formater-eth';

// Format phone numbers
const international = formatPhone("0912345678"); // "+251912345678"
const local = formatPhone("+251912345678", "local"); // "0912345678"

// Check phone type
const isMobileNumber = isMobile("0912345678"); // true
const isLandlineNumber = isLandline("+251112345678"); // true

// Get operator information
const operator = checkOperator("0712345678"); // "Safaricom"

// Comprehensive validation
const validation = validatePhoneNumber("0912345678");
console.log(validation);
// {
//   isValid: true,
//   errors: [],
//   formattedNumber: "+251912345678",
//   phoneType: "mobile",
//   operator: "Ethio Telecom",
//   areaCode: "91"
// }
```

## 📚 API Reference

### Core Functions

#### `formatPhone(phone: string, type?: "local" | "international"): string`

Formats Ethiopian phone numbers to either local or international format.

**Parameters:**
- `phone`: Phone number to format
- `type`: Output format - "local" (09/07) or "international" (+251) - defaults to "international"

**Returns:** Formatted phone number

**Throws:** `InvalidFormatError` | `InvalidLengthError` | `InvalidCharacterError`

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
```

#### `formatLocal(phone: string): string`

Converts international format to local format.

**Parameters:**
- `phone`: Phone number in international format (+251...)

**Returns:** Phone number in local format (09... or 07...)

**Throws:** `InvalidFormatError`

```typescript
import { formatLocal } from 'phone-formater-eth';

formatLocal("+251912345678"); // "0912345678"
formatLocal("+251712345678"); // "0712345678"
```

### Validation Functions

#### `isValid(phone: string): boolean`

Validates if a phone number is valid according to Ethiopian standards.

**Parameters:**
- `phone`: Phone number to validate

**Returns:** `true` if valid, `false` otherwise

**Throws:** `InvalidFormatError`

```typescript
import { isValid } from 'phone-formater-eth';

isValid("0912345678");        // true
isValid("1234567890");        // false
isValid("+251912345678");     // true
```

#### `isMobile(phone: string): boolean`

Checks if the phone number is a mobile number.

**Parameters:**
- `phone`: Phone number to check

**Returns:** `true` if mobile, `false` otherwise

**Throws:** `InvalidFormatError` | `InvalidLengthError`

```typescript
import { isMobile } from 'phone-formater-eth';

isMobile("0912345678");       // true (Ethio Telecom)
isMobile("0712345678");       // true (Safaricom)
isMobile("+251112345678");    // false (Landline)
```

#### `isLandline(phone: string): boolean`

Checks if the phone number is a landline number.

**Parameters:**
- `phone`: Phone number to check

**Returns:** `true` if landline, `false` otherwise

**Throws:** `InvalidFormatError` | `InvalidLengthError`

```typescript
import { isLandline } from 'phone-formater-eth';

isLandline("+251112345678");  // true (Addis Ababa)
isLandline("+251212345678");  // true (Dire Dawa)
isLandline("0912345678");     // false (Mobile)
```

### Analysis Functions

#### `checkOperator(phone: string): string`

Identifies the mobile operator for a given phone number.

**Parameters:**
- `phone`: Phone number to check

**Returns:** 'Safaricom', 'Ethio Telecom', or 'UNKNOWN'

**Throws:** `InvalidFormatError` | `InvalidLengthError`

```typescript
import { checkOperator } from 'phone-formater-eth';

checkOperator("0912345678");      // "Ethio Telecom"
checkOperator("0712345678");      // "Safaricom"
checkOperator("+251112345678");   // "UNKNOWN" (Landline)
```

#### `getPhoneType(phone: string): 'mobile' | 'landline' | 'unknown'`

Gets the phone number type.

**Parameters:**
- `phone`: Phone number to check

**Returns:** 'mobile', 'landline', or 'unknown'

**Throws:** `InvalidFormatError` | `InvalidLengthError`

```typescript
import { getPhoneType } from 'phone-formater-eth';

getPhoneType("0912345678");      // "mobile"
getPhoneType("+251112345678");   // "landline"
getPhoneType("1234567890");      // "unknown" (invalid)
```

#### `getAreaCode(phone: string): string`

Extracts the area code from a phone number.

**Parameters:**
- `phone`: Phone number to extract area code from

**Returns:** Area code (e.g., "11" for Addis Ababa) or empty string if invalid

**Throws:** `InvalidFormatError` | `InvalidLengthError`

```typescript
import { getAreaCode } from 'phone-formater-eth';

getAreaCode("+251112345678");    // "11" (Addis Ababa)
getAreaCode("+251212345678");    // "21" (Dire Dawa)
getAreaCode("+251912345678");    // "91" (Mobile)
```

### Utility Functions

#### `parse(phone: string): string`

Cleans and parses phone numbers by removing special characters.

**Parameters:**
- `phone`: Phone number to clean

**Returns:** Cleaned phone number

**Throws:** `InvalidCharacterError`

```typescript
import { parse } from 'phone-formater-eth';

parse("(251) 911-123-456");     // "251911123456"
parse("09 123 456 78");         // "0912345678"
parse("+251-91-234-5678");      // "+251912345678"
```

#### `validatePhoneNumber(phone: string): ValidationResult`

Comprehensive phone number validation with detailed results.

**Parameters:**
- `phone`: Phone number to validate

**Returns:** Validation result object

```typescript
import { validatePhoneNumber } from 'phone-formater-eth';

const result = validatePhoneNumber("0912345678");
console.log(result);
// {
//   isValid: true,
//   errors: [],
//   formattedNumber: "+251912345678",
//   phoneType: "mobile",
//   operator: "Ethio Telecom",
//   areaCode: "91"
// }

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
```

## 🚨 Error Handling

The library uses specific error types for different validation failures:

### Error Classes

- **`PhoneNumberError`** - Base error class for all phone number errors
- **`InvalidFormatError`** - Invalid phone number format
- **`InvalidLengthError`** - Wrong phone number length
- **`InvalidCharacterError`** - Invalid characters in phone number
- **`UnsupportedTypeError`** - Unsupported phone number type
- **`OperatorNotFoundError`** - Operator not found
- **`InvalidPhoneNumberError`** - Legacy error class (deprecated)

### Error Handling Example

```typescript
import { 
  formatPhone, 
  InvalidFormatError, 
  InvalidLengthError,
  InvalidCharacterError 
} from 'phone-formater-eth';

try {
  const formatted = formatPhone("0912345678");
  console.log("Formatted:", formatted);
} catch (error) {
  if (error instanceof InvalidFormatError) {
    console.error("Invalid format:", error.message);
    console.error("Phone number:", error.phoneNumber);
  } else if (error instanceof InvalidLengthError) {
    console.error("Invalid length:", error.message);
    console.error("Actual length:", error.actualLength);
  } else if (error instanceof InvalidCharacterError) {
    console.error("Invalid characters:", error.message);
    console.error("Invalid chars:", error.invalidCharacters);
  } else {
    console.error("Unexpected error:", error);
  }
}
```

## 📱 Supported Phone Number Formats

### Mobile Numbers
- **09XXXXXXXX** → **+2519XXXXXXXX** (Ethio Telecom)
- **07XXXXXXXX** → **+2517XXXXXXXX** (Safaricom)
- **9XXXXXXXX** → **+2519XXXXXXXX** (Ethio Telecom)
- **7XXXXXXXX** → **+2517XXXXXXXX** (Safaricom)
- **+2519XXXXXXXX** (Already formatted)
- **+2517XXXXXXXX** (Already formatted)

### Landline Numbers
- **+2511XXXXXXXX** (Addis Ababa)
- **+2512XXXXXXXX** (Dire Dawa)
- **+2513XXXXXXXX** (Gondar)
- **+2514XXXXXXXX** (Bahir Dar)
- **+2515XXXXXXXX** (Dessie)
- **+2516XXXXXXXX** (Jimma)
- **+2518XXXXXXXX** (Mekelle)

### Input Cleaning
The library automatically handles:
- Spaces: `"09 123 456 78"` → `"0912345678"`
- Dashes: `"09-123-456-78"` → `"0912345678"`
- Parentheses: `"(09)123-456-78"` → `"0912345678"`
- Plus signs: `"+251-91-234-5678"` → `"+251912345678"`

## 🔄 Migration from v1.x

### Breaking Changes

1. **Error Handling**: Functions now throw errors instead of returning "INVALID_PHONE_NUMBER"
2. **New Error Types**: Specific error classes for different validation failures
3. **Enhanced Validation**: More comprehensive input validation

### Migration Guide

#### Before (v1.x)
```typescript
import { formatPhone } from 'phone-formater-eth';

const result = formatPhone("invalid");
if (result === "INVALID_PHONE_NUMBER") {
  console.error("Invalid phone number");
}
```

#### After (v2.0.0)
```typescript
import { formatPhone, InvalidFormatError } from 'phone-formater-eth';

try {
  const result = formatPhone("invalid");
  console.log("Formatted:", result);
} catch (error) {
  if (error instanceof InvalidFormatError) {
    console.error("Invalid format:", error.message);
  }
}
```

#### Alternative: Use `isValid()` for Simple Checks
```typescript
import { isValid } from 'phone-formater-eth';

if (isValid("invalid")) {
  // Process valid phone number
} else {
  // Handle invalid phone number
}
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The library includes 52+ comprehensive test cases covering:
- All supported phone number formats
- Error handling scenarios
- Edge cases and boundary conditions
- Integration tests
- Error type validation

## 📋 Requirements

- Node.js 14+
- TypeScript 5.0+
- Jest (for testing)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Hulunlante Worku**

- GitHub: [@HuluWZ](https://github.com/HuluWZ)
- Project: [phone-formater-eth](https://github.com/HuluWZ/phone-formater-eth)

## 🔗 Links

- [npm package](https://www.npmjs.com/package/phone-formater-eth)
- [GitHub repository](https://github.com/HuluWZ/phone-formater-eth)
- [Issue tracker](https://github.com/HuluWZ/phone-formater-eth/issues)

## 📈 Changelog

### v2.0.0 (Current)
- ✨ Added `isMobile()` and `isLandline()` functions
- ✨ Added `getPhoneType()` and `getAreaCode()` functions
- ✨ Added `validatePhoneNumber()` comprehensive validation
- 🚨 Replaced string error returns with specific error classes
- 🔧 Enhanced input validation and error handling
- 📚 Improved TypeScript types and documentation
- 🧪 Added comprehensive test suite (52+ tests)
- ⚠️ **Breaking Changes**: Error handling now throws exceptions

### v1.1.8
- Basic phone number formatting
- Operator detection
- Simple validation

---

**Made with ❤️ for Ethiopia**
