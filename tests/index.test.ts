import { formatPhone, checkOperator } from "../src/index";

describe("formatPhone", () => {
  test("should format phone numbers correctly", () => {
    // Test with different formats and expected outputs
    expect(formatPhone("0912345678")).toBe("+251912345678"); // Standard 10-digit format
    expect(formatPhone("+251912345678")).toBe("+251912345678"); // Already formatted number
    expect(formatPhone("251912345678")).toBe("+251912345678"); // Missing '+'
    expect(formatPhone("0912345678")).toBe("+251912345678"); // 9-digit number, prefix '09'
    expect(formatPhone("0712345678")).toBe("+251712345678"); // Incorrect format, treated as unknown
    expect(formatPhone("912345678")).toBe("+251912345678"); // 9-digit  ethio-tel number, missing '+251'
    expect(formatPhone("712345678")).toBe("+251712345678"); // 9-digit  safari number, missing '+251'
    expect(formatPhone("1234567890")).toBe("INVALID PHONE NUMBER"); // Invalid Phone number
    expect(formatPhone("812345678")).toBe("INVALID PHONE NUMBER"); // Invalid Phone number
    expect(formatPhone("")).toBe("INVALID PHONE NUMBER"); // Empty input
  });
});

describe("checkOperator", () => {
  test("should identify the phone operator correctly", () => {
    // Test with different formatted numbers and expected operators
    expect(checkOperator("0912345678")).toBe("Ethio Telecom"); // Standard 10-digit format
    expect(checkOperator("+251912345678")).toBe("Ethio Telecom"); // Already formatted number
    expect(checkOperator("+251712345678")).toBe("Safaricom"); // Already formatted number
    expect(checkOperator("251912345678")).toBe("Ethio Telecom"); // Number starting with '07'
    expect(checkOperator("0912345678")).toBe("Ethio Telecom"); // Missing '+2519'
    expect(checkOperator("0712345678")).toBe("Safaricom"); // Missing prefix `+2517`
    expect(checkOperator("712345678")).toBe("Safaricom"); // 9-digit number
    expect(checkOperator("1234567890")).toBe("UNKNOWN"); // Invalid Phone Number input
    expect(checkOperator("812345678")).toBe("UNKNOWN"); // Invalid Phone Number input
    expect(checkOperator("")).toBe("UNKNOWN"); // Empty input
  });
});
