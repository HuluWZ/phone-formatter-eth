# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-12-19

### ✨ Added
- **New Functions:**
  - `isMobile()` - Check if phone number is mobile (09/07/+2519/7)
  - `isLandline()` - Check if phone number is landline (+2511, +2512, etc.)
  - `getPhoneType()` - Get phone number type (mobile/landline/unknown)
  - `getAreaCode()` - Extract area code from phone numbers
  - `validatePhoneNumber()` - Comprehensive validation with detailed results
  - `formatLocal()` - Convert international to local format

- **Advanced Error Handling:**
  - `PhoneNumberError` - Base error class for all phone number errors
  - `InvalidFormatError` - Invalid phone number format
  - `InvalidLengthError` - Wrong phone number length
  - `InvalidCharacterError` - Invalid characters in phone number
  - `UnsupportedTypeError` - Unsupported phone number type
  - `OperatorNotFoundError` - Operator not found
  - `InvalidPhoneNumberError` - Legacy error class (deprecated)

- **Enhanced Features:**
  - Comprehensive input validation
  - Better character cleaning and parsing
  - Support for more phone number formats
  - Improved TypeScript type definitions

### 🔧 Changed
- **Breaking Changes:**
  - Functions now throw specific error types instead of returning "INVALID_PHONE_NUMBER"
  - Enhanced input validation with character checking before length validation
  - More strict format validation

- **Improvements:**
  - Better error messages with context information
  - Enhanced phone number parsing and cleaning
  - Improved validation logic and edge case handling

### 🧪 Testing
- Added comprehensive test suite with 52+ test cases
- Tests cover all functions, error scenarios, and edge cases
- Integration tests for complete phone number processing workflows
- Error type validation tests

### 📚 Documentation
- Complete API reference with examples
- Comprehensive error handling documentation
- Migration guide from v1.x to v2.0.0
- Usage examples for all new functions
- Supported phone number format documentation

## [1.1.8] - 2023-12-19

### ✨ Added
- Basic phone number formatting functionality
- Operator detection (Safaricom, Ethio Telecom)
- Simple validation function
- Basic parsing for special characters

### 🔧 Features
- Support for 09/07 prefixes
- International format conversion (+251)
- Basic error handling with string returns
- Simple input validation

## [1.1.7] - 2023-12-19

### ✨ Initial Release
- Basic phone number formatting
- Simple validation
- Operator checking
- Basic parsing functionality

---

## Version Compatibility

### Node.js
- **v2.0.0**: Node.js 14+
- **v1.x.x**: Node.js 12+

### TypeScript
- **v2.0.0**: TypeScript 5.0+
- **v1.x.x**: TypeScript 4.0+

### Breaking Changes
- **v1.x → v2.0.0**: Major breaking changes in error handling
- **v1.x.x → v1.x.x**: No breaking changes

---

## Migration Notes

### From v1.x to v2.0.0
1. **Error Handling**: Update code to handle thrown errors instead of string returns
2. **New Functions**: Take advantage of new validation and analysis functions
3. **Type Safety**: Benefit from improved TypeScript types and error classes

### Recommended Migration Path
1. Update to v2.0.0
2. Replace string error checks with try-catch blocks
3. Use new validation functions for better error handling
4. Leverage new analysis functions for enhanced functionality

---

## Support

For questions about migration or new features, please:
1. Check the [README.md](README.md) for comprehensive documentation
2. Review the [migration guide](README.md#migration-from-v1x) in the README
3. Open an issue on GitHub for specific problems
4. Check existing issues for similar questions 