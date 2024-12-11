import { Page, Text, View, Document } from "@react-pdf/renderer";
import { DocumentPdf } from "../../../types/cv.types";
import PdfStyling from "./pdfStyling";

const PdfDocument = ({ cv, selectedSections }: DocumentPdf) => {
  console.log("CV Data:", cv);
  console.log("Selected Sections:", selectedSections);
  const isValidYear = (year: number) => year > 1900 && year < 2100;

  return (
    <Document>
      <Page size="A4" style={PdfStyling.page}>
        <Text style={PdfStyling.mainTitle}>{cv.title || "CV"}</Text>

        {selectedSections.includes("personalInfo") && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.sectionTitle}>Personlig informasjon</Text>
            <Text style={PdfStyling.text}>Navn: {cv.personalInfo.name}</Text>
            <Text style={PdfStyling.text}>E-post: {cv.personalInfo.email}</Text>
            <Text style={PdfStyling.text}>Telefon: {cv.personalInfo.phone}</Text>
          </View>
        )}

        {selectedSections.includes("skills") && cv.skills.length > 0 && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.sectionTitle}>Ferdigheter</Text>
            {cv.skills.map((skill, index) => (
              <Text key={index} style={PdfStyling.text}>
                - {skill}
              </Text>
            ))}
          </View>
        )}

        {selectedSections.includes("education") && cv.education.length > 0 && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.sectionTitle}>Utdanning</Text>
            {cv.education.map((edu, index) => (
              <View key={index} style={PdfStyling.item}>
                <Text style={PdfStyling.text}>Institusjon: {edu.institution}</Text>
                <Text style={PdfStyling.text}>Grad: {edu.degree}</Text>
                {isValidYear(edu.startYear) && (
                  <Text style={PdfStyling.text}>
                    Fra år: {edu.startYear}
                  </Text>
                )}
                {isValidYear(edu.endYear) && (
                  <Text style={PdfStyling.text}>
                    Til år: {edu.endYear}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {selectedSections.includes("experience") && cv.experience.length > 0 && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.sectionTitle}>Arbeidserfaring</Text>
            {cv.experience.map((exp, index) => (
              <View key={index} style={PdfStyling.item}>
                <Text style={PdfStyling.text}>Tittel: {exp.title}</Text>
                <Text style={PdfStyling.text}>Firma: {exp.company}</Text>
                {isValidYear(exp.startYear) && (
                  <Text style={PdfStyling.text}>
                    Fra år: {exp.startYear}
                  </Text>
                )}
                {isValidYear(exp.endYear) && (
                  <Text style={PdfStyling.text}>
                    Til år: {exp.endYear}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {selectedSections.includes("references") && cv.references.length > 0 && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.sectionTitle}>Referanser</Text>
            {cv.references.map((ref, index) => (
              <View key={index} style={PdfStyling.item}>
                <Text style={PdfStyling.text}>Navn: {ref.name}</Text>
                <Text style={PdfStyling.text}>
                  Kontaktinformasjon: {ref.contactInfo}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PdfDocument;





