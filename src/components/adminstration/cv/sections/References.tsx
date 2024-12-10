import styles from "../createCv.module.css";

interface Reference {
  name: string;
  contactInfo: number;
}

interface ReferencesProps {
  references: Reference[];
  onUpdate: (references: Reference[]) => void;
}

function References({ references, onUpdate }: ReferencesProps) {
  const handleChange = (index: number, field: keyof Reference, value: string | number) => {
    const updatedReferences = [...references];
    updatedReferences[index] = { ...updatedReferences[index], [field]: value };
    onUpdate(updatedReferences);
  };

  return (
    <div>
      <h3>Referanser</h3>
      {references.map((ref, index) => (
        <div key={index} className={styles.sectionItem}>
          <label>Navn:</label>
          <input
            type="text"
            placeholder="Skriv inn referansens navn"
            value={ref.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            className={styles.input}
          />
          <label>Kontaktinformasjon:</label>
          <input
            type="number"
            placeholder="Skriv inn kontaktinformasjon"
            value={ref.contactInfo}
            onChange={(e) => handleChange(index, "contactInfo", Number(e.target.value))}
            className={styles.input}
          />
          <button
            onClick={() => onUpdate(references.filter((_, i) => i !== index))}
            className={styles.removeButton}
          >
            Fjern
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          onUpdate([...references, { name: "", contactInfo: 0 }])
        }
        className={styles.addButton}
      >
        Legg til referanse
      </button>
    </div>
  );
}

export default References;
