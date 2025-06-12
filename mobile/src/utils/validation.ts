export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true };
};

export const validateName = (name: string): { valid: boolean; message?: string } => {
  if (!name || name.trim().length === 0) {
    return { valid: false, message: 'Name is required' };
  }
  if (name.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters' };
  }
  return { valid: true };
};

export const validateBirthDate = (date: string): { valid: boolean; message?: string } => {
  if (!date) {
    return { valid: false, message: 'Birth date is required' };
  }

  // Basic date format validation (MM/DD/YYYY)
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/;
  if (!dateRegex.test(date)) {
    return { valid: false, message: 'Please enter a valid date in MM/DD/YYYY format' };
  }

  // Additional validation for realistic dates
  const [month, day, year] = date.split('/').map(Number);
  const enteredDate = new Date(year, month - 1, day);
  const currentDate = new Date();

  // Check if the date is valid (e.g., not Feb 30)
  if (
    enteredDate.getFullYear() !== year ||
    enteredDate.getMonth() !== month - 1 ||
    enteredDate.getDate() !== day
  ) {
    return { valid: false, message: 'Please enter a valid date' };
  }

  // Check if birth date is in the future
  if (enteredDate > currentDate) {
    return { valid: false, message: 'Birth date cannot be in the future' };
  }

  // Check if user is at least 13 years old
  const minBirthDate = new Date();
  minBirthDate.setFullYear(minBirthDate.getFullYear() - 13);
  if (enteredDate > minBirthDate) {
    return { valid: false, message: 'You must be at least 13 years old' };
  }

  return { valid: true };
};

export const validateForm = (
  formData: Record<string, string>
): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.password) {
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      errors.password = passwordValidation.message || 'Invalid password';
    }
  }

  if (formData.name) {
    const nameValidation = validateName(formData.name);
    if (!nameValidation.valid) {
      errors.name = nameValidation.message || 'Invalid name';
    }
  }

  if (formData.birthDate) {
    const birthDateValidation = validateBirthDate(formData.birthDate);
    if (!birthDateValidation.valid) {
      errors.birthDate = birthDateValidation.message || 'Invalid birth date';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};