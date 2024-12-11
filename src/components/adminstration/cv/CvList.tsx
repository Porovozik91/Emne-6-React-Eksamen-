import styles from "./CvList.module.css";
import { Cv } from "../../../types/cv.types";

interface CvList {
  cvs: Cv[];
  role: string;
  getUserNameById: (userId: string) => string; 
  onEdit: (cv: Cv) => void;
  onDelete: (cvId: string) => void;
  onExport: (cv: Cv) => void;
}

const CvList = ({ cvs, role, getUserNameById, onEdit, onDelete, onExport }: CvList) => {
  const groupCvsByOwner = (cvs: Cv[]) => 
    cvs.reduce((grouped: Record<string, Cv[]>, cv) => {
      if (cv.userid) {
        grouped[cv.userid] = grouped[cv.userid] || [];
        grouped[cv.userid].push(cv);
      }
      return grouped;
    }, {});

  const groupedCvs = role === "admin" ? groupCvsByOwner(cvs) : { self: cvs };

  return (
    <div>
      {Object.entries(groupedCvs).map(([ownerId, ownerCvs]) => (
        <div key={ownerId} className={styles.ownerSection}>
          {role === "admin" && <h3>Eier: {getUserNameById(ownerId)}</h3>} 
          <ul className={styles.cvList}>
            {ownerCvs.map((cv) => (
              <li key={cv._uuid} className={styles.cvItem}>
                <h4>{cv.title}</h4>
                <button onClick={() => onEdit(cv)} className={styles.editButton}>
                  Rediger
                </button>
                <button onClick={() => onExport(cv)} className={styles.exportButton}>
                  Vis CV
                </button>
                <button onClick={() => onDelete(cv._uuid)} className={styles.deleteButton}>
                  Slett
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CvList;

