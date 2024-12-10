import styles from "../createCv.module.css";

interface Education {
  institution: string;
  degree: string;
  year: number;
}

interface EducationsProps {
  education: Education[];
  onUpdate: (education: Education[]) => void;
}

function Educations({ education, onUpdate }: EducationsProps) {
  const handleChange = (index: number, field: keyof Education, value: string | number) => {
    const updatedEducation = [...education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    onUpdate(updatedEducation);
  };

  return (
    <div>
      <h3>Utdanning</h3>
      {education.map((edu, index) => (
        <div key={index} className={styles.sectionItem}>
          <label>Institusjon:</label>
          <input
            type="text"
            placeholder="Skriv inn institusjon"
            value={edu.institution}
            onChange={(e) => handleChange(index, "institution", e.target.value)}
            className={styles.input}
          />
          <label>Grad:</label>
          <input
            type="text"
            placeholder="Skriv inn grad"
            value={edu.degree}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
            className={styles.input}
          />
          <label>År:</label>
          <input
            type="number"
            placeholder="Skriv inn år"
            value={edu.year}
            onChange={(e) => handleChange(index, "year", Number(e.target.value))}
            className={styles.input}
          />
          <button
            onClick={() => onUpdate(education.filter((_, i) => i !== index))}
            className={styles.removeButton}
          >
            Fjern
          </button>
        </div>
      ))}
      <button
        onClick={() => onUpdate([...education, { institution: "", degree: "", year: 0 }])}
        className={styles.addButton}
      >
        Legg til utdanning
      </button>
    </div>
  );
}

export default Educations;
