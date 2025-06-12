export interface UserPayload {
  _id: string;
  email: string;
  name: string;
  dateOfBirth: string;
  password: string;
  birthDay: number;
  birthMonth: number;
  birthYear: number;
  preferences: string[];
}
