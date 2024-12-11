import styles from "./CvList.module.css";
import { Cv } from "../../../types/cv.types";

interface CvListProps {
  cvs: Cv[];
  role: string;
  getUserNameById: (userId: string) => string; 
}

const CvList = ({ cvs, role, getUserNameById }: CvListProps) => {
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
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CvList;



