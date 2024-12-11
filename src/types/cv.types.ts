export interface Cv {
     _uuid: string;
     userid?: string;
     title: string; 
    personalInfo: {
      name: string; 
      email: string; 
      phone: number; 
    };
    skills: string[]; 
    education: {
      institution: string; 
      degree: string; 
      year: number; 
    }[];
    experience: {
      title: string; 
      company: string; 
      years: number; 
    }[];
    references: {
      name: string; 
      contactInfo: number; 
    }[];
  }
  
  export interface List {
    cvs: Cv[];
    role: string | null;
    getUserNameById: (userId: string) => string;
    onEdit: (cv: Cv) => void;
    onDelete: (cvId: string) => void;
    onExport: (cv: Cv) => void;
  }

export interface CvModalEdit {
    cv: Cv;
    onClose: () => void;
    onUpdate: (cv: Cv) => void;
  }

export interface Pdf {
  cv: Cv;
  onClose: () => void;
}

export type Section = "personalInfo" | "skills" | "education" | "experience" | "references";

export interface DocumentPdf {
  cv: Cv;
  selectedSections: string[];
}