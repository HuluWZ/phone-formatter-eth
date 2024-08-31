/**
 *
 * @param phone - phone number to be formatted
 * @param type -  local or international  by default it is international
 * @returns formatted phone number it it's valid otherwise it returns "INVALID_PHONE_NUMBER"
 */
export function formatPhone(
  phone: string,
  type: "local" | "international" = "international"
) {
  const formatted_phone = phone.replace(/[^+\d]/g, "");
  const phone_length = formatted_phone?.toString().length;
  if (phone_length < 9 || phone_length > 13) {
    return "INVALID_PHONE_NUMBER";
  } else if (phone_length === 13 && formatted_phone.startsWith("+251")) {
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
      ? formatLocal(`+251${formatted_phone.slice(1)}`)
      : `+251${formatted_phone.slice(1)}`;
  } else if (
    phone_length === 9 &&
    ["9", "7"].includes(formatted_phone.charAt(0))
  ) {
    return type === "local"
      ? formatLocal(`+251${formatted_phone}`)
      : `+251${formatted_phone}`;
  } else {
    return "INVALID_PHONE_NUMBER";
  }
}
/**
 *
 * @param phone - phone number to be formatted
 * @returns phone number formatted to local format like 09 or 07
 */
export function formatLocal(phone: string) {
  return phone?.replace("+251", "0");
}

/**
 *
 * @param phone - phone number to check the operator
 * @returns 'Safaricom' or 'Ethio Telecom' if it's valid otherwise it returns "UNKNOWN"
 */
export function checkOperator(phone: string) {
  const formattedPhone = formatPhone(phone);
  if (formattedPhone.startsWith("+2519")) {
    return "Ethio Telecom";
  } else if (formattedPhone.startsWith("+2517")) {
    return "Safaricom";
  } else {
    return "UNKNOWN";
  }
}
/**
 *
 * @param phone - phone number to check if it's valid
 * @returns true if it's valid otherwise it returns false
 */
export function isValid(phone: string) {
  const formattedPhone = formatPhone(phone);
  return formattedPhone === "INVALID_PHONE_NUMBER" ? false : true;
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
