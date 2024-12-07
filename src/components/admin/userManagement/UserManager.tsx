import { useState } from "react";
import {
  useGetUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../../services/userApi";
import styles from "./UserManager.module.css";
import { User } from "../../../types/user.types";
import hashPassword from "../../../utils/hashPassword";

const UserManager = () => {
  const { data: users = [], isLoading, isError } = useGetUsersQuery();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleInputChange = (key: keyof User, value: string) => {
    if (selectedUser) {
      setSelectedUser({ ...selectedUser, [key]: value });
    }
  };

  const handleAction = async (
    action: "update" | "delete",
    userId: string,
    updatedData?: Partial<User>
  ) => {
    try {
      if (action === "update" && updatedData) {
        if (updatedData.password) {
          updatedData.password = await hashPassword(updatedData.password);
        }
        await updateUser({ _uuid: userId, ...updatedData }).unwrap();
      } else if (action === "delete") {
        await deleteUser(userId).unwrap();
      }
      setSelectedUser(null);
    } catch (error) {
      console.error(`Feil under ${action}:`, error);
      alert(`Kunne ikke ${action === "update" ? "oppdatere" : "slette"} brukeren. Prøv igjen.`);
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter((user: User) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  if (isLoading) return <p>Laster brukere...</p>;
  if (isError) return <p>Kunne ikke laste brukere. Prøv igjen senere.</p>;

  return (
    <div className={styles.container}>
      <label htmlFor="search">Søk etter brukere</label>
      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <h2>Alle brukere</h2>
      <ul className={styles.userList}>
        {filteredUsers.map((user) => (
          <li
            key={user._uuid}
            className={styles.userItem}
            onClick={() => setSelectedUser(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className={styles.userDetails}>
          <h3>Rediger bruker</h3>
          <form>
            <label>Navn</label>
            <input
              type="text"
              value={selectedUser.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={styles.input}
            />
            <label>E-post</label>
            <input
              type="email"
              value={selectedUser.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={styles.input}
            />
            <label>Passord</label>
            <input
              type="password"
              value={selectedUser.password || ""}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={styles.input}
            />
          </form>
          <button
            onClick={() =>
              handleAction("update", selectedUser._uuid, {
                name: selectedUser.name,
                email: selectedUser.email,
                password: selectedUser.password,
              })
            }
            disabled={isUpdating}
            className={styles.updateButton}
          >
            {isUpdating ? "Oppdaterer..." : "Oppdater"}
          </button>
          <button
            onClick={() => handleAction("delete", selectedUser._uuid)}
            disabled={isDeleting}
            className={styles.deleteButton}
          >
            {isDeleting ? "Sletter..." : "Slett"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManager;










