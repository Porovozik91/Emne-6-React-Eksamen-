import { useState } from "react";
import styles from "../createCv.module.css";
import { Cv } from "../../../../types/cv.types";

interface SkillsProps {
  skills: Cv["skills"]; // Bruker Cv-typen direkte
  onUpdate: (skills: Cv["skills"]) => void;
}

function Skills({ skills, onUpdate }: SkillsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleAddClick = () => setIsAdding(true);

  const handleCancelClick = () => {
    setIsAdding(false);
    setNewSkill("");
  };

  const handleSave = () => {
    if (newSkill.trim()) {
      onUpdate([...skills, newSkill.trim()]);
    }
    handleCancelClick();
  };

  const handleRemove = (index: number) => {
    onUpdate(skills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3>Ferdigheter</h3>
      {skills.map((skill, index) => (
        <div key={index} className={styles.sectionItem}>
          <span>{skill}</span>
          <button onClick={() => handleRemove(index)} className={styles.removeButton}>
            Fjern
          </button>
        </div>
      ))}
      {isAdding ? (
        <div className={styles.sectionItem}>
          <input
            type="text"
            placeholder="Skriv inn ferdighet"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSave} className={styles.saveButton}>
            Lagre
          </button>
          <button onClick={handleCancelClick} className={styles.cancelButton}>
            Avbryt
          </button>
        </div>
      ) : (
        <button onClick={handleAddClick} className={styles.addButton}>
          Legg til ferdighet
        </button>
      )}
    </div>
  );
}

export default Skills;



