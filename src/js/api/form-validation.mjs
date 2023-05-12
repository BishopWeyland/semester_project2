export { checkLength, validateEmail };

function checkLength(value, length) {
  if (value.trim().length >= length) {
    return true;
  }
  return false;
}

function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9._%+-]+@(noroff\.no|stud\.noroff\.no)$/;
  const patternMatch = regEx.test(email);
  return patternMatch;
}
