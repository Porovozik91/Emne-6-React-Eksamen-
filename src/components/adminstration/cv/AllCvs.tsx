import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  useLazyGetAllCvsQuery,
  useUpdateCvMutation,
  useDeleteCvMutation,
} from "../../../services/cvApi";
import { useLazyGetUsersQuery } from "../../../services/userApi";
import CvList from "./CvList";
import EditCvModal from "./EditCvModal";
import PdfExportModal from "./PdfExportModal";
import styles from "./AllCvs.module.css";
import { Cv } from "../../../types/cv.types";
import { User } from "../../../types/user.types";

const AllCvs = () => {
  const role = useSelector((state: RootState) => state.user.role);
  const userid = useSelector((state: RootState) => state.user._uuid);
  const [triggerGetAllCvs, { data: allCvs = [], isLoading }] = useLazyGetAllCvsQuery();
  const [triggerGetUsers, { data: users = [] }] = useLazyGetUsersQuery();
  const [updateCv] = useUpdateCvMutation();
  const [deleteCv] = useDeleteCvMutation();
  const [selectedCv, setSelectedCv] = useState<Cv | null>(null);
  const [pdfCv, setPdfCv] = useState<Cv | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Hent CV-er og brukere ved første render
  if (!allCvs.length && !isLoading) {
    triggerGetAllCvs();
    triggerGetUsers(); // Henter brukere
  }

  // Filtrerer CV-er basert på rolle og søkeord
  const filteredCvs = allCvs.filter((cv) => {
    const searchMatches =
      cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.personalInfo.name.toLowerCase().includes(searchTerm.toLowerCase());

    return role === "admin"
      ? searchMatches
      : cv.userid === userid && searchMatches;
  });

  // Oppdaterer søkefeltet
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    triggerGetAllCvs();
  };

  // Finner brukernavn basert på `userid`
  const getUserNameById = (userId: string) => {
    const user = users.find((user: User) => user._uuid === userId);
    return user?.name || "Ukjent bruker";
  };

  // Håndterer sletting av en CV
  const handleDelete = async (cvId: string) => {
    try {
      await deleteCv(cvId).unwrap();
      alert("CV slettet!");
    } catch (error) {
      console.error("Kunne ikke slette CV:", error);
      alert("Kunne ikke slette CV. Prøv igjen.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Alle CV-er</h2>
      <input
        type="text"
        placeholder={
          role === "admin"
            ? "Søk etter navn eller CV-tittel"
            : "Søk etter CV-tittel"
        }
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {isLoading && <p>Laster CV-er...</p>}
      <CvList
        cvs={filteredCvs}
        role={role}
        getUserNameById={getUserNameById} // Sender funksjonen til CvList
        onEdit={setSelectedCv}
        onDelete={handleDelete}
        onExport={setPdfCv}
      />
      {selectedCv && (
        <EditCvModal
          cv={selectedCv}
          onClose={() => setSelectedCv(null)}
          onUpdate={async (updatedCv) => {
            await updateCv(updatedCv).unwrap();
            alert("CV oppdatert!");
            setSelectedCv(null);
          }}
        />
      )}
      {pdfCv && <PdfExportModal cv={pdfCv} onClose={() => setPdfCv(null)} />}
    </div>
  );
};

export default AllCvs;

