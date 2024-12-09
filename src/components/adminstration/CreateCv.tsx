import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAddCvMutation } from "../../services/cvApi";
import { useLazyGetUsersQuery } from "../../services/userApi";
import { RootState } from "../../redux/store";
import { Cv } from "../../types/cv.types";
import styles from "./CreateCv.module.css";

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

  
  useEffect(() => {
    if (role === "admin") {
      triggerGetUsers();
    }
  }, [role, triggerGetUsers]);

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
      // Send CV-data til API
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

  return (
    <div className={styles.container}>
      <h2>Opprett CV</h2>


      {role === "admin" && (
        <div className={styles.selectContainer}>
          <label>Cv eier:</label>
          <select
            onChange={(e) => setSelectedUserId(e.target.value)}
            value={selectedUserId || ""}
            className={styles.select}
          >
            <option value="">Velg en bruker</option>
            {isUsersLoading ? (
              <option>Laster brukere...</option>
            ) : (
              users?.map((user: { _uuid: string; name: string }) => (
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
        onChange={(e) =>
          setCv((prev) => ({ ...prev, title: e.target.value }))
        }
        className={styles.input}
      />

      <h3>Personlig informasjon</h3>
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
            personalInfo: { ...prev.personalInfo, phone: Number(e.target.value) },
          }))
        }
        className={styles.input}
      />

      <h3>Ferdigheter</h3>
      {cv.skills.map((skill, index) => (
        <div key={index}>
          <label>Ferdighet {index + 1}:</label>
          <input
            type="text"
            placeholder="Skriv inn ferdighet"
            value={skill}
            onChange={(e) => {
              const updatedSkills = [...cv.skills!];
              updatedSkills[index] = e.target.value;
              setCv((prev) => ({ ...prev, skills: updatedSkills }));
            }}
            className={styles.input}
          />
        </div>
      ))}
      <button onClick={() => setCv((prev) => ({ ...prev, skills: [...(prev.skills || []), ""] }))}>
        Legg til ferdighet
      </button>

      <h3>Utdanning</h3>
      {cv.education?.map((edu, index) => (
        <div key={index}>
          <label>Institusjon:</label>
          <input
            type="text"
            placeholder="Skriv inn institusjon"
            value={edu.institution}
            onChange={(e) => {
              const updatedEducation = [...cv.education!];
              updatedEducation[index].institution = e.target.value;
              setCv((prev) => ({ ...prev, education: updatedEducation }));
            }}
            className={styles.input}
          />
          <label>Karakterer:</label>
          <input
            type="text"
            placeholder="Skriv inn grad"
            value={edu.degree}
            onChange={(e) => {
              const updatedEducation = [...cv.education!];
              updatedEducation[index].degree = e.target.value;
              setCv((prev) => ({ ...prev, education: updatedEducation }));
            }}
            className={styles.input}
          />
          <label>År:</label>
          <input
            type="text"
            placeholder="Skriv inn år"
            value={edu.year}
            onChange={(e) => {
              const updatedEducation = [...cv.education!];
              updatedEducation[index] = { ...updatedEducation[index], year: Number(e.target.value) };              
              setCv((prev) => ({ ...prev, education: updatedEducation }));
            }}
            className={styles.input}
          />
        </div>
      ))}
      <button
        onClick={() =>
          setCv((prev) => ({
            ...prev,
            education: [...(prev.education || []), { institution: "", degree: "", year: 0 }],
          }))
        }
      >
        Legg til utdanning
      </button>

      <h3>Arbeidserfaring</h3>
      {cv.experience?.map((exp, index) => (
        <div key={index}>
          <label>Stilling:</label>
          <input
            type="text"
            placeholder="Skriv inn stilling"
            value={exp.title}
            onChange={(e) => {
              const updatedExperience = [...cv.experience!];
              updatedExperience[index].title = e.target.value;
              setCv((prev) => ({ ...prev, experience: updatedExperience }));
            }}
            className={styles.input}
          />
          <label>Firma:</label>
          <input
            type="text"
            placeholder="Skriv inn firmanavn"
            value={exp.company}
            onChange={(e) => {
              const updatedExperience = [...cv.experience!];
              updatedExperience[index].company = e.target.value;
              setCv((prev) => ({ ...prev, experience: updatedExperience }));
            }}
            className={styles.input}
          />

          <label>År:</label>
          <input
            type="text"
            placeholder="Skriv inn år"
            value={exp.years}
            onChange={(e) => {
              const updatedExperience = [...cv.experience!];
              updatedExperience[index].years = Number(e.target.value);
              setCv((prev) => ({ ...prev, experience: updatedExperience }));
            }}
            className={styles.input}
          />
        </div>
      ))}
      <button
        onClick={() =>
          setCv((prev) => ({
            ...prev,
            experience: [
              ...(prev.experience || []),
              { title: "", company: "", years: 0 },
            ],
          }))
        }
      >
        Legg til arbeidserfaring
      </button>

      <h3>Referanser</h3>
      {cv.references?.map((ref, index) => (
        <div key={index}>
          <label>Navn:</label>
          <input
            type="text"
            placeholder="Skriv inn referansens navn"
            value={ref.name}
            onChange={(e) => {
              const updatedReferences = [...cv.references!];
              updatedReferences[index].name = e.target.value;
              setCv((prev) => ({ ...prev, references: updatedReferences }));
            }}
            className={styles.input}
          />

          <label>Kontaktinformasjon:</label>
          <input
            type="text"
            placeholder="Skriv inn kontaktinformasjon"
            value={ref.contactInfo}
            onChange={(e) => {
              const updatedReferences = [...cv.references!];
              updatedReferences[index] = { ...updatedReferences[index], contactInfo: Number(e.target.value) };
              setCv((prev) => ({ ...prev, references: updatedReferences }));
            }}
            className={styles.input}
          />
        </div>
      ))}
      <button
        onClick={() =>
          setCv((prev) => ({
            ...prev,
            references: [...(prev.references || []), { name: "", contactInfo: 0 }],
          }))
        }
      >
        Legg til referanse
      </button>

      <button onClick={handleSubmit} className={styles.submitButton}>
        Opprett CV
      </button>

      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateCv;








