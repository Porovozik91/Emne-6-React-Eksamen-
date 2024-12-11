import { useState } from "react";
import styles from "../createCv.module.css";
import { Cv } from "../../../../types/cv.types";

interface ExperienceProps {
  experience: Cv["experience"]; // Bruker Cv-typen direkte
  onUpdate: (experience: Cv["experience"]) => void;
}

function Experience({ experience, onUpdate }: ExperienceProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState<Cv["experience"][number]>({
    title: "",
    company: "",
    years: 0,
  });

  const handleAddClick = () => setIsAdding(true);

  const handleCancelClick = () => {
    setIsAdding(false);
    setNewExperience({ title: "", company: "", years: 0 });
  };

  const handleSave = () => {
    if (newExperience.title.trim() && newExperience.company.trim()) {
      onUpdate([...experience, newExperience]);
    }
    handleCancelClick();
  };

  const handleRemove = (index: number) => {
    onUpdate(experience.filter((_, i) => i !== index));
  };

  const handleChange = (field: keyof Cv["experience"][number], value: string | number) => {
    setNewExperience((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h3>Arbeidserfaring</h3>
      {experience.map((exp, index) => (
        <div key={index} className={styles.sectionItem}>
          <label>Stilling:</label>
          <p>{exp.title}</p>
          <label>Firma:</label>
          <p>{exp.company}</p>
          <label>År:</label>
          <p>{exp.years}</p>
          <button onClick={() => handleRemove(index)} className={styles.removeButton}>
            Fjern
          </button>
        </div>
      ))}
      {isAdding ? (
        <div className={styles.sectionItem}>
          <input
            type="text"
            placeholder="Skriv inn stilling"
            value={newExperience.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Skriv inn firma"
            value={newExperience.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Skriv inn år"
            value={newExperience.years}
            onChange={(e) => handleChange("years", Number(e.target.value))}
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
          Legg til arbeidserfaring
        </button>
      )}
    </div>
  );
}

export default Experience;

