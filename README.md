# Emne-6-React-Eksamen-
Dynamisk CV-administrasjonssystem

Beskrivelse av applikasjonen 

LandingPage 
LandingPage er inngangspunktet til applikasjonen. Den bruker Link fra React Router DOM for å navigere til påloggingssiden uten å laste hele siden på nytt. Siden gir en kort introduksjon til systemet og leder brukeren videre basert på deres behov. 

SignIn 
Påloggingssiden håndterer autentisering med et enkelt innloggingsskjema. Applikasjonen bruker useLazyGetUsersQuery fra Redux Toolkit Query for å hente brukerdata. Passord hashes lokalt med crypto.subtle for å sikrhet og for å unngå data sendes ukryptert. Ved vellykket innlogging genereres JWT-token med SignJWT, lagres som cookie med setCookie, og brukeren navigeres videre basert på rolle ved hjelp av Link. Admin-brukere autentiseres også mot hardkodede verdier i .env-filen, noe som muliggjør tilgang selv uten admin i API-et. For relasjoner for å koble cv eiere og til riktig bruker lagrer jeg også _uuid.

UserManager 
Denne komponenten gir admin mulighet til å administrere brukere. Brukerlisten hentes med useGetUsersQuery fra Redux Toolkit Query, og admin kan søke, redigere eller slette brukere. Nye brukere opprettes med UserCreator, hvor standardrollen hentes fra .env. Data og funksjoner oppdateres i sanntid via Redux, og endringer logges for sporbarhet. 

AllCvs 
Viser og administrerer alle CV-er. CV-data hentes fra API ved bruk av Redux Toolkit Query. Modalkomponenter med useState håndterer redigering og sletting lokalt, mens useDispatch oppdaterer Redux Store. Komponentens gjenbrukbare struktur gjør den enkel å utvide og vedlikeholde. Søk: hjelper med rask filtrering. 

CreateCv 
Brukere kan opprette egne CV-er gjennom et strukturert skjema som bruker React Hooks som useState og useReducer for kompleks tilstandshåndtering. 
Admin brukere kan velge en bruker og og opprette cv. 
 Skjemaet dekker personalia, utdanning, erfaring, ferdigheter og referanser. CV-er lagres i Redux Store og kan genereres som PDF med react-pdf. Skjemaet validerer felter i sanntid for brukervennlighet. 

ProtectedRoute og rollebasert tilgang 
Rollebasert tilgang er implementert med ProtectedRoute for å begrense beskyttede sider til autentiserte brukere. Admin- og brukerroller navigeres med AdminRoutes og UserRoutes, og useNavigate dirigerer brukere til riktig sted. Feilhåndtering gir tilbakemelding ved avvist tilgang. 

 

Teknologier og metoder 

Redux Toolkit 
Hovedverktøy for tilstandshåndtering. Bruker createSlice og createApi for å redusere kodekompleksitet. 

store.ts: Sentral tilstandshåndterer som integrerer userSlice. 

userSlice: Definerer initialtilstand, actions og reducers for autentisering og API-håndtering. Automatisk caching via Redux Toolkit Query. 

React Router DOM 
Navigasjon er strukturert med React Router DOM, inkludert rollebaserte ruter som AdminRoutes og UserRoutes. ProtectedRoute kontrollerer tilgang, og fallback-logikk håndterer ukjente ruter. 

.env-filen 
Lagrer sensitiv informasjon som: 

Hardkodede adminopplysninger for autentisering. 

API-URL for dynamiske spørringer. 

Standardroller for brukere. 

JWT-secret for tokens. 
 

Utils-mappen 
Samler funksjoner for hashing, JWT-håndtering og validering: 

jwtDecoder.tsx: Verifiserer JWT. 

cookieManager.ts: Håndterer cookies (setCookie, getCookie, removeCookie). 

 

Tjenester 

cvApi.ts 
Bruker createApi fra Redux Toolkit Query for CV-relaterte operasjoner. Data caches og transformeres for optimal ytelse. 

userApi.ts 
Håndterer brukeradministrasjon, inkludert henting, opprettelse, oppdatering og sletting. Bruker: 

Lazy Queries: For spesifikke handlinger. 

Mutation Endpoints: For oppdatering og sletting av data. 

 

Mappestruktur 

src/components: 

cv: Opprettelse, listehåndtering og PDF-generering av CV-er. 

userManagement: Komponenter for brukeradministrasjon. 

Header: Navigasjonskomponent for admin og brukere. 

src/pages: 

LandingPage.tsx: Introduksjonsside. 

SignIn.tsx: Påloggingsside. 

AdminPage.tsx: Admin-grensesnitt. 

NotFound.tsx: Håndtering av 404-feil. 

src/redux: 

Tilstandshåndtering med store.ts og userSlice.ts. 

src/routes: 

Ruter for roller og beskyttede sider . 

src/services: 

API-integrasjoner med cvApi.ts og userApi.ts. 

src/tests: 

Klargjort for Vitest-testing (vitest.setup.ts). 

src/types: 

TypeScript-typer for CV-er og brukere. 

src/utils: 

Funksjoner for sikkerhet og validering . 

Kilder:

https://redux.js.org/tutorials/quick-start

https://redux.js.org/tutorials/essentials/part-1-overview-concepts
https://redux.js.org/tutorials/essentials/part-2-app-structure

https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics

google:
redux, cookie, jwt, react router dom, ts - doks

chat gpt på samme måte som google

For å sette opp vitest
https://johnsmilga.com/articles/2024/10/15