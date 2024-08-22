"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhone = formatPhone;
exports.checkOperator = checkOperator;
exports.isValid = isValid;
function formatPhone(phone) {
    const formatted_phone = phone.replace(/[^+\d]/g, "");
    const phone_length = formatted_phone === null || formatted_phone === void 0 ? void 0 : formatted_phone.toString().length;
    if (phone_length < 9 || phone_length > 13) {
        return 'INVALID_PHONE_NUMBER';
    }
    else if (phone_length === 13 && formatted_phone.startsWith("+251")) {
        return formatted_phone;
    }
    else if (phone_length === 12 && formatted_phone.startsWith("251")) {
        return `+${formatted_phone}`;
    }
    else if (phone_length === 10 &&
        ["09", "07"].includes(formatted_phone.slice(0, 2))) {
        return `+251${formatted_phone.slice(1)}`;
    }
    else if (phone_length === 9 &&
        ["9", "7"].includes(formatted_phone.charAt(0))) {
        return `+251${formatted_phone}`;
    }
    else {
        return "INVALID_PHONE_NUMBER";
    }
}
function checkOperator(phone) {
    const formattedPhone = formatPhone(phone);
    if (formattedPhone.startsWith("+2519")) {
        return "Ethio Telecom";
    }
    else if (formattedPhone.startsWith("+2517")) {
        return "Safaricom";
    }
    else {
        return "UNKNOWN";
    }
}
function isValid(phone) {
    const formattedPhone = formatPhone(phone);
    return formattedPhone === "INVALID_PHONE_NUMBER" ? false : true;
}
