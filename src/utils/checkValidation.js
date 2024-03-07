export const isValidEmail = email => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
  }
  
  export const isValidPassword = password => {
    if(
      checkLengthValidation(password, 8, 64) &&
      isContainUpperCase(password) &&
      isContainLowerCase(password) &&
      isContainNumber(password) &&
      isContainSpecialCharacter(password)
    ) return true;
    return false;
  }
  
  export const checkLengthValidation = (string, min, max) => {
    if(string.length < min || string.length > max) return false;
    return true;
  }
  
  export const isContainUpperCase = (str) => {
    return (/[A-Z]/.test(str));
  }
  
  export const isContainLowerCase = str => {
    return (/[a-z]/.test(str));
  }
  
  export const isContainNumber = str => {
    return (/\d/.test(str));
  }
  
  export const isContainSpecialCharacter = str => {
    let specialChars =/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    return specialChars.test(str);
  }

  export const isCompletedProfile = userData => {
    return !(userData && (!userData.avatar || !userData.first_name || !userData.last_name || !userData.username));
  }