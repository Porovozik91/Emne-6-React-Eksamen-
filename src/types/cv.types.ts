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
  
  
  

  