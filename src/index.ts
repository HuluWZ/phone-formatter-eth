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

export function formatLocal(phone: string) {
  return phone?.replace("+251", "0");
}

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

export function isValid(phone: string) {
  const formattedPhone = formatPhone(phone);
  return formattedPhone === "INVALID_PHONE_NUMBER" ? false : true;
}
