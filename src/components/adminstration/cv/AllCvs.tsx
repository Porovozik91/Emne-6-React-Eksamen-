import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  useLazyGetAllCvsQuery
} from "../../../services/cvApi";
import { useLazyGetUsersQuery } from "../../../services/userApi";
import CvList from "./CvList";
import styles from "./AllCvs.module.css";
import { User } from "../../../types/user.types";

const AllCvs = () => {
  const role = useSelector((state: RootState) => state.user.role);
  const userid = useSelector((state: RootState) => state.user._uuid);
  const [triggerGetAllCvs, { data: allCvs = [], isLoading }] = useLazyGetAllCvsQuery();
  const [triggerGetUsers, { data: users = [] }] = useLazyGetUsersQuery();
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
      />
    </div>
  );
};

export default AllCvs;


