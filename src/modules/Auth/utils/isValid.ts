export const isValid = {
  password: (value: string): boolean => {
    if (value === '') return false;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
  },
  confirm: (value: string, password: string): boolean => {
    return value === password;
  },
  email: (value: string): boolean => {
    if (value === '') return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  mobile: (value: string): boolean => {
    if (value === '') return true;
    const saudiMobileRegex = /^(?:\+966|0)?5\d{8}$/;
    return saudiMobileRegex.test(value);
  },
};
