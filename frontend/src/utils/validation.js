
export const isValidEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  const lengthCheck = password.length >= 8 && password.length <= 16;
  const numberCheck = /[0-9]/.test(password);
  const letterCheck = /[A-Za-z]/.test(password);
  const specialCharCheck = /[^A-Za-z0-9]/.test(password);
  
  return lengthCheck && numberCheck && letterCheck && specialCharCheck;
};