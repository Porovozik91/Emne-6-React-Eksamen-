import { useState } from "react";
import styles from "./EditCvModal.module.css";
import Skills from "./sections/Skills";
import Educations from "./sections/Education";
import Experiences from "./sections/Experience";
import References from "./sections/References";
import { Cv } from "../../../types/cv.types";

interface EditCvModalProps {
  cv: Cv;
  onClose: () => void;
  onUpdate: (cv: Cv) => void;
}

const EditCvModal = ({ cv, onClose, onUpdate }: EditCvModalProps) => {
  const [editedCv, setEditedCv] = useState<Cv>(cv);

  const updateSection = <K extends keyof Omit<Cv, "_uuid">>(
    section: K,
    data: Cv[K]
  ) => {
    setEditedCv((prev) => ({ ...prev, [section]: data }));
  };

  const handleSave = () => {
    onUpdate(editedCv);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Rediger CV</h2>
        <label>CV Tittel:</label>
        <input
          type="text"
          value={editedCv.title}
          onChange={(e) => setEditedCv({ ...editedCv, title: e.target.value })}
          className={styles.input}
        />
        <h3>Personlig Informasjon</h3>
        <label>Navn:</label>
        <input
          type="text"
          value={editedCv.personalInfo.name}
          onChange={(e) =>
            setEditedCv({
              ...editedCv,
              personalInfo: { ...editedCv.personalInfo, name: e.target.value },
            })
          }
          className={styles.input}
        />
        <label>E-post:</label>
        <input
          type="email"
          value={editedCv.personalInfo.email}
          onChange={(e) =>
            setEditedCv({
              ...editedCv,
              personalInfo: { ...editedCv.personalInfo, email: e.target.value },
            })
          }
          className={styles.input}
        />
        <label>Telefonnummer:</label>
        <input
          type="number"
          value={editedCv.personalInfo.phone}
          onChange={(e) =>
            setEditedCv({
              ...editedCv,
              personalInfo: {
                ...editedCv.personalInfo,
                phone: Number(e.target.value),
              },
            })
          }
          className={styles.input}
        />
        <Skills
          skills={editedCv.skills}
          onUpdate={(skills) => updateSection("skills", skills)}
        />
        <Educations
          education={editedCv.education}
          onUpdate={(education) => updateSection("education", education)}
        />
        <Experiences
          experience={editedCv.experience}
          onUpdate={(experience) => updateSection("experience", experience)}
        />
        <References
          references={editedCv.references}
          onUpdate={(references) => updateSection("references", references)}
        />
        <div className={styles.actions}>
          <button onClick={handleSave} className={styles.saveButton}>
            Lagre
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            Avbryt
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCvModal;
