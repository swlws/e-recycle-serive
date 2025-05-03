/**
 * 手机号码格式化
 * @param phoneNumber
 * @returns
 */
export function phoneNumberFormatter(phoneNumber: string, encrypt = false) {
  const phoneNumberRegex = /^(\d{3})(\d{4})(\d{4})$/;

  if (encrypt) {
    return phoneNumber.replace(phoneNumberRegex, "$1 **** $3");
  }

  return phoneNumber.replace(phoneNumberRegex, "$1 $2 $3");
}
