import { useState } from "react";
import styles from "../create/createCv.module.css";
import { Cv } from "../../../../types/cv.types";

interface ExperienceProps {
  experience: Cv["experience"];
  onUpdate: (experience: Cv["experience"]) => void;
}

function Experience({ experience, onUpdate }: ExperienceProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState<Cv["experience"][number]>({
    title: "",
    company: "",
    startYear: 0,
    endYear: 0,
  });

  const handleAddClick = () => setIsAdding(true);

  const handleCancelClick = () => {
    setIsAdding(false);
    setNewExperience({ title: "", company: "", startYear: 0, endYear: 0 });
  };

  const handleSave = () => {
    if (
      newExperience.title.trim() &&
      newExperience.company.trim() &&
      newExperience.startYear > 0 &&
      newExperience.endYear >= newExperience.startYear
    ) {
      onUpdate([...experience, newExperience]);
    }
    handleCancelClick();
  };

  const handleRemove = (index: number) => {
    onUpdate(experience.filter((_, i) => i !== index));
  };

  const handleChange = (
    field: keyof Cv["experience"][number],
    value: string | number
  ) => {
    setNewExperience((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h3>Arbeidserfaring</h3>
      {experience.map((exp, index) => (
        <div key={index} className={styles.sectionItem}>
          <label>Stilling:</label>
          <p>{exp.title}</p>
          <label>Arbeidsgiver:</label>
          <p>{exp.company}</p>
          <label>Fra år:</label>
          <p>{exp.startYear}</p>
          <label>Til år:</label>
          <p>{exp.endYear}</p>
          <button
            onClick={() => handleRemove(index)}
            className={styles.removeButton}
          >
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
            placeholder="Skriv inn bedriftsnavn"
            value={newExperience.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Fra år"
            value={newExperience.startYear}
            onChange={(e) => handleChange("startYear", Number(e.target.value))}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Til år"
            value={newExperience.endYear}
            onChange={(e) => handleChange("endYear", Number(e.target.value))}
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


