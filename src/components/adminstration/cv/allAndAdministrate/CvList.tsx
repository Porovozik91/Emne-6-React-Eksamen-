import { useState } from "react";
import styles from "./cvList.module.css";
import { Cv, List } from "../../../../types/cv.types";


const CvList = ({ cvs, role, getUserNameById, onEdit, onDelete, onExport }: List) => {
  const [selectedCvId, setSelectedCvId] = useState<string | null>(null);

  const groupedCvsByOwner = (cvs: Cv[]) =>
    cvs.reduce((grouped: Record<string, Cv[]>, cv) => {
      if (cv.userid) {
        grouped[cv.userid] = grouped[cv.userid] || [];
        grouped[cv.userid].push(cv);
      }
      return grouped;
    }, {});

  const groupedCvs = role === "admin" ? groupedCvsByOwner(cvs) : { self: cvs };

  const handleSelectCv = (cvId: string) => {
    setSelectedCvId((prev) => (prev === cvId ? null : cvId)); 
  };

  return (
    <section>
      {Object.entries(groupedCvs).map(([cvOwnerId, CvsOwner]) => (
        <div key={cvOwnerId} className={styles.ownerSection}>
          {role === "admin" && <h3>CV Eier: {getUserNameById(cvOwnerId)}</h3>}
          <ul className={styles.cvList}>
          <label>Cv Tittel:</label>
            {CvsOwner.map((cv) => (
              <li
                key={cv._uuid}
                className={`${styles.cvItem} ${
                  selectedCvId === cv._uuid ? styles.selected : ""
                }`}
                onClick={() => handleSelectCv(cv._uuid)}
              >
                <h4>{cv.title}</h4>
                {selectedCvId === cv._uuid && (
                  <div className={styles.actions}>
                    <button
                      onClick={() => onEdit(cv)}
                      className={styles.editButton}
                    >
                      Rediger
                    </button>
                    <button
                      onClick={() => onExport(cv)}
                      className={styles.exportButton}
                    >
                      Vis CV
                    </button>
                    <button
                      onClick={() => onDelete(cv._uuid)}
                      className={styles.deleteButton}
                    >
                      Slett
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default CvList;



