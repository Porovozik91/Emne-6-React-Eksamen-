import React from "react";
import styles from "../CreateCv.module.css";

interface SkillsSectionProps {
  skills: string[];
  onUpdate: (skills: string[]) => void;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onUpdate }) => {
  const handleChange = (index: number, value: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    onUpdate(updatedSkills);
  };

  return (
    <div>
      <h3>Ferdigheter</h3>
      {skills.map((skill, index) => (
        <div key={index} className={styles.sectionItem}>
          <input
            type="text"
            placeholder="Skriv inn ferdighet"
            value={skill}
            onChange={(e) => handleChange(index, e.target.value)}
            className={styles.input}
          />
          <button
            onClick={() => onUpdate(skills.filter((_, i) => i !== index))}
            className={styles.removeButton}
          >
            Fjern
          </button>
        </div>
      ))}
      <button onClick={() => onUpdate([...skills, ""])} className={styles.addButton}>
        Legg til ferdighet
      </button>
    </div>
  );
};

export default SkillsSection;
