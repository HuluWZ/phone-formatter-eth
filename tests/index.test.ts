import {
  formatPhone,
  formatLocal,
  checkOperator,
  isValid,
  parse,
  isMobile,
  isLandline,
  getPhoneType,
  getAreaCode,
  validatePhoneNumber,
  PhoneNumberError,
  InvalidPhoneNumberError,
  InvalidFormatError,
  InvalidLengthError,
  InvalidCharacterError,
  UnsupportedTypeError,
  OperatorNotFoundError
} from "../src/index";

describe("Error Classes", () => {
  describe("PhoneNumberError", () => {
    test("should create base error with message and phone number", () => {
      const error = new PhoneNumberError("Test error", "123456789");
      expect(error.message).toBe("Test error");
      expect(error.phoneNumber).toBe("123456789");
      expect(error.name).toBe("PhoneNumberError");
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe("InvalidFormatError", () => {
    test("should create format error with message and phone number", () => {
      const error = new InvalidFormatError("Invalid format", "123456789");
      expect(error.message).toBe("Invalid format");
      expect(error.phoneNumber).toBe("123456789");
      expect(error.name).toBe("InvalidFormatError");
      expect(error).toBeInstanceOf(PhoneNumberError);
    });
  });

  describe("InvalidLengthError", () => {
    test("should create length error with message, phone number, and actual length", () => {
      const error = new InvalidLengthError("Invalid length", "123456789", 9);
      expect(error.message).toBe("Invalid length");
      expect(error.phoneNumber).toBe("123456789");
      expect(error.actualLength).toBe(9);
      expect(error.name).toBe("InvalidLengthError");
      expect(error).toBeInstanceOf(PhoneNumberError);
    });
  });

  describe("InvalidCharacterError", () => {
    test("should create character error with message, phone number, and invalid characters", () => {
      const error = new InvalidCharacterError("Invalid characters", "123@456", ["@"]);
      expect(error.message).toBe("Invalid characters");
      expect(error.phoneNumber).toBe("123@456");
      expect(error.invalidCharacters).toEqual(["@"]);
      expect(error.name).toBe("InvalidCharacterError");
      expect(error).toBeInstanceOf(PhoneNumberError);
    });
  });

  describe("UnsupportedTypeError", () => {
    test("should create unsupported type error with message, phone number, and phone type", () => {
      const error = new UnsupportedTypeError("Unsupported type", "123456789", "satellite");
      expect(error.message).toBe("Unsupported type");
      expect(error.phoneNumber).toBe("123456789");
      expect(error.phoneType).toBe("satellite");
      expect(error.name).toBe("UnsupportedTypeError");
      expect(error).toBeInstanceOf(PhoneNumberError);
    });
  });

  describe("OperatorNotFoundError", () => {
    test("should create operator not found error with message, phone number, and operator", () => {
      const error = new OperatorNotFoundError("Operator not found", "123456789", "unknown");
      expect(error.message).toBe("Operator not found");
      expect(error.phoneNumber).toBe("123456789");
      expect(error.operator).toBe("unknown");
      expect(error.name).toBe("OperatorNotFoundError");
      expect(error).toBeInstanceOf(PhoneNumberError);
    });
  });

  describe("InvalidPhoneNumberError (Legacy)", () => {
    test("should create legacy error for backward compatibility", () => {
      const error = new InvalidPhoneNumberError("Legacy error", "123456789");
      expect(error.message).toBe("Legacy error");
      expect(error.phoneNumber).toBe("123456789");
      expect(error.name).toBe("InvalidPhoneNumberError");
      expect(error).toBeInstanceOf(PhoneNumberError);
    });
  });
});

describe("formatPhone", () => {
  describe("International format (default)", () => {
    test("should format 10-digit local numbers correctly", () => {
      expect(formatPhone("0912345678")).toBe("+251912345678");
      expect(formatPhone("0712345678")).toBe("+251712345678");
    });

    test("should format 9-digit numbers correctly", () => {
      expect(formatPhone("912345678")).toBe("+251912345678");
      expect(formatPhone("712345678")).toBe("+251712345678");
    });

    test("should handle already formatted international numbers", () => {
      expect(formatPhone("+251912345678")).toBe("+251912345678");
      expect(formatPhone("+251712345678")).toBe("+251712345678");
    });

    test("should handle numbers without + prefix", () => {
      expect(formatPhone("251912345678")).toBe("+251912345678");
      expect(formatPhone("251712345678")).toBe("+251712345678");
    });
  });

  describe("Local format", () => {
    test("should format to local format correctly", () => {
      expect(formatPhone("0912345678", "local")).toBe("0912345678");
      expect(formatPhone("0712345678", "local")).toBe("0712345678");
      expect(formatPhone("912345678", "local")).toBe("0912345678");
      expect(formatPhone("712345678", "local")).toBe("0712345678");
    });

    test("should convert international to local format", () => {
      expect(formatPhone("+251912345678", "local")).toBe("0912345678");
      expect(formatPhone("+251712345678", "local")).toBe("0712345678");
    });
  });

  describe("Input validation", () => {
    test("should throw InvalidLengthError for wrong length", () => {
      expect(() => formatPhone("12345678")).toThrow(InvalidLengthError);
    });

    test("should throw InvalidFormatError for invalid phone numbers", () => {
      expect(() => formatPhone("1234567890")).toThrow(InvalidFormatError);
      expect(() => formatPhone("812345678")).toThrow(InvalidFormatError);
      expect(() => formatPhone("1234567890123")).toThrow(InvalidFormatError); // 13 digits but invalid format
    });

    test("should throw InvalidFormatError for empty or null inputs", () => {
      expect(() => formatPhone("")).toThrow(InvalidFormatError);
      expect(() => formatPhone(null as any)).toThrow(InvalidFormatError);
      expect(() => formatPhone(undefined as any)).toThrow(InvalidFormatError);
      expect(() => formatPhone(123 as any)).toThrow(InvalidFormatError);
    });

    test("should handle edge cases with proper formatting", () => {
      expect(formatPhone("  0912345678  ")).toBe("+251912345678"); // With spaces
      expect(formatPhone("09-123-456-78")).toBe("+251912345678"); // With dashes
      expect(formatPhone("(09)123-456-78")).toBe("+251912345678"); // With parentheses
    });

    test("should throw InvalidCharacterError for invalid formats", () => {
      expect(() => formatPhone("abc123def")).toThrow(InvalidCharacterError);
      expect(() => formatPhone("123@456#789")).toThrow(InvalidCharacterError);
    });
  });
});

describe("formatLocal", () => {
  test("should convert international format to local format", () => {
    expect(formatLocal("+251912345678")).toBe("0912345678");
    expect(formatLocal("+251712345678")).toBe("0712345678");
  });

  test("should throw InvalidFormatError for invalid inputs", () => {
    expect(() => formatLocal("0912345678")).toThrow(InvalidFormatError);
    expect(() => formatLocal("+1234567890")).toThrow(InvalidFormatError);
    expect(() => formatLocal("")).toThrow(InvalidFormatError);
    expect(() => formatLocal(null as any)).toThrow(InvalidFormatError);
  });
});

describe("isMobile", () => {
  test("should identify mobile numbers correctly", () => {
    expect(isMobile("0912345678")).toBe(true);
    expect(isMobile("0712345678")).toBe(true);
    expect(isMobile("912345678")).toBe(true);
    expect(isMobile("712345678")).toBe(true);
    expect(isMobile("+251912345678")).toBe(true);
    expect(isMobile("+251712345678")).toBe(true);
  });

  test("should return false for non-mobile numbers", () => {
    expect(isMobile("+251112345678")).toBe(false); // Landline
  });

  test("should throw InvalidFormatError for invalid inputs", () => {
    expect(() => isMobile("1234567890")).toThrow(InvalidFormatError);
    expect(() => isMobile("")).toThrow(InvalidFormatError);
    expect(() => isMobile(null as any)).toThrow(InvalidFormatError);
  });
});

describe("isLandline", () => {
  test("should identify landline numbers correctly", () => {
    expect(isLandline("+251112345678")).toBe(true); // Addis Ababa
    expect(isLandline("+251212345678")).toBe(true); // Dire Dawa
    expect(isLandline("+251312345678")).toBe(true); // Gondar
    expect(isLandline("+251412345678")).toBe(true); // Bahir Dar
    expect(isLandline("+251512345678")).toBe(true); // Dessie
    expect(isLandline("+251612345678")).toBe(true); // Jimma
    expect(isLandline("+251812345678")).toBe(true); // Mekelle
  });

  test("should return false for non-landline numbers", () => {
    expect(isLandline("0912345678")).toBe(false); // Mobile
    expect(isLandline("0712345678")).toBe(false); // Mobile
  });

  test("should throw InvalidFormatError for invalid inputs", () => {
    expect(() => isLandline("1234567890")).toThrow(InvalidFormatError);
    expect(() => isLandline("")).toThrow(InvalidFormatError);
    expect(() => isLandline(null as any)).toThrow(InvalidFormatError);
  });
});

describe("getPhoneType", () => {
  test("should correctly identify phone types", () => {
    expect(getPhoneType("0912345678")).toBe("mobile");
    expect(getPhoneType("+251112345678")).toBe("landline");
  });

  test("should throw InvalidFormatError for invalid inputs", () => {
    expect(() => getPhoneType("1234567890")).toThrow(InvalidFormatError);
    expect(() => getPhoneType("")).toThrow(InvalidFormatError);
  });
});

describe("getAreaCode", () => {
  test("should extract area codes correctly", () => {
    expect(getAreaCode("+251112345678")).toBe("11"); // Addis Ababa
    expect(getAreaCode("+251212345678")).toBe("21"); // Dire Dawa
    expect(getAreaCode("+251912345678")).toBe("91"); // Mobile
    expect(getAreaCode("+251712345678")).toBe("71"); // Mobile
  });

  test("should handle local format inputs", () => {
    expect(getAreaCode("0912345678")).toBe("91"); // Local format - will be formatted first
  });

  test("should return empty string for numbers without area code", () => {
    expect(() => getAreaCode("+25112345678")).toThrow(InvalidFormatError); // Too short for area code
  });

  test("should throw InvalidFormatError for invalid inputs", () => {
    expect(() => getAreaCode("1234567890")).toThrow(InvalidFormatError);
    expect(() => getAreaCode("")).toThrow(InvalidFormatError);
    expect(() => getAreaCode(null as any)).toThrow(InvalidFormatError);
  });
});

describe("checkOperator", () => {
  test("should identify operators correctly", () => {
    expect(checkOperator("0912345678")).toBe("Ethio Telecom");
    expect(checkOperator("0712345678")).toBe("Safaricom");
    expect(checkOperator("912345678")).toBe("Ethio Telecom");
    expect(checkOperator("712345678")).toBe("Safaricom");
    expect(checkOperator("+251912345678")).toBe("Ethio Telecom");
    expect(checkOperator("+251712345678")).toBe("Safaricom");
  });

  test("should return UNKNOWN for landline numbers", () => {
    expect(checkOperator("+251112345678")).toBe("UNKNOWN"); // Landline
  });

  test("should throw InvalidFormatError for invalid inputs", () => {
    expect(() => checkOperator("1234567890")).toThrow(InvalidFormatError);
    expect(() => checkOperator("")).toThrow(InvalidFormatError);
    expect(() => checkOperator(null as any)).toThrow(InvalidFormatError);
  });
});

describe("isValid", () => {
  test("should validate phone numbers correctly", () => {
    expect(isValid("0912345678")).toBe(true);
    expect(isValid("0712345678")).toBe(true);
    expect(isValid("+251912345678")).toBe(true);
    expect(isValid("+251712345678")).toBe(true);
    expect(isValid("+251112345678")).toBe(true); // Landline
  });

  test("should return false for invalid numbers", () => {
    expect(isValid("1234567890")).toBe(false);
    expect(isValid("812345678")).toBe(false);
    expect(isValid("12345678")).toBe(false);
    expect(isValid("1234567890123")).toBe(false);
  });

  test("should throw InvalidFormatError for invalid inputs", () => {
    expect(() => isValid("")).toThrow(InvalidFormatError);
    expect(() => isValid(null as any)).toThrow(InvalidFormatError);
  });
});

describe("parse", () => {
  test("should parse phone numbers correctly", () => {
    expect(parse("(251) 911-123-456")).toBe("251911123456");
    expect(parse("(251) 9-11-123-456")).toBe("251911123456");
    expect(parse("(251) 9111-23-456")).toBe("251911123456");
    expect(parse("(2519) 11-123-456")).toBe("251911123456");
    expect(parse("09 123 456 78")).toBe("0912345678");
    expect(parse("+251-91-234-5678")).toBe("+251912345678");
  });

  test("should throw InvalidCharacterError for invalid characters", () => {
    expect(() => parse("")).toThrow(InvalidCharacterError);
    expect(() => parse("abc123def")).toThrow(InvalidCharacterError);
    expect(() => parse("123@456#789")).toThrow(InvalidCharacterError);
    expect(() => parse(null as any)).toThrow(InvalidCharacterError);
  });
});

describe("validatePhoneNumber", () => {
  test("should return valid result for valid phone numbers", () => {
    const result = validatePhoneNumber("0912345678");

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.formattedNumber).toBe("+251912345678");
    expect(result.phoneType).toBe("mobile");
    expect(result.operator).toBe("Ethio Telecom");
    expect(result.areaCode).toBe("91");
  });

  test("should return invalid result with errors for invalid phone numbers", () => {
    const result = validatePhoneNumber("1234567890");

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(InvalidFormatError);
    expect(result.formattedNumber).toBeUndefined();
    expect(result.phoneType).toBeUndefined();
    expect(result.operator).toBeUndefined();
    expect(result.areaCode).toBeUndefined();
  });

  test("should handle landline numbers correctly", () => {
    const result = validatePhoneNumber("+251112345678");

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.formattedNumber).toBe("+251112345678");
    expect(result.phoneType).toBe("landline");
    expect(result.operator).toBe("UNKNOWN");
    expect(result.areaCode).toBe("11");
  });

  test("should handle empty input", () => {
    const result = validatePhoneNumber("");

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(InvalidFormatError);
  });
});

describe("Error handling", () => {
  test("should provide meaningful error messages for format errors", () => {
    try {
      formatPhone("1234567890");
      fail("Expected error to be thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidFormatError);
      expect((error as InvalidFormatError).phoneNumber).toBe("1234567890");
      expect((error as InvalidFormatError).message).toContain("Invalid phone number format");
    }
  });

  test("should handle length validation errors", () => {
    try {
      formatPhone("12345678");
      fail("Expected error to be thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidLengthError);
      expect((error as InvalidLengthError).phoneNumber).toBe("12345678");
      expect((error as InvalidLengthError).actualLength).toBe(8);
      expect((error as InvalidLengthError).message).toContain("Phone number length must be between 9 and 13 digits");
    }
  });

  test("should handle invalid character errors in parse", () => {
    try {
      parse("123@456#789");
      fail("Expected error to be thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidCharacterError);
      expect((error as InvalidCharacterError).phoneNumber).toBe("123@456#789");
      expect((error as InvalidCharacterError).invalidCharacters).toEqual(["@", "#"]);
      expect((error as InvalidCharacterError).message).toContain("Phone number contains invalid characters");
    }
  });

  test("should handle null input errors", () => {
    try {
      formatPhone(null as any);
      fail("Expected error to be thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidFormatError);
      expect((error as InvalidFormatError).message).toBe("Phone number must be a non-empty string");
    }
  });
});

describe("Integration tests", () => {
  test("should work together for complete phone number processing", () => {
    const phone = "09-123-456-78";

    // Parse the phone number
    const parsed = parse(phone);
    expect(parsed).toBe("0912345678");

    // Check if it's valid
    expect(isValid(parsed)).toBe(true);

    // Format to international
    const international = formatPhone(parsed);
    expect(international).toBe("+251912345678");

    // Check if it's mobile
    expect(isMobile(international)).toBe(true);

    // Check operator
    expect(checkOperator(international)).toBe("Ethio Telecom");

    // Get phone type
    expect(getPhoneType(international)).toBe("mobile");

    // Get area code
    expect(getAreaCode(international)).toBe("91");

    // Format back to local
    const local = formatPhone(international, "local");
    expect(local).toBe("0912345678");
  });

  test("should handle landline numbers correctly", () => {
    const phone = "+251-11-234-5678";

    const parsed = parse(phone);
    expect(parsed).toBe("+251112345678");

    expect(isValid(parsed)).toBe(true);
    expect(isLandline(parsed)).toBe(true);
    expect(isMobile(parsed)).toBe(false);
    expect(getPhoneType(parsed)).toBe("landline");
    expect(getAreaCode(parsed)).toBe("11");
    expect(checkOperator(parsed)).toBe("UNKNOWN");
  });

  test("should handle error scenarios gracefully", () => {
    // Test that isValid returns false for invalid numbers instead of throwing
    expect(isValid("1234567890")).toBe(false);

    // Test that other functions throw errors for invalid numbers
    expect(() => formatPhone("1234567890")).toThrow(InvalidFormatError);
    expect(() => isMobile("1234567890")).toThrow(InvalidFormatError);
    expect(() => isLandline("1234567890")).toThrow(InvalidFormatError);
  });

  test("should provide comprehensive validation with validatePhoneNumber", () => {
    const validResult = validatePhoneNumber("0912345678");
    expect(validResult.isValid).toBe(true);
    expect(validResult.formattedNumber).toBe("+251912345678");
    expect(validResult.phoneType).toBe("mobile");
    expect(validResult.operator).toBe("Ethio Telecom");
    expect(validResult.areaCode).toBe("91");

    const invalidResult = validatePhoneNumber("1234567890");
    expect(invalidResult.isValid).toBe(false);
    expect(invalidResult.errors).toHaveLength(1);
    expect(invalidResult.errors[0]).toBeInstanceOf(InvalidFormatError);
  });
});
