import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const ModificationReport = ({ packages }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Filtered Packages Report</Text>
          {packages.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.pkgName}>Name: {item.customerName}</Text>
              <Text>Email: {item.customerEmail}</Text>
              <Text>Package: {item.modificationType}</Text>
              <Text>Date: {item.date}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// PDF styles
const styles = StyleSheet.create({
  page: { padding: 30 },
  section: { marginBottom: 20 },
  title: { fontSize: 20, marginBottom: 10, fontWeight: "bold" },
  row: { marginBottom: 8 },
  pkgName: { fontWeight: "bold" },
});

export default ModificationReport;
