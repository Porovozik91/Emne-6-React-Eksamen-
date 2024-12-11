import { StyleSheet } from "@react-pdf/renderer";

const PdfStyling = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 12,
    lineHeight: 1.5,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center", 
    color: "#333",
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: "1px solid #ccc",
  },
  text: {
    marginBottom: 5,
  },
});

export default PdfStyling;

  