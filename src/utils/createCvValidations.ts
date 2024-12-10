import { Cv } from "../types/cv.types";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>; 
}

export const validateCv = (cv: Partial<Cv>): ValidationResult => {
  const errors: Record<string, string> = {};

  if (!cv.title || cv.title.trim() === "") {
    errors.title = "CV-tittel er påkrevd.";
  }

  if (!cv.personalInfo?.name || cv.personalInfo.name.trim() === "") {
    errors.personalInfoName = "Navn er påkrevd.";
  }

  if (
    !cv.personalInfo?.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cv.personalInfo.email)
  ) {
    errors.personalInfoEmail = "Ugyldig e-postadresse.";
  }

  if (!cv.personalInfo?.phone || cv.personalInfo.phone <= 0) {
    errors.personalInfoPhone = "Telefonnummer er påkrevd";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

