import styles from "../createCv.module.css";

interface Experience {
  title: string;
  company: string;
  years: number;
}

interface ExperiencesProps {
  experience: Experience[];
  onUpdate: (experience: Experience[]) => void;
}

function Experiences({ experience, onUpdate }: ExperiencesProps) {
  const handleChange = (index: number, field: keyof Experience, value: string | number) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    onUpdate(updatedExperience);
  };

  return (
    <div>
      <h3>Arbeidserfaring</h3>
      {experience.map((exp, index) => (
        <div key={index} className={styles.sectionItem}>
          <label>Stilling:</label>
          <input
            type="text"
            placeholder="Skriv inn stilling"
            value={exp.title}
            onChange={(e) => handleChange(index, "title", e.target.value)}
            className={styles.input}
          />
          <label>Firma:</label>
          <input
            type="text"
            placeholder="Skriv inn firmanavn"
            value={exp.company}
            onChange={(e) => handleChange(index, "company", e.target.value)}
            className={styles.input}
          />
          <label>År:</label>
          <input
            type="number"
            placeholder="Skriv inn år"
            value={exp.years}
            onChange={(e) => handleChange(index, "years", Number(e.target.value))}
            className={styles.input}
          />
          <button
            onClick={() => onUpdate(experience.filter((_, i) => i !== index))}
            className={styles.removeButton}
          >
            Fjern
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          onUpdate([...experience, { title: "", company: "", years: 0 }])
        }
        className={styles.addButton}
      >
        Legg til arbeidserfaring
      </button>
    </div>
  );
}

export default Experiences;
