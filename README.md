# Emne-6-React-Eksamen-
Dynamisk CV-administrasjonssystem

Beskrivelse av applikasjonen 

LandingPage 
LandingPage er inngangspunktet til applikasjonen. Den bruker Link fra React Router DOM for å navigere til påloggingssiden uten å laste hele siden på nytt. Siden gir en kort introduksjon til systemet og leder brukeren videre til påloggings side 

SignIn 
Påloggingssiden håndterer autentisering med et enkelt innloggingsskjema. Applikasjonen bruker useLazyGetUsersQuery fra Redux Toolkit Query for å hente brukerdata. Passord hashes lokalt med crypto.subtle for å sikrhet og for å unngå data sendes ukryptert. Ved vellykket innlogging genereres JWT-token med SignJWT, lagres som cookie med setCookie, og brukeren navigeres videre basert på rolle. Admin-bruker autentiseres også mot hardkodede verdier i .env-filen, noe som muliggjør tilgang selv uten admin data i API-et. 

UserManager 
Denne komponenten gir admin mulighet til å administrere brukere. Brukerlisten hentes med useGetUsersQuery fra Redux Toolkit Query, og admin kan søke, redigere eller slette brukere. Nye brukere opprettes med UserCreator, hvor standardrollen hentes fra .env. Data og funksjoner oppdateres i sanntid via Redux, og endringer logges for sporbarhet. 

AllCvs 
Viser og administrerer alle CV-er. CV-data hentes fra API ved bruk av Redux Toolkit Query. Modalkomponenter med useState håndterer redigering og sletting lokalt, mens useDispatch oppdaterer Redux Store. Komponentens gjenbrukbare struktur gjør den enkel å utvide og vedlikeholde. Søk: hjelper med rask filtrering. 

CreateCv 
Brukere kan opprette egne CV-er gjennom et strukturert skjema som bruker React Hooks, med useState for lokal tilstandshåndtering, useSelector for global tilstandshåndtering via Redux, og RootState for typestøtte til useSelector.
Admin brukere kan velge en bruker og og opprette cv. 
 Skjemaet dekker personalia, utdanning, erfaring, ferdigheter og referanser. CV-er kan genereres som PDF med react-pdf. Skjemaet validerer felter for brukervennlighet. 

ProtectedRoute og rollebasert tilgang 
Rollebasert tilgang er implementert med ProtectedRoute for å begrense beskyttede sider til autentiserte brukere. Admin- og brukerroller navigeres med AdminRoutes og UserRoutes, og useNavigate dirigerer brukere til riktig sted. Feilhåndtering gir tilbakemelding ved avvist tilgang. 