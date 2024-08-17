"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhone = formatPhone;
exports.checkOperator = checkOperator;
function formatPhone(phone) {
    const phone_length = phone === null || phone === void 0 ? void 0 : phone.toString().length;
    if (phone_length === 13 && phone.startsWith("+251")) {
        return phone;
    }
    else if (phone_length === 12 && phone.startsWith("251")) {
        return `+${phone}`;
    }
    else if (phone_length === 10 && ["09", "07"].includes(phone.slice(0, 2))) {
        return `+251${phone.slice(1)}`;
    }
    else if (phone_length === 9 && ["9", "7"].includes(phone.charAt(0))) {
        return `+251${phone}`;
    }
    else {
        return "INVALID PHONE NUMBER";
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
