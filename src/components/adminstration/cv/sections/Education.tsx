import { useState } from "react";
import styles from "../create/createCv.module.css";
import { Cv } from "../../../../types/cv.types";

interface EducationProps {
  education: Cv["education"];
  onUpdate: (education: Cv["education"]) => void;
}

function Education({ education, onUpdate }: EducationProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState<Cv["education"][number]>({
    institution: "",
    degree: "",
    startYear: 0,
    endYear: 0,
  });

  const handleAddClick = () => setIsAdding(true);

  const handleCancelClick = () => {
    setIsAdding(false);
    setNewEducation({ institution: "", degree: "", startYear: 0, endYear: 0 });
  };

  const handleSave = () => {
    if (
      newEducation.institution.trim() &&
      newEducation.degree.trim() &&
      newEducation.startYear > 0 &&
      newEducation.endYear >= newEducation.startYear
    ) {
      onUpdate([...education, newEducation]);
    }
    handleCancelClick();
  };

  const handleRemove = (index: number) => {
    onUpdate(education.filter((_, i) => i !== index));
  };

  const handleChange = (
    field: keyof Cv["education"][number],
    value: string | number
  ) => {
    setNewEducation((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h3>Utdanning</h3>
      {education.map((edu, index) => (
        <div key={index} className={styles.sectionItem}>
          <label>Institusjon:</label>
          <p>{edu.institution}</p>
          <label>Karakter:</label>
          <p>{edu.degree}</p>
          <label>Fra år:</label>
          <p>{edu.startYear}</p>
          <label>Til år:</label>
          <p>{edu.endYear}</p>
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
            placeholder="Skriv inn institusjon"
            value={newEducation.institution}
            onChange={(e) => handleChange("institution", e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Skriv inn karakter"
            value={newEducation.degree}
            onChange={(e) => handleChange("degree", e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Fra år"
            value={newEducation.startYear}
            onChange={(e) => handleChange("startYear", Number(e.target.value))}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Til år"
            value={newEducation.endYear}
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
          Legg til utdanning
        </button>
      )}
    </div>
  );
}

export default Education;






