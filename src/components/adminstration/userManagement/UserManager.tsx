import { useState } from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../../services/userApi";
import styles from "./userManager.module.css";
import { User } from "../../../types/user.types";
import hashPassword from "../../../utils/hashPassword";
import { validateUser } from "../../../utils/validateUser";
import { UserCreatorModal } from "../ManagerModal";
import { existingUsersCheck } from "../../../utils/exsistingUsersCheck";

const UserManager = () => {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);
  const [isUserCreatorModalOpen, setIsUserCreatorModalOpen] = useState<boolean>(false);


  const handleInputChange = (key: keyof User, value: string) => {
    if (selectedUser) setSelectedUser({ ...selectedUser, [key]: value });
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    const validationResult = validateUser(selectedUser);
  const { exists, fields } = existingUsersCheck(
    users.filter((user) => user._uuid !== selectedUser._uuid),
    selectedUser.name,
    selectedUser.email
  );

  if (exists) {
    validationResult.isValid = false;
    validationResult.errors.existingUser = `Brukeren med ${fields.join(
      " og "
    )} finnes allerede.`;
  }

  if (!validationResult.isValid) {
    setValidationErrors(validationResult.errors);
    setMessage("Validering feilet. Rett opp feltene nedenfor.");
    return;
  }

    const { _uuid, ...updatedData } = selectedUser;
    if (updatedData.password) {
      try {
        updatedData.password = await hashPassword(updatedData.password);
      } catch {
        alert("Kunne ikke kryptere passord. Prøv igjen.");
        return;
      }
    }

    try {
      await updateUser({ _uuid, ...updatedData }).unwrap();
      setIsEditModalOpen(false);
      setMessage("Bruker oppdatert!");
      setValidationErrors({});
    } catch {
      alert("Kunne ikke oppdatere brukeren. Prøv igjen.");
    }
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      setSelectedUser(null);
      setMessage("Bruker slettet!");
    } catch {
      alert("Kunne ikke slette brukeren. Prøv igjen.");
    }
  };

  const filteredUsers = users.filter((user: User) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderValidationSummary = () => {
    const errorMessages = Object.values(validationErrors).filter(Boolean);
    if (!errorMessages.length) return null;

    return (
      <div className={styles.validationSummary}>
        <h4>Utfyll eller korriger:</h4>
        <ul>
          {errorMessages.map((error, index) => (
            <li key={index} className={styles.error}>
              {error}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const handleOpenUserCreatorModal = () => {
    setIsUserCreatorModalOpen(true);
  };

  const handleCloseUserCreatorModal = () => {
    setIsUserCreatorModalOpen(false);
  };


  const renderInput = (label: string, type: string, value: string, key: keyof User) => (
    <>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => handleInputChange(key, e.target.value)}
        className={styles.input}
      />
    </>
  );

  if (isLoading) return <p>Laster brukere...</p>;
  if (isError) return <p>Kunne ikke laste brukere. Prøv igjen senere.</p>;

  return (
    <section className={styles.userContainer}>
      <header>
        <h2>Brukeradministrasjon</h2>
     
      {message && <p className={styles.message}>{message}</p>}
      <div>
      {isUserCreatorModalOpen && (
        <UserCreatorModal onClose={handleCloseUserCreatorModal} />
      )}
     <button 
     onClick={handleOpenUserCreatorModal}
     className={styles.createButton}
     >
       Opprett bruker
       </button>           
     </div>
      <form>
        <label>Søk etter brukere</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
          placeholder="Skriv inn brukernavn"
        />
      </form>
      </header>
      <ul className={styles.userList}>
        {filteredUsers.map((user) => (
          <li
            key={user._uuid}
            className={`${styles.userItem} ${
              selectedUser?._uuid === user._uuid ? styles.selectedUser : ""
            }`}
            onClick={() =>
              setSelectedUser(user._uuid === selectedUser?._uuid ? null : user)
            }
          >
           <div className={styles.uName}>
           <h3>Navn</h3>
            <p>{user.name}</p>
           </div>

           <div className={styles.uEmail}>
            <h3>E-post</h3>
           <p>{user.email}</p>
           </div>

           <div className={styles.uRole}>
            <h3>Bruker rolle:</h3>
           <p>{user.role}</p>
           </div>

            {selectedUser?._uuid === user._uuid && (
              <div className={styles.actions}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditModalOpen(true);
                  }}
                  className={styles.editButton}
                >
                  Rediger
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(user._uuid);
                  }}
                  disabled={isDeleting}
                  className={styles.deleteButton}
                >
                  {isDeleting ? "Sletter..." : "Slett"}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {isEditModalOpen && selectedUser && (
        <div className={styles.userModal}>
          <div className={styles.userModalContent}>
            <h3>Rediger bruker</h3>
            {renderValidationSummary()}
            {renderInput("Navn", "text", selectedUser.name || "", "name")}
            {renderInput("E-post", "email", selectedUser.email || "", "email")}
            {renderInput("Passord", "password", selectedUser.password || "", "password")}
      
            <div className={styles.userModalActions}>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className={styles.userSaveButton}
              >
                {isUpdating ? "Lagrer..." : "Lagre"}
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className={styles.cancelButton}
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserManager;















