import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddCvMutation } from "../../../services/cvApi";
import { useLazyGetUsersQuery } from "../../../services/userApi";
import { RootState } from "../../../redux/store";
import { Cv } from "../../../types/cv.types";
import styles from "./createCv.module.css";
import Skills from "./sections/Skills";
import Educations from "./sections/Education";
import Experiences from "./sections/Experience";
import References from "./sections/References";

const CreateCv = () => {
  const userid = useSelector((state: RootState) => state.user._uuid);
  const role = useSelector((state: RootState) => state.user.role);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [addCv] = useAddCvMutation();
  const [triggerGetUsers, { data: users, isLoading: isUsersLoading }] = useLazyGetUsersQuery();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [cv, setCv] = useState<Omit<Cv, "_uuid">>({
    title: "",
    personalInfo: {
      name: "",
      email: "",
      phone: 0,
    },
    skills: [""],
    education: [{ institution: "", degree: "", year: 0 }],
    experience: [{ title: "", company: "", years: 0 }],
    references: [{ name: "", contactInfo: 0 }],
  });

  const handleFetchUsers = () => {
    if (role === "admin") {
      console.log("Henter brukere...");
      triggerGetUsers();
    }
  };

  const handleSubmit = async () => {
    let userIdToUse: string;

    if (role === "admin") {
      if (!selectedUserId) {
        setMessage("Vennligst velg en bruker.");
        setIsError(true);
        return;
      }
      userIdToUse = selectedUserId;
    } else {
      if (!userid) {
        setMessage("Ingen bruker-ID funnet. Logg inn på nytt.");
        setIsError(true);
        return;
      }
      userIdToUse = userid;
    }

    try {
      await addCv({
        userid: userIdToUse,
        ...cv,
      }).unwrap();

      setMessage("CV opprettet!");
      setIsError(false);

      setCv({
        title: "",
        personalInfo: { name: "", email: "", phone: 0 },
        skills: [""],
        education: [{ institution: "", degree: "", year: 0 }],
        experience: [{ title: "", company: "", years: 0 }],
        references: [{ name: "", contactInfo: 0 }],
      });
      setSelectedUserId(null);
    } catch (error) {
      console.error("Feil ved opprettelse av CV:", error);
      setMessage("Kunne ikke opprette CV. Prøv igjen.");
      setIsError(true);
    }
  };

  const updateSection = <K extends keyof Omit<Cv, "title" | "personalInfo">>(
    section: K,
    data: Cv[K]
  ) => {
    setCv((prev) => ({ ...prev, [section]: data }));
  };

  return (
    <div className={styles.container}>
      <h2>Opprett CV</h2>

      {role === "admin" && (
        <div className={styles.selectContainer}>
          <label>Cv eier:</label>
          <select
            onClick={handleFetchUsers}
            onChange={(e) => setSelectedUserId(e.target.value)}
            value={selectedUserId || ""}
            className={styles.select}
          >
            <option value="">Velg en bruker</option>
            {isUsersLoading ? (
              <option>Laster brukere...</option>
            ) : (
              users?.map((user) => (
                <option key={user._uuid} value={user._uuid}>
                  {user.name}
                </option>
              ))
            )}
          </select>
        </div>
      )}

      <label>CV tittel</label>
      <input
        type="text"
        placeholder="CV-tittel"
        value={cv.title}
        onChange={(e) => setCv((prev) => ({ ...prev, title: e.target.value }))}
        className={styles.input}
      />

      <h3>Personlig informasjon</h3>
      <div className={styles.personalInfo}>
        <label>Navn:</label>
        <input
          type="text"
          placeholder="Skriv inn navn"
          value={cv.personalInfo.name}
          onChange={(e) =>
            setCv((prev) => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, name: e.target.value },
            }))
          }
          className={styles.input}
        />
        <label>E-post:</label>
        <input
          type="email"
          placeholder="Skriv inn e-post"
          value={cv.personalInfo.email}
          onChange={(e) =>
            setCv((prev) => ({
              ...prev,
              personalInfo: { ...prev.personalInfo, email: e.target.value },
            }))
          }
          className={styles.input}
        />
        <label>Telefonnummer:</label>
        <input
          type="number"
          placeholder="Skriv inn telefonnummer"
          value={cv.personalInfo.phone}
          onChange={(e) =>
            setCv((prev) => ({
              ...prev,
              personalInfo: {
                ...prev.personalInfo,
                phone: Number(e.target.value),
              },
            }))
          }
          className={styles.input}
        />
      </div>

      <Skills skills={cv.skills} onUpdate={(skills) => updateSection("skills", skills)} />
      <Educations
        education={cv.education}
        onUpdate={(education) => updateSection("education", education)}
      />
      <Experiences
        experience={cv.experience}
        onUpdate={(experience) => updateSection("experience", experience)}
      />
      <References
        references={cv.references}
        onUpdate={(references) => updateSection("references", references)}
      />

      <button onClick={handleSubmit} className={styles.submitButton}>
        Opprett CV
      </button>

      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>{message}</p>
      )}
    </div>
  );
};

export default CreateCv;
