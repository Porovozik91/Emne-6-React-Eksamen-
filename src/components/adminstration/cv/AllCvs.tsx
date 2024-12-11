import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  useLazyGetAllCvsQuery,
  useUpdateCvMutation,
  useDeleteCvMutation,
} from "../cvApi";
import { useLazyGetUsersQuery } from "../../../services/userApi";
import CvList from "./CvList";
import EditCvModal from "./EditCvModal";
import PdfManager from "./PdfManager";
import styles from "./AllCvs.module.css";
import { Cv } from "../../../types/cv.types";
import { User } from "../../../types/user.types";
import { CreateCvModal } from "../ManagerModal";

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
  const [isCreateCvModalOpen, setIsCreateCvModalOpen] = useState<boolean>(false);

  
  useEffect(() => {
    if (!allCvs.length && !isLoading) {
      triggerGetAllCvs(); 
      triggerGetUsers(); 
    }
  }, [allCvs.length, isLoading, triggerGetAllCvs, triggerGetUsers]);

  
  const filteredCvs = allCvs.filter((cv) => {
    const searchMatches =
      cv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cv.personalInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
  
    const ownerNameMatches = role === "admin" && users.some((user) => {
      return user._uuid === cv.userid && user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  
    return role === "admin"
      ? searchMatches || ownerNameMatches
      : cv.userid === userid && searchMatches;
  });

 
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

 
  const getUserNameById = (userId: string) => {
    const user = users.find((user: User) => user._uuid === userId);
    return user?.name || "Ukjent bruker";
  };

 
  const handleDelete = async (cvId: string) => {
    try {
      await deleteCv(cvId).unwrap();
    } catch (error) {
      console.error("Kunne ikke slette CV:", error);
      alert("Kunne ikke slette CV. Prøv igjen.");
    }
  };

  const handleOpenCreateCvModal = () => {
    setIsCreateCvModalOpen(true);
  };

  const handleCloseCreateCvModal = () => {
    setIsCreateCvModalOpen(false);
  };

  return (
    <section className={styles.container}>
      <h2>Alle CV-er</h2>
      <div>
      {isCreateCvModalOpen && (
        <CreateCvModal onClose={handleCloseCreateCvModal} />
      )}
     <button 
     onClick={handleOpenCreateCvModal}
     className={styles.createButton}
     >
       Opprett Cv
       </button>           
     </div>
      <label>Søk:</label>
      <input
        type="text"
        placeholder={
          role === "admin"
            ? "Brukernavn eller CV-tittel"
            : "CV-tittel"
        }
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      {isLoading && <p>Laster CV-er...</p>}
      <CvList
        cvs={filteredCvs}
        role={role}
        getUserNameById={getUserNameById}
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
            setSelectedCv(null);
          }}
        />
      )}
      {pdfCv && <PdfManager cv={pdfCv} onClose={() => setPdfCv(null)} />}
    </section>
  );
};

export default AllCvs;


