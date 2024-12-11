import { useState } from "react";
import { useSelector } from "react-redux";
import { useCreateCvMutation } from "../../../services/cvApi";
import { useLazyGetUsersQuery } from "../../../services/userApi";
import { RootState } from "../../../redux/store";
import { Cv } from "../../../types/cv.types";
import styles from "./createCv.module.css";
import Skills from "./sections/Skills";
import Educations from "./sections/Education";
import Experiences from "./sections/Experience";
import References from "./sections/References";
import { validateCv, ValidationResult } from "../../../utils/createCvValidations";

const initialCvState: Omit<Cv, "_uuid"> = {
  title: "",
  personalInfo: { name: "", email: "", phone: 0 },
  skills: [],
  education: [],
  experience: [],
  references: [],
};

const CreateCv = () => {
  const userid = useSelector((state: RootState) => state.user._uuid);
  const role = useSelector((state: RootState) => state.user.role);
  const [createCv, { isLoading: isSubmitting }] = useCreateCvMutation();
  const [triggerGetUsers, { data: users, isLoading: isUsersLoading }] =
    useLazyGetUsersQuery();
  const [cv, setCv] = useState<Omit<Cv, "_uuid">>(initialCvState);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationResult["errors"]>({});
  const [isError, setIsError] = useState(false);

  const handleFetchUsers = () => {
    if (role === "admin") {
      console.log("Henter brukere...");
      triggerGetUsers();
    }
  };

  const handlePersonalInfoChange = (field: keyof Cv["personalInfo"], value: string | number) => {
    setCv((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const handleSubmit = async () => {
    setValidationErrors({});
    const validation = validateCv(cv);

    if (!validation.isValid) {
      setMessage("Validering feilet. Rett opp følgende feil:");
      setValidationErrors(validation.errors);
      setIsError(true);
      return;
    }

    const userIdToUse = role === "admin" ? selectedUserId : userid;

    if (!userIdToUse) {
      setMessage("Bruker-ID mangler. Logg inn på nytt.");
      setIsError(true);
      return;
    }

    try {
      await createCv({ userid: userIdToUse, ...cv }).unwrap();
      setMessage("CV opprettet!");
      setIsError(false);
      setCv(initialCvState);
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

  const renderValidationSummary = () => {
    const errorMessages = Object.values(validationErrors).filter(Boolean);
    if (!errorMessages.length) return null;

    return (
      <div className={styles.validationSummary}>
        <h4>Disse feltene må være utfylt:</h4>
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
      {validationErrors.title && <p className={styles.error}>{validationErrors.title}</p>}

      {renderValidationSummary()}

      <h3>Personlig informasjon</h3>
      <div className={styles.personalInfo}>
        <label>Navn:</label>
        <input
          type="text"
          placeholder="Skriv inn navn"
          value={cv.personalInfo.name}
          onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
          className={styles.input}
        />
        {validationErrors.personalInfoName && (
          <p className={styles.error}>{validationErrors.personalInfoName}</p>
        )}

        <label>E-post:</label>
        <input
          type="email"
          placeholder="Skriv inn e-post"
          value={cv.personalInfo.email}
          onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
          className={styles.input}
        />
        {validationErrors.personalInfoEmail && (
          <p className={styles.error}>{validationErrors.personalInfoEmail}</p>
        )}

        <label>Telefonnummer:</label>
        <input
          type="number"
          placeholder="Skriv inn telefonnummer"
          value={cv.personalInfo.phone}
          onChange={(e) => handlePersonalInfoChange("phone", Number(e.target.value))}
          className={styles.input}
        />
        {validationErrors.personalInfoPhone && (
          <p className={styles.error}>{validationErrors.personalInfoPhone}</p>
        )}
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

      <button onClick={handleSubmit} className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? "Oppretter CV..." : "Opprett CV"}
      </button>

      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>{message}</p>
      )}
    </div>
  );
};

export default CreateCv;



