import { Page, Text, View, Document } from "@react-pdf/renderer";
import { Cv } from "../../../types/cv.types";
import PdfStyling from "./pdfStyling"; // Importér fra den eksterne filen

interface PdfDocumentProps {
  cv: Cv;
  selectedSections: string[];
}

const PdfDocument = ({ cv, selectedSections }: PdfDocumentProps) => {
  return (
    <Document>
      <Page size="A4" style={PdfStyling.page}>
        {/* CV Title */}
        <Text style={PdfStyling.title}>{cv.title}</Text>

        {/* Personal Info Section */}
        {selectedSections.includes("personalInfo") && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.title}>Personlig informasjon</Text>
            <Text style={PdfStyling.text}>Navn: {cv.personalInfo.name}</Text>
            <Text style={PdfStyling.text}>E-post: {cv.personalInfo.email}</Text>
            <Text style={PdfStyling.text}>Telefon: {cv.personalInfo.phone}</Text>
          </View>
        )}

        {/* Skills Section */}
        {selectedSections.includes("skills") && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.title}>Ferdigheter</Text>
            {cv.skills.map((skill, index) => (
              <Text key={index} style={PdfStyling.text}>
                - {skill}
              </Text>
            ))}
          </View>
        )}

        {/* Education Section */}
        {selectedSections.includes("education") && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.title}>Utdanning</Text>
            {cv.education.map((edu, index) => (
              <Text key={index} style={PdfStyling.text}>
                {edu.institution}, {edu.degree}, {edu.year}
              </Text>
            ))}
          </View>
        )}

        {/* Experience Section */}
        {selectedSections.includes("experience") && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.title}>Arbeidserfaring</Text>
            {cv.experience.map((exp, index) => (
              <Text key={index} style={PdfStyling.text}>
                {exp.title} hos {exp.company}, {exp.years} år
              </Text>
            ))}
          </View>
        )}

        {/* References Section */}
        {selectedSections.includes("references") && (
          <View style={PdfStyling.section}>
            <Text style={PdfStyling.title}>Referanser</Text>
            {cv.references.map((ref, index) => (
              <Text key={index} style={PdfStyling.text}>
                {ref.name} ({ref.contactInfo})
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PdfDocument;

