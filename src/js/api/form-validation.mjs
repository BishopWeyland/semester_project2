export { checkLength, validateEmail };

function checkLength(value, length) {
  if (value.trim().length >= length) {
    return true;
  }
  return false;
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatch = regEx.test(email);
  return patternMatch;
}
