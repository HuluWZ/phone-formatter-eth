import {
  formatPhone,
  formatLocal,
  isValid,
  isMobile,
  isLandline,
  checkOperator,
  getPhoneType,
  getAreaCode,
  validatePhoneNumber,
  InvalidFormatError,
} from "../src/index";

describe("phone format validation", () => {
  const malformedNumbers = [
    "+2519+1234567",
    "2519+1234567",
    "0912345+78",
    "91234567+",
    "+251+91234567",
    "+25111234567+",
    "+251-9+123-4567",
  ];

  test.each(malformedNumbers)("rejects misplaced plus signs in %s", (phone) => {
    expect(() => formatPhone(phone)).toThrow(InvalidFormatError);
    expect(() => formatPhone(phone, "local")).toThrow(InvalidFormatError);
    expect(isValid(phone)).toBe(false);

    [isMobile, isLandline, checkOperator, getPhoneType, getAreaCode].forEach((validate) => {
      expect(() => validate(phone)).toThrow(InvalidFormatError);
    });

    const result = validatePhoneNumber(phone);
    expect(result.isValid).toBe(false);
    expect(result.formattedNumber).toBeUndefined();
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toBeInstanceOf(InvalidFormatError);
    expect(result.errors[0].phoneNumber).toBe(phone);
  });

  const validCases: Array<[string, string, string, "mobile" | "landline"]> = [];
  ["7", "9"].forEach((prefix) => {
    const national = `${prefix}12345678`;
    const international = `+251${national}`;
    [national, `0${national}`, `251${national}`, international].forEach((phone) => {
      validCases.push([phone, international, `0${national}`, "mobile"]);
    });
  });
  ["1", "2", "3", "4", "5", "6", "8"].forEach((prefix) => {
    const national = `${prefix}12345678`;
    const international = `+251${national}`;
    [`251${national}`, international].forEach((phone) => {
      validCases.push([phone, international, `0${national}`, "landline"]);
    });
  });

  test.each(validCases)("preserves supported input %s", (phone, international, local, type) => {
    expect(formatPhone(phone)).toBe(international);
    expect(formatPhone(phone, "local")).toBe(local);
    expect(formatLocal(international)).toBe(local);
    expect(formatPhone(formatPhone(phone))).toBe(international);
    expect(isValid(phone)).toBe(true);
    expect(getPhoneType(phone)).toBe(type);
    expect(isMobile(phone)).toBe(type === "mobile");
    expect(isLandline(phone)).toBe(type === "landline");
    expect(validatePhoneNumber(phone).isValid).toBe(true);
  });

  test.each([
    [" +251 (91) 234-5678 ", "+251912345678"],
    ["(07) 123-456-78", "+251712345678"],
    ["+251\t11\n2345678", "+251112345678"],
  ])("preserves formatting cleanup for %s", (phone, expected) => {
    expect(formatPhone(phone)).toBe(expected);
    expect(isValid(phone)).toBe(true);
  });
});
