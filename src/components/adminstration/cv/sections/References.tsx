import { useState } from "react";
import styles from "../create/createCv.module.css";
import { Cv } from "../../../../types/cv.types";

interface ReferencesProps {
  references: Cv["references"]; // Bruker Cv-typen direkte
  onUpdate: (references: Cv["references"]) => void;
}

function References({ references, onUpdate }: ReferencesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newReference, setNewReference] = useState<Cv["references"][number]>({
    name: "",
    contactInfo: 0,
  });

  const handleAddClick = () => setIsAdding(true);

  const handleCancelClick = () => {
    setIsAdding(false);
    setNewReference({ name: "", contactInfo: 0 });
  };

  const handleSave = () => {
    if (newReference.name.trim()) {
      onUpdate([...references, newReference]);
    }
    handleCancelClick();
  };

  const handleRemove = (index: number) => {
    onUpdate(references.filter((_, i) => i !== index));
  };

  const handleChange = (field: keyof Cv["references"][number], value: string | number) => {
    setNewReference((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <h3>Referanser</h3>
      {references.map((ref, index) => (
        <div key={index} className={styles.sectionItem}>
          <label>Navn:</label>
          <p>{ref.name}</p>
          <label>Kontaktinformasjon:</label>
          <p>{ref.contactInfo}</p>
          <button onClick={() => handleRemove(index)} className={styles.removeButton}>
            Fjern
          </button>
        </div>
      ))}
      {isAdding ? (
        <div className={styles.sectionItem}>
          <input
            type="text"
            placeholder="Skriv inn navn"
            value={newReference.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Skriv inn kontaktinformasjon"
            value={newReference.contactInfo}
            onChange={(e) => handleChange("contactInfo", Number(e.target.value))}
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
          Legg til referanse
        </button>
      )}
    </div>
  );
}

export default References;

