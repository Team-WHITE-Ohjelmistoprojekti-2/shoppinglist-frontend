export const usernameInvalidMessage = "Username must be between 2-20 characters";
export const passwordInvalidMessage =
  "Password must contain at least 6 characters, one number, and one uppercase letter between A-Z";
const passwordRegexpPattern = /(?=.*\d)(?=.*[A-Z])/;

/**
 * Checks if ussername is valid.
 * 
 * @param string username
 * @returns True if username is valid.
 *
 */
export const validateUsername = (username = "") => {
  if (username.trim() === "" || username.length < 2 || username.length > 20)
    return false;

  return true;
};

/**
 * Checks if password is valid.
 * 
 * @param string password
 * @returns True if password is valid.
 *
 */
export const validatePassword = (password = "") => {
  if (
    password.trim() === "" ||
    password.length < 6 ||
    !passwordRegexpPattern.test(password)
  )
    return false;

  return true;
};
