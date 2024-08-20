export function formatPhone(phone: string) {
  const phone_length = phone?.toString().length;
  if (phone_length < 9 || phone_length > 13) {
    return 'INVALID_PHONE_NUMBER'
  }
  else if (phone_length === 13 && phone.startsWith("+251")) {
    return phone;
  } else if (phone_length === 12 && phone.startsWith("251")) {
    return `+${phone}`;
  } else if (phone_length === 10 && ["09", "07"].includes(phone.slice(0, 2))) {
    return `+251${phone.slice(1)}`;
  } else if (phone_length === 9 && ["9", "7"].includes(phone.charAt(0))) {
    return `+251${phone}`;
  } else {
    return "INVALID_PHONE_NUMBER";
  }
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
