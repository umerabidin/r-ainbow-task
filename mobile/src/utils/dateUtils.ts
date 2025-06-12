export const isBirthdayWeek = (birthday: string): boolean => {
  const today = new Date();
  const birthDate = new Date(birthday);
  
  // Set both dates to the same year for comparison
  birthDate.setFullYear(today.getFullYear());
  
  // Calculate the difference in days
  const diffInDays = Math.floor((birthDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Check if within 7 days before or after birthday
  return diffInDays >= -7 && diffInDays <= 7;
};

export const formatBirthday = (dateString: string): string => {
  const options: { year: 'numeric'; month: 'long'; day: 'numeric' } = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};