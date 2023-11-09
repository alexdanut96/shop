const ValidatePhoneNumber = (value) => {
  const phoneNumberPattern =
    /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm;
  const phoneNumber = value.split(" ").join("");
  return phoneNumberPattern.test(phoneNumber);
};

const ValidateEmail = (value, callback) => {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailPattern.test(value);
};

const ValidateEmptyValue = (value) => {
  if (value.trim()) {
    return true;
  } else {
    return false;
  }
};

const ValidatePassword = (value) => {
  const passwordPattern =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  return passwordPattern.test(value);
};

const ValidateLength = (value, length) => {
  if (value.trim().length < length) {
    return false;
  } else {
    return true;
  }
};

export {
  ValidatePhoneNumber,
  ValidateEmail,
  ValidateEmptyValue,
  ValidatePassword,
  ValidateLength,
};
