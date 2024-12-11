import { StyleSheet } from "@react-pdf/renderer";

const PdfStyling = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  mainTitle: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomStyle: "solid",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#333",
  },
  item: {
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: "#555",
  },
});

export default PdfStyling;


  