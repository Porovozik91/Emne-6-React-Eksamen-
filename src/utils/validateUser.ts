export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
  }
  
  export interface User {
    name: string;
    email: string;
    password: string;
  }
  
  export const validateUser = (user: Partial<User>): ValidationResult => {
    const errors: Record<string, string> = {};
  
    if (!user.name || user.name.trim() === "") {
      errors.name = "Brukernavn er påkrevd.";
    }
  
    if (
      !user.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)
    ) {
      errors.email = "Ugyldig e-postadresse.";
    }
  
    if (!user.password || user.password.trim().length < 4) {
      errors.password = "Passordet må være minst 4 tegn.";
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };
  