import { formatLocal, InvalidFormatError } from "../src/index";

describe("formatLocal validation", () => {
  test.each([
    "+251",
    "+25191234567",
    "+2519123456789",
    "+2519+1234567",
    "+25191234567+",
    "+25191234abcd",
    "+25191234567\n",
    "+251912345678\n",
  ])("rejects incomplete or noncanonical international input %s", (phone) => {
    expect(() => formatLocal(phone)).toThrow(InvalidFormatError);
    try {
      formatLocal(phone);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidFormatError);
      expect((error as InvalidFormatError).phoneNumber).toBe(phone);
    }
  });
});
