import { useState } from "react";
import { PDFViewer, BlobProvider } from "@react-pdf/renderer";
import PdfDocument from "./PdfDocument";
import styles from "./PdfExportModal.module.css";
import { Cv } from "../../../types/cv.types";

type Section = "personalInfo" | "skills" | "education" | "experience" | "references";

interface PdfExportModalProps {
  cv: Cv;
  onClose: () => void;
}

const PdfExportModal: React.FC<PdfExportModalProps> = ({ cv, onClose }) => {
  const [selectedSections, setSelectedSections] = useState<Section[]>([
    "personalInfo",
    "skills",
    "education",
    "experience",
    "references",
  ]);

  const sectionLabels: Record<Section, string> = {
    personalInfo: "Personlig informasjon",
    skills: "Ferdigheter",
    education: "Utdanning",
    experience: "Arbeidserfaring",
    references: "Referanser",
  };

  const handleSectionToggle = (section: Section) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Velg hva som skal inkluderes</h2>
        <div className={styles.checkboxContainer}>
          {Object.entries(sectionLabels).map(([key, label]) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={selectedSections.includes(key as Section)}
                onChange={() => handleSectionToggle(key as Section)}
              />
              {label}
            </label>
          ))}
        </div>

        <div className={styles.pdfViewerContainer}>
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <PdfDocument cv={cv} selectedSections={selectedSections} />
          </PDFViewer>
        </div>

        <div className={styles.buttonContainer}>
          <BlobProvider
            document={<PdfDocument cv={cv} selectedSections={selectedSections} />}
          >
            {({ url, loading }) => (
              <a
                href={url || "#"}
                download={`${cv.title}.pdf`}
                className={styles.downloadButton}
                onClick={(e) => loading && e.preventDefault()}
              >
                {loading ? "Genererer PDF..." : "Last ned PDF"}
              </a>
            )}
          </BlobProvider>
          <button onClick={onClose} className={styles.cancelButton}>
            Lukk
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfExportModal;









