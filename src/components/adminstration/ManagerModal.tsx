import { ReactNode } from "react";
import styles from "./managerModal.module.css";
import CreateCv from "./cv/create/CreateCv";
import UserCreator from "./userManagement/UserCreator";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <section className={styles.managerModalOverlay}>
      <div className={styles.managerModalContent}>
        <button onClick={onClose} className={styles.managerCloseButton}>
          Lukk
        </button>
        {children}
      </div>
    </section>
  );
};

export const CreateCvModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <CreateCv />
    </Modal>
  );
};

export const UserCreatorModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <UserCreator />
    </Modal>
  );
};